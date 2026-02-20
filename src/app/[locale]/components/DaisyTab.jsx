"use client";
import { useState } from "react";
import Website from "./tabs/website/Website";
import Graphic from "./tabs/graphic/Graphic";
import Video from "./tabs/video/Video";
import { useTranslations } from "next-intl";

export default function DaisyTab() {
  const t = useTranslations('Main');
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div className="w-full flex flex-col items-center bg-transparent" data-theme="light" style={{background:"transparent !important"}}>
      {/* Center the tabs container */}
      <div className="flex justify-center mb-4 tabs_package">
        <div role="tablist" className="tabs tabs-box tabs-lg ">
          <a role="tab"
            className={`tab   ${activeTab === 1 ? "tab-active" : ""}`}
            onClick={() => setActiveTab(1)}
          >
            {t("website")}
          </a>
          <a role="tab"
            className={`tab  ${activeTab === 2 ? "tab-active bg-red-600" : ""}`}
            onClick={() => setActiveTab(2)}
          >
            {t("graphic")}
          </a>
          <a role="tab"
            className={`tab ${activeTab === 3 ? "tab-active" : ""}`}
            onClick={() => setActiveTab(3)}
          >
             {t("video")}
          </a>
        </div>
      </div>

      {/* Center the content text */}
      <div className="p-4 text-center text-4xl w-full">
        {activeTab === 1 && (
          <Website/>
        )}
        {activeTab === 2 && <Graphic/>}
        {activeTab === 3 && <Video/>}
      </div>
    </div>
  );
}
