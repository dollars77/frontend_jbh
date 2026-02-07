
import ImageCarousel from "../graphic/ImageCarousel/ImageCarousel";
import useLocaleFromPath from "../../../function/language";

const items = [
  {
    image: "/promotion_image_carousel/video/th_video.png",
  },
];
const items_en = [
  {
    image: "/promotion_image_carousel/video/th_video.png",
  },
];
const items_mm = [
  {
    image: "/promotion_image_carousel/video/mm_video.png",
  },
];

function Video() {
    const locale = useLocaleFromPath();
  return (
    <ImageCarousel
      items={
        locale === "th" ? items : locale === "en" ? items_en : items_mm
      }
    />
  );
}

export default Video;
