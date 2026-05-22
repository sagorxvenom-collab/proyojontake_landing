import { useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Gallery } from "@/components/sections/Gallery";
import { About } from "@/components/sections/About";
import { Courses } from "@/components/sections/Courses";
import { Videos } from "@/components/sections/Videos";
import { Services } from "@/components/sections/Services";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Contact } from "@/components/sections/Contact";
import { NoticeBanner } from "@/components/sections/NoticeBanner";
import { VideoGalleryPopup } from "@/components/sections/VideoGalleryPopup";
import { useSiteContent } from "@/context/SiteContentContext";

export default function Home() {
  const { content } = useSiteContent();

  useEffect(() => {
    if (content.seo.title) document.title = content.seo.title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", content.seo.description);
  }, [content.seo]);

  return (
    <div className="flex flex-col min-h-screen">
      <VideoGalleryPopup />
      <NoticeBanner />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Gallery />
        <About />
        <Courses />
        <Videos />
        <Services />
        <WhyChooseUs />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
