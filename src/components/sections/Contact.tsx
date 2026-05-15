import { useState } from "react";
import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Globe } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  course: z.string().min(1, "Please select a course"),
  message: z.string().optional(),
});

export function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      course: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    setTimeout(() => {
      console.log(values);
      setIsSubmitting(false);
      toast({
        title: "আবেদন পাঠানো হয়েছে!",
        description: "We will contact you shortly. ধন্যবাদ!",
      });
      form.reset();
    }, 1000);
  }

  return (
    <section id="contact" className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-full opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSI+PC9yZWN0Pgo8cGF0aCBkPSJNMCAwTDggOFpNOCAwTDAgOFoiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLW9wYWNpdHk9IjAuMSI+PC9wYXRoPgo8L3N2Zz4=')] mix-blend-overlay" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-sm font-bold text-secondary uppercase tracking-wider mb-2">Contact Us</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-white mb-3">
              ভর্তি হতে আগ্রহী?
            </h3>
            <p className="text-primary-foreground/80 text-lg mb-3">
              নিচের ফর্মটি পূরণ করুন — আমরা শীঘ্রই যোগাযোগ করব।
            </p>
            <p className="text-primary-foreground/60 text-sm mb-10">
              Fill out the form below and we will reach out to you shortly.
            </p>

            <div className="space-y-7">
              <div className="flex items-start gap-4">
                <div className="bg-white/10 p-4 rounded-full shrink-0">
                  <MapPin className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-white mb-1">আমাদের ঠিকানা</h4>
                  <p className="text-primary-foreground/80 font-bangla leading-relaxed">
                    বি-রক, উল্লাস প্লাজা,<br />
                    শাজাহানপুর, বগুড়া<br />
                    (ট্রাস্ট ব্যাংকের নীচে)
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-white/10 p-4 rounded-full shrink-0">
                  <Phone className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-white mb-1">যোগাযোগ</h4>
                  <p className="text-primary-foreground/80">01719-326058</p>
                  <p className="text-primary-foreground/80">01790-995721</p>
                  <p className="text-primary-foreground/80">01580-880691</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-white/10 p-4 rounded-full shrink-0">
                  <Globe className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-white mb-1">Website</h4>
                  <p className="text-primary-foreground/80">proyojontake.com</p>
                </div>
              </div>
            </div>

            {/* Bottom tagline */}
            <div className="mt-10 p-5 rounded-2xl bg-white/10 border border-white/20">
              <p className="font-bangla text-lg font-bold text-white text-center">
                আমাদের প্রয়োজনটেক, আপনাদের সমাধান
              </p>
              <p className="text-primary-foreground/70 text-sm text-center mt-1">
                আসন সংখ্যা সীমিত — আজই রেজিস্ট্রেশন করুন!
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl p-8 shadow-2xl text-foreground"
          >
            <h4 className="text-2xl font-bold mb-1">ভর্তির আবেদন করুন</h4>
            <p className="text-muted-foreground text-sm mb-6">Enrollment Inquiry Form</p>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5" data-testid="contact-form">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>পূর্ণ নাম / Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="আপনার নাম লিখুন" {...field} className="bg-muted/50" data-testid="input-name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>মোবাইল নম্বর / Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="01XXX-XXXXXX" {...field} className="bg-muted/50" data-testid="input-phone" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="course"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>কোর্স / Course of Interest</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-muted/50" data-testid="select-course">
                            <SelectValue placeholder="কোর্স নির্বাচন করুন" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="class-3-8">Class 3–8 (অল সাবজেক্ট)</SelectItem>
                          <SelectItem value="class-9-hsc">Class 9–HSC (সাবজেক্ট ভিত্তিক)</SelectItem>
                          <SelectItem value="spoken-english-a">Spoken English — Group A (Play–Five)</SelectItem>
                          <SelectItem value="spoken-english-b">Spoken English — Group B (Six–Above)</SelectItem>
                          <SelectItem value="computer-office">Computer Basic & Office Application</SelectItem>
                          <SelectItem value="freelancing-programming">Freelancing & Programming</SelectItem>
                          <SelectItem value="ict">ICT</SelectItem>
                          <SelectItem value="english">English Language</SelectItem>
                          <SelectItem value="other">অন্যান্য / Other Inquiry</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>বার্তা / Message (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="আপনার কোনো প্রশ্ন থাকলে এখানে লিখুন..." 
                          className="resize-none bg-muted/50" 
                          {...field}
                          data-testid="textarea-message"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full bg-primary text-white hover:bg-primary/90 h-12 text-lg font-bangla font-bold"
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
