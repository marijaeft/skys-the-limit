import MainBannerValentines from "./MainBannerValentines";
import Testimonials from "./Testimonials";
import heartVideo from "../assets/heart-bg.mp4";

export default function BannerTestimonialsValentines() {
    return (
        <div className="banner-testimonials relative bg-red-950 overflow-hidden">
            <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-40 pointer-events-none z-0"
            >
                <source src={heartVideo} type="video/mp4" />
            </video>


            <MainBannerValentines />
        </div>
    );
}
