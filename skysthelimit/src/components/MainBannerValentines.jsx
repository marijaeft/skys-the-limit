import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import annualPlanners from "../data/planners2026";

export default function MainBannerValentines() {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const isMobile = windowWidth < 640;

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % annualPlanners.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const currentPlanner = annualPlanners[currentIndex];

    return (
        <div className="relative flex flex-col justify-center items-center px-4 py-24 overflow-hidden z-30">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-red-500 to-pink-600 drop-shadow-2xl text-center mb-4 animate-pulse">
                Време е да одиш на Date.
            </h1>
            <p className="text-xl sm:text-2xl lg:text-3xl text-white/90 font-semibold text-center mb-12 animate-fadeIn">
                - со себе! Избери го твојот „тип“ сега со <span className="text-red-300 font-bold">-14%.</span>
            </p>

            <div className="mt-1 z-30 flex justify-center">
                <div className="flex flex-wrap justify-center gap-3">
                    {currentPlanner.traits.map((trait, index) => (
                        <span
                            key={index}
                            className="text-white text-md font-semibold px-4 py-1 rounded-full bg-white/10 backdrop-blur-sm shadow-sm"
                        >
                            {trait}
                        </span>
                    ))}
                </div>
            </div>

            <div className={`relative flex ${isMobile ? "flex-col gap-2" : "flex-row gap-0"} justify-center items-center w-full max-w-6xl`}>
                <div
                    onClick={() => navigate(`/product/${currentPlanner.id}`)}
                    className="cursor-pointer relative flex items-center justify-center transition-transform duration-500 hover:scale-105"
                >
                    <img
                        src={currentPlanner.plannerImg}
                        alt="Planner Cover"
                        className={`rounded-3xl w-[400px] sm:w-[500px] h-auto object-contain z-20 transform rotate-[-5deg]`}
                    />
                </div>

                <div
                    onClick={() => navigate(`/product/${currentPlanner.id}`)}
                    className={`cursor-pointer relative flex items-center justify-center transition-transform duration-500 hover:scale-105
            ${isMobile ? "" : "absolute sm:relative -ml-16 sm:ml-16 transform rotate-[5deg]"}`
                    }
                >
                    <img
                        src={currentPlanner.inImg}
                        alt="Planner Inside"
                        className={`rounded-3xl w-200] sm:w-[600px] h-auto object-contain z-10`}
                    />
                </div>
            </div>


            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[150%] pointer-events-none animate-floatingHearts">
                <span className="absolute w-6 h-6 bg-pink-400 rounded-full opacity-50 blur-md animate-heart1"></span>
                <span className="absolute w-4 h-4 bg-pink-500 rounded-full opacity-60 blur-sm animate-heart2"></span>
                <span className="absolute w-5 h-5 bg-red-400 rounded-full opacity-50 blur-sm animate-heart3"></span>
            </div>
        </div>
    );
}
