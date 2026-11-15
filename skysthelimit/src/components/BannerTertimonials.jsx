import MainBanner from "./MainBanner";
import Testimonials from "./Testimonials";

export default function BannerTestimonials() {
    return (
        <div className="banner-testimonials relative overflow-hidden bg-[#cdd0d6]">

            <div className="relative">
                <MainBanner />
                <Testimonials />
            </div>

        </div>
    );
}
