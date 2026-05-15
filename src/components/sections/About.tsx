import { motion } from "framer-motion";
import { Monitor, BookMarked, Building2, Globe, Clock, Users } from "lucide-react";

const shifts = [
  { label: "মর্নিং শিফট", time: "6:30 AM – 9:30 AM", icon: "🌅" },
  { label: "ডে শিফট", time: "3:00 PM – 5:00 PM", icon: "☀️" },
  { label: "ইভিনিং শিফট", time: "5:00 PM – 7:00 PM", icon: "🌆" },
];

const groups = [
  { name: "A গ্রুপ", days: "শনি, সোম, বুধ", color: "bg-blue-100 text-blue-700 border-blue-200" },
  { name: "B গ্রুপ", days: "রবি, মঙ্গল, বৃহস্পতি", color: "bg-indigo-100 text-indigo-700 border-indigo-200" },
  { name: "স্পেশাল গ্রুপ", days: "শুক্রবার", color: "bg-amber-100 text-amber-700 border-amber-200" },
];

const facilities = [
  {
    icon: <Monitor className="w-7 h-7 text-secondary" />,
    title: "Modern Computer Lab",
    description: "Fully equipped with latest software and high-speed internet for practical learning."
  },
  {
    icon: <BookMarked className="w-7 h-7 text-secondary" />,
    title: "Library & Study Room",
    description: "A peaceful environment stocked with books, resources, and reference materials."
  },
  {
    icon: <Building2 className="w-7 h-7 text-secondary" />,
    title: "Spacious Classrooms",
    description: "Well-lit, comfortable rooms designed for focused, small-batch studying."
  },
  {
    icon: <Globe className="w-7 h-7 text-secondary" />,
    title: "Online Resources",
    description: "Digital materials, practice tests, and recorded content for self-paced revision."
  }
];

export function About() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="aspect-square rounded-3xl overflow-hidden relative">
              <img 
                src="/gallery-6.png" 
                alt="Students studying at Proyojontake" 
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-sm font-bold text-secondary uppercase tracking-wider mb-2">About The Institution</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Multi-service School &<br />Computer Training Center
            </h3>
            
            <p className="text-muted-foreground text-lg mb-4 leading-relaxed">
              Proyojontake Coaching (প্রয়োজনটেক কোচিং) is a trusted learning hub in Bogura, offering both academic tutoring and professional computer training under one roof.
            </p>
            
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed font-bangla border-l-4 border-secondary pl-6 italic">
              "মানসম্মত শিক্ষা, সুন্দর ভবিষ্যতের অঙ্গীকার"
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {facilities.map((fac, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="shrink-0 mt-1 bg-primary/5 p-3 rounded-xl">
                    {fac.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">{fac.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{fac.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Schedule & Group Division */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 gap-8"
        >
          {/* Class Schedule */}
          <div className="bg-primary/5 border border-primary/10 rounded-3xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-primary/10 p-2 rounded-xl">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-bold text-xl text-foreground">ক্লাস সময়</h4>
                <p className="text-sm text-muted-foreground">Daily Class Schedule</p>
              </div>
            </div>
            <div className="space-y-4">
              {shifts.map((shift, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-border/50 shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{shift.icon}</span>
                    <span className="font-bangla font-semibold text-foreground">{shift.label}</span>
                  </div>
                  <span className="font-bold text-primary tabular-nums text-sm">{shift.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Group Division */}
          <div className="bg-secondary/5 border border-secondary/10 rounded-3xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-secondary/10 p-2 rounded-xl">
                <Users className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h4 className="font-bold text-xl text-foreground">গ্রুপ বিভাগ</h4>
                <p className="text-sm text-muted-foreground">Group Division (Spoken English)</p>
              </div>
            </div>
            <div className="space-y-4">
              {groups.map((group, i) => (
                <div key={i} className={`flex items-center justify-between p-4 rounded-2xl border ${group.color}`}>
                  <span className="font-bangla font-bold text-lg">{group.name}</span>
                  <span className="font-bangla font-semibold text-sm">{group.days}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-muted-foreground font-bangla">
              * GP-A: Class Play–Five &nbsp;|&nbsp; GP-B: Class Six–Above
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
