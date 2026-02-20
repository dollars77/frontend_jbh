"use client";
import React from "react";
import EmblaCarousel from "@/components/EmblaCarousel/EmblaCarousel";
import SL1 from "@/public/head_carousel/SL_1_TH.jpg";
import SL2 from "@/public/head_carousel/SL_2_TH.jpg";
import SL3 from "@/public/head_carousel/SL_3_TH.jpg";
import SL4 from "@/public/head_carousel/SL_4_TH.jpg";
import SL1_MM from "@/public/head_carousel/SL_1_MM.jpg";
import SL2_MM from "@/public/head_carousel/SL_2_MM.jpg";
import SL3_MM from "@/public/head_carousel/SL_3_MM.jpg";
import SL4_MM from "@/public/head_carousel/SL_4_MM.jpg";
import useLocaleFromPath from "../../function/language";

function HeaderSilder() {
  const locale = useLocaleFromPath();
  const slides = [SL1, SL2, SL3, SL4];
  const slidesMM = [SL1_MM, SL2_MM, SL3_MM, SL4_MM];
  return (
    <EmblaCarousel
      slides={locale === "th" ? slides : slidesMM}
      options={{ loop: true, align: "center" }}
      autoplayDelay={2500}
    />
  );
}

export default HeaderSilder;
