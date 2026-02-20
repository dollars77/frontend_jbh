import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import Image from 'next/image';
import LanguageDropdown from './components/LanguageDropdown';
import { social_links } from './function/social_links';
import FloatingContacts from './components/FloatingContacts';
import { Anuphan, Noto_Sans_Thai,Noto_Sans_Myanmar } from "next/font/google";
import localFont from 'next/font/local'
 

// const myFont = localFont({
//   src: '/Pyidaungsu-2.5.3_Regular.ttf',
// })
const myFont = localFont({ src: './Pyidaungsu-2.5.3_Regular.ttf' })

export const metadata = {
  title: 'JBH-Studio',
  description: 'ขายธีมเว็บ รับออกแบบเว็บไซต์ครบวงจร รองรับทุกอุปกรณ์ สร้างเว็บไซต์ที่สวยงาม ใช้งานง่าย โหลดเร็ว',
  icons: {
    icon: '/jbh_512x512.ico',
    shortcut: '/jbh_512x512.ico',
    apple: '/jbh_512x512.ico',
  },
};
const anuphan = Anuphan({
  subsets: ["thai", "latin"],
  weight: ["100","200","300","400","500","600","700"],
  display: "swap",
  variable: "--font-anuphan",
});

// const notoThai = Noto_Sans_Thai({
//   subsets: ["thai", "latin"],
//   weight: ["100","200","300","400","500","600","700","800","900"],
//   display: "swap",
//   variable: "--font-noto-thai",
// });
const notoThai = localFont({
  src: './Kanit.ttf',
  display: "swap",
  variable: "--font-noto-thai",
});
const notoMyanmar = localFont({
  src: './Pyidaungsu-2.5.3_Regular.ttf',
  display: "swap",
  variable: "--font-noto-myanmar",
});

export default async function LocaleLayout({ children, params }) {

  const { locale } = await params;
  // const locale = params.locale === "mm" ? "mm" : "th";
  const messages = await getMessages();

  return (
    // <html lang={locale} data-theme="dark"  className={`${anuphan.variable} ${notoThai.variable}`}>
      <html lang={locale} data-theme="dark"  className={[
          notoThai.variable,
          notoMyanmar.variable,
          locale === "mm" ? "font-noto-myanmar" : "font-noto-thai",
        ].join(" ")}>  
      <body>
        <AntdRegistry>
          <NextIntlClientProvider messages={messages}>
            <div className="fixed bg-[#ffffff] py-1 lg:py-2  w-full z-50 drop-shadow-xl">
              <div className="px-3 md:px-8 lg:px-56 grid grid-cols-2 md:grid-cols-4 justify-between align-middle ">
                <div className="  flex align-middle my-auto col-span-1">
                  <div className='relative'>
                    <Image
                      width={512}
                      height={512}
                      alt={"JBH"}
                      src="/jbh_logo.png"
                      sizes="100vw"
                      className="w-12 h-auto"
                    />
                  </div>

                  <h1 className='font-extrabold text-lg lg:text-2xl my-auto ml-1'>| JBH DESIGN</h1>
                </div>
                <div className="my-auto flex justify-end col-span-1 md:col-span-3">
                  <div className='md:flex align-middle relative my-auto mr-4 hidden'>
                    {/* <p className='my-auto '>{t("contact_us")} :</p> */}
                    <a target="_blank" rel="noopener noreferrer" href={social_links.line} className='mx-2'>
                      <Image src='/line_txtbox.png' className="w-28" width={467}
                        height={156}
                        alt={"JBH"} />
                    </a>
                    <a target="_blank" rel="noopener noreferrer" href={social_links.facebook} className='mx-2'>
                      <Image src='/logo-facebook.png' className="w-10" width={467}
                        height={156}
                        alt={"JBH"} />
                    </a>
                    <a target="_blank" rel="noopener noreferrer" href={social_links.telegram} className=''>
                      <Image src='/Telegram_logo.webp' className="w-10" width={467}
                        height={156}
                        alt={"JBH"} />
                    </a>


                  </div>
                  <LanguageDropdown />
                </div>
              </div>
            </div>
            <div className='pt-16 lg:pt-24 bg-gray-50 min-h-screen body_background_front'>
              {children}
               <FloatingContacts />
            </div>

          </NextIntlClientProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
