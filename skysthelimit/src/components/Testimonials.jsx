import { useEffect, useState } from "react";
import testimonials from "../data/testimonials-data.js";

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const testimonial = testimonials[index];

  return (
    <div className="flex justify-center items-center min-h-[150px] px-4 sm:px-6 md:px-8 py-2 -mt-16">
      <div className=" z-40 relative w-full max-w-[500px] h-[300px] sm:h-[280px]">
        <div className="absolute top-[80px] left-0 w-[95%] h-[200px] sm:w-[460px] sm:h-[190px] bg-white rounded-full shadow-md mx-auto"></div>

        <div className="absolute top-[10px] left-[12%] w-[95px] h-[95px] sm:w-[130px] sm:h-[130px] bg-white rounded-full shadow-md mt-10"></div>
        <div className="absolute top-[28px] left-[38%] w-[140px] h-[140px] sm:w-[180px] sm:h-[180px] bg-white rounded-full shadow-md mt-3"></div>
        <div className="absolute top-[40px] left-[72%] w-[85px] h-[85px] sm:w-[120px] sm:h-[120px] bg-white rounded-full shadow-md mt-10 -ml-2"></div>

        <div className="absolute top-[115px] left-[10%] right-[10%] z-10 text-center overflow-hidden animate-fade-in">
          <div className="flex justify-between items-center mb-3 text-sm sm:text-base font-medium text-gray-700">
            <h2 className="text-neutral-800 ">{testimonial.name}</h2>
            <span className="text-yellow-500">{"★".repeat(5)}</span>
          </div>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed italic pt-6">
            {testimonial.text}
          </p>
        </div>
      </div>
    </div>
  );
}
