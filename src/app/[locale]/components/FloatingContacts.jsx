"use client";

import Image from "next/image";
import { social_links } from "../function/social_links";

export default function FloatingContacts() {
  
  const items = [
    {
      key: "facebook",
      href: social_links.facebook,
      label: "Facebook",
      icon: (

          <Image
            src="/logo-facebook.png"
            width={467}
            sizes="100vw"
            height={156}
            alt={"JBH"}
          />
        
      ),
    },
    {
      key: "line",
      href: social_links.line,
      label: "LINE",
      icon: (
        <Image
            src="/logo-line.png"
            width={467}
            sizes="100vw"
            height={156}
            alt={"JBH"}
          />
      ),
    },
    {
      key: "telegram",
      href: social_links.telegram,
      label: "Telegram",
      icon: (
       <Image
            src="/Telegram_logo.webp"
            width={467}
            sizes="100vw"
            height={156}
            alt={"JBH"}
          />
      ),
    },
  ];

  return (
    <div className="fixed bottom-4 right-2 lg:right-4 z-50 flex flex-col gap-3">
      {items.map((it) => (
        <a
          key={it.key}
          href={it.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={it.label}
          title={it.label}
          className="
            flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-full
            bg-white p-0
           
          "
        >
          {it.icon}
        </a>
      ))}
    </div>
  );
}
