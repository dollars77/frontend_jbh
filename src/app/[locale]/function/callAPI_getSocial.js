import api from "@/config/api";

// lib/socialLinks.server.js
const DEFAULT = {
  facebook: "https://www.facebook.com/",
  line: "https://www.line.me/",
  telegram: "https://web.telegram.org/",
};

function normalize(list) {
  const map = { ...DEFAULT };
  if (Array.isArray(list)) {
    for (const it of list) {
      const k = String(it?.name || "").toLowerCase().trim();
      const u = String(it?.nameurl || "").trim();
      if (k in map && u) map[k] = u;
    }
  }
  return map;
}

export async function getSocialLinks() {
  try {

    const res = await api.get("/api/weburl/get_social_link");
    if (!res.ok) return DEFAULT;
    const list = await res.json(); // array

    
    return normalize(list);
  } catch {
    return DEFAULT;
  }
}
