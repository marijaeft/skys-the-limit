import gallery1 from "../assets/gallery1.webp";
import gallery2 from "../assets/gallery2.webp";
import gallery3 from "../assets/gallery3.webp";
import gallery4 from "../assets/gallery4.webp";
import gallery5 from "../assets/gallery5.webp";
import gallery6 from "../assets/gallery6.webp";
import gallery7 from "../assets/gallery7.webp";
import { useLang } from "../i18n/routing.jsx";
import RichText from "../i18n/RichText.jsx";

export default function AboutUs() {
    const { t } = useLang();
    const galleryImages = [gallery5, gallery3, gallery2, gallery4, gallery6, gallery7];

    return (
        <div className="relative bg-gray-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">

                <h1 className="text-4xl text-center mb-5 mt-5 font-light text-yellow-400 leading-snug pb-1">
                    {t("about.title")}
                </h1>

                <div className="relative bg-white rounded-3xl shadow-2xl p-6 sm:p-10 space-y-6 overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/assets/pattern.svg')] bg-contain bg-right-top opacity-10 pointer-events-none"></div>

                    <div className="relative space-y-4 sm:space-y-6 text-gray-800 text-base sm:text-lg leading-relaxed">
                        {["about.p1", "about.p2", "about.p3", "about.p4"].map((k) => (
                            <p key={k}>
                                <RichText k={k} b="font-semibold text-yellow-600" i="italic text-gray-500" />
                            </p>
                        ))}
                    </div>
                </div>

                <div className="mt-12">
                    <div className="flex overflow-x-auto space-x-4 sm:space-x-6 pb-4 scrollbar-hide">
                        {galleryImages.map((img, idx) => (
                            <div
                                key={idx}
                                className="flex-shrink-0 w-80 sm:w-96 md:w-[20rem] rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
                            >
                                <img
                                    src={img}
                                    alt={t("about.galleryAlt", { n: idx + 1 })}
                                    className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-xl"
                                />
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
