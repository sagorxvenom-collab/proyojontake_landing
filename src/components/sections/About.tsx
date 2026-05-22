import { motion } from "framer-motion";
import { Monitor, BookMarked, Building2, Globe, Clock, Users, Sunrise, Sun, Sunset } from "lucide-react";

const shifts = [
  { label: "মর্নিং শিফট", time: "6:30 AM – 9:30 AM", icon: <Sunrise className="w-4 h-4 text-amber-500" />, bg: "bg-amber-50 border-amber-100" },
  { label: "ডে শিফট", time: "3:00 PM – 5:00 PM", icon: <Sun className="w-4 h-4 text-orange-500" />, bg: "bg-orange-50 border-orange-100" },
  { label: "ইভিনিং শিফট", time: "5:00 PM – 7:00 PM", icon: <Sunset className="w-4 h-4 text-violet-500" />, bg: "bg-violet-50 border-violet-100" },
];

const groups = [
  { name: "A গ্রুপ", days: "শনি, সোম, বুধ", color: "bg-blue-100 text-blue-700 border-blue-200" },
  { name: "B গ্রুপ", days: "রবি, মঙ্গল, বৃহস্পতি", color: "bg-indigo-100 text-indigo-700 border-indigo-200" },
  { name: "স্পেশাল গ্রুপ", days: "শুক্রবার", color: "bg-amber-100 text-amber-700 border-amber-200" },
];

const facilities = [
  { icon: <Monitor className="w-5 h-5 text-secondary" />, title: "Modern Computer Lab", description: "Latest software, high-speed internet for practical learning." },
  { icon: <BookMarked className="w-5 h-5 text-secondary" />, title: "Library & Study Room", description: "Peaceful environment with books and reference materials." },
  { icon: <Building2 className="w-5 h-5 text-secondary" />, title: "Spacious Classrooms", description: "Well-lit, comfortable rooms for focused small-batch studying." },
  { icon: <Globe className="w-5 h-5 text-secondary" />, title: "Online Resources", description: "Digital materials, practice tests & recorded content." },
];

export function About() {
  return (
    <section id="about" className="py-10 md:py-14 bg-white">
      <div className="container mx-auto px-4 md:px-6">

        {/* Top: image + info */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-8 md:mb-12">

          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55 }}
            className="aspect-square rounded-2xl overflow-hidden relative max-h-72 md:max-h-none"
          >
            <img src="/gallery-6.png" alt="Students studying at Proyojontake" className="object-cover w-full h-full" />
            <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55 }}
          >
            <h2 className="text-xs font-bold text-secondary uppercase tracking-wider mb-1.5">About The Institution</h2>
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
              Multi-service School &<br />Computer Training Center
            </h3>

            <p className="text-muted-foreground text-sm md:text-base mb-3 leading-relaxed">
              Proyojontake Coaching (প্রয়োজনটেক কোচিং) is a trusted learning hub in Bogura, offering academic tutoring and professional computer training under one roof.
            </p>

            <p className="text-muted-foreground text-sm mb-5 leading-relaxed font-bangla border-l-4 border-secondary pl-4 italic">
              "মানসম্মত শিক্ষা, সুন্দর ভবিষ্যতের অঙ্গীকার"
            </p>

            <div className="grid sm:grid-cols-2 gap-3">
              {facilities.map((fac, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className="shrink-0 mt-0.5 bg-primary/5 p-2 rounded-lg">
                    {fac.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-sm mb-0.5">{fac.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{fac.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Schedule & Groups */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-2 gap-5"
        >
          {/* Class Schedule */}
          <div className="bg-primary/5 border border-primary/10 rounded-2xl p-5">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="bg-primary/10 p-1.5 rounded-lg">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-bold text-base text-foreground">ক্লাস সময়</h4>
                <p className="text-xs text-muted-foreground">Daily Class Schedule</p>
              </div>
            </div>
            <div className="space-y-2.5">
              {shifts.map((shift, i) => (
                <div key={i} className={`flex items-center justify-between p-3 bg-white rounded-xl border shadow-sm ${shift.bg}`}>
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm border border-border/30">
                      {shift.icon}
                    </div>
                    <span className="font-bangla font-semibold text-foreground text-sm">{shift.label}</span>
                  </div>
                  <span className="font-bold text-primary tabular-nums text-xs">{shift.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Group Division */}
          <div className="bg-secondary/5 border border-secondary/10 rounded-2xl p-5">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="bg-secondary/10 p-1.5 rounded-lg">
                <Users className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <h4 className="font-bold text-base text-foreground">গ্রুপ বিভাগ</h4>
                <p className="text-xs text-muted-foreground">Group Division (Spoken English)</p>
              </div>
            </div>
            <div className="space-y-2.5">
              {groups.map((group, i) => (
                <div key={i} className={`flex items-center justify-between p-3 rounded-xl border ${group.color}`}>
                  <span className="font-bangla font-bold text-sm">{group.name}</span>
                  <span className="font-bangla font-semibold text-xs">{group.days}</span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-muted-foreground font-bangla">
              * GP-A: Class Play–Five &nbsp;|&nbsp; GP-B: Class Six–Above
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
