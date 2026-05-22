import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import {
  type SiteContent,
  loadContent,
  saveContent,
  resetContent,
  defaultContent,
} from "@/lib/site-content";
import {
  fetchContentFromFirebase,
  saveContentToFirebase,
  subscribeToContent,
} from "@/lib/firebase";

interface SiteContentContextValue {
  content: SiteContent;
  update: (updater: (prev: SiteContent) => SiteContent) => void;
  save: () => Promise<void>;
  reset: () => void;
  isDirty: boolean;
  isSyncing: boolean;
  isLoading: boolean;
  lastSaved: Date | null;
  firebaseOk: boolean;
}

const SiteContentContext = createContext<SiteContentContextValue | null>(null);

function mergeWithDefaults(data: unknown): SiteContent {
  if (!data || typeof data !== "object") return defaultContent;
  const d = data as Record<string, unknown>;
  return {
    ...defaultContent,
    ...d,
    notice: (d.notice as SiteContent["notice"]) ?? defaultContent.notice,
    seo: (d.seo as SiteContent["seo"]) ?? defaultContent.seo,
    courses: (d.courses as SiteContent["courses"]) ?? defaultContent.courses,
    hero: (d.hero as SiteContent["hero"]) ?? defaultContent.hero,
    contact: (d.contact as SiteContent["contact"]) ?? defaultContent.contact,
    developer: (d.developer as SiteContent["developer"]) ?? defaultContent.developer,
    gallery: Array.isArray(d.gallery) ? (d.gallery as SiteContent["gallery"]) : defaultContent.gallery,
    videos: Array.isArray(d.videos) ? (d.videos as SiteContent["videos"]) : defaultContent.videos,
  };
}

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(() => loadContent());
  const [savedJson, setSavedJson] = useState<string>(() => JSON.stringify(loadContent()));
  const [isSyncing, setIsSyncing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [firebaseOk, setFirebaseOk] = useState(true);

  const contentRef = useRef(content);
  useEffect(() => { contentRef.current = content; }, [content]);

  useEffect(() => {
    let unsubscribe: (() => void) | null = null;
    let mounted = true;

    async function init() {
      setIsLoading(true);
      try {
        const firebaseData = await fetchContentFromFirebase();
        if (mounted && firebaseData) {
          const merged = mergeWithDefaults(firebaseData);
          setContent(merged);
          setSavedJson(JSON.stringify(merged));
          saveContent(merged);
        }
        setFirebaseOk(true);
      } catch {
        setFirebaseOk(false);
      } finally {
        if (mounted) setIsLoading(false);
      }

      unsubscribe = subscribeToContent((data) => {
        if (!mounted) return;
        const merged = mergeWithDefaults(data);
        setContent(merged);
        setSavedJson(JSON.stringify(merged));
        saveContent(merged);
      });
    }

    init();
    return () => {
      mounted = false;
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const update = useCallback((updater: (prev: SiteContent) => SiteContent) => {
    setContent((prev) => updater(prev));
  }, []);

  const save = useCallback(async () => {
    const current = contentRef.current;
    setIsSyncing(true);
    try {
      saveContent(current);
      const ok = await saveContentToFirebase(current);
      setFirebaseOk(ok);
      setSavedJson(JSON.stringify(current));
      setLastSaved(new Date());
    } catch {
      setFirebaseOk(false);
    } finally {
      setIsSyncing(false);
    }
  }, []);

  const reset = useCallback(() => {
    const defaults = resetContent();
    setContent(defaults);
    setSavedJson(JSON.stringify(defaults));
    saveContentToFirebase(defaults).catch(console.warn);
  }, []);

  const isDirty = JSON.stringify(content) !== savedJson;

  return (
    <SiteContentContext.Provider
      value={{ content, update, save, reset, isDirty, isSyncing, isLoading, lastSaved, firebaseOk }}
    >
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  const ctx = useContext(SiteContentContext);
  if (!ctx) throw new Error("useSiteContent must be used inside SiteContentProvider");
  return ctx;
}
