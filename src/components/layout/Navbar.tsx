import { useState, useEffect } from "react";
import { Link } from "wouter";
import { BookOpen, Menu, X, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on resize
  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 768) setMobileMenuOpen(false); };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "Courses", href: "#courses" },
    { name: "Videos", href: "#videos" },
    { name: "Services", href: "#services" },
    { name: "Schedule", href: "#about" },
    { name: "Why Us", href: "#why-us" },
    { name: "Contact", href: "#contact" },
  ];

  function close() { setMobileMenuOpen(false); }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/96 backdrop-blur-md shadow-sm py-2"
            : "bg-transparent py-4"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-primary text-white p-1.5 rounded-lg group-hover:bg-secondary transition-colors">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h1 className="font-bold text-base leading-none text-primary">প্রয়োজনটেক</h1>
                <span className="text-[10px] text-muted-foreground">Proyojontake Coaching</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6">
              <ul className="flex items-center gap-5">
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
              <Button asChild size="sm" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold shadow-sm text-xs h-8 px-4">
                <a href="#contact">ভর্তি চলছে!</a>
              </Button>
            </nav>

            {/* Mobile Hamburger */}
            <button
              className={`md:hidden p-2 rounded-xl transition-colors ${mobileMenuOpen ? "bg-primary text-white" : "text-foreground hover:bg-muted"}`}
              onClick={() => setMobileMenuOpen(v => !v)}
              data-testid="button-mobile-menu"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
          onClick={close}
        />
      )}

      {/* Mobile Drawer Panel */}
      <div
        className={`md:hidden fixed top-0 right-0 bottom-0 z-50 w-72 bg-white shadow-2xl flex flex-col transition-transform duration-300 ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-primary/5">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-primary" />
            <span className="font-bold text-primary text-sm">Menu</span>
          </div>
          <button onClick={close} className="p-1.5 rounded-lg hover:bg-primary/10 text-foreground/60">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Links */}
        <nav className="flex-1 overflow-y-auto py-3 px-3">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-foreground/80 hover:bg-primary/8 hover:text-primary transition-colors"
                  onClick={close}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* CTA */}
        <div className="px-4 py-4 border-t border-border">
          <Button asChild className="w-full bg-secondary text-secondary-foreground font-bold h-11">
            <a href="#contact" onClick={close}>ভর্তি হতে আগ্রহী? — Enroll Now</a>
          </Button>
        </div>
      </div>
    </>
  );
}
