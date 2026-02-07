"use client";
import React from "react";
import Lottie from "lottie-react";
import loading_anime from "@/public/json/loading_animetion3.json";


const LoadingScreen =()=>{
  return (
    <div className=" w-1/6 mx-auto flex justify-center items-center h-screen ">
            <Lottie animationData={loading_anime} loop={true} />
          </div>
  );
}

export default LoadingScreen;
