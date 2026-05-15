import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, GraduationCap, Users, MonitorPlay } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-background">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/20 text-secondary font-bold text-sm mb-6 border border-secondary/30 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-secondary" />
              ভর্তি চলছে! — Admissions Open Now
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-4">
              প্রয়োজনটেক{" "}
              <span className="text-primary relative inline-block">
                কোচিং
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-secondary" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="transparent" />
                </svg>
              </span>
            </h1>

            <h2 className="text-xl md:text-2xl font-bold text-primary mb-2">
              Proyojontake Coaching
            </h2>
            
            <h3 className="text-2xl md:text-3xl font-bangla text-muted-foreground mb-6 leading-relaxed">
              মানসম্মত শিক্ষা, সুন্দর ভবিষ্যতের অঙ্গীকার
            </h3>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-xl">
              A trusted multi-service school and computer training center in Bogura. From Class 3 students to adults learning computer skills — we have the right program for every need.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-primary text-white hover:bg-primary/90 shadow-md text-base h-14 px-8" asChild>
                <a href="#courses">
                  Explore Courses
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-base border-secondary/40 hover:bg-secondary/10 text-secondary font-semibold" asChild>
                <a href="#contact">
                  ভর্তি হতে আগ্রহী?
                </a>
              </Button>
            </div>
            
            <div className="mt-12 grid grid-cols-3 gap-6 pt-8 border-t border-border/50">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-primary font-bold text-2xl">
                  <GraduationCap className="w-6 h-6 text-secondary" />
                  <span>8+</span>
                </div>
                <span className="text-sm text-muted-foreground font-medium">Programs Offered</span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-primary font-bold text-2xl">
                  <Users className="w-6 h-6 text-secondary" />
                  <span>3</span>
                </div>
                <span className="text-sm text-muted-foreground font-medium">Daily Shifts</span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-primary font-bold text-2xl">
                  <MonitorPlay className="w-6 h-6 text-secondary" />
                  <span>আসন সীমিত</span>
                </div>
                <span className="text-sm text-muted-foreground font-medium">Limited Seats</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative hidden lg:block"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
              <img 
                src="/gallery-3.png" 
                alt="Teacher helping student at Proyojontake" 
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <div className="bg-white/95 backdrop-blur rounded-2xl p-6 shadow-lg">
                  <p className="font-bangla text-lg font-bold text-primary mb-1">
                    "আমাদের প্রয়োজনটেক, আপনাদের সমাধান"
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Proyojontake — For Your Every Need
                  </p>
                </div>
              </div>
            </div>
            
            <div className="absolute -right-6 top-1/4 w-24 h-48 flex flex-wrap gap-2 justify-center -z-10 opacity-30">
              {[...Array(30)].map((_, i) => (
                <div key={i} className="w-2 h-2 rounded-full bg-primary" />
              ))}
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
