import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export function WhyChooseUs() {
  const benefits = [
    { title: "অভিজ্ঞ শিক্ষক মণ্ডলী", english: "Experienced Instructors", desc: "Qualified, dedicated teachers who care about every student's progress." },
    { title: "নিয়মিত পরীক্ষা", english: "Regular Assessments", desc: "Frequent tests ensure students stay on track and improve consistently." },
    { title: "দুর্বল শিক্ষার্থীদের আলাদা যত্ন", english: "Special Care for Weak Students", desc: "No student is left behind — extra attention for those who need it most." },
    { title: "ছোট ব্যাচে সুশৃঙ্খল পরিবেশ", english: "Small Batches", desc: "Small group sizes ensure personalized attention and focused learning." },
    { title: "রেজাল্ট ও সফলতা অর্জন", english: "Results & Achievement", desc: "Our students consistently achieve excellent results." },
    { title: "সাশ্রয়ী মূল্যে মানসম্মত শিক্ষা", english: "Affordable Quality Education", desc: "High-quality training at fees accessible to every family." },
  ];

  return (
    <section id="why-us" className="py-10 md:py-14 bg-white relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-1/3 h-full bg-secondary/5 -translate-y-1/2 rounded-l-full pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55 }}
          >
            <h2 className="text-xs font-bold text-secondary uppercase tracking-wider mb-1.5">Why Choose Us</h2>
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2 leading-tight">
              আমাদের বিশেষ সুবিধাসমূহ
            </h3>
            <p className="text-sm text-muted-foreground mb-5">
              What makes Proyojontake the right choice for your education.
            </p>

            <div className="grid sm:grid-cols-2 gap-3">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="flex gap-2.5 p-3 rounded-xl hover:bg-primary/3 transition-colors">
                  <CheckCircle2 className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bangla font-bold text-foreground text-sm mb-0.5">{benefit.title}</h4>
                    <p className="text-[10px] font-semibold text-secondary mb-0.5">{benefit.english}</p>
                    <p className="text-xs text-muted-foreground">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-3 pt-6">
                <div className="rounded-2xl overflow-hidden aspect-[4/5] shadow-lg">
                  <img src="/gallery-8.png" alt="Tutoring session" className="w-full h-full object-cover" />
                </div>
                <div className="rounded-2xl overflow-hidden aspect-square shadow-lg">
                  <img src="/gallery-9.png" alt="Student achievement" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="space-y-3">
                <div className="rounded-2xl overflow-hidden aspect-square shadow-lg">
                  <img src="/gallery-5.png" alt="Computer training" className="w-full h-full object-cover" />
                </div>
                <div className="rounded-2xl overflow-hidden aspect-[4/5] shadow-lg">
                  <img src="/gallery-7.png" alt="Students collaborating" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-4 shadow-2xl border-4 border-white">
              <div className="w-20 h-20 rounded-full border-2 border-dashed border-primary flex items-center justify-center flex-col text-primary">
                <span className="text-sm font-bold font-bangla leading-tight text-center">আপনার</span>
                <span className="text-sm font-bold font-bangla leading-tight text-center">সমাধান</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
