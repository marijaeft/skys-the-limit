import MainBanner from "./MainBanner";
import Countdown from "./Countdown.jsx";
import RichText from "../i18n/RichText.jsx";
import { Link, useLang } from "../i18n/routing.jsx";
import { FiArrowRight } from "react-icons/fi";

export default function BannerTestimonials() {
    const { t } = useLang();
    return (
        <div className="banner-testimonials relative overflow-hidden bg-[#0b0b0d]">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(ellipse_at_top,rgba(251,191,36,0.16),transparent_60%)]"
            />

            <div className="relative z-40 px-4 pt-28 sm:pt-32 text-center">
                <p className="inline-block rounded-full border border-amber-300/40 px-4 py-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">
                    {t("bf.eyebrow")}
                </p>
                <h1 className="font-serif text-4xl sm:text-6xl text-white mt-5">{t("bf.title")}</h1>
                <p className="max-w-xl mx-auto mt-4 text-white/75 text-base sm:text-lg">
                    <RichText k="bf.text" b="font-semibold text-amber-300" />
                </p>

                <div className="mt-7">
                    <Countdown />
                </div>

                <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Link
                        to="/sale"
                        className="group relative overflow-hidden inline-flex items-center gap-2 rounded-full bg-amber-400 hover:bg-amber-300 px-7 py-3.5 text-base sm:text-lg font-semibold text-stone-950 shadow-lg shadow-amber-500/20 transition active:scale-[0.97]"
                    >
                        <span className="shine-loop" aria-hidden="true" />
                        {t("bf.shop")}
                        <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                    </Link>
                    <Link
                        to="/gifts"
                        className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-base font-semibold text-white ring-1 ring-white/30 hover:bg-white/10 transition"
                    >
                        {t("bf.combo")}
                    </Link>
                </div>
            </div>

            <div className="relative -mt-16 sm:mt-0 lg:-mt-16 pb-6 sm:pb-10">
                <MainBanner />
            </div>
        </div>
    );
}
