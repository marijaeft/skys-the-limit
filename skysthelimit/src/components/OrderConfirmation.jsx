import React, { useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import { clearCart } from "../data/Cart";
import { useNavigate, useLang } from '../i18n/routing.jsx';
import RichText from '../i18n/RichText.jsx';

export default function OrderConfirmation() {
    const navigate = useNavigate();
    const { t } = useLang();

    useEffect(() => {
        clearCart();
        const timer = setTimeout(() => {
            navigate("/");
        }, 8000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white border border-yellow-300 rounded-2xl shadow-lg p-8 max-w-md text-center">
                <div className="flex justify-center mb-4 text-yellow-500">
                    <CheckCircle className="w-12 h-12" />
                </div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{t("confirmation.title")}</h1>
                <p className="text-gray-600 mb-4">
                    <RichText k="confirmation.sent" b="font-bold" />
                </p>
                <p className="text-gray-600 mb-6">
                    {t("confirmation.expect")}
                </p>
                <p className="text-lg font-semibold text-gray-800">{t("confirmation.thanks")}</p>
            </div>
        </div>
    );
}
