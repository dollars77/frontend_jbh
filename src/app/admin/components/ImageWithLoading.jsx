import React, { useState } from "react";
import Image from "next/image";

function SafeImageComponent({ website, URL_HOST, imageEmpty }) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  // ตรวจสอบ URL ก่อนโหลด
  React.useEffect(() => {
    const checkImageUrl = async () => {
      if (!website.imagepc) {
        setHasError(true);
        setIsLoading(false);
        return;
      }

      const fullUrl = `${URL_HOST}${website.imagepc}`;
      
      try {
        // ใช้ fetch เพื่อเช็คว่ารูปมีจริงหรือไม่
        const response = await fetch(fullUrl, { method: 'HEAD' });
        if (response.ok) {
          setImageUrl(fullUrl);
        } else {
          console.warn(`Image not found: ${fullUrl}`);
          setHasError(true);
        }
      } catch (error) {
        console.warn(`Image fetch error: ${fullUrl}`, error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    checkImageUrl();
  }, [website.imagepc, URL_HOST]);

  const handleImageLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleImageError = () => {
    console.warn(`Image load failed: ${imageUrl}`);
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div className="h-12 lg:h-36 w-full overflow-hidden relative object-contain ">
      {website.imagepc && !hasError ? (
        <div className=" mx-auto relative h-full aspect-video ">
          {/* Loading state */}
          {isLoading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-100 rounded">
              <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
          )}
          
          {/* Image - แสดงเฉพาะเมื่อ URL ผ่านการเช็คแล้ว */}
          {imageUrl && (
            <Image
              src={imageUrl}
              width={384}
              height={216}
              alt={website.websitename || "Website Image"}
              className={`object-contain transition-opacity duration-300 ${
                isLoading ? 'opacity-0' : 'opacity-100'
              }`}
              onLoad={handleImageLoad}
              onError={handleImageError}
              unoptimized={true} // ป้องกัน Next.js optimization issues
            />
          )}
        </div>
      ) : (
        // Fallback image หรือ placeholder
        <div className="mx-auto relative h-full">
          <div className="bg-gray-100 rounded flex items-center justify-center h-full">
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
            ) : (
              <div className="text-center text-gray-400">
                <svg 
                  className="w-8 h-8 mx-auto mb-1" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" 
                    clipRule="evenodd" 
                  />
                </svg>
                <span className="text-xs">No Image</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Alternative: ใช้ regular img tag แทน Next.js Image
function SimpleImageComponent({ website, URL_HOST, imageEmpty }) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);

  React.useEffect(() => {
    if (website.imagepc) {
      setImageSrc(`${URL_HOST}${website.imagepc}`);
    } else {
      setHasError(true);
      setIsLoading(false);
    }
  }, [website.imagepc, URL_HOST]);

  const handleImageLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleImageError = () => {
    console.warn(`Image not found: ${imageSrc}`);
    setIsLoading(false);
    setHasError(true);
    // แสดงรูป placeholder แทน
    setImageSrc(imageEmpty);
  };

  return (
    <div className="h-12 lg:h-28 overflow-hidden relative">
      <div className="w-24 lg:w-56 mx-auto relative h-full">
        {/* Loading spinner */}
        {isLoading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-100 rounded">
            <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        )}
        
        {/* Regular img tag - ไม่มี optimization ที่อาจทำให้เกิด loop */}
        {imageSrc && (
          <img
            src={hasError ? imageEmpty : imageSrc}
            alt={website.websitename || "Website Image"}
            className={`w-full h-full object-contain transition-opacity duration-300 ${
              isLoading ? 'opacity-0' : 'opacity-100'
            }`}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        )}
      </div>
    </div>
  );
}

// Version with image existence check
function CheckedImageComponent({ website, URL_HOST, imageEmpty }) {
  const [imageState, setImageState] = useState({
    isLoading: true,
    hasError: false,
    imageExists: false
  });

  React.useEffect(() => {
    const checkImage = async () => {
      if (!website.imagepc) {
        setImageState({
          isLoading: false,
          hasError: true,
          imageExists: false
        });
        return;
      }

      const img = new window.Image();
      const imageUrl = `${URL_HOST}${website.imagepc}`;
      
      img.onload = () => {
        setImageState({
          isLoading: false,
          hasError: false,
          imageExists: true
        });
      };
      
      img.onerror = () => {
        console.warn(`Image not found: ${imageUrl}`);
        setImageState({
          isLoading: false,
          hasError: true,
          imageExists: false
        });
      };
      
      img.src = imageUrl;
    };

    checkImage();
  }, [website.imagepc, URL_HOST]);

  return (
    <div className="h-12 lg:h-28 overflow-hidden relative">
      <div className="w-24 lg:w-56 mx-auto relative h-full">
        {imageState.isLoading ? (
          // Loading state
          <div className="flex items-center justify-center bg-gray-100 rounded h-full">
            <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        ) : imageState.imageExists ? (
          // Image exists - show it
          <img
            src={`${URL_HOST}${website.imagepc}`}
            alt={website.websitename || "Website Image"}
            className="w-full h-full object-contain"
          />
        ) : (
          // Image doesn't exist - show placeholder
          <div className="bg-gray-100 rounded flex items-center justify-center h-full">
            <div className="text-center text-gray-400">
              <svg 
                className="w-8 h-8 mx-auto mb-1" 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path 
                  fillRule="evenodd" 
                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" 
                  clipRule="evenodd" 
                />
              </svg>
              <span className="text-xs">No Image</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export { SafeImageComponent, SimpleImageComponent, CheckedImageComponent };