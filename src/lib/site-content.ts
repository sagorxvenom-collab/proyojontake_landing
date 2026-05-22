export interface VideoItem {
  id: string;
  title: string;
  sub: string;
  category: string;
  catColor: string;
}

export interface GalleryItem {
  src: string;
  alt: string;
}

export interface CourseItem {
  title: string;
  bangla: string;
  desc: string;
  badge: string;
}

export interface SiteContent {
  siteName: string;
  taglineBangla: string;
  taglineEnglish: string;

  seo: {
    title: string;
    description: string;
  };

  notice: {
    show: boolean;
    type: "info" | "warning" | "success";
    text: string;
    linkText: string;
    linkUrl: string;
  };

  hero: {
    badge: string;
    headingMain: string;
    headingHighlight: string;
    subtitle: string;
    description: string;
    ctaEnroll: string;
    ctaExplore: string;
    stat1Label: string;
    stat1Value: string;
    stat2Label: string;
    stat2Value: string;
  };

  gallery: GalleryItem[];

  videos: VideoItem[];

  courses: {
    academic: CourseItem[];
    computer: CourseItem[];
  };

  contact: {
    address: string;
    phones: string[];
    website: string;
    facebook: string;
    youtube: string;
    instagram: string;
  };

  developer: {
    show: boolean;
    name: string;
    url: string;
    label: string;
  };
}

export const defaultContent: SiteContent = {
  siteName: "প্রয়োজনটেক কোচিং",
  taglineBangla: "মানসম্মত শিক্ষা, সুন্দর ভবিষ্যতের অঙ্গীকার",
  taglineEnglish: "Proyojontake Coaching — For Your Every Need",

  seo: {
    title: "প্রয়োজনটেক কোচিং | Proyojontake Coaching — Bogura",
    description:
      "প্রয়োজনটেক কোচিং — বগুড়ার সেরা স্কুল ও কম্পিউটার প্রশিক্ষণ কেন্দ্র। Class 3 থেকে HSC, Computer, Spoken English, Freelancing, Studio, Printing ও Mobile Servicing।",
  },

  notice: {
    show: false,
    type: "info",
    text: "🎉 নতুন ব্যাচ শুরু হচ্ছে! আসন সংখ্যা সীমিত — এখনই ভর্তি হন।",
    linkText: "ভর্তি হন",
    linkUrl: "#contact",
  },

  hero: {
    badge: "ভর্তি চলছে! — Admissions Open Now",
    headingMain: "প্রয়োজনটেক",
    headingHighlight: "কোচিং",
    subtitle: "Proyojontake Coaching",
    description:
      "A trusted multi-service school and computer training center in Bogura. From Class 3 students to adults learning computer skills — we have the right program for every need.",
    ctaEnroll: "ভর্তি হতে আগ্রহী?",
    ctaExplore: "Explore Courses",
    stat1Label: "Programs Offered",
    stat1Value: "8+",
    stat2Label: "Daily Shifts",
    stat2Value: "3",
  },

  gallery: [
    { src: "/gallery-1.png", alt: "Welcoming entrance of training center" },
    { src: "/gallery-2.png", alt: "Modern computer lab" },
    { src: "/gallery-3.png", alt: "Teacher helping student" },
    { src: "/gallery-4.png", alt: "Graphic design student" },
    { src: "/gallery-5.png", alt: "Adult professionals training" },
    { src: "/gallery-6.png", alt: "Peaceful library study area" },
    { src: "/gallery-7.png", alt: "Students collaborating" },
    { src: "/gallery-8.png", alt: "Academic tutoring class" },
    { src: "/gallery-9.png", alt: "Students receiving certificates" },
    { src: "/gallery-10.png", alt: "Vibrant school hallway" },
  ],

  videos: [
    { id: "dQw4w9WgXcQ", title: "কম্পিউটার বেসিক ক্লাস — পরিচিতি", sub: "Computer Basic Class", category: "IT", catColor: "bg-cyan-100 text-cyan-700" },
    { id: "dQw4w9WgXcQ", title: "Spoken English — Group A ক্লাস", sub: "Spoken English Lesson", category: "English", catColor: "bg-rose-100 text-rose-700" },
    { id: "dQw4w9WgXcQ", title: "গণিত — ক্লাস ৯–১০ বিশেষ ক্লাস", sub: "Class 9-10 Math", category: "Academic", catColor: "bg-indigo-100 text-indigo-700" },
    { id: "dQw4w9WgXcQ", title: "Freelancing — কিভাবে শুরু করবেন", sub: "Freelancing Basics", category: "IT", catColor: "bg-violet-100 text-violet-700" },
    { id: "dQw4w9WgXcQ", title: "ICT — HSC পরীক্ষার প্রস্তুতি", sub: "HSC ICT Preparation", category: "Academic", catColor: "bg-teal-100 text-teal-700" },
    { id: "dQw4w9WgXcQ", title: "Python প্রোগ্রামিং — প্রথম পাঠ", sub: "Python Programming", category: "IT", catColor: "bg-amber-100 text-amber-700" },
  ],

  courses: {
    academic: [
      { title: "Class 3–8", bangla: "অল সাবজেক্ট", desc: "Complete academic support for all subjects — Bangla, English, Math, Science and more.", badge: "School" },
      { title: "Class 9–HSC", bangla: "সাবজেক্ট ভিত্তিক", desc: "Subject-specific coaching: গণিত, ইংরেজি, পদার্থবিজ্ঞান, রসায়ন, হিসাব বিজ্ঞান, জীববিজ্ঞান, ICT, বাংলা।", badge: "School" },
      { title: "Spoken English — Group A", bangla: "Class Play–Five (Sat, Mon & Wed)", desc: "Daily conversation, grammar, pronunciation, listening & speaking, public speaking.", badge: "English" },
      { title: "Spoken English — Group B", bangla: "Class Six–Above (Sun, Tue & Thu)", desc: "Advanced spoken English for Class 6 and above — pronunciation, grammar in use.", badge: "English" },
    ],
    computer: [
      { title: "Computer Basic & Office", bangla: "কম্পিউটার বেসিক এন্ড অফিস এপ্লিকেশন", desc: "Essential computer skills, MS Word, Excel, PowerPoint, and office productivity tools.", badge: "IT" },
      { title: "Freelancing & Programming", bangla: "ফ্রিল্যান্সিং ও প্রোগ্রামিং", desc: "Python, Java, C#, Node.js, TypeScript — build real-world projects and kickstart a freelancing career.", badge: "IT" },
      { title: "ICT", bangla: "তথ্য ও যোগাযোগ প্রযুক্তি", desc: "Full ICT curriculum covering computer fundamentals, networking, and digital communications.", badge: "IT" },
      { title: "English Language", bangla: "ইংরেজি ভাষা", desc: "Reading, writing, comprehension, and grammar — build solid English foundations.", badge: "Language" },
    ],
  },

  contact: {
    address: "বি-রক, উল্লাস প্লাজা,\nশাজাহানপুর, বগুড়া\n(ট্রাস্ট ব্যাংকের নীচে)",
    phones: ["01719-326058", "01790-995721", "01580-880691"],
    website: "proyojontake.com",
    facebook: "https://facebook.com/proyojontake",
    youtube: "https://www.youtube.com/@proyojontake",
    instagram: "#",
  },

  developer: {
    show: true,
    name: "Replit Agent",
    url: "https://replit.com",
    label: "Developed with",
  },
};

