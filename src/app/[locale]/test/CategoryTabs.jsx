"use client";
import config from "@/config/configapi";
import React, { useState, useEffect } from "react";
import WebsiteCard from "./WebsiteCard";
import Image from "next/image";
import { useTranslations } from "next-intl";

const VerticalTabs = ({ categories }) => {
    const t = useTranslations('Main');

  const [activeTab, setActiveTab] = useState(null);
  const URL_HOST = `${config.API_SERVER}`;

  useEffect(() => {
    if (categories.length > 0 && !activeTab) {
      setActiveTab(categories[0].id);
    }
  }, [categories, activeTab]);

  const activeCategory = categories.find((cat) => cat.id === activeTab);

  if (categories.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-600">No categories available</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  ">
      <div className="max-w-7xl mx-auto ">
        <div className="flex gap-1">
          <div className="w-20 sm:w-24 md:w-40 lg:w-52 flex-shrink-0 sticky top-2">
            <div className="bg-white rounded-md shadow-sm border border-gray-200 ">
              <div className="p-1 md:p-2">
                {categories.map((category, index) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveTab(category.id)}
                    className={`w-full flex flex-col items-center p-1 md:p-3 rounded-md transition-all duration-200 mb-1 md:mb-2 ${
                      activeTab === category.id
                        ? "bg-blue-50 text-blue-700 border-2 border-blue-200"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-2  border-gray-200"
                    }`}
                  >
                    <div className="mb-1 md:mb-2">
                      <div className="w-7 h-7 lg:w-10 lg:h-10 flex items-center justify-center">
                        <Image
                          width={512}
                          height={512}
                          alt={category.namecategory}
                          src={
                            index === 0
                              ? category.iconcategory
                              : URL_HOST + category.iconcategory
                          }
                        />
                      </div>
                    </div>
                    <span className="text-xs md:text-sm font-medium text-center leading-tight">
                      {category.namecategory}
                    </span>
                    <p className="text-[9px] md:text-xs text-gray-500">
                      ( {category.websites.length} {t("theme")})
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Content Area - Right Side */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-2 lg:p-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <p className="text-xs lg:text-base text-center font-semibold text-gray-900">
                    (Full Wordpress Landing Page) รับออกแบบเว็บไซต์ Wordpress
                    (Unlimited ฟรี!!)
                    ซึ่งท่านจะได้รับธีมตามที่โชว์ทั้งหมดทุกส่วนและท่านสามารถจัดการ
                    รูปภาพ,ข้อความ,พื้นหลังได้ทั้งหมด
                  </p>
                </div>
              </div>

              <div className=" p-2 lg:p-6 max-h-screen overflow-y-scroll">
                {activeCategory?.websites.length > 0 ? (
                  <div className="grid gap-2 lg:gap-4 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                    {activeCategory.websites.map((website) => (
                      <div
                        key={website.id}
                        className="p-1 lg:p-3 border border-gray-200 rounded-xl hover:shadow-md transition-shadow duration-200 hover:border-blue-300"
                      >
                        <div>
                          <WebsiteCard index={website.id} website={website} />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-gray-400 mb-2">
                      <div className="w-12 h-12 mx-auto text-4xl">📁</div>
                    </div>
                    <p className="text-gray-500">
                      No websites available for this category
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerticalTabs;
