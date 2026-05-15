import { useState, useEffect } from "react";
import { Link } from "wouter";
import { BookOpen, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "Courses", href: "#courses" },
    { name: "Services", href: "#services" },
    { name: "Schedule", href: "#about" },
    { name: "Why Us", href: "#why-us" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-primary text-white p-2 rounded-lg group-hover:bg-secondary transition-colors">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-none text-primary">
                প্রয়োজনটেক
              </h1>
              <span className="text-xs text-muted-foreground">
                Proyojontake Coaching
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-6">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className={`text-sm font-medium hover:text-secondary transition-colors ${
                      isScrolled ? "text-foreground/80" : "text-foreground/90"
                    }`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            <Button asChild className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold shadow-sm">
              <a href="#contact">ভর্তি চলছে!</a>
            </Button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-border shadow-lg p-4 animate-in slide-in-from-top-2">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="block text-base font-medium text-foreground hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              </li>
            ))}
            <li>
              <Button asChild className="w-full bg-secondary text-secondary-foreground font-bold">
                <a href="#contact" onClick={() => setMobileMenuOpen(false)}>ভর্তি চলছে! — Enroll Now</a>
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
