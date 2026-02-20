
import ImageCarousel from "./ImageCarousel/ImageCarousel";
import useLocaleFromPath from "../../../function/language";

const items = [
  {
    image: "/promotion_image_carousel/th_1.png",
  },
  {
    image: "/promotion_image_carousel/th_2.png",
  },
  {
    image: "/promotion_image_carousel/th_3.png",
  },
];

const items_mm = [
  {
    image: "/promotion_image_carousel/mm_1.png",
  },
  {
    image: "/promotion_image_carousel/mm_2.png",
  },
  {
    image: "/promotion_image_carousel/mm_3.png",
  }
];

function Graphic() {
    const locale = useLocaleFromPath();
  return (
    <ImageCarousel
      items={
        locale === "th" ? items :items_mm
      }
    />
  );
}

export default Graphic;
