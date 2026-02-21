"use client";
import config from "@/config/configapi";
import React, { useState, useEffect } from "react";
import WebsiteCard from "./WebsiteCard";
import Image from "next/image";
import { useTranslations } from "next-intl";

const VerticalTabs = ({ categories }) => {
  const t = useTranslations("Main");


  const [activeTab, setActiveTab] = useState(null);
  const URL_HOST = `${config.API_SERVER}`;

  useEffect(() => {
    console.log(categories);
    
    if (categories.length > 0 && !activeTab) {
      setActiveTab(categories[0].id);
    }
  }, [categories, activeTab]);

  const activeCategory = categories.find((cat) => cat.id === activeTab);

  if (categories.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-600">{t("no_website_available")}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  ">
      <div className="max-w-7xl mx-auto ">
        <div className="flex gap-1">
            {/* Content Area - Left Side */}
          {/* <div className="w-28 md:w-40 lg:w-52 flex-shrink-0 sticky top-2 self-start max-h-[calc(100vh-16px)] overflow-y-auto"> */}
          <div className="w-28 md:w-40 lg:w-52 flex-shrink-0 sticky top-14 md:top-16 lg:top-20 self-start ">
            <div className="bg-white rounded-md shadow-sm border border-gray-200 ">
              <div className="p-1 md:p-2">
                {categories.map((category, index) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveTab(category.id)}
                    className={`w-full flex flex-col items-center py-1 md:py-3 rounded-md transition-all duration-200 mb-1 md:mb-2 ${
                      activeTab === category.id
                        ? "bg-blue-50 text-blue-800 border-2 border-blue-400"
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
                              : category.iconcategory !== null
                                ? URL_HOST + category.iconcategory
                                : categories[0].iconcategory
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
                  <p className="text-xs lg:text-base text-center  text-gray-900">
                    {t("tabheadtxt")}
                  </p>
                </div>
              </div>

              {/* <div className=" p-2 lg:p-6 max-h-screen overflow-y-scroll"> */}
              <div className=" p-2 lg:p-6   ">
                {activeCategory?.websites.length > 0 ? (
                  <div className="grid gap-2 lg:gap-4 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                    {activeCategory.websites.map((website) => (
                      <div
                        key={website.id}
                        className="p-1 lg:p-2 border border-gray-200 rounded-xl hover:shadow-md transition-shadow duration-200 hover:border-blue-300"
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
                    <p className="text-gray-500">{t("no_website_available")}</p>
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
