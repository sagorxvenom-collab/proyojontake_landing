import { MapPin, Phone, Globe, BookOpen, Facebook, Youtube, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-white/10 p-2 rounded-lg">
                <BookOpen className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h3 className="font-bold text-xl leading-none text-white">
                  Proyojontake
                </h3>
                <span className="text-xs font-bangla text-white/70">
                  প্রয়োজনটেক কোচিং
                </span>
              </div>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed mb-3 font-bangla">
              মানসম্মত শিক্ষা, সুন্দর ভবিষ্যতের অঙ্গীকার
            </p>
            <p className="text-primary-foreground/70 text-sm leading-relaxed mb-6">
              A trusted multi-service school and computer training center in Bogura.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-white/60 hover:text-secondary transition-colors" data-testid="link-facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-secondary transition-colors" data-testid="link-youtube">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-secondary transition-colors" data-testid="link-instagram">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-6 text-white">Quick Links</h4>
            <ul className="flex flex-col gap-3">
              <li><a href="#" className="text-primary-foreground/80 hover:text-secondary transition-colors text-sm">Home</a></li>
              <li><a href="#courses" className="text-primary-foreground/80 hover:text-secondary transition-colors text-sm">All Courses</a></li>
              <li><a href="#services" className="text-primary-foreground/80 hover:text-secondary transition-colors text-sm">Our Services</a></li>
              <li><a href="#about" className="text-primary-foreground/80 hover:text-secondary transition-colors text-sm">Schedule & Facilities</a></li>
              <li><a href="#why-us" className="text-primary-foreground/80 hover:text-secondary transition-colors text-sm">Why Choose Us</a></li>
              <li><a href="#contact" className="text-primary-foreground/80 hover:text-secondary transition-colors text-sm">Enroll Now</a></li>
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h4 className="font-semibold text-lg mb-6 text-white">Our Programs</h4>
            <ul className="flex flex-col gap-3">
              <li><span className="text-primary-foreground/80 text-sm font-bangla">Class 3–8 (অল সাবজেক্ট)</span></li>
              <li><span className="text-primary-foreground/80 text-sm font-bangla">Class 9–HSC (সাবজেক্ট ভিত্তিক)</span></li>
              <li><span className="text-primary-foreground/80 text-sm">Spoken English (Group A & B)</span></li>
              <li><span className="text-primary-foreground/80 text-sm">Computer Basic & Office</span></li>
              <li><span className="text-primary-foreground/80 text-sm">Freelancing & Programming</span></li>
              <li><span className="text-primary-foreground/80 text-sm">ICT & English Language</span></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-6 text-white">যোগাযোগ করুন</h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <span className="text-primary-foreground/80 text-sm font-bangla leading-relaxed">
                  বি-রক, উল্লাস প্লাজা,<br />
                  শাজাহানপুর, বগুড়া<br />
                  (ট্রাস্ট ব্যাংকের নীচে)
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <div className="flex flex-col gap-0.5">
                  <span className="text-primary-foreground/80 text-sm">01719-326058</span>
                  <span className="text-primary-foreground/80 text-sm">01790-995721</span>
                  <span className="text-primary-foreground/80 text-sm">01580-880691</span>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-secondary shrink-0" />
                <span className="text-primary-foreground/80 text-sm">proyojontake.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-primary-foreground/60 text-sm">
            &copy; {new Date().getFullYear()} প্রয়োজনটেক কোচিং (Proyojontake). All rights reserved.
          </p>
          <p className="text-primary-foreground/60 text-sm font-bangla">
            আমাদের প্রয়োজনটেক, আপনাদের সমাধান
          </p>
        </div>
      </div>
    </footer>
  );
}
