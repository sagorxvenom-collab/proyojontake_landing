import { motion } from "framer-motion";
import { Camera, Award, Gift, Printer, Smartphone } from "lucide-react";

const services = [
  {
    icon: <Camera className="w-6 h-6" />,
    title: "স্টুডিও",
    english: "Photography Studio",
    desc: "Professional photography for individuals, families, and events.",
    items: ["পোর্ট্রেট ফটোগ্রাফি", "পাসপোর্ট সাইজ ছবি", "পারিবারিক ফটোশুট", "ইভেন্ট ফটোগ্রাফি"],
    color: "from-pink-500 to-rose-600",
    bg: "bg-pink-50",
    border: "border-pink-100",
    badge: "bg-pink-100 text-pink-700"
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: "সিল এন্ড ক্রেস্ট",
    english: "Seal & Crest",
    desc: "Custom seals, stamps, trophies, and crests for businesses.",
    items: ["কাস্টম সিল / স্ট্যাম্প", "ট্রফি ও ক্রেস্ট", "অ্যাওয়ার্ড মেডেল", "প্রতিষ্ঠানের লোগো সিল"],
    color: "from-amber-500 to-orange-600",
    bg: "bg-amber-50",
    border: "border-amber-100",
    badge: "bg-amber-100 text-amber-700"
  },
  {
    icon: <Gift className="w-6 h-6" />,
    title: "কাস্টম গিফট আইটেম",
    english: "Custom Gift & Printing",
    desc: "Personalized gifts with your name, photo, or logo.",
    items: ["মগ / ম্যাজিক মগ", "পানির বোতল / টি-শার্ট", "মেটাল / নেইম প্লেট", "স্টোন / টাইলস / ক্রিস্টাল"],
    color: "from-violet-500 to-purple-600",
    bg: "bg-violet-50",
    border: "border-violet-100",
    badge: "bg-violet-100 text-violet-700"
  },
  {
    icon: <Printer className="w-6 h-6" />,
    title: "ফটোকপি ও প্রিন্টিং",
    english: "Photocopy, Printing & Binding",
    desc: "Fast, affordable document services — printing to binding.",
    items: ["ফটোকপি", "কম্পিউটার প্রিন্টিং", "স্পাইরাল বাইন্ডিং", "লেমিনেটিং"],
    color: "from-sky-500 to-blue-600",
    bg: "bg-sky-50",
    border: "border-sky-100",
    badge: "bg-sky-100 text-sky-700"
  },
  {
    icon: <Smartphone className="w-6 h-6" />,
    title: "মোবাইল সার্ভিসিং",
    english: "Mobile Servicing & Repair",
    desc: "Expert mobile repair — screen, software, charging and more.",
    items: ["স্ক্রিন রিপ্লেসমেন্ট", "সফটওয়্যার সমস্যা সমাধান", "চার্জিং পোর্ট মেরামত", "মোবাইল আনলক ও সেটআপ"],
    color: "from-emerald-500 to-teal-600",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
    badge: "bg-emerald-100 text-emerald-700"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 280, damping: 24 } }
};

export function Services() {
  return (
    <section id="services" className="py-10 md:py-14 bg-muted/20">
      <div className="container mx-auto px-4 md:px-6">

        <div className="text-center max-w-2xl mx-auto mb-6">
          <h2 className="text-xs font-bold text-secondary uppercase tracking-wider mb-1.5">Our Services</h2>
          <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">আমাদের সার্ভিসসমূহ</h3>
          <p className="text-sm text-muted-foreground">
            Education is just the beginning — we offer a full range of services for everyday needs.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className={`rounded-2xl border ${service.border} ${service.bg} p-5 flex flex-col gap-3 hover:shadow-md transition-shadow group`}
            >
              {/* Icon + Title */}
              <div className="flex items-start gap-3">
                <div className={`shrink-0 p-3 rounded-xl bg-gradient-to-br ${service.color} text-white shadow-md group-hover:scale-105 transition-transform`}>
                  {service.icon}
                </div>
                <div>
                  <h4 className="font-bangla text-base font-bold text-foreground leading-tight">{service.title}</h4>
                  <p className="text-xs font-semibold text-muted-foreground">{service.english}</p>
                </div>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed">{service.desc}</p>

              <ul className="flex flex-col gap-1.5">
                {service.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 bg-gradient-to-br ${service.color}`} />
                    <span className="font-bangla text-xs text-foreground/80">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-1">
                <span className={`inline-block text-[10px] font-bold px-2.5 py-0.5 rounded-full ${service.badge}`}>
                  Available Now
                </span>
              </div>
            </motion.div>
          ))}

          {/* CTA card */}
          <motion.div
            variants={itemVariants}
            className="rounded-2xl border border-primary/20 bg-primary p-5 flex flex-col items-center justify-center text-center text-white gap-3 sm:col-span-2 lg:col-span-1"
          >
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-2xl">?</div>
            <h4 className="text-base font-bold">আরও জানতে চান?</h4>
            <p className="text-white/75 text-xs">Contact us for pricing, availability, or custom orders.</p>
            <a
              href="#contact"
              className="mt-1 inline-block bg-secondary text-secondary-foreground font-bold px-5 py-2 rounded-xl hover:bg-secondary/90 transition-colors text-xs"
            >
              যোগাযোগ করুন &rarr;
            </a>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
