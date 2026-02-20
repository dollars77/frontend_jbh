"use client";

import { usePathname } from "next/navigation";

// const LOCALES = ["th", "en", "mm"];
const LOCALES = ["th", "mm"];

const useLocaleFromPath=()=> {
  const pathname = usePathname(); // ✅ hook อยู่ถูกที่
  const seg = pathname.split("/")[1];

  return LOCALES.includes(seg) ? seg : "th";
}
export default useLocaleFromPath;

// export function useLocaleFromPath(pathname = "") {
//   const seg = pathname.split("/")[1];
//   return LOCALES.includes(seg) ? seg : "th";
// }