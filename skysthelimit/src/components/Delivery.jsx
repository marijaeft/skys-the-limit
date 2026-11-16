import { DELIVERY_COST, FREE_SHIPPING_FROM } from '../data/delivery.js';
import { useLang } from '../i18n/routing.jsx';
import RichText from '../i18n/RichText.jsx';
export default function Delivery() {
    const { t } = useLang();
    return (
        <div className="relative bg-gray-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">

                <h1 className="text-3xl sm:text-4xl text-center mb-6 mt-6 font-light text-yellow-400 leading-snug pb-1">
                    {t("delivery.title")}
                </h1>

                <div className="relative bg-white rounded-3xl shadow-2xl p-6 sm:p-10 space-y-8 overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/assets/pattern.svg')] bg-contain bg-right-top opacity-5 pointer-events-none"></div>

                    <div className="relative space-y-4 text-gray-800 text-base sm:text-lg leading-relaxed">
                        <h2 className="text-2xl font-semibold text-yellow-600">{t("delivery.h1")}</h2>
                        <p>
                            <RichText k="delivery.p1" values={{ cost: DELIVERY_COST, free: FREE_SHIPPING_FROM }} />
                        </p>
                        <p>
                            <RichText k="delivery.p2" />
                        </p>
                        <p>
                            <RichText k="delivery.p3" />
                        </p>
                        <p>
                            <RichText k="delivery.p4" />
                        </p>
                    </div>

                    <div className="relative space-y-4 text-gray-800 text-base sm:text-lg leading-relaxed">
                        <h2 className="text-2xl font-semibold text-yellow-600">{t("delivery.h2")}</h2>

                        <div className="space-y-2">
                            <h3 className="text-lg font-semibold">{t("delivery.h3a")}</h3>
                            <p>
                            <RichText k="delivery.p5" />
                        </p>
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-lg font-semibold">{t("delivery.h3b")}</h3>
                            <p>
                            <RichText k="delivery.p6" />
                        </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
