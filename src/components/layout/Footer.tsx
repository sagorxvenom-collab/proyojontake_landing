import { MapPin, Phone, Globe, BookOpen, Facebook, Youtube, Instagram, Code2 } from "lucide-react";
import { useSiteContent } from "@/context/SiteContentContext";

export function Footer() {
  const { content } = useSiteContent();
  const { contact, developer, siteName } = content;

  return (
    <footer className="bg-primary text-primary-foreground pt-8 pb-5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-6">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-white/10 p-1.5 rounded-lg">
                <BookOpen className="w-4 h-4 text-secondary" />
              </div>
              <div>
                <h3 className="font-bold text-sm leading-none text-white">Proyojontake</h3>
                <span className="text-[10px] font-bangla text-white/60">{siteName}</span>
              </div>
            </div>
            <p className="text-primary-foreground/75 text-xs leading-relaxed mb-1.5 font-bangla">
              {content.taglineBangla}
            </p>
            <p className="text-primary-foreground/50 text-[10px] leading-relaxed mb-3">
              A trusted multi-service school and computer training center in Bogura.
            </p>
            <div className="flex gap-3">
              <a href={contact.facebook} target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-secondary transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href={contact.youtube} target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-secondary transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
              <a href={contact.instagram} target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-secondary transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-xs mb-3 text-white">Quick Links</h4>
            <ul className="flex flex-col gap-2">
              {[
                { name: "Home", href: "#" },
                { name: "Courses", href: "#courses" },
                { name: "Videos", href: "#videos" },
                { name: "Services", href: "#services" },
                { name: "Schedule", href: "#about" },
                { name: "Enroll Now", href: "#contact" },
              ].map(l => (
                <li key={l.name}>
                  <a href={l.href} className="text-primary-foreground/70 hover:text-secondary transition-colors text-xs">{l.name}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-semibold text-xs mb-3 text-white">Programs</h4>
            <ul className="flex flex-col gap-2">
              {[
                "Class 3–8 (অল সাবজেক্ট)",
                "Class 9–HSC",
                "Spoken English A & B",
                "Computer Basic & Office",
                "Freelancing & Programming",
                "ICT & English",
              ].map((p, i) => (
                <li key={i}><span className="text-primary-foreground/70 text-xs font-bangla">{p}</span></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-xs mb-3 text-white">যোগাযোগ</h4>
            <ul className="flex flex-col gap-2.5">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-secondary shrink-0 mt-0.5" />
                <span className="text-primary-foreground/70 text-xs font-bangla leading-relaxed whitespace-pre-line">{contact.address}</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-3.5 h-3.5 text-secondary shrink-0 mt-0.5" />
                <div className="flex flex-col gap-0.5">
                  {contact.phones.map((ph, i) => (
                    <a key={i} href={`tel:${ph.replace(/[^+\d]/g, "")}`} className="text-primary-foreground/70 text-xs hover:text-secondary transition-colors">{ph}</a>
                  ))}
                </div>
              </li>
              <li className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-secondary shrink-0" />
                <span className="text-primary-foreground/70 text-xs">{contact.website}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-4 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-primary-foreground/50 text-[10px]">
            &copy; {new Date().getFullYear()} {siteName} (Proyojontake). All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {developer.show && (
              <p className="text-primary-foreground/40 text-[10px] flex items-center gap-1">
                <Code2 className="w-3 h-3" />
                {developer.label}{" "}
                <a href={developer.url} target="_blank" rel="noopener noreferrer" className="text-secondary/70 hover:text-secondary font-semibold transition-colors">
                  {developer.name}
                </a>
              </p>
            )}
            <a href="/admin" className="text-primary-foreground/25 hover:text-primary-foreground/50 text-[10px] transition-colors">⚙ Admin</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
