import { useTranslations } from "next-intl";
import EmblaCarousel from "./EmblaCarousel/EmblaCarousel";

function Website() {
  const t = useTranslations("Main");
  const items = [
    {
      id: "1",
      price: "฿ 20,000",
      planName: "Basic Plan",
      color: ["#1CB80B", "#0D2B00"],
      features: [
        `${t("web1lang")}`,
         `${t("choose_lang")}`,
         `${t("3menu_main")}`,
         `${t("canchoose2menu")}`,
         `${t("promotion5img")}`,
         `${t("imgmore2")}`,
         `${t("swapimg")}`,
      ],
      image: "/plan1.png",
    },
    {
      id: "2",
      price: "฿ 25,000",
      planName: "Standard Plan",
      color: ["#55b9ef", "#001f30"],
      features: [
        `${t("web2lang")}`,
         `${t("choose_lang")}`,
         `${t("3menu_main")}`,
         `${t("canchoose2menu")}`,
         `${t("promotion10img")}`,
         `${t("imgmore2")}`,
         `${t("swapimg")}`,
      ],
      image: "/plan2.png",
    },
    {
      id: "3",
      price: "฿ 30,000",
      planName: "Premium Plan",
       color: ["#f58c40", "#4c2203"],
      features: [
        `${t("web3lang")}`,
         `${t("choose_lang")}`,
         `${t("3menu_main")}`,
         `${t("canchoose2menu")}`,
        `${t("promotion15img")}`,
        `${t("imgmore4")}`,
         `${t("swapimg")}`,
      ],
      image: "/plan3.png",
    },
    {
      id: "4",
      price: "ติดต่อเรา",
      planName: "Enterprise Plan",
      color: ["#7d7d7d", "#2d2d2d"],
      features: [
        `${t("webmutilang")}`,
         `${t("choose_lang")}`,
         `${t("3menu_main")}`,
        `${t("custommenu")}`,
        `${t("promotioncustomimg")}`,
        `${t("imgmorecustom")}`,
         `${t("swapimg")}`,
      ],
      image: "/plan4.png",
    },
  ];

  return <EmblaCarousel items={items} />;
}

export default Website;
