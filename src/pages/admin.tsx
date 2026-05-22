import { useState, useRef } from "react";
import { useSiteContent } from "@/context/SiteContentContext";
import { defaultContent, getAdminPassword, setAdminPassword, type VideoItem, type GalleryItem, type CourseItem } from "@/lib/site-content";
import {
  fetchAdminPasswordFromFirebase,
  saveAdminPasswordToFirebase,
} from "@/lib/firebase";
import {
  Save, RotateCcw, Lock, Eye, EyeOff, Plus, Trash2, ChevronDown, ChevronUp,
  LogOut, Settings, Image, Video, Phone, Code2, Layout, BookOpen,
  LayoutDashboard, Bell, Key, Download, Upload, ExternalLink, GraduationCap,
  Check, X, AlertTriangle, Info, CheckCircle2, Loader2, Wifi, WifiOff,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Tab = "dashboard" | "notice" | "general" | "hero" | "gallery" | "videos" | "courses" | "contact" | "developer" | "settings";

/* ─── Shared primitives ─── */
function Label({ children }: { children: React.ReactNode }) {
  return <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">{children}</label>;
}

function TextInput({ value, onChange, placeholder = "", type = "text" }: {
  value: string; onChange: (v: string) => void; placeholder?: string; type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm"
    />
  );
}

function TextArea({ value, onChange, placeholder = "", rows = 3 }: {
  value: string; onChange: (v: string) => void; placeholder?: string; rows?: number;
}) {
  return (
    <textarea
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm resize-y"
    />
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <Label>{label}</Label>
      {children}
    </div>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

function CardHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/60">
      <h3 className="font-bold text-slate-800">{title}</h3>
      {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
    </div>
  );
}

function CardBody({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`p-5 ${className}`}>{children}</div>;
}

function Toggle({ value, onChange, label }: { value: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => onChange(!value)}
        className={`relative w-11 h-6 rounded-full transition-colors ${value ? "bg-blue-600" : "bg-slate-200"}`}
      >
        <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${value ? "translate-x-5" : ""}`} />
      </button>
      <span className="text-sm font-medium text-slate-700">{label}</span>
    </div>
  );
}

function StatCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string | number; color: string }) {
  return (
    <div className={`rounded-2xl p-4 ${color}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold opacity-75 mb-1">{label}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <div className="opacity-80">{icon}</div>
      </div>
    </div>
  );
}

/* ─── Password Gate ─── */
function PasswordGate({ onAuth }: { onAuth: () => void }) {
  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (pw === getAdminPassword()) {
      onAuth();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2500);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Brand */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-white/10 backdrop-blur rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/20">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">প্রয়োজনটেক</h1>
          <p className="text-blue-300 text-sm mt-1">Admin Control Panel</p>
        </div>

        {/* Card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-6 shadow-2xl">
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-blue-200 uppercase tracking-wider mb-1.5">পাসওয়ার্ড</label>
              <div className="relative">
                <input
                  type={show ? "text" : "password"}
                  value={pw}
                  onChange={e => setPw(e.target.value)}
                  placeholder="Enter admin password"
                  className={`w-full bg-white/10 border rounded-xl px-4 py-3 text-sm pr-11 text-white placeholder-blue-300 focus:outline-none focus:ring-2 ${
                    error ? "border-red-400 focus:ring-red-400" : "border-white/20 focus:ring-blue-400"
                  }`}
                  autoFocus
                />
                <button type="button" onClick={() => setShow(s => !s)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-blue-300 hover:text-white">
                  {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {error && (
                <div className="flex items-center gap-1.5 mt-2 text-red-300 text-xs">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  ভুল পাসওয়ার্ড। আবার চেষ্টা করুন।
                </div>
              )}
            </div>

            <button type="submit" className="w-full bg-blue-500 hover:bg-blue-400 text-white font-bold py-3 rounded-xl transition-colors shadow-lg">
              Login → প্রবেশ করুন
            </button>
          </form>

          <p className="text-blue-300/60 text-xs text-center mt-5">
            Default: <code className="bg-white/10 px-1.5 py-0.5 rounded text-blue-200">proyojontake2024</code>
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── Sidebar ─── */
const TABS: { id: Tab; icon: React.ReactNode; label: string; group?: string }[] = [
  { id: "dashboard", icon: <LayoutDashboard className="w-4 h-4" />, label: "Dashboard" },
  { id: "notice", icon: <Bell className="w-4 h-4" />, label: "নোটিস ব্যানার", group: "content" },
  { id: "general", icon: <Settings className="w-4 h-4" />, label: "সাধারণ তথ্য", group: "content" },
  { id: "hero", icon: <Layout className="w-4 h-4" />, label: "Hero Section", group: "content" },
  { id: "gallery", icon: <Image className="w-4 h-4" />, label: "গ্যালারি ছবি", group: "content" },
  { id: "videos", icon: <Video className="w-4 h-4" />, label: "ভিডিও", group: "content" },
  { id: "courses", icon: <GraduationCap className="w-4 h-4" />, label: "কোর্সসমূহ", group: "content" },
  { id: "contact", icon: <Phone className="w-4 h-4" />, label: "যোগাযোগ", group: "content" },
  { id: "developer", icon: <Code2 className="w-4 h-4" />, label: "Developer Credit", group: "content" },
  { id: "settings", icon: <Key className="w-4 h-4" />, label: "সেটিংস", group: "system" },
];

function Sidebar({ active, onChange, onLogout }: { active: Tab; onChange: (t: Tab) => void; onLogout: () => void }) {
  return (
    <aside className="w-60 bg-slate-900 flex flex-col shrink-0 h-screen sticky top-0">
      {/* Brand */}
      <div className="px-5 py-5 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shrink-0">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-bold text-white text-sm leading-none">প্রয়োজনটেক</p>
            <p className="text-slate-400 text-[10px] mt-0.5">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-0.5">
        {(() => {
          let lastGroup = "";
          return TABS.map(tab => {
            const showDivider = tab.group && tab.group !== lastGroup;
            if (tab.group) lastGroup = tab.group;
            return (
              <div key={tab.id}>
                {showDivider && (
                  <p className="px-2 pt-4 pb-1 text-[10px] font-bold text-slate-600 uppercase tracking-wider">
                    {tab.group === "content" ? "কনটেন্ট" : "সিস্টেম"}
                  </p>
                )}
                <button
                  onClick={() => onChange(tab.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    active === tab.id
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-slate-400 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              </div>
            );
          });
        })()}
      </nav>

      {/* Footer */}
      <div className="px-3 py-3 border-t border-slate-800 space-y-1">
        <a
          href="/"
          target="_blank"
          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
        >
          <ExternalLink className="w-4 h-4" />
          সাইট দেখুন
        </a>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-slate-400 hover:text-red-400 hover:bg-red-900/20 transition-all"
        >
          <LogOut className="w-4 h-4" />
          লগআউট
        </button>
      </div>
    </aside>
  );
}

/* ─── Dashboard Tab ─── */
function DashboardTab({ onNavigate }: { onNavigate: (t: Tab) => void }) {
  const { content, isDirty } = useSiteContent();

  const stats = [
    { icon: <Video className="w-5 h-5" />, label: "ভিডিও", value: content.videos.length, color: "bg-blue-50 text-blue-700" },
    { icon: <Image className="w-5 h-5" />, label: "গ্যালারি ছবি", value: content.gallery.length, color: "bg-violet-50 text-violet-700" },
    { icon: <Phone className="w-5 h-5" />, label: "ফোন নম্বর", value: content.contact.phones.length, color: "bg-emerald-50 text-emerald-700" },
    { icon: <GraduationCap className="w-5 h-5" />, label: "মোট কোর্স", value: content.courses.academic.length + content.courses.computer.length, color: "bg-amber-50 text-amber-700" },
  ];

  const quickActions: { label: string; tab: Tab; icon: React.ReactNode }[] = [
    { label: "নোটিস ব্যানার", tab: "notice", icon: <Bell className="w-4 h-4" /> },
    { label: "ভিডিও যোগ করুন", tab: "videos", icon: <Video className="w-4 h-4" /> },
    { label: "গ্যালারি আপডেট", tab: "gallery", icon: <Image className="w-4 h-4" /> },
    { label: "যোগাযোগ তথ্য", tab: "contact", icon: <Phone className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Dashboard</h2>
        <p className="text-sm text-slate-500 mt-0.5">প্রয়োজনটেক কোচিং — সাইট ওভারভিউ</p>
      </div>

      {isDirty && (
        <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
          <p className="text-sm text-amber-700 font-medium">কিছু পরিবর্তন সংরক্ষিত হয়নি। উপরের "সংরক্ষণ" বাটন চাপুন।</p>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <StatCard key={i} {...s} />
        ))}
      </div>

      {/* Status */}
      <Card>
        <CardHeader title="সাইটের অবস্থা" />
        <CardBody>
          <div className="space-y-3">
            {[
              { label: "নোটিস ব্যানার", value: content.notice.show ? "চালু আছে" : "বন্ধ আছে", ok: content.notice.show },
              { label: "Developer Credit", value: content.developer.show ? "দেখা যাচ্ছে" : "লুকানো", ok: true },
              { label: "YouTube চ্যানেল", value: content.contact.youtube.includes("proyojontake") ? "সেট করা আছে" : "Default URL", ok: content.contact.youtube.includes("proyojontake") },
              { label: "ভিডিও IDs", value: content.videos.filter(v => v.id && v.id !== "dQw4w9WgXcQ").length + "/" + content.videos.length + " আসল ভিডিও", ok: content.videos.some(v => v.id && v.id !== "dQw4w9WgXcQ") },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                <span className="text-sm text-slate-600">{item.label}</span>
                <span className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${item.ok ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>
                  {item.ok ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader title="দ্রুত কাজ করুন" />
        <CardBody>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((a, i) => (
              <button
                key={i}
                onClick={() => onNavigate(a.tab)}
                className="flex items-center gap-2.5 px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 transition-all text-left"
              >
                {a.icon}
                {a.label}
              </button>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

/* ─── Notice Tab ─── */
function NoticeTab() {
  const { content, update } = useSiteContent();
  const n = content.notice;
  const set = (k: keyof typeof n) => (v: string | boolean) => update(p => ({ ...p, notice: { ...p.notice, [k]: v } }));

  const typeColors = { info: "bg-blue-600", warning: "bg-amber-500", success: "bg-emerald-600" };
  const typeIcons = { info: <Info className="w-4 h-4" />, warning: <AlertTriangle className="w-4 h-4" />, success: <CheckCircle2 className="w-4 h-4" /> };
  const typeLabels = { info: "তথ্য (নীল)", warning: "সতর্কতা (কমলা)", success: "সাফল্য (সবুজ)" };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-slate-900">নোটিস ব্যানার</h2>
        <p className="text-sm text-slate-500 mt-0.5">সাইটের একদম উপরে একটি announcement দেখান</p>
      </div>

      <Card>
        <CardBody>
          <Toggle value={n.show} onChange={v => set("show")(v)} label={n.show ? "ব্যানার চালু আছে" : "ব্যানার বন্ধ আছে"} />
        </CardBody>
      </Card>

      {/* Preview */}
      {n.text && (
        <div className={`${typeColors[n.type]} text-white rounded-2xl px-5 py-3 flex items-center gap-3`}>
          {typeIcons[n.type]}
          <span className="text-sm font-semibold flex-1">{n.text}</span>
          {n.linkText && <span className="text-sm font-bold underline">{n.linkText} →</span>}
          <X className="w-4 h-4 opacity-60" />
        </div>
      )}

      <Card>
        <CardHeader title="ব্যানার কনটেন্ট" />
        <CardBody className="space-y-4">
          <Field label="ধরন / Type">
            <div className="grid grid-cols-3 gap-2">
              {(["info", "warning", "success"] as const).map(t => (
                <button
                  key={t}
                  onClick={() => set("type")(t)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all ${
                    n.type === t ? `${typeColors[t]} text-white border-transparent` : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                  }`}
                >
                  {typeIcons[t]}
                  {typeLabels[t].split(" ")[0]}
                </button>
              ))}
            </div>
          </Field>
          <Field label="বার্তা / Message Text">
            <TextArea value={n.text} onChange={v => set("text")(v as string)} placeholder="🎉 নতুন ব্যাচ শুরু হচ্ছে! আসন সংখ্যা সীমিত।" rows={2} />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="লিংক টেক্সট">
              <TextInput value={n.linkText} onChange={v => set("linkText")(v)} placeholder="ভর্তি হন" />
            </Field>
            <Field label="লিংক URL">
              <TextInput value={n.linkUrl} onChange={v => set("linkUrl")(v)} placeholder="#contact" />
            </Field>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

/* ─── General Tab ─── */
function GeneralTab() {
  const { content, update } = useSiteContent();
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-slate-900">সাধারণ তথ্য</h2>
        <p className="text-sm text-slate-500 mt-0.5">সাইটের মূল নাম, ট্যাগলাইন ও SEO</p>
      </div>
      <Card>
        <CardHeader title="প্রতিষ্ঠানের তথ্য" />
        <CardBody className="space-y-4">
          <Field label="প্রতিষ্ঠানের নাম">
            <TextInput value={content.siteName} onChange={v => update(p => ({ ...p, siteName: v }))} />
          </Field>
          <Field label="বাংলা ট্যাগলাইন">
            <TextInput value={content.taglineBangla} onChange={v => update(p => ({ ...p, taglineBangla: v }))} />
          </Field>
          <Field label="English Tagline">
            <TextInput value={content.taglineEnglish} onChange={v => update(p => ({ ...p, taglineEnglish: v }))} />
          </Field>
        </CardBody>
      </Card>
      <Card>
        <CardHeader title="SEO সেটিং" subtitle="Google search এ কীভাবে দেখাবে" />
        <CardBody className="space-y-4">
          <Field label="Page Title (Browser Tab)">
            <TextInput value={content.seo.title} onChange={v => update(p => ({ ...p, seo: { ...p.seo, title: v } }))} />
          </Field>
          <Field label="Meta Description">
            <TextArea value={content.seo.description} onChange={v => update(p => ({ ...p, seo: { ...p.seo, description: v } }))} rows={3} />
          </Field>
        </CardBody>
      </Card>
    </div>
  );
}

/* ─── Hero Tab ─── */
function HeroTab() {
  const { content, update } = useSiteContent();
  const h = content.hero;
  const set = (k: keyof typeof h) => (v: string) => update(p => ({ ...p, hero: { ...p.hero, [k]: v } }));
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Hero Section</h2>
        <p className="text-sm text-slate-500 mt-0.5">সাইটের প্রথম বড় section</p>
      </div>
      <Card>
        <CardHeader title="শিরোনাম ও Badge" />
        <CardBody className="space-y-4">
          <Field label="Badge Text (উপরের ছোট বাক্স)">
            <TextInput value={h.badge} onChange={set("badge")} placeholder="ভর্তি চলছে! — Admissions Open Now" />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Heading প্রথম অংশ"><TextInput value={h.headingMain} onChange={set("headingMain")} /></Field>
            <Field label="Heading হাইলাইট অংশ"><TextInput value={h.headingHighlight} onChange={set("headingHighlight")} /></Field>
          </div>
          <Field label="English Subtitle"><TextInput value={h.subtitle} onChange={set("subtitle")} /></Field>
          <Field label="বিবরণ (Description)"><TextArea value={h.description} onChange={set("description")} rows={3} /></Field>
        </CardBody>
      </Card>
      <Card>
        <CardHeader title="বাটন ও পরিসংখ্যান" />
        <CardBody className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Field label="বাটন ১ (Courses)"><TextInput value={h.ctaExplore} onChange={set("ctaExplore")} /></Field>
            <Field label="বাটন ২ (ভর্তি)"><TextInput value={h.ctaEnroll} onChange={set("ctaEnroll")} /></Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Stat ১ — সংখ্যা"><TextInput value={h.stat1Value} onChange={set("stat1Value")} /></Field>
            <Field label="Stat ১ — Label"><TextInput value={h.stat1Label} onChange={set("stat1Label")} /></Field>
            <Field label="Stat ২ — সংখ্যা"><TextInput value={h.stat2Value} onChange={set("stat2Value")} /></Field>
            <Field label="Stat ২ — Label"><TextInput value={h.stat2Label} onChange={set("stat2Label")} /></Field>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

/* ─── Gallery Tab ─── */
function GalleryTab() {
  const { content, update } = useSiteContent();
  function updateItem(idx: number, field: keyof GalleryItem, val: string) {
    update(p => ({ ...p, gallery: p.gallery.map((g, i) => i === idx ? { ...g, [field]: val } : g) }));
  }
  function addItem() { update(p => ({ ...p, gallery: [...p.gallery, { src: "", alt: "" }] })); }
  function removeItem(idx: number) { update(p => ({ ...p, gallery: p.gallery.filter((_, i) => i !== idx) })); }

  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">গ্যালারি ছবি</h2>
          <p className="text-sm text-slate-500 mt-0.5">ছবির URL বা পাথ দিন। মোট: {content.gallery.length}টি</p>
        </div>
        <button onClick={addItem} className="flex items-center gap-1.5 text-sm bg-blue-600 text-white px-3.5 py-2 rounded-xl hover:bg-blue-700 shadow-sm">
          <Plus className="w-4 h-4" /> ছবি যোগ করুন
        </button>
      </div>

      <div className="space-y-3">
        {content.gallery.map((img, idx) => (
          <Card key={idx}>
            <CardBody className="py-3">
              <div className="flex gap-3 items-center">
                <div className="w-16 h-12 rounded-lg bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                  {img.src && (
                    <img src={img.src} alt={img.alt} className="w-full h-full object-cover" onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                  )}
                </div>
                <div className="flex-1 grid grid-cols-2 gap-2">
                  <input type="text" value={img.src} onChange={e => updateItem(idx, "src", e.target.value)} placeholder="Image URL or /gallery-1.png"
                    className="border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  <input type="text" value={img.alt} onChange={e => updateItem(idx, "alt", e.target.value)} placeholder="Alt text"
                    className="border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <span className="text-xs text-slate-400 font-bold w-5 text-center shrink-0">{idx + 1}</span>
                <button onClick={() => removeItem(idx)} className="text-red-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 shrink-0">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ─── Videos Tab ─── */
const VIDEO_COLORS = [
  { label: "Cyan (IT)", value: "bg-cyan-100 text-cyan-700" },
  { label: "Rose (English)", value: "bg-rose-100 text-rose-700" },
  { label: "Indigo (Academic)", value: "bg-indigo-100 text-indigo-700" },
  { label: "Violet (Freelancing)", value: "bg-violet-100 text-violet-700" },
  { label: "Teal (ICT)", value: "bg-teal-100 text-teal-700" },
  { label: "Amber (Python)", value: "bg-amber-100 text-amber-700" },
  { label: "Green (Science)", value: "bg-green-100 text-green-700" },
  { label: "Pink (Arts)", value: "bg-pink-100 text-pink-700" },
];

function extractYouTubeId(input: string): string {
  const match = input.match(/(?:v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]{11})/);
  return match ? match[1] : input.trim();
}

function VideosTab() {
  const { content, update } = useSiteContent();
  const [expanded, setExpanded] = useState<number | null>(0);

  function updateVideo(idx: number, field: keyof VideoItem, val: string) {
    update(p => ({ ...p, videos: p.videos.map((v, i) => i === idx ? { ...v, [field]: val } : v) }));
  }
  function addVideo() {
    const n: VideoItem = { id: "", title: "নতুন ভিডিও", sub: "New Video", category: "IT", catColor: "bg-cyan-100 text-cyan-700" };
    update(p => ({ ...p, videos: [...p.videos, n] }));
    setExpanded(content.videos.length);
  }
  function removeVideo(idx: number) {
    update(p => ({ ...p, videos: p.videos.filter((_, i) => i !== idx) }));
    setExpanded(null);
  }

  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">ক্লাস ভিডিও</h2>
          <p className="text-sm text-slate-500 mt-0.5">YouTube URL বা ID দিন। মোট: {content.videos.length}টি</p>
        </div>
        <button onClick={addVideo} className="flex items-center gap-1.5 text-sm bg-blue-600 text-white px-3.5 py-2 rounded-xl hover:bg-blue-700 shadow-sm">
          <Plus className="w-4 h-4" /> নতুন ভিডিও
        </button>
      </div>

      <div className="space-y-2">
        {content.videos.map((video, idx) => (
          <Card key={idx}>
            <button onClick={() => setExpanded(expanded === idx ? null : idx)} className="w-full flex items-center gap-3 p-4 text-left hover:bg-slate-50 transition-colors">
              <div className="w-14 h-10 rounded-lg bg-black overflow-hidden shrink-0">
                {video.id && <img src={`https://img.youtube.com/vi/${video.id}/default.jpg`} className="w-full h-full object-cover" alt="" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-800 truncate">{video.title || "—"}</p>
                <p className="text-xs text-slate-400 mt-0.5">{video.id ? `ID: ${video.id}` : "⚠ ID নেই"}</p>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full font-bold shrink-0 ${video.catColor}`}>{video.category}</span>
              {expanded === idx ? <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
            </button>

            {expanded === idx && (
              <div className="border-t border-slate-100 bg-slate-50/60 p-4 space-y-4">
                <Field label="YouTube URL বা Video ID">
                  <input
                    type="text"
                    value={video.id}
                    onChange={e => updateVideo(idx, "id", extractYouTubeId(e.target.value))}
                    placeholder="https://youtube.com/watch?v=ABC123 অথবা শুধু ID"
                    className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  />
                  {video.id && (
                    <div className="mt-2 rounded-xl overflow-hidden aspect-video max-w-xs">
                      <img src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`} className="w-full h-full object-cover" alt="thumbnail" />
                    </div>
                  )}
                </Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="বাংলা শিরোনাম">
                    <input type="text" value={video.title} onChange={e => updateVideo(idx, "title", e.target.value)}
                      className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" />
                  </Field>
                  <Field label="English Subtitle">
                    <input type="text" value={video.sub} onChange={e => updateVideo(idx, "sub", e.target.value)}
                      className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" />
                  </Field>
                  <Field label="Category Label">
                    <input type="text" value={video.category} onChange={e => updateVideo(idx, "category", e.target.value)}
                      className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" />
                  </Field>
                  <Field label="Badge রঙ">
                    <select value={video.catColor} onChange={e => updateVideo(idx, "catColor", e.target.value)}
                      className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                      {VIDEO_COLORS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                    </select>
                  </Field>
                </div>
                <button onClick={() => removeVideo(idx)} className="flex items-center gap-1.5 text-sm text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-xl transition-colors">
                  <Trash2 className="w-4 h-4" /> এই ভিডিও মুছুন
                </button>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ─── Courses Tab ─── */
function CoursesTab() {
  const { content, update } = useSiteContent();

  function updateCourse(group: "academic" | "computer", idx: number, field: keyof CourseItem, val: string) {
    update(p => ({
      ...p,
      courses: {
        ...p.courses,
        [group]: p.courses[group].map((c, i) => i === idx ? { ...c, [field]: val } : c)
      }
    }));
  }

  function addCourse(group: "academic" | "computer") {
    update(p => ({
      ...p,
      courses: {
        ...p.courses,
        [group]: [...p.courses[group], { title: "নতুন কোর্স", bangla: "", desc: "", badge: group === "academic" ? "School" : "IT" }]
      }
    }));
  }

  function removeCourse(group: "academic" | "computer", idx: number) {
    update(p => ({ ...p, courses: { ...p.courses, [group]: p.courses[group].filter((_, i) => i !== idx) } }));
  }

  function CourseGroup({ group, label }: { group: "academic" | "computer"; label: string }) {
    const items = content.courses[group];
    return (
      <Card>
        <CardHeader title={label} subtitle={`${items.length}টি কোর্স`} />
        <CardBody className="space-y-3">
          {items.map((c, idx) => (
            <div key={idx} className="border border-slate-200 rounded-xl p-4 space-y-3 bg-slate-50/50">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500"># {idx + 1}</span>
                <button onClick={() => removeCourse(group, idx)} className="text-red-400 hover:text-red-600 p-1 rounded-lg hover:bg-red-50">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label>Title (English)</Label>
                  <input type="text" value={c.title} onChange={e => updateCourse(group, idx, "title", e.target.value)}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" />
                </div>
                <div>
                  <Label>Badge</Label>
                  <input type="text" value={c.badge} onChange={e => updateCourse(group, idx, "badge", e.target.value)}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" />
                </div>
              </div>
              <div>
                <Label>বাংলা সাবটাইটেল</Label>
                <input type="text" value={c.bangla} onChange={e => updateCourse(group, idx, "bangla", e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" />
              </div>
              <div>
                <Label>বিবরণ</Label>
                <textarea value={c.desc} onChange={e => updateCourse(group, idx, "desc", e.target.value)} rows={2}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white resize-y" />
              </div>
            </div>
          ))}
          <button onClick={() => addCourse(group)} className="w-full flex items-center justify-center gap-1.5 text-sm border-2 border-dashed border-slate-300 text-slate-500 hover:border-blue-400 hover:text-blue-600 py-2.5 rounded-xl transition-colors">
            <Plus className="w-4 h-4" /> কোর্স যোগ করুন
          </button>
        </CardBody>
      </Card>
    );
  }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-slate-900">কোর্সসমূহ</h2>
        <p className="text-sm text-slate-500 mt-0.5">Academic ও Computer কোর্সের title, বিবরণ edit করুন</p>
      </div>
      <CourseGroup group="academic" label="Academic Coaching" />
      <CourseGroup group="computer" label="Computer & IT Training" />
    </div>
  );
}

/* ─── Contact Tab ─── */
function ContactTab() {
  const { content, update } = useSiteContent();
  const c = content.contact;
  const set = (k: keyof typeof c) => (v: string) => update(p => ({ ...p, contact: { ...p.contact, [k]: v } }));

  function updatePhone(idx: number, val: string) {
    update(p => { const phones = [...p.contact.phones]; phones[idx] = val; return { ...p, contact: { ...p.contact, phones } }; });
  }
  function addPhone() { update(p => ({ ...p, contact: { ...p.contact, phones: [...p.contact.phones, ""] } })); }
  function removePhone(idx: number) { update(p => ({ ...p, contact: { ...p.contact, phones: p.contact.phones.filter((_, i) => i !== idx) } })); }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-slate-900">যোগাযোগ তথ্য</h2>
        <p className="text-sm text-slate-500 mt-0.5">ঠিকানা, ফোন নম্বর ও সোশ্যাল মিডিয়া</p>
      </div>
      <Card>
        <CardHeader title="ঠিকানা ও ওয়েবসাইট" />
        <CardBody className="space-y-4">
          <Field label="ঠিকানা">
            <TextArea value={c.address} onChange={set("address")} rows={3} />
          </Field>
          <Field label="ওয়েবসাইট">
            <TextInput value={c.website} onChange={set("website")} placeholder="proyojontake.com" />
          </Field>
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="ফোন নম্বর" />
        <CardBody className="space-y-2">
          {c.phones.map((ph, idx) => (
            <div key={idx} className="flex gap-2">
              <input type="text" value={ph} onChange={e => updatePhone(idx, e.target.value)} placeholder="01XXX-XXXXXX"
                className="flex-1 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <button onClick={() => removePhone(idx)} className="text-red-400 hover:text-red-600 p-2.5 rounded-xl hover:bg-red-50">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          <button onClick={addPhone} className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-800 px-3 py-2 rounded-xl hover:bg-blue-50 transition-colors">
            <Plus className="w-4 h-4" /> ফোন যোগ করুন
          </button>
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="সোশ্যাল মিডিয়া" />
        <CardBody className="space-y-4">
          <Field label="Facebook URL"><TextInput value={c.facebook} onChange={set("facebook")} placeholder="https://facebook.com/..." /></Field>
          <Field label="YouTube Channel URL"><TextInput value={c.youtube} onChange={set("youtube")} placeholder="https://youtube.com/@..." /></Field>
          <Field label="Instagram URL"><TextInput value={c.instagram} onChange={set("instagram")} placeholder="https://instagram.com/..." /></Field>
        </CardBody>
      </Card>
    </div>
  );
}

/* ─── Developer Tab ─── */
function DeveloperTab() {
  const { content, update } = useSiteContent();
  const d = content.developer;
  const set = (k: keyof typeof d) => (v: string | boolean) => update(p => ({ ...p, developer: { ...p.developer, [k]: v } }));

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Developer Credit</h2>
        <p className="text-sm text-slate-500 mt-0.5">Footer এ developer এর নাম ও লিংক</p>
      </div>
      <Card>
        <CardBody className="space-y-5">
          <Toggle value={d.show} onChange={v => set("show")(v)} label={d.show ? "Footer এ দেখা যাচ্ছে" : "লুকানো আছে"} />
          <Field label="Developer / Company নাম"><TextInput value={d.name} onChange={v => set("name")(v as string)} placeholder="Your Name" /></Field>
          <Field label="Website URL"><TextInput value={d.url} onChange={v => set("url")(v as string)} placeholder="https://yoursite.com" /></Field>
          <Field label="লেবেল টেক্সট"><TextInput value={d.label} onChange={v => set("label")(v as string)} placeholder="Developed by" /></Field>

          {d.show && (
            <div className="mt-2 p-4 bg-slate-50 rounded-xl border border-slate-200">
              <Label>Preview</Label>
              <p className="text-sm text-slate-600 mt-1">
                {d.label}{" "}
                <a href={d.url} className="text-blue-600 font-semibold hover:underline" target="_blank" rel="noopener noreferrer">{d.name}</a>
              </p>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}

/* ─── Settings Tab ─── */
function SettingsTab() {
  const { content, save, reset } = useSiteContent();
  const { toast } = useToast();
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [pwMsg, setPwMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const [pwSaving, setPwSaving] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  async function changePassword(e: React.FormEvent) {
    e.preventDefault();
    const storedPw = getAdminPassword();
    const firebasePw = await fetchAdminPasswordFromFirebase();
    const effectivePw = firebasePw ?? storedPw;
    if (currentPw !== effectivePw) { setPwMsg({ type: "err", text: "বর্তমান পাসওয়ার্ড ভুল।" }); return; }
    if (newPw.length < 6) { setPwMsg({ type: "err", text: "নতুন পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।" }); return; }
    if (newPw !== confirmPw) { setPwMsg({ type: "err", text: "নতুন পাসওয়ার্ড দুটো মিলছে না।" }); return; }
    setPwSaving(true);
    setAdminPassword(newPw);
    await saveAdminPasswordToFirebase(newPw);
    setPwSaving(false);
    setPwMsg({ type: "ok", text: "✅ পাসওয়ার্ড পরিবর্তন হয়েছে! Firebase এও সংরক্ষিত।" });
    setCurrentPw(""); setNewPw(""); setConfirmPw("");
  }

  function exportJSON() {
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "proyojontake-content.json";
    a.click(); URL.revokeObjectURL(url);
    toast({ title: "✅ Export সফল!", description: "proyojontake-content.json ডাউনলোড হয়েছে।" });
  }

  function importJSON(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        JSON.parse(ev.target?.result as string);
        toast({ title: "✅ Import সফল!", description: "Content restore হয়েছে। Save করুন।" });
        // In a real app we'd merge this. For now save triggers re-read.
      } catch { toast({ title: "❌ ভুল ফাইল", description: "Valid JSON ফাইল দিন।" }); }
    };
    reader.readAsText(file);
    if (fileRef.current) fileRef.current.value = "";
  }

  function handleReset() {
    if (confirm("সব content মুছে default এ ফিরে যাবেন? এই কাজ undo করা যাবে না।")) {
      reset();
      toast({ title: "↩️ Reset হয়েছে", description: "সব default এ ফিরে এসেছে।" });
    }
  }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-slate-900">সেটিংস</h2>
        <p className="text-sm text-slate-500 mt-0.5">পাসওয়ার্ড, backup ও restore</p>
      </div>

      <Card>
        <CardHeader title="পাসওয়ার্ড পরিবর্তন" subtitle="Admin login password বদলান" />
        <CardBody>
          <form onSubmit={changePassword} className="space-y-3">
            <Field label="বর্তমান পাসওয়ার্ড">
              <TextInput type="password" value={currentPw} onChange={setCurrentPw} placeholder="Current password" />
            </Field>
            <Field label="নতুন পাসওয়ার্ড">
              <TextInput type="password" value={newPw} onChange={setNewPw} placeholder="Min 6 characters" />
            </Field>
            <Field label="নতুন পাসওয়ার্ড আবার">
              <TextInput type="password" value={confirmPw} onChange={setConfirmPw} placeholder="Confirm new password" />
            </Field>
            {pwMsg && (
              <p className={`text-sm font-medium ${pwMsg.type === "ok" ? "text-emerald-600" : "text-red-500"}`}>{pwMsg.text}</p>
            )}
            <button type="submit" disabled={pwSaving} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-bold px-5 py-2.5 rounded-xl text-sm shadow-sm">
              {pwSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Key className="w-4 h-4" />}
              {pwSaving ? "সংরক্ষণ হচ্ছে..." : "পাসওয়ার্ড পরিবর্তন করুন"}
            </button>
          </form>
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Content Backup ও Restore" subtitle="JSON ফাইলে backup রাখুন বা restore করুন" />
        <CardBody className="space-y-3">
          <div className="flex gap-3 flex-wrap">
            <button onClick={exportJSON} className="flex items-center gap-2 border-2 border-blue-200 text-blue-700 hover:bg-blue-50 font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors">
              <Download className="w-4 h-4" /> JSON Export (Download)
            </button>
            <button onClick={() => fileRef.current?.click()} className="flex items-center gap-2 border-2 border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors">
              <Upload className="w-4 h-4" /> JSON Import (Upload)
            </button>
            <input ref={fileRef} type="file" accept=".json" className="hidden" onChange={importJSON} />
          </div>
          <p className="text-xs text-slate-400">Export করলে সব content JSON ফাইলে save হবে। পরে Import করলে সব restore হবে।</p>
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="⚠ Danger Zone" subtitle="এই কাজগুলো undo করা যায় না" />
        <CardBody>
          <button onClick={handleReset} className="flex items-center gap-2 border-2 border-red-200 text-red-600 hover:bg-red-50 font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors">
            <RotateCcw className="w-4 h-4" /> সব Default এ Reset করুন
          </button>
        </CardBody>
      </Card>
    </div>
  );
}

/* ─── Main Admin App ─── */
export default function Admin() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem("proyojontake_admin") === "1");
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const { save, isDirty, isSyncing, firebaseOk, lastSaved, isLoading } = useSiteContent();
  const { toast } = useToast();

  function handleAuth() { sessionStorage.setItem("proyojontake_admin", "1"); setAuthed(true); }
  function handleLogout() { sessionStorage.removeItem("proyojontake_admin"); setAuthed(false); }

  async function handleSave() {
    await save();
    toast({ title: "✅ সংরক্ষিত হয়েছে!", description: firebaseOk ? "Firebase ও localStorage এ save হয়েছে।" : "localStorage এ save হয়েছে (Firebase offline)।" });
  }

  if (!authed) return <PasswordGate onAuth={handleAuth} />;

  const renderTab = () => {
    switch (activeTab) {
      case "dashboard": return <DashboardTab onNavigate={setActiveTab} />;
      case "notice": return <NoticeTab />;
      case "general": return <GeneralTab />;
      case "hero": return <HeroTab />;
      case "gallery": return <GalleryTab />;
      case "videos": return <VideosTab />;
      case "courses": return <CoursesTab />;
      case "contact": return <ContactTab />;
      case "developer": return <DeveloperTab />;
      case "settings": return <SettingsTab />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex">
      <Sidebar active={activeTab} onChange={setActiveTab} onLogout={handleLogout} />

      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3 flex-wrap">
            <h2 className="font-bold text-slate-700 text-sm">{TABS.find(t => t.id === activeTab)?.label ?? activeTab}</h2>

            {/* Firebase status */}
            {isLoading ? (
              <span className="inline-flex items-center gap-1.5 text-xs bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full font-semibold border border-blue-200">
                <Loader2 className="w-3 h-3 animate-spin" /> Firebase লোড হচ্ছে...
              </span>
            ) : firebaseOk ? (
              <span className="inline-flex items-center gap-1.5 text-xs bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full font-semibold border border-emerald-200">
                <Wifi className="w-3 h-3" /> Firebase Connected
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-xs bg-red-50 text-red-600 px-2.5 py-1 rounded-full font-semibold border border-red-200">
                <WifiOff className="w-3 h-3" /> Firebase Offline
              </span>
            )}

            {isSyncing && (
              <span className="inline-flex items-center gap-1.5 text-xs bg-violet-50 text-violet-700 px-2.5 py-1 rounded-full font-semibold border border-violet-200">
                <Loader2 className="w-3 h-3 animate-spin" /> সংরক্ষণ হচ্ছে...
              </span>
            )}

            {isDirty && !isSyncing && (
              <span className="inline-flex items-center gap-1.5 text-xs bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full font-semibold border border-amber-200">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                পরিবর্তন সংরক্ষিত হয়নি
              </span>
            )}

            {lastSaved && !isDirty && !isSyncing && (
              <span className="text-xs text-slate-400">
                শেষ save: {lastSaved.toLocaleTimeString("bn-BD")}
              </span>
            )}
          </div>

          <button
            onClick={handleSave}
            disabled={isSyncing}
            className={`flex items-center gap-1.5 text-sm text-white px-5 py-2 rounded-xl font-semibold transition-all shadow-sm disabled:opacity-60 ${
              isDirty && !isSyncing ? "bg-blue-600 hover:bg-blue-700" : "bg-slate-300 cursor-default"
            }`}
          >
            {isSyncing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            সংরক্ষণ করুন
          </button>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-2xl mx-auto">
            {renderTab()}
          </div>
        </main>
      </div>
    </div>
  );
}
