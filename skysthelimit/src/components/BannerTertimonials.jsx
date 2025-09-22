import MainBanner from "./MainBanner";
import Testimonials from "./Testimonials";

export function BannerTestimonials() {
    return (
        <div className="banner-testimonials relative bg-slate-800 overflow-hidden">

            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-radial-atl blur-[120px] opacity-20 animate-smoke1"></div>
                <div className="absolute top-[-60%] left-[-60%] w-[220%] h-[220%] bg-radial-atl blur-[150px] opacity-15 animate-smoke2"></div>
            </div>

            <div className="relative">
                <MainBanner />
                <Testimonials />
            </div>

        </div>
    );
}
