import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export function WhyChooseUs() {
  const benefits = [
    {
      title: "অভিজ্ঞ শিক্ষক মণ্ডলী",
      english: "Experienced Instructors",
      desc: "Learn from qualified, dedicated teachers who genuinely care about every student's progress."
    },
    {
      title: "নিয়মিত পরীক্ষা",
      english: "Regular Assessments",
      desc: "Frequent tests and evaluations ensure students stay on track and improve consistently."
    },
    {
      title: "দুর্বল শিক্ষার্থীদের আলাদা যত্ন",
      english: "Special Care for Weak Students",
      desc: "No student is left behind — we provide extra attention to those who need it most."
    },
    {
      title: "ছোট ব্যাচে সুশৃঙ্খল পরিবেশ",
      english: "Small Batches, Disciplined Environment",
      desc: "Small group sizes ensure personalized attention and a focused learning atmosphere."
    },
    {
      title: "রেজাল্ট ও সফলতা অর্জন",
      english: "Results & Achievement",
      desc: "Our track record speaks for itself — students consistently achieve excellent results."
    },
    {
      title: "সাশ্রয়ী মূল্যে মানসম্মত শিক্ষা",
      english: "Affordable Quality Education",
      desc: "High-quality education and training at fees accessible to every family in the community."
    }
  ];

  return (
    <section id="why-us" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-1/3 h-full bg-secondary/5 -translate-y-1/2 rounded-l-full pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-sm font-bold text-secondary uppercase tracking-wider mb-2">Why Choose Us</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-foreground mb-3 leading-tight">
              আমাদের বিশেষ সুবিধাসমূহ
            </h3>
            <p className="text-lg text-muted-foreground mb-8">
              What makes Proyojontake the right choice for your education.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-5">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="flex gap-3 p-4 rounded-2xl hover:bg-primary/3 transition-colors">
                  <CheckCircle2 className="w-6 h-6 text-secondary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bangla font-bold text-foreground mb-0.5">{benefit.title}</h4>
                    <p className="text-xs font-semibold text-secondary mb-1">{benefit.english}</p>
                    <p className="text-sm text-muted-foreground">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-8">
                <div className="rounded-3xl overflow-hidden aspect-[4/5] shadow-lg">
                  <img src="/gallery-8.png" alt="Tutoring session" className="w-full h-full object-cover" />
                </div>
                <div className="rounded-3xl overflow-hidden aspect-square shadow-lg">
                  <img src="/gallery-9.png" alt="Student achievement" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="space-y-4">
                <div className="rounded-3xl overflow-hidden aspect-square shadow-lg">
                  <img src="/gallery-5.png" alt="Computer training" className="w-full h-full object-cover" />
                </div>
                <div className="rounded-3xl overflow-hidden aspect-[4/5] shadow-lg">
                  <img src="/gallery-7.png" alt="Students collaborating" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-6 shadow-2xl border-4 border-white">
              <div className="w-24 h-24 rounded-full border-2 border-dashed border-primary flex items-center justify-center flex-col text-primary">
                <span className="text-lg font-bold font-bangla leading-tight text-center">আপনার</span>
                <span className="text-lg font-bold font-bangla leading-tight text-center">সমাধান</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
