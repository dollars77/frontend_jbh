import Image from "next/image";
import { useTranslations } from 'next-intl';


import CategoryTabs from './test/page';
import DaisyTab from "./components/DaisyTab";

import { social_links } from "./function/social_links";
import HeaderSilder from "./components/Header_Silder/HeaderSilder";

function Main() {
    const t = useTranslations('Main');
 

    return (
        <div className="">
            <div className="mx-auto relative">
                <HeaderSilder/>
                <h1 className="font-semibold text-2xl lg:text-4xl text-center mt-5" style={{ zIndex: "4", position: "relative" }}>
                    {t("headtxt1")}
                </h1>
                <h1 className="text-sm lg:text-lg text-center mt-3 " style={{ zIndex: "4", position: "relative" }}>
                    {t("headtxt2")}
                </h1>
                <h1 className="text-sm lg:text-lg text-center " style={{ zIndex: "4", position: "relative" }}>
                    {t("headtxt2_2")}
                </h1>
                <div className="text-center my-2 lg:my-5 " style={{ zIndex: "4", position: "relative" }}>
                    <h1 className="drop-shadow-[0_2px_1px_#c9c9c9] text-center bg-gradient-to-r from-red-600 to-orange-400 inline-block text-transparent bg-clip-text text-2xl lg:text-2xl py-1 font-extrabold">
                        {t("headtxt3")}
                    </h1>
                </div>

                <div className="relative" >
                    <Image
                        src="/chip_casino_icon.png"
                        width={133}
                        sizes="100vw"
                        height={133}
                        alt={"JBH"}
                        className="absolute -left-10 opacity-35 lg:opacity-100 lg:left-24 -top-24 w-24 updown1"
                    />
                    <Image
                        src="/slot_icon.png"
                        width={500}
                        sizes="100vw"
                        height={412}
                        alt={"JBH"}
                        className="absolute right-3 lg:right-24 -top-16 lg:-top-2 w-28 lg:w-32 anime_LtoR opacity-35 lg:opacity-100"
                    />

                </div>


                <div className="btn_login_main my-2" >
                    <div className="-btn-actions">
                        <a href="#package" className="btn_login -register-btn">
                            <div className="-glow-container"></div>

                            <img
                                src="/btn/button-card.png"
                                className="-card img-fluid"
                                alt="๋JBH button card image png"
                                width="111"
                                height="121"
                            />

                            <img
                                src="/btn/button-chips-1.png"
                                className="-ball img-fluid"
                                alt="๋JBH button ball image png"
                                width="134"
                                height="130"
                            />

                            <img
                                src="/btn/button-dice.png"
                                className="-dice img-fluid"
                                alt="๋JBH button dice image png"
                                width="103"
                                height="92"
                            />

                            <img
                                src="/btn/button-awesome-bg.png"
                                className="-button-bg"
                                alt="๋JBH button awesome bg image png"
                                width="300"
                                height="77"
                            />

                            {/* <span className={"-text "+`${locale === "th" ? "" : "text-sm"}`}> */}
                            <span className={"-text "}>
                                <div className="textwidget">{t("price/package")}</div>
                            </span>
                        </a>
                    </div>
                </div>

                <CategoryTabs />
                {/* <div className="relative w-full lg:w-3/4 mx-auto my-3 lg:my-10" id="package">
                    <Image src={"/line_animation.gif"} width={1000} style={{ filter: "drop-shadow(16px 16px 20px red) invert(55%)" }}
                        height={1}
                        alt={"JBH"}

                        className="w-full h-1 rounded-full" />
                </div> */}
                <div className="relative w-full lg:w-3/4 mx-auto my-4 scroll-mt-20" id="package" ><DaisyTab /></div>

                <footer className="bg-[#08182b] px-4 lg:px-0  py-5 text-white w-full">
                    <div className="grid gap-2 grid-cols-1 md:grid-cols-2 w-full lg:w-3/4 mx-auto">
                        <div className="flex flex-col justify-center mx-auto">
                            <div className='relative mb-3'>
                                <Image
                                    width={512}
                                    height={512}
                                    alt={"JBH"}
                                    src="/jbh_logo.png"
                                    className="w-20 h-full"
                                />
                            </div>
                            <span className="text-sm md:text-base">{t("footertxt1")}</span>
                        </div>
                        <div className="flex flex-col gap-2 justify-center lg:justify-end  text-center lg:text-right">
                            <div className="h-0.5 bg-white flex md:hidden"></div>
                            <span className="mb-2 ">{t("contact_us")}</span>
                            <a target="_blank" rel="noopener noreferrer " href={social_links.facebook} className="flex justify-center lg:justify-end">
                                <Image
                                    width={600}
                                    height={154}
                                    alt={"JBH"}
                                    src="/contact_icon/facebook_contact.png"
                                    className="w-52 lg:w-40"
                                />
                            </a>
                            <a target="_blank" rel="noopener noreferrer" href={social_links.line} className="flex justify-center lg:justify-end">
                                <Image
                                    width={600}
                                    height={154}
                                    alt={"JBH"}
                                    src="/contact_icon/line_contact.png"
                                    className="w-52 lg:w-40"
                                />
                            </a>
                            <a target="_blank" rel="noopener noreferrer" href={social_links.telegram} className="flex justify-center lg:justify-end">
                                <Image
                                    width={600}
                                    height={154}
                                    alt={"JBH"}
                                    src="/contact_icon/telegram_contact.png"
                                    className="w-52 lg:w-40"
                                />
                            </a>

                        </div>
                        <div></div>

                    </div>
                    <p className="text-center mx-auto text-xs lg:text-sm w-full">© Copyright JBH-DESIGN, 2016. All rights reserved.</p>
                </footer>
            </div>
        </div>
    );
}

export default Main;
