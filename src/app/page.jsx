import Image from "next/image";
import { useTranslations } from "next-intl";

import EmblaCarousel from "@/components/EmblaCarousel/EmblaCarousel";
import SL1 from "@/public/head_carousel/SL_1.jpg";
import SL2 from "@/public/head_carousel/SL_2.jpg";
import SL3 from "@/public/head_carousel/SL_3.jpg";
import SL4 from "@/public/head_carousel/SL_4.jpg";

function Main() {
  const t = useTranslations("Main");
  const slides = [SL1, SL2, SL3, SL4];
  const features = [
    {
      id: 1,
      title: "ประสบการณ์",
      description: "NetDesign มีประสบการณ์ด้านเว็บไซต์มากกว่า 20 ปี",
      icon: "https://netdesigngroup.com/storage/content/why_us/image-1738927060.svg",
      alt: "ประสบการณ์",
    },
    {
      id: 2,
      title: "ครอบคลุมทุกบริการ",
      description: "บริการด้านเว็บไซต์ทั้งบริการหลักและบริการเสริม",
      icon: "https://netdesigngroup.com/storage/content/why_us/image-1738927050.svg",
      alt: "ครอบคลุมทุกบริการ",
    },
    {
      id: 3,
      title: "ทีมงานมืออาชีพ",
      description: "มีทีมงานที่เป็นมืออาชีพในทุกขั้นตอน",
      icon: "https://netdesigngroup.com/storage/content/why_us/image-1738927080.svg",
      alt: "ทีมงานมืออาชีพ",
    },
    {
      id: 4,
      title: "ออกแบบเว็บไซต์",
      description: "ออกแบบเว็บไซต์ให้ได้ตาม Requirement",
      icon: "https://netdesigngroup.com/storage/content/why_us/image-1738927220.svg",
      alt: "ออกแบบเว็บไซต์",
    },
    {
      id: 5,
      title: "ให้คำปรึกษา",
      description: "ปรึกษาการเตรียมข้อมูลเริ่มพัฒนาเว็บไซต์อย่างถูกต้อง",
      icon: "https://netdesigngroup.com/storage/content/why_us/image-1738927140.svg",
      alt: "ให้คำปรึกษา",
    },
    {
      id: 6,
      title: "เจ้าหน้าที่ซัพพอร์ต",
      description: "มีเจ้าหน้าที่เทคนิคคอยช่วยเหลือ 24/7",
      icon: "https://netdesigngroup.com/storage/content/why_us/image-1738927175.svg",
      alt: "เจ้าหน้าที่ซัพพอร์ต",
    },
  ];
  return (
    <div>
      <div className="section pt-[76px] xl:pt-[120px]">
        <EmblaCarousel
          slides={slides}
          options={{ loop: true, align: "center" }}
          autoplayDelay={2500}
        />
        <h1>{t("title")}</h1>
        <div className="h-[calc(100vh-230px)] relative">
          <div className="relative h-full max-lg:flex max-lg:flex-col-reverse overflow-hidden ">
            <div
              className="com-splide-carousel splide gadgets-carousel h-full splide--fade splide--ltr splide--draggable is-active is-overflow is-initialized"
              id="splide01"
              role="region"
              aria-roledescription="carousel"
            >
              <div
                className="splide__track splide-carousel-wrapper h-full splide__track--fade splide__track--ltr splide__track--draggable"
                id="splide01-track"
                // style="padding-left: 0px; padding-right: 0px;"
                aria-live="polite"
                aria-atomic="true"
              >
                <div
                  className="splide__list splide-carousel-list h-full"
                  id="splide01-list"
                  role="presentation"
                >
                  <div
                    className="splide__slide splide-carousel-slide is-active is-visible"
                    id="splide01-slide01"
                    role="group"
                    aria-roledescription="slide"
                    aria-label="1 of 1"
                    // style="width: calc(100%); transform: translateX(0%);"
                  >
                    <div
                      className="splide-carousel-item h-full max-lg:flex max-lg:flex-col bg-no-repeat bg-cover bg-center"
                      // style="background-image: url(//netdesigngroup.com/modules/frontend/img/main-carousel.png)"
                    >
                      <div className="border-b border-gray-200/20 lg:absolute lg:left-16 xl:left-32 3xl:left-48 lg:top-1/2 lg:-translate-y-1/2 z-10 lg:max-w-lg p-8 rounded-lg text-white max-lg:bg-gradient-to-br max-lg:from-gray-100 max-lg:to-transparent max-lg:backdrop-blur-sm ">
                        <div className="max-lg:text-center">
                          <h2 className="text-4xl font-bold text-primary">
                            <span style={{ fontSize: "22px" }}>
                              One Stop Services{" "}
                              <span className="whitespace-nowrap">
                                {" "}
                                IT Solution
                              </span>
                            </span>
                          </h2>
                          <a
                            className="hidden lg:inline-block px-8 py-4 bg-gradient-to-r from-orange-500 to-primary text-white font-bold rounded-full hover:from-primary hover:to-orange-500 transition-all duration-300 transform hover:scale-105 shadow-lg"
                            href="#contactSection"
                          >
                            <span className="flex items-center">
                              ติดต่อเรา
                              <svg
                                className="w-5 h-5 ml-2"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M5 12h14M12 5l7 7-7 7"></path>
                              </svg>
                            </span>
                          </a>
                        </div>
                      </div>

                      <a className="flex-1" href="/contact-html">
                        <img
                          className="hidden sm:block max-lg:!aspect-[192/73] !aspect-[115.2/73] ml-auto lg:!w-[60%] !object-contain  "
                          src="https://netdesigngroup.com/storage/banner/image-1747199608.png"
                          alt="web dev"
                        />
                        <img
                          className="sm:hidden h-full w-full !object-contain "
                          src="https://netdesigngroup.com/storage/banner/mobile-1743138162.png"
                          alt="web dev"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <a
              className="flex items-center justify-center lg:hidden h-[45px] w-[130px] absolute bottom-10 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-primary text-white font-bold rounded-full hover:from-primary hover:to-orange-500 transition-all duration-300 transform hover:scale-105 shadow-lg"
              href="#contactSection"
            >
              <span className="flex items-center">
                ติดต่อเรา
                <svg
                  className="w-5 h-5 ml-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </span>
            </a>
          </div>
        </div>

        <div className=" lg:block hidden bg-[#FF8C01] sticky bottom-0">
          <div className="grid grid-cols-2 md:flex justify-center items-center relative">
            <a
              className="flex flex-col lg:flex-row justify-center items-center gap-y-2 gap-x-3 p-4 md:py-6 text-white transition-all duration-300 hover:bg-[#FF9D2C] relative z-10 md:border-r border-b md:border-b-0 border-white/20  hover:shadow-xl transform hover:scale-105"
              href="https://line.me/R/ti/p/@netdesigngroup"
              target="_blank"
            >
              <div className="bg-white rounded-full p-2 shadow-md">
                <svg
                  className="size-5 lg:size-8  text-green-500 transition-colors duration-300"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 4.269 8.846 10.036 9.608.391.084.922.258 1.057.592.121.303.079.778.039 1.085l-.171 1.027c-.053.303-.242 1.186 1.039.647 1.281-.54 6.911-4.069 9.428-6.967 1.739-1.907 2.572-3.843 2.572-5.992zm-18.988-2.595c.129 0 .234.105.234.234v4.153h2.287c.129 0 .233.104.233.233v.842c0 .129-.104.234-.233.234h-3.363c-.063 0-.119-.025-.161-.065-.043-.043-.068-.099-.068-.161v-5.236c0-.129.104-.234.233-.234h.838zm14.992 0c.129 0 .233.105.233.234v.842c0 .129-.104.234-.233.234h-2.287v.883h2.287c.129 0 .233.105.233.234v.842c0 .129-.104.234-.233.234h-2.287v.884h2.287c.129 0 .233.105.233.234v.842c0 .129-.104.234-.233.234h-3.363c-.063 0-.12-.025-.162-.065-.043-.043-.067-.099-.067-.161v-5.236c0-.129.104-.234.233-.234h3.363zm-10.442.001c.129 0 .234.104.234.233v5.236c0 .129-.105.234-.234.234h-.837c-.129 0-.234-.105-.234-.234v-5.236c0-.129.105-.233.234-.233h.837zm2.453 0c.129 0 .234.104.234.233v5.236c0 .129-.105.234-.234.234h-.837c-.129 0-.234-.105-.234-.234v-5.236c0-.129.105-.233.234-.233h.837zm2.453 0c.129 0 .234.104.234.233v5.236c0 .129-.105.234-.234.234h-.837c-.129 0-.234-.105-.234-.234v-5.236c0-.129.105-.233.234-.233h.837z"></path>
                </svg>
              </div>
              <span className="font-medium text-16 sm:text-18 lg:text-22 whitespace-nowrap">
                @netdesigngroup
              </span>
            </a>

            <a
              className="flex flex-col lg:flex-row justify-center items-center gap-y-2 gap-x-3 p-4 md:py-6 text-white transition-all duration-300 hover:bg-[#FF9D2C] relative z-10 md:border-r border-b md:border-b-0 border-white/20  hover:shadow-xl transform hover:scale-105"
              href="https://www.messenger.com/t/271869086169763"
              target="_blank"
            >
              <div className="bg-white rounded-full p-2 shadow-md">
                <svg
                  className="size-5 lg:size-8 text-blue-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C5.373 0 0 4.975 0 11.111c0 3.497 1.745 6.616 4.472 8.652V24l4.086-2.242c1.09.301 2.246.464 3.442.464 6.627 0 12-4.974 12-11.111C24 4.975 18.627 0 12 0zm1.193 14.963l-3.056-3.259-5.963 3.259L10.733 8l3.13 3.259L19.752 8l-6.559 6.963z"></path>
                </svg>
              </div>
              <span className="font-medium text-16 sm:text-18 lg:text-22 whitespace-nowrap">
                z.comwebsite
              </span>
            </a>

            <a
              className="flex flex-col lg:flex-row justify-center items-center gap-y-2 gap-x-3 p-4 md:py-6 text-white transition-all duration-300 hover:bg-[#FF9D2C] relative z-10 md:border-r border-b md:border-b-0 border-white/20  hover:shadow-xl transform hover:scale-105"
              href="tel:0641843967"
            >
              <div className="bg-white rounded-full p-2 shadow-md">
                <svg
                  className="size-5 lg:size-8 text-primary"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 22.621l-3.521-6.795c-.008.004-1.974.97-2.064 1.011-2.24 1.086-6.799-7.82-4.609-8.994l2.083-1.026-3.493-6.817-2.106 1.039c-7.202 3.755 4.233 25.982 11.6 22.615.121-.055 2.102-1.029 2.11-1.033z"></path>
                </svg>
              </div>
              <span className="font-medium text-16 sm:text-18 lg:text-22 whitespace-nowrap">
                064-184-3967
              </span>
            </a>

            <a
              className="flex flex-col lg:flex-row justify-center items-center gap-y-2 gap-x-3 p-4 md:py-6 text-white transition-all duration-300 hover:bg-[#FF9D2C] relative z-10  hover:shadow-xl transform hover:scale-105"
              href="mailto:contact@shopup.com"
            >
              <div className="bg-white rounded-full p-2 shadow-md">
                <svg
                  className="size-5 lg:size-8 text-primary"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  ></path>
                </svg>
              </div>
              <span className="font-medium text-16 sm:text-18 lg:text-22 whitespace-nowrap">
                contact@shopup.com
              </span>
            </a>
          </div>
        </div>
      </div>
      <section className="bg-gray-50 py-10">
        <div className="mx-auto container px-4">
          <h1 className="font-bold text-2xl md:text-3xl xl:text-4xl text-center text-gray-900 mb-10">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-3xl xl:text-5xl">
              NetDesign
            </span>
            <br />
            ผู้เชี่ยวชาญด้านเว็บไซต์ครบวงจรที่คุณวางใจได้
          </h1>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 font-bold pt-10 text-gray-900">
            {features.map((feature) => (
              <div
                key={feature.id}
                className="bg-gradient-to-br from-gray-100 to-transparent backdrop-blur-sm rounded-xl p-2 md:p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-lg group"
              >
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="bg-gray-100 p-4 rounded-full group-hover:bg-white transition-colors duration-300">
                    <div className="w-10 md:w-16 h-10 md:h-16 relative">
                      <Image
                        src={feature.icon}
                        alt={feature.alt}
                        fill
                        className="object-contain brightness-0 group-hover:brightness-100 transition-all duration-300"
                        sizes="(max-width: 768px) 40px, 64px"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-base md:text-xl mb-2 leading-tight">
                      {feature.title}
                    </h3>
                    <p className="leading-tight font-light text-sm md:text-base text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Main;