const STORAGE_KEY = "proyojontake_content_v2";
export const ADMIN_PW_KEY = "proyojontake_admin_pw_v1";
export const DEFAULT_ADMIN_PW = "proyojontake2024";

export function getAdminPassword(): string {
  return localStorage.getItem(ADMIN_PW_KEY) ?? DEFAULT_ADMIN_PW;
}

export function setAdminPassword(pw: string): void {
  localStorage.setItem(ADMIN_PW_KEY, pw);
}

export function loadContent(): SiteContent {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultContent;
    const parsed = JSON.parse(raw) as Partial<SiteContent>;
    return deepMerge(defaultContent, parsed) as SiteContent;
  } catch {
    return defaultContent;
  }
}

export function saveContent(content: SiteContent): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
}

export function resetContent(): SiteContent {
  localStorage.removeItem(STORAGE_KEY);
  return defaultContent;
}

function deepMerge(base: unknown, override: unknown): unknown {
  if (Array.isArray(override)) return override;
  if (
    typeof base === "object" && base !== null &&
    typeof override === "object" && override !== null &&
    !Array.isArray(base)
  ) {
    const result = { ...(base as Record<string, unknown>) };
    for (const key of Object.keys(override as Record<string, unknown>)) {
      const k = key as string;
      result[k] = deepMerge(
        (base as Record<string, unknown>)[k],
        (override as Record<string, unknown>)[k]
      );
    }
    return result;
  }
  return override !== undefined ? override : base;
}
