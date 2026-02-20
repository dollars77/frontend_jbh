"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

import icon_th from "@/public/th_icon.png";
import icon_en from "@/public/en_icon.png";
import icon_mm from "@/public/mm_icon.png";

const LOCALES = [
  { code: "th", label: "ไทย", icon: icon_th },
  // { code: "en", label: "English", icon: icon_en },
  { code: "mm", label: "မြန်မာ", icon: icon_mm },
];

function getLocaleFromPath(pathname) {
  const seg = pathname.split("/")[1];
  return LOCALES.some((l) => l.code === seg) ? seg : null;
}

function switchLocalePath(pathname, nextLocale) {
  const parts = pathname.split("/");
  const current = parts[1];

  // ถ้ามี locale อยู่แล้ว -> แทนที่
  if (LOCALES.some((l) => l.code === current)) {
    parts[1] = nextLocale;
    return parts.join("/") || "/";
  }

  // ถ้าไม่มี locale (เช่น /view) -> เติม prefix
  return `/${nextLocale}${pathname.startsWith("/") ? "" : "/"}${pathname}`;
}

export default function LanguageDropdown() {
  const router = useRouter();
  const pathname = usePathname();

  // กันหลังบ้าน
  if (pathname === "/login" || pathname.startsWith("/admin")) return null;

  const currentLocale = getLocaleFromPath(pathname) || "th";
  
  const currentLabel =
    LOCALES.find((l) => l.code === currentLocale)?.label ?? "ไทย";
  const currentIcon =
    LOCALES.find((l) => l.code === currentLocale)?.icon ?? "ไทย";
 
    

  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    function onClickOutside(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target))
        setOpen(false);
    }
    function onEsc(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  const onSelect = (nextLocale) => {
    setOpen(false);
    if (nextLocale === currentLocale) return;

    const nextPath = switchLocalePath(pathname, nextLocale);
    router.push(nextPath);
  };

  return (
    <div ref={wrapRef} className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-0.5 lg:gap-2 rounded-lg border border-gray-200 bg-white px-2 lg:px-3 py-0.5 lg:py-1 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <div className="relative w-full h-full">
          <Image
            width={512}
            height={512}
            alt={"JBH"}
            src={currentIcon}
            className="w-6 lg:w-7"
          />
        </div>
        <span className="">{currentLabel}</span>
        <svg
          className={`h-10 w-10 transition-transform ${open ? "rotate-180" : ""}`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open && (
        <div
          className="absolute right-0 z-50 mt-2 w-32 lg:w-36 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg"
          role="menu"
        >
          {LOCALES.map(({ code, label, icon }) => {
            const active = code === currentLocale;
            return (
              <button
                key={code}
                type="button"
                onClick={() => onSelect(code)}
                className={[
                  "flex w-full items-center justify-between px-3 py-3 text-left text-sm",
                  active
                    ? "bg-gray-100 font-semibold text-gray-900"
                    : "text-gray-700 hover:bg-gray-50",
                ].join(" ")}
                role="menuitem"
              >
                <div className="relative w-full h-full">
                  <Image
                    width={512}
                    height={512}
                    alt={"JBH"}
                    src={icon}
                    className="w-6 lg:w-7"
                  />
                </div>

                <span>{label}</span>
                {active}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
