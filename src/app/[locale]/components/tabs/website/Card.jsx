import Image from "next/image";
import { social_links } from "../../../function/social_links";
export default function Card({ item }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-[0_18px_10px_rgba(0,0,0,0.18)] h-[590] md:h-[600] lg:h-[680px]">
      <div
        className={
          `relative bg-gradient-to-b  px-6 pb-4 pt-5 text-center text-white ` +
          `${item.color}`
        }
      >
        <div className="mb-3 flex items-center justify-center gap-3 relative">
          <Image
            src={item.image}
            width={512}
            height={512}
            alt="JBH"
            className="w-24  lg:w-28 h-full drop-shadow-[0_3px_20px_rgba(0,0,0,0.4)]"
          />
        </div>

        <div className="text-4xl font-extrabold tracking-tight">
          {item.price}
        </div>
        <div className="mt-1 text-lg font-semibold">{item.planName}</div>
      </div>
      <div className="relative w-full " id="package">
        <Image
          src={"/line_animation.gif"}
          width={1000}
          style={{ filter: "drop-shadow(16px 16px 20px red) invert(15%)" }}
          height={1}
          alt={"JBH"}
          className="w-full h-1 "
        />
      </div>
      {/* Body */}
      <div className="px-4 lg:px-7 py-6">
        <ul className="space-y-2 lg:space-y-4">
          {item.features.map((text, idx) => (
            <li key={idx} className="flex items-start gap-3 text-slate-700 ">
              <div className="mt-0.5 grid   place-items-center  relative w-1/12">
                {/* <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path
                    d="M20 6L9 17l-5-5"
                    stroke="white"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg> */}
                <Image
                  src={"/check_mark.png"}
                  width={50}
                  height={50}
                  alt="JBH"
                  className="w-14 md:w-10 lg:w-9 h-full"
                />
              </div>
              <span className="text-[15px] lg:text-[17px] leading-6 text-left w-11/12">
                {text}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex justify-center">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={social_links.line}
            className="rounded-xl bg-green-600 px-6 py-3 text-white shadow-md transition hover:bg-green-700 active:scale-[0.99] text-[15px] lg:text-[17px] "
          >
            ติดต่อเรา
          </a>
        </div>
      </div>
    </div>
  );
}
