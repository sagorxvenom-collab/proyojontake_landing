import { useState } from "react";
import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Globe, Facebook, Youtube } from "lucide-react";
import { useSiteContent } from "@/context/SiteContentContext";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  course: z.string().min(1, "Please select a course"),
  message: z.string().optional(),
});

export function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { content } = useSiteContent();
  const { contact } = content;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", phone: "", course: "", message: "" },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    setTimeout(() => {
      console.log(values);
      setIsSubmitting(false);
      toast({ title: "আবেদন পাঠানো হয়েছে!", description: "We will contact you shortly. ধন্যবাদ!" });
      form.reset();
    }, 1000);
  }

  return (
    <section id="contact" className="py-10 md:py-14 bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-full opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSI+PC9yZWN0Pgo8cGF0aCBkPSJNMCAwTDggOFpNOCAwTDAgOFoiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLW9wYWNpdHk9IjAuMSI+PC9wYXRoPgo8L3N2Zz4=')] mix-blend-overlay" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">

          {/* Left info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <h2 className="text-xs font-bold text-secondary uppercase tracking-wider mb-1.5">Contact Us</h2>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-1.5">ভর্তি হতে আগ্রহী?</h3>
            <p className="text-primary-foreground/75 text-sm mb-6">
              নিচের ফর্মটি পূরণ করুন — আমরা শীঘ্রই যোগাযোগ করব।
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-white/10 p-2.5 rounded-xl shrink-0">
                  <MapPin className="w-4 h-4 text-secondary" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm mb-0.5">আমাদের ঠিকানা</h4>
                  <p className="text-primary-foreground/75 font-bangla text-xs leading-relaxed whitespace-pre-line">
                    {contact.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-white/10 p-2.5 rounded-xl shrink-0">
                  <Phone className="w-4 h-4 text-secondary" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm mb-0.5">যোগাযোগ</h4>
                  {contact.phones.map((ph, i) => (
                    <a key={i} href={`tel:${ph.replace(/[^+\d]/g, "")}`} className="block text-primary-foreground/75 text-xs hover:text-secondary transition-colors">
                      {ph}
                    </a>
                  ))}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-white/10 p-2.5 rounded-xl shrink-0">
                  <Globe className="w-4 h-4 text-secondary" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm mb-0.5">Website</h4>
                  <p className="text-primary-foreground/75 text-xs">{contact.website}</p>
                </div>
              </div>
            </div>

            {/* Social + tagline */}
            <div className="mt-5 flex items-center gap-3">
              <a href={contact.facebook} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 transition-colors px-3 py-2 rounded-xl text-xs font-semibold text-white">
                <Facebook className="w-4 h-4" /> Facebook
              </a>
              <a href={contact.youtube} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 transition-colors px-3 py-2 rounded-xl text-xs font-semibold text-white">
                <Youtube className="w-4 h-4" /> YouTube
              </a>
            </div>

            <div className="mt-4 p-3 rounded-xl bg-white/10 border border-white/15">
              <p className="font-bangla font-bold text-white text-sm text-center">আমাদের প্রয়োজনটেক, আপনাদের সমাধান</p>
              <p className="text-primary-foreground/60 text-xs text-center mt-0.5">আসন সংখ্যা সীমিত — আজই রেজিস্ট্রেশন করুন!</p>
            </div>
          </motion.div>

          {/* Right form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="bg-white rounded-2xl p-5 shadow-2xl text-foreground"
          >
            <h4 className="text-base font-bold mb-0.5">ভর্তির আবেদন করুন</h4>
            <p className="text-muted-foreground text-xs mb-4">Enrollment Inquiry Form</p>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3" data-testid="contact-form">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-semibold">পূর্ণ নাম / Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="আপনার নাম লিখুন" {...field} className="bg-muted/50 h-9 text-sm" data-testid="input-name" />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )} />

                <FormField control={form.control} name="phone" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-semibold">মোবাইল নম্বর / Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="01XXX-XXXXXX" {...field} className="bg-muted/50 h-9 text-sm" data-testid="input-phone" />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )} />

                <FormField control={form.control} name="course" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-semibold">কোর্স / Course</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-muted/50 h-9 text-sm" data-testid="select-course">
                          <SelectValue placeholder="কোর্স নির্বাচন করুন" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="class-3-8">Class 3–8 (অল সাবজেক্ট)</SelectItem>
                        <SelectItem value="class-9-hsc">Class 9–HSC (সাবজেক্ট ভিত্তিক)</SelectItem>
                        <SelectItem value="spoken-english-a">Spoken English — Group A</SelectItem>
                        <SelectItem value="spoken-english-b">Spoken English — Group B</SelectItem>
                        <SelectItem value="computer-office">Computer Basic & Office</SelectItem>
                        <SelectItem value="freelancing-programming">Freelancing & Programming</SelectItem>
                        <SelectItem value="ict">ICT</SelectItem>
                        <SelectItem value="english">English Language</SelectItem>
                        <SelectItem value="other">অন্যান্য / Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )} />

                <FormField control={form.control} name="message" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-semibold">বার্তা / Message (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="আপনার কোনো প্রশ্ন থাকলে এখানে লিখুন..."
                        className="resize-none bg-muted/50 text-sm"
                        rows={2}
                        {...field}
                        data-testid="textarea-message"
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )} />

                <Button
                  type="submit"
                  className="w-full bg-primary text-white hover:bg-primary/90 h-10 text-sm font-bangla font-bold"
                  disabled={isSubmitting}
                  data-testid="button-submit"
                >
                  {isSubmitting ? "পাঠানো হচ্ছে..." : "আবেদন পাঠান"}
                </Button>
              </form>
            </Form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
