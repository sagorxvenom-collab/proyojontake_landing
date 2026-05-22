import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteContent } from "@/context/SiteContentContext";

export function Gallery() {
  const { content } = useSiteContent();
  const images = content.gallery;

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 40 });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => emblaApi.scrollNext(), 3000);
    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <section className="py-16 bg-foreground relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Life at Proyojontake
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto text-base font-bangla">
            একটি সুন্দর, আধুনিক ও শিক্ষার্থীবান্ধব পরিবেশ
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="overflow-hidden rounded-2xl shadow-2xl bg-black" ref={emblaRef}>
            <div className="flex touch-pan-y">
              {images.map((img, index) => (
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
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur"
            onClick={scrollPrev}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur"
            onClick={scrollNext}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>

          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === selectedIndex ? "bg-secondary w-6" : "bg-white/50 hover:bg-white/80 w-1.5"
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
