"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { social_links } from "../function/social_links";


export default function FloatingChatMenu() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);




  // ปิดเมนูเมื่อคลิกข้างนอก
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)"); // 1024px = Tailwind lg (แนว PC)

    // เปิดไว้ก่อนถ้าเป็น PC
    setOpen(mq.matches);

    // (ถ้าอยากให้ปรับตามตอน resize ด้วย ให้เปิดอันนี้)
    const onChange = (e) => setOpen(e.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  const items = [
    {
      label: "Facebook",
      href: social_links.facebook,
      iconSrc: "/logo-facebook.png",
      bg: "bg-blue-600",
    },
    {
      label: "LINE",
      href: social_links.line,
      iconSrc: "/logo-line.png",
      bg: "bg-green-500",
    },
    {
      label: "Telegram",
      href: social_links.telegram,
      iconSrc: "/Telegram_logo.webp",
      bg: "bg-sky-500",
    },
  ];

  return (
    <div ref={wrapRef} className="fixed bottom-3 left-3 lg:bottom-10 lg:left-10 z-50">
      {/* เมนูปุ่มแนวตั้ง */}
      <div
        className={[
          "absolute bottom-16 left-0 flex flex-col gap-3 items-start",
          "transition-all duration-200",
          open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-2 pointer-events-none",
        ].join(" ")}
      >
        {items.map((it) => (
          <a
            key={it.label}
            href={it.href}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-3 rounded-full shadow-lg transition-transform hover:-translate-y-0.5 active:scale-95"
          >
            <span
              className={`${it.bg} w-12 h-12 rounded-full grid place-items-center`}
            >
              <Image
                src={it.iconSrc}
                alt={it.label}
                width={50}
                height={50}
                className="object-contain "
                priority={false}
              />
            </span>

            {/* ป้ายชื่อ (โชว์ตอน hover) */}
            <span className="block text-sm font-medium bg-black/60 text-white px-3 py-2 rounded-full opacity-100 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
              {it.label}
            </span>
          </a>
        ))}
      </div>

      {/* ปุ่มหลัก */}
      <button
        type="button"
        aria-label="Open chat menu"
        onClick={() => setOpen((v) => !v)}
        className="  w-12 h-12  rounded-full shadow-xl bg-red-200 text-white grid place-items-center transition-transform active:scale-95 hover:scale-105"
      >   
      <div className="-btn-actionschat  w-14 h-14 "></div>     
       <Image
            src={open ? "/close_icon.png" : '/chat_icon_green.png'}
            alt={open ? "Close" : "Chat"}
            width={50}
            height={50}
            className="object-contain "
          />


      </button>
    </div>
  );
}
