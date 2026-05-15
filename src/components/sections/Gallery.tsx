import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const IMAGES = [
  { src: "/gallery-1.png", alt: "Welcoming entrance of training center" },
  { src: "/gallery-2.png", alt: "Modern computer lab" },
  { src: "/gallery-3.png", alt: "Teacher helping student" },
  { src: "/gallery-4.png", alt: "Graphic design student" },
  { src: "/gallery-5.png", alt: "Adult professionals training" },
  { src: "/gallery-6.png", alt: "Peaceful library study area" },
  { src: "/gallery-7.png", alt: "Students collaborating" },
  { src: "/gallery-8.png", alt: "Academic tutoring class" },
  { src: "/gallery-9.png", alt: "Students receiving certificates" },
  { src: "/gallery-10.png", alt: "Vibrant school hallway" },
];

export function Gallery() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 40 });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  // Auto-play
  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 3000);
    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <section className="py-24 bg-foreground relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Life at Proyojontake
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto text-lg font-bangla">
            একটি সুন্দর, আধুনিক ও শিক্ষার্থীবান্ধব পরিবেশ (A beautiful, modern, and student-friendly environment)
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="overflow-hidden rounded-2xl shadow-2xl bg-black" ref={emblaRef}>
            <div className="flex touch-pan-y">
              {IMAGES.map((img, index) => (
                <div 
                  key={index} 
                  className="flex-[0_0_100%] min-w-0 relative aspect-video sm:aspect-[21/9]"
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
              ))}
            </div>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur"
            onClick={scrollPrev}
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur"
            onClick={scrollNext}
          >
            <ChevronRight className="w-6 h-6" />
          </Button>

          <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
            {IMAGES.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === selectedIndex ? "bg-secondary w-6" : "bg-white/50 hover:bg-white/80"
                }`}
                onClick={() => scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
