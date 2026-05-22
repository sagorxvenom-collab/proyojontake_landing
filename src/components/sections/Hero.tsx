import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, GraduationCap, Users, MonitorPlay } from "lucide-react";
import { useSiteContent } from "@/context/SiteContentContext";

export function Hero() {
  const { content } = useSiteContent();
  const h = content.hero;

  return (
    <section className="relative flex items-center pt-16 pb-8 md:pt-20 md:pb-12 overflow-hidden bg-background">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-2xl"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/15 text-secondary font-bold text-xs mb-4 border border-secondary/25 animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
              {h.badge}
            </div>

            {/* Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-3">
              {h.headingMain}{" "}
              <span className="text-primary relative inline-block">
                {h.headingHighlight}
                <svg className="absolute w-full h-2.5 -bottom-0.5 left-0 text-secondary" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="transparent" />
                </svg>
              </span>
            </h1>

            <h2 className="text-base md:text-lg font-bold text-primary mb-1">{h.subtitle}</h2>

            <h3 className="text-base md:text-lg font-bangla text-muted-foreground mb-4 leading-relaxed">
              {content.taglineBangla}
            </h3>

            <p className="text-sm md:text-base text-muted-foreground mb-6 leading-relaxed max-w-xl">
              {h.description}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="default" className="bg-primary text-white hover:bg-primary/90 shadow-md text-sm h-11 px-6 font-bold" asChild>
                <a href="#courses">
                  {h.ctaExplore}
                  <ArrowRight className="ml-1.5 w-4 h-4" />
                </a>
              </Button>
              <Button size="default" variant="outline" className="h-11 px-6 text-sm border-secondary/40 hover:bg-secondary/10 text-secondary font-semibold" asChild>
                <a href="#contact">{h.ctaEnroll}</a>
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-6 grid grid-cols-3 gap-3 md:gap-6 pt-5 border-t border-border/50">
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-1.5 text-primary font-bold text-xl md:text-2xl">
                  <GraduationCap className="w-5 h-5 text-secondary" />
                  <span>{h.stat1Value}</span>
                </div>
                <span className="text-xs text-muted-foreground font-medium">{h.stat1Label}</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-1.5 text-primary font-bold text-xl md:text-2xl">
                  <Users className="w-5 h-5 text-secondary" />
                  <span>{h.stat2Value}</span>
                </div>
                <span className="text-xs text-muted-foreground font-medium">{h.stat2Label}</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-1.5 text-primary font-bold text-xl md:text-2xl">
                  <MonitorPlay className="w-5 h-5 text-secondary" />
                  <span>সীমিত</span>
                </div>
                <span className="text-xs text-muted-foreground font-medium">Limited Seats</span>
              </div>
            </div>
          </motion.div>

          {/* Right image — desktop only */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="relative hidden lg:block"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
              <img
                src="/gallery-3.png"
                alt="Teacher helping student at Proyojontake"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/95 backdrop-blur rounded-2xl p-4 shadow-lg">
                  <p className="font-bangla text-base font-bold text-primary mb-0.5">
                    "আমাদের প্রয়োজনটেক, আপনাদের সমাধান"
                  </p>
                  <p className="text-xs text-muted-foreground">{content.taglineEnglish}</p>
                </div>
              </div>
            </div>

            <div className="absolute -right-4 top-1/4 w-20 h-40 flex flex-wrap gap-1.5 justify-center -z-10 opacity-25">
              {[...Array(24)].map((_, i) => (
                <div key={i} className="w-2 h-2 rounded-full bg-primary" />
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
