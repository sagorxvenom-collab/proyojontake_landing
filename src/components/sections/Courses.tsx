import { motion } from "framer-motion";
import { Laptop, Code, Languages, GraduationCap, BookOpen, Calculator, Globe, FlaskConical, Atom, Sprout } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useSiteContent } from "@/context/SiteContentContext";
import type { CourseItem } from "@/lib/site-content";

const ACADEMIC_COLORS = ["bg-blue-600", "bg-indigo-600", "bg-rose-500", "bg-pink-500", "bg-purple-600", "bg-sky-600"];
const COMPUTER_COLORS = ["bg-cyan-600", "bg-violet-600", "bg-teal-600", "bg-amber-500", "bg-green-600", "bg-orange-500"];
const ACADEMIC_ICONS = [
  <BookOpen className="w-6 h-6 text-white" />,
  <GraduationCap className="w-6 h-6 text-white" />,
  <Languages className="w-6 h-6 text-white" />,
  <Languages className="w-6 h-6 text-white" />,
  <BookOpen className="w-6 h-6 text-white" />,
  <Globe className="w-6 h-6 text-white" />,
];
const COMPUTER_ICONS = [
  <Laptop className="w-6 h-6 text-white" />,
  <Code className="w-6 h-6 text-white" />,
  <Globe className="w-6 h-6 text-white" />,
  <Languages className="w-6 h-6 text-white" />,
  <Code className="w-6 h-6 text-white" />,
  <Laptop className="w-6 h-6 text-white" />,
];

const subjectIcons = [
  { icon: <Calculator className="w-5 h-5" />, name: "গণিত" },
  { icon: <Languages className="w-5 h-5" />, name: "ইংরেজি" },
  { icon: <Atom className="w-5 h-5" />, name: "পদার্থবিজ্ঞান" },
  { icon: <FlaskConical className="w-5 h-5" />, name: "রসায়ন" },
  { icon: <Sprout className="w-5 h-5" />, name: "জীব বিজ্ঞান" },
  { icon: <Calculator className="w-5 h-5" />, name: "হিসাব বিজ্ঞান" },
  { icon: <Globe className="w-5 h-5" />, name: "ICT" },
  { icon: <BookOpen className="w-5 h-5" />, name: "বাংলা" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

function CourseCard({ course, icon, color }: { course: CourseItem; icon: React.ReactNode; color: string }) {
  return (
    <Card className="h-full border-border/50 hover:border-primary/30 transition-all hover:shadow-lg bg-card group">
      <CardHeader>
        <div className="flex items-start justify-between mb-3">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color} shadow-inner group-hover:scale-110 transition-transform`}>
            {icon}
          </div>
          <span className="text-xs font-bold px-2 py-1 rounded-full bg-primary/10 text-primary">{course.badge}</span>
        </div>
        <CardTitle className="text-lg leading-tight">{course.title}</CardTitle>
        <p className="text-sm font-bangla font-bold text-secondary">{course.bangla}</p>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm text-muted-foreground/90 leading-relaxed">{course.desc}</CardDescription>
      </CardContent>
    </Card>
  );
}

export function Courses() {
  const { content } = useSiteContent();
  const { academic, computer } = content.courses;

  return (
    <section id="courses" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h2 className="text-sm font-bold text-secondary uppercase tracking-wider mb-2">Our Programs</h2>
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Courses Designed for Your Need</h3>
          <p className="text-lg font-bangla text-muted-foreground">আপনার প্রয়োজন অনুযায়ী সঠিক কোর্সটি বেছে নিন</p>
        </div>

        {/* Academic Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-1 w-8 rounded bg-primary" />
            <h4 className="text-xl font-bold text-foreground">Academic Coaching</h4>
            <div className="h-1 flex-1 rounded bg-border" />
          </div>
          <motion.div
            variants={containerVariants} initial="hidden" whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {academic.map((course, idx) => (
              <motion.div key={idx} variants={itemVariants}>
                <CourseCard course={course} icon={ACADEMIC_ICONS[idx % ACADEMIC_ICONS.length]} color={ACADEMIC_COLORS[idx % ACADEMIC_COLORS.length]} />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-5 p-5 rounded-2xl bg-indigo-50 border border-indigo-100"
          >
            <p className="text-sm font-bold text-indigo-700 mb-3">Class 9–HSC available subjects:</p>
            <div className="flex flex-wrap gap-2">
              {subjectIcons.map((s, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-indigo-700 border border-indigo-200 text-sm font-bangla font-medium">
                  {s.icon}{s.name}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Computer & IT Section */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-1 w-8 rounded bg-secondary" />
            <h4 className="text-xl font-bold text-foreground">Computer & IT Training</h4>
            <div className="h-1 flex-1 rounded bg-border" />
          </div>
          <motion.div
            variants={containerVariants} initial="hidden" whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {computer.map((course, idx) => (
              <motion.div key={idx} variants={itemVariants}>
                <CourseCard course={course} icon={COMPUTER_ICONS[idx % COMPUTER_ICONS.length]} color={COMPUTER_COLORS[idx % COMPUTER_COLORS.length]} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 p-8 rounded-3xl bg-primary text-center text-white"
        >
          <h4 className="text-2xl font-bold mb-2">আসন সংখ্যা সীমিত — আজই রেজিস্ট্রেশন করুন!</h4>
          <p className="text-white/80 mb-5">Limited seats available. Don't miss your chance to enroll for this session.</p>
          <a href="#contact" className="inline-block bg-secondary text-secondary-foreground font-bold px-8 py-3 rounded-xl hover:bg-secondary/90 transition-colors">
            ভর্তি হতে আগ্রহী? &rarr;
          </a>
        </motion.div>
      </div>
    </section>
  );
}
