import { useEffect, useState } from "react";
import planners from "../data/planners-data";
import { useNavigate } from "react-router-dom";

export default function MainBanner() {
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % planners.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;

  return (
    <div className="relative flex justify-center pb-20 items-center px-4 overflow-hidden z-30">
      <div
        className={`relative w-full max-w-7xl 
              ${isMobile ? "mt-16" : isTablet ? "-mt-26" : "-mt-28"} 
              ${isMobile ? "h-[300px]" : isTablet ? "h-[400px]" : "h-[500px]"} 
              flex justify-center items-end`}
      >

        {planners.map((planner, i) => {
          let offset = i - currentIndex;

          if (offset < -Math.floor(planners.length / 2)) {
            offset += planners.length;
          } else if (offset > Math.floor(planners.length / 2)) {
            offset -= planners.length;
          }

          const isCenter = offset === 0;

          const baseTranslateX = isMobile ? 60 : isTablet ? 110 : 160;
          const baseTranslateY = isMobile ? 30 : isTablet ? 25 : 30;
          const baseScale = isMobile ? 1.1 : isTablet ? 1.2 : 1.4;

          const scale = isCenter ? baseScale : baseScale - Math.abs(offset) * 0.08;
          const zIndex = 100 - Math.abs(offset);
          const translateX = offset * baseTranslateX;
          const translateY = Math.abs(offset) * baseTranslateY;

          if (isMobile && Math.abs(offset) > 2) return null;

          return (
            <img
              key={planner.id}
              src={planner.bannerImg}
              alt={planner.title}
              onClick={() => navigate(`/product/${planner.id}`)}
              className="absolute transition-all duration-700 ease-in-out cursor-pointer hover:scale-105 "
              style={{
                zIndex,
                transform: `translateX(${translateX}px) translateY(${translateY}px) scale(${scale})`,
                maxWidth: isCenter ? "260px" : "220px",
                height: "auto",
                objectFit: "contain",
                opacity: Math.abs(offset) > 3 ? 0 : 1,
              }}
            />

          );
        })}
      </div>
    </div>
  );
}
