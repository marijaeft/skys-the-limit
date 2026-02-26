import cards from "../data/cards-data.js";
import { useParams } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { addToCart } from "../data/Cart.js";
import { FiShoppingCart } from "react-icons/fi";
import { GiButterfly } from "react-icons/gi";

export default function CardDetails() {
    const { id } = useParams();
    const card = cards.find((c) => c.id === parseInt(id, 10));

    const [quantity, setQuantity] = useState(1);
    const [openImage, setOpenImage] = useState(null);
    const imgRef = useRef(null);

    if (!card) {
        return (
            <p className="text-center text-gray-500 text-lg mt-12">
                Производот не е пронајден.
            </p>
        );
    }

    const unitPrice = card.sale
        ? parseInt(card.discountedPrice.replace(/\D/g, ""), 10)
        : parseInt(card.price.replace(/\D/g, ""), 10);

    const totalPrice = unitPrice * quantity;

    const allImages = [card.cardImage];
    const currentIndex = allImages.indexOf(openImage);

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addToCart(card.id);
        }
    };

    useEffect(() => {
        const handleKey = (e) => {
            if (!openImage) return;
            if (e.key === "Escape") setOpenImage(null);
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [openImage]);

    return (
        <div className="max-w-7xl mx-auto px-6 py-16 font-sans">
            <h1 className="text-3xl sm:text-5xl text-center mb-16 mt-5 font-light text-yellow-400 leading-snug pb-1">
                {card.title}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start -mt-9">
                <div className="space-y-6">
                    <div className="rounded-2xl overflow-hidden shadow-lg">
                        <img
                            src={card.cardImage}
                            alt={card.title}
                            className="w-full h-auto object-cover transition duration-500 cursor-zoom-in"
                            onClick={() => setOpenImage(card.cardImage)}
                        />
                    </div>
                </div>

                <div className="space-y-8">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Карактеристики</h2>
                        <ul className="text-gray-600 leading-relaxed space-y-2">
                            {card.characteristics.map((c, idx) => (
                                <li key={idx} className="flex items-center gap-2">
                                    <GiButterfly className="text-grey-600 flex-shrink-0" size={20} />
                                    <span>{c}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex flex-col space-y-4">
                        <div className="flex items-center gap-4">
                            <label className="text-lg font-medium text-gray-700">Количина:</label>
                            <div className="flex items-center border border-gray-300 rounded-full overflow-hidden shadow-sm">
                                <button
                                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 transition disabled:opacity-50"
                                    disabled={quantity <= 1}
                                >
                                    −
                                </button>
                                <input
                                    type="number"
                                    min="1"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                    className="w-14 text-center text-lg border-x border-gray-200 outline-none focus:ring-0"
                                />
                                <button
                                    onClick={() => setQuantity((q) => q + 1)}
                                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <div className="text-2xl sm:text-3xl font-bold text-yellow-600 flex flex-col sm:flex-row sm:items-center gap-2">
                            {card.sale && (
                                <span className="text-sm sm:text-base text-gray-400 line-through">
                                    {(parseInt(card.price.replace(/\D/g, ""), 10) * quantity).toLocaleString("mk-MK")} ден
                                </span>
                            )}
                            <span>{totalPrice.toLocaleString("mk-MK")} ден</span>
                        </div>

                        <button
                            onClick={handleAddToCart}
                            className="bg-yellow-300 hover:bg-yellow-500 flex items-center gap-2 text-white text-lg font-semibold px-8 py-3 rounded-full shadow-lg transition duration-300"
                        >
                            <FiShoppingCart className="text-2xl" />
                            <span>Додади во кошничка</span>
                        </button>
                    </div>
                </div>
            </div>

            {openImage && (
                <div
                    onClick={() => setOpenImage(null)}
                    className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
                >
                    <div onClick={(e) => e.stopPropagation()} className="relative">
                        <img
                            ref={imgRef}
                            src={openImage}
                            alt="Zoomed"
                            className="max-w-full sm:max-w-5xl max-h-[70vh] sm:max-h-[90vh] rounded-xl shadow-2xl select-none"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}