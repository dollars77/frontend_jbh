"use client";
import React from "react";
import Lottie from "lottie-react";
import loading_anime from "@/public/json/loading_animetion3.json";
import loading_anime2 from "@/public/json/loading_animetion2.json";
import loading_anime3 from "@/public/json/loading_animetion.json";

function Loading({ id }) {
  return (
    <div className=" w-1/6 mx-auto flex justify-center items-center h-screen">
      <Lottie animationData={id===1?loading_anime:id===2?loading_anime2:loading_anime3} loop={true} />
    </div>
  );
}

export { Loading };
