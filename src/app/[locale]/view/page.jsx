"use client";
import { useState, useEffect } from "react";
import api from "@/config/api";
import config from "@/config/configapi";
import { useRouter } from "next/navigation";

export default function ProxyViewer() {
  const [url] = useState(sessionStorage.getItem("externalUrl"));
  const [proxyUrl, setProxyUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const loadSite = async () => {
    if (!url.trim()) return;

    setLoading(true);
    setError("");
    setProxyUrl(""); // clear previous content

    try {
      // วิธีที่ 1: ใช้ api.post และได้ HTML กลับมา
      const response = await api.post(`api/website/getWebsite_URL`, {
        url: url,
      });

      // ถ้า response เป็น HTML string ต้องสร้าง blob URL
      if (typeof response.data === "string") {
        const blob = new Blob([response.data], { type: "text/html" });
        const blobUrl = URL.createObjectURL(blob);
        setProxyUrl(blobUrl);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      setError(
        "เกิดข้อผิดพลาดในการโหลดเว็บไซต์: " +
          (err.response?.data?.error || err.message)
      );
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSite();
  }, []);

  // Cleanup blob URL when component unmounts
  const cleanupBlobUrl = () => {
    if (proxyUrl && proxyUrl.startsWith("blob:")) {
      URL.revokeObjectURL(proxyUrl);
    }
  };

  useEffect(() => {
    return cleanupBlobUrl;
  }, [proxyUrl]);

  return (
    <div style={containerStyle} className="-mt-3 md:-mt-2 lg:-mt-7">
      {/* Header with URL input */}
      <div style={headerStyle}>
        <div style={inputGroupStyle}>
          <button
            onClick={() => router.back()}
            className=" text-shadow-1 text-white font-bold md:py-2 md:px-4 py-1 px-2 my-1 ml-2 rounded-md inline-flex items-center border-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="29"
              height="29"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="scale-75 md:scale-100"
            >
              <path d="M11 17l-5-5 5-5M18 17l-5-5 5-5" />
            </svg>
            <p className="ml-0.5 md:ml-2">ย้อนกลับ</p>
          </button>
        </div>
      </div>

      {/* Content area */}
      <div style={contentStyle}>
        {loading ? (
          <div className="absolute top-0 left-0 w-full h-full bg-black/10 flex items-center justify-center z-50">
            <span className="loading loading-spinner loading-xl rounded-full  border-t-4 text-red-600 border-solid"></span>
          </div>
        ) : (
          <>
            {proxyUrl ? (
              <iframe
                src={proxyUrl}
                style={iframeStyle}
                title="Proxied Website"
                onLoad={() => setLoading(false)}
                onError={(e) => {
                  setLoading(false);
                  setError("ไม่สามารถโหลดเว็บไซต์ได้");
                  console.error("Iframe error:", e);
                }}
              />
            ) : (
              <div style={placeholderStyle}>
                <div>
                  <h2 style={{ color: "#666", marginBottom: "16px" }}>
                    🌐 Website comingsoon
                  </h2>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// Styles
const containerStyle = {
  width: "100%",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  fontFamily: "system-ui, -apple-system, sans-serif",
};

const headerStyle = {

  background: "linear-gradient(135deg, rgb(151 0 0) 0%, rgb(249 193 193) 100%)",
  borderBottom: "1px solid #ddd",
  color: "white",
};

const inputGroupStyle = {
  display: "flex",
  gap: "1px",
  alignItems: "center",
};

const inputStyle = {
  flex: 1,
  padding: "12px 16px",
  border: "2px solid #e1e5e9",
  borderRadius: "8px",
  fontSize: "16px",
  outline: "none",
  transition: "border-color 0.2s",
};

const buttonStyle = {
  padding: "12px 24px",
  background: "#28a745",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontSize: "16px",
  fontWeight: "600",
  transition: "background-color 0.2s",
  whiteSpace: "nowrap",
};

const quickLinkStyle = {
  padding: "8px 12px",
  background: "#f8f9fa",
  color: "#495057",
  border: "1px solid #dee2e6",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "14px",
  width: "100%",
  textAlign: "left",
  transition: "background-color 0.2s",
};

const errorStyle = {
  marginTop: "12px",
  padding: "12px",
  background: "rgba(255, 255, 255, 0.1)",
  borderRadius: "6px",
  color: "#ffebee",
};

const contentStyle = {
  flex: 1,
  position: "relative",
  background: "#f8f9fa",
};

const iframeStyle = {
  width: "100%",
  height: "100%",
  border: "none",
  background: "white",
};

const placeholderStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  textAlign: "center",
  padding: "40px",
};
