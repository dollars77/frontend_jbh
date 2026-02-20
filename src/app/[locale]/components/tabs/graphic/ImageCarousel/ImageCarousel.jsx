"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import ImageCard from "../ImageCard";

export default function ImageCarousel({ items = [] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    skipSnaps: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

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

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (index) => emblaApi?.scrollTo(index),
    [emblaApi],
  );

  return (
    <div className="wrap">
      {/* แถบล่าง: dots ซ้าย / arrows ขวา */}
      <div className="bottomBar">
        <div className="dots" aria-label="Carousel Pagination">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === selectedIndex ? "isActive" : ""}`}
              onClick={() => scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === selectedIndex ? "true" : "false"}
            />
          ))}
        </div>

        <div className="controls">
          <button
            className="btn_silder"
            onClick={scrollPrev}
            aria-label="Previous"
          >
            ‹
          </button>
          <button className="btn_silder" onClick={scrollNext} aria-label="Next">
            ›
          </button>
        </div>
      </div>
      <div className="viewport" ref={emblaRef}>
        <div className="container-carousel">
          {items.map((item) => (
            <div className="slide " key={item.id}>
              <ImageCard item={item} />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .wrap {
          position: relative;
        }

        .viewport {
          overflow: hidden;
          border-radius: 18px;
        }

        .container-carousel {
          display: flex;
          gap: 12px;
          padding: 4px;
          width: 85%;
        }

        /* มือถือ: 1 การ์ด/สไลด์ */
        .slide {
          flex: 0 0 100%;
          min-width: 0;
        }
        /* ipad: 2 การ์ด/สไลด์ */
        @media (min-width: 768px) {
          .slide {
            flex: 0 0 calc((100% - 24px) / 2);
          }
        }
        /* PC: 3 การ์ด/สไลด์ */
        @media (min-width: 1024px) {
          .slide {
            flex: 0 0 calc((100% - 24px) / 3);
          }
          .container-carousel {
            width: 85%;
          }
        }

        .bottomBar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        /* dots ซ้ายล่าง */
        .dots {
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          border: 0;
          padding: 0;
          cursor: pointer;
          background: rgba(255, 255, 255, 0.25);
          transition:
            transform 120ms ease,
            background 120ms ease,
            width 120ms ease;
          background: #bcbcbc;
        }

        .dot.isActive {
          background: rgba(255, 255, 255, 0.9);
          width: 18px;
          transform: translateY(-0.5px);
          background: #e8000b;
        }

        /* arrows ขวาล่าง */
        .controls {
          display: flex;
          gap: 8px;
          justify-content: flex-end;
        }

        .btn_silder {
          width: 40px;
          height: 36px;
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.18);
          background: #dbdbdb;
          cursor: pointer;
          font-size: 20px;
          line-height: 0;
        }

        .btn_silder:active {
          transform: translateY(1px);
        }
      `}</style>
    </div>
  );
}
