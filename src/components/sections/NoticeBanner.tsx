import { useState } from "react";
import { X, ArrowRight, Sparkles, AlertTriangle, CheckCircle2 } from "lucide-react";
import { useSiteContent } from "@/context/SiteContentContext";

const CONFIG = {
  info: {
    gradient: "from-blue-600 via-indigo-600 to-blue-700",
    shimmer: "from-transparent via-white/15 to-transparent",
    icon: <Sparkles className="w-4 h-4 shrink-0 animate-pulse" />,
    dot: "bg-sky-300",
    linkClass: "bg-white/20 hover:bg-white/30 text-white",
  },
  warning: {
    gradient: "from-amber-500 via-orange-500 to-amber-600",
    shimmer: "from-transparent via-white/15 to-transparent",
    icon: <AlertTriangle className="w-4 h-4 shrink-0 animate-pulse" />,
    dot: "bg-yellow-200",
    linkClass: "bg-white/20 hover:bg-white/30 text-white",
  },
  success: {
    gradient: "from-emerald-500 via-teal-500 to-emerald-600",
    shimmer: "from-transparent via-white/15 to-transparent",
    icon: <CheckCircle2 className="w-4 h-4 shrink-0 animate-pulse" />,
    dot: "bg-green-200",
    linkClass: "bg-white/20 hover:bg-white/30 text-white",
  },
};

export function NoticeBanner() {
  const { content } = useSiteContent();
  const { notice } = content;
  const [dismissed, setDismissed] = useState(false);

  if (!notice.show || dismissed) return null;

  const cfg = CONFIG[notice.type];

  return (
    <div className={`relative overflow-hidden bg-gradient-to-r ${cfg.gradient} z-50 select-none`}>
      {/* Shimmer sweep */}
      <div
        className={`absolute inset-0 bg-gradient-to-r ${cfg.shimmer} -translate-x-full`}
        style={{ animation: "shimmer 2.8s ease-in-out infinite" }}
      />

      <div className="relative container mx-auto px-3 md:px-6 py-2 flex items-center gap-3">
        {/* Pulsing dot + icon */}
        <div className="shrink-0 flex items-center gap-1.5">
          <span className={`w-2 h-2 rounded-full ${cfg.dot} animate-ping absolute`} />
          <span className={`w-2 h-2 rounded-full ${cfg.dot} relative`} />
        </div>

        {cfg.icon}

        {/* Text — truncate on mobile */}
        <p className="text-sm font-semibold text-white flex-1 min-w-0 truncate md:whitespace-normal font-bangla">
          {notice.text}
        </p>

        {/* CTA link pill */}
        {notice.linkText && notice.linkUrl && (
          <a
            href={notice.linkUrl}
            className={`shrink-0 inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full transition-all ${cfg.linkClass} border border-white/20`}
          >
            {notice.linkText}
            <ArrowRight className="w-3 h-3" />
          </a>
        )}

        {/* Close */}
        <button
          onClick={() => setDismissed(true)}
          className="shrink-0 p-1 rounded-full hover:bg-white/20 transition-colors text-white/80 hover:text-white ml-1"
          aria-label="বন্ধ করুন"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <style>{`
        @keyframes shimmer {
          0%   { transform: translateX(-100%); }
          60%  { transform: translateX(250%); }
          100% { transform: translateX(250%); }
        }
      `}</style>
    </div>
  );
}
