import React, { useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import { clearCart } from "../data/Cart";
import { useNavigate } from 'react-router-dom';

export default function OrderConfirmation() {
    const navigate = useNavigate();

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
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Нарачката е испратена!</h1>
                <p className="text-gray-600 mb-4">
                    Вашата нарачка е успешно испратена до <strong>Sky's The Limit</strong>.
                </p>
                <p className="text-gray-600 mb-6">
                    Очекувајте потврда на вашиот мејл за нејзино испраќање.
                </p>
                <p className="text-lg font-semibold text-gray-800">Ви благодариме!</p>
            </div>
        </div>
    );
}
