import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import config from "@/config/configapi";
import Lottie from "lottie-react";
import hot_icon_anime from "@/public/json/hot_icon_anime3.json";
const WebsiteCard = ({ website }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const URL_HOST = `${config.API_SERVER}`;
  const modalRef = useRef(null);
  const [tab, setTab] = useState("pc");
  const [imageUrls, setImageUrls] = useState({ pc: "", mobile: "" });
  const [errorStates, setErrorStates] = useState({ pc: false, mobile: false });

  const blurDataURL =
    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGBobHB0eH/xAAVAQEBAAAAAAAAAAAAAAAAAAABAv/EABgRAAMBAQAAAAAAAAAAAAAAAAABAhEh/9oADAMBAAIRAxEAPwCdABmXCwwsNBBH//Z";

  useEffect(() => {
    async function fetchImages() {
      try {
        setImageUrls({
          pc: website.imagepc ? URL_HOST + website.imagepc : null,
          mobile: website.imagemobile ? URL_HOST + website.imagemobile : null,
        });
      } catch (err) {
        console.error("โหลดรูปไม่สำเร็จ", err);
      }
    }
    fetchImages();
  }, []);

  const handleError = (type) => {
    setErrorStates((prev) => ({ ...prev, [type]: true }));
  };

  const openModal = () => {
    modalRef.current?.showModal();
    setTab("pc");
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
    setImageError(false);
  };

  const handleClickURL = (url) => {
    sessionStorage.setItem("externalUrl", `https://${url}`);
    window.location.href = "/view";
  };

  const isValidImage =
    website.imagepc &&
    website.imagepc !== null &&
    website.imagepc !== "" &&
    !imageError;

  return (
    <div className="group relative w-full max-w-sm mx-auto bg-gradient-to-br from-gray-600 via-gray-500 to-gray-700 rounded-xl overflow-hidden shadow-2xl transform hover:scale-105 active:scale-105 focus:scale-105 transition-all duration-300 ">
      {/* New Badge */}
      <div className="absolute top-2 right-2 z-20">
        {website.cover === 0 ? (
          <span></span>
        ) : website.cover === 1 ? (
          <div className="relative flex justify-end">
            <Image
              width={100}
              height={100}
              src="/hot-icon3.png"
              alt="Description"
              className="relative z-10 w-1/3 lg:w-1/2 zoominoutimgaka"
            />
          </div>
          // <Lottie
          //   className="w-5 md:w-14 "
          //   style={{ filter: "drop-shadow(0px 1px 2px black)" }}
          //   animationData={hot_icon_anime}
          //   loop={true}
          // />
        ) : (
          <span className="bg-sky-600 text-white text-xs font-semibold lg:font-bold px-2 lg:px-3 py-0.5 lg:py-1 rounded-full shadow-lg animate-pulse">
            NEW
          </span>
        )}
      </div>
      <dialog ref={modalRef} id="my_modal" className="modal ">
        <div className="modal-box w-11/12 lg:w-1/2 max-w-full p-2 lg:p-10">
          <form method="dialog" className="modal-backdrop ">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-white bg-gray-700">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg ml-3 lg:ml-0 text-white">
            {website.websitename || "Coming soon"}
          </h3>
          <div className="p-1 lg:p-6 ">
            {/* Tabs */}
            <div
              role="tablist"
              className="tabs tabs-border mb-4 text-center mx-auto flex justify-center "
            >
              <a
                role="tab"
                className={`tab ${tab === "pc" ? "tab-active" : ""} text-white `}
                onClick={() => setTab("pc")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
                <p className="ml-2">PC</p>
              </a>

              <a
                role="tab"
                className={`tab ${tab === "mobile" ? "tab-active" : ""} text-white`}
                onClick={() => setTab("mobile")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                  <line x1="12" y1="18" x2="12.01" y2="18"></line>
                </svg>
                <p className="ml-2">มือถือ</p>
              </a>
            </div>

            <div className="flex justify-center items-center h-full">
              {tab === "pc" && (
                <div>
                  {!errorStates[tab] && imageUrls[tab] ? (
                    <Image
                      src={imageUrls[tab]}
                      alt={tab}
                      width={1600}
                      height={900}
                      className="rounded-md object-contain w-full"
                      placeholder="blur"
                      blurDataURL={blurDataURL}
                      onError={() => handleError(tab)}
                    />
                  ) : (
                    <div className="text-gray-400 text-xl text-center py-10">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        className="text-center mx-auto "
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <path d="M20.4 14.5L16 10 4 20" />
                      </svg>
                      <p className="">No Image</p>
                    </div>
                  )}
                </div>
              )}
              {tab === "mobile" && (
                <div>
                  {!errorStates[tab] && imageUrls[tab] ? (
                    <Image
                      src={imageUrls[tab]}
                      alt={tab}
                      width={720}
                      height={1080}
                      placeholder="blur"
                      blurDataURL={blurDataURL}
                      className="rounded-md object-contain w-4/5 lg:w-2/4 mx-auto"
                      onError={() => handleError(tab)}
                    />
                  ) : (
                    <div className="text-gray-400 text-xl text-center py-10">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        className="text-center mx-auto "
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <path d="M20.4 14.5L16 10 4 20" />
                      </svg>
                      <p className="">No Image</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </dialog>

      {/* Main Image Container */}
      <div className="relative h-36 lg:h-44 overflow-hidden">
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 group-active:opacity-100 group-focus:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
          <button
            onClick={openModal}
            className="bg-white/90 hover:bg-white active:bg-white focus:bg-white text-gray-800 font-semibold py-2 px-5 rounded-lg shadow-lg transform translate-y-4 group-hover:translate-y-0 group-focus:translate-y-0 group-active:translate-y-0 opacity-0 group-hover:opacity-100 group-active:opacity-100 group-focus:opacity-100 transition-all duration-300 flex items-center space-x-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            <span>ดูรูปภาพ</span>
          </button>
        </div>
        {isValidImage ? (
          <Image
            src={URL_HOST + website.imagepc}
            alt={website.websitename}
            width={1920}
            height={1080}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              imageLoading ? "opacity-0" : "opacity-100"
            }`}
            onError={handleImageError}
            onLoad={handleImageLoad}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-800">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 bg-gray-600 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <p className="text-white text-sm font-medium">No Image</p>
            </div>
          </div>
        )}

        {/* Loading Overlay */}
        {imageLoading && isValidImage && (
          <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
      </div>

      {/* Website Name */}
      <div className="absolute bottom-1 left-1 lg:bottom-2 lg:left-2 z-10 ">
        <span className="bg-black/40 backdrop-blur-3xl text-orange-400 text-xs font-semibold px-3 py-1.5 rounded-lg shadow-lg">
          {website.websitename || "Coming soon"}
        </span>
        <div className="w-full mt-2">
          <button
            onClick={() => handleClickURL(website.websiteurl)}
            className="w-full  bg-[linear-gradient(#e9e9e9,#e9e9e9_50%,#fff)] group  h-8 lg:h-10 inline-flex transition-all duration-300 overflow-visible p-1 rounded-xl group"
          >
            <div className="w-full h-full bg-[linear-gradient(to_top,#ececec,#fff)] overflow-hidden shadow-[0_0_1px_rgba(0,0,0,0.07),0_0_1px_rgba(0,0,0,0.05),0_3px_3px_rgba(0,0,0,0.25),0_1px_3px_rgba(0,0,0,0.12)] p-0.5 lg:p-1 rounded-lg hover:shadow-none duration-300">
              <div className="w-full h-full  gap-x-0.5 gap-y-0.5 justify-center text-[#101010] bg-[linear-gradient(#f4f4f4,#fefefe)] group-hover:bg-[linear-gradient(#e2e2e2,#fefefe)] duration-200 items-center text-[18px] font-medium gap-4 inline-flex overflow-hidden px-2 lg:px-3 py-2 rounded-full black group-hover:text-orange-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#000000"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="scale-75 md:scale-100"
                >
                  <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                  <path d="M21 21l-6 -6" />
                </svg>
                <span className="text-xs lg:text-sm">ชมเว็บไซต์</span>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Decorative Elements */}
      {/* <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-4 left-4 w-2 h-2 bg-yellow-400 rounded-full opacity-60 animate-ping"></div>
        <div className="absolute bottom-8 right-6 w-1 h-1 bg-green-300 rounded-full opacity-40"></div>
      </div> */}

      {/* Shine Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000 ease-in-out pointer-events-none"></div>
    </div>
  );
};
export default WebsiteCard;
