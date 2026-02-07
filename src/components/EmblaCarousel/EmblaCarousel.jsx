"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import "./EmblaCarousel.css";
import Image from "next/image";

export default function EmblaCarousel({
  slides = [],
  options = { loop: true, align: "center" },
  autoplayDelay = 3000,
}) {
  // ใช้ plugin autoplay + ตั้งค่า loop ที่ options
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({
      delay: autoplayDelay,
      stopOnInteraction: false, // แตะ/ลากแล้วไม่หยุดถาวร (ยังเล่นต่อได้)
      stopOnMouseEnter: true, // เอาเมาส์ชี้แล้วหยุด (ปรับได้)
    }),
  ]);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi],
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi],
  );
  const scrollTo = useCallback(
    (index) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", () => {
      setScrollSnaps(emblaApi.scrollSnapList());
      onSelect();
    });
  }, [emblaApi, onSelect]);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((slide, i) => (
            <div className="embla__slide" key={slide?.id ?? i}>
              <div className="embla__slide__inner">
                {/* รองรับเป็นรูป/ข้อความ/การ์ดได้หมด */}

                <Image
                  className="embla__img"
                  src={slide}
                  alt={`slide-${i}`}
                  // width={1920}
                  // height={620}
                  sizes="100vw"
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* <div className="embla__controls">
        <button
          className="embla__btn"
          onClick={scrollPrev}
          aria-label="Previous"
        >
          ‹
        </button>
        <button className="embla__btn" onClick={scrollNext} aria-label="Next">
          ›
        </button>
      </div> */}

      <div className="embla__dots">
        {scrollSnaps.map((_, i) => (
          <button
            key={i}
            className={`embla__dot ${i === selectedIndex ? "is-selected" : ""}`}
            onClick={() => scrollTo(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
