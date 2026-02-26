import cards from "../data/cards-data.js";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { addToCart } from "../data/Cart.js";

export default function Cards() {
    const navigate = useNavigate();

    const handleAdd = (id, e) => {
        e.stopPropagation();
        addToCart(id);
    };

    const handleProductClick = (id, e) => {
        e.stopPropagation();
        navigate(`/card/${id}`);
    };

    return (
        <div className="flex flex-col items-center justify-center w-full py-10 px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-7xl mt-10">
                {cards.slice().reverse().map((card) => (
                    <div
                        key={card.id}
                        onClick={(e) => handleProductClick(card.id, e)}
                        className="flex flex-col items-center text-center bg-white shadow-md p-4 rounded-xl w-full max-w-xs hover:shadow-2xl mx-auto cursor-pointer transition duration-300"
                    >
                        <div className="w-full aspect-square mb-4 overflow-hidden rounded-xl shadow">
                            <img
                                src={card.cardImage}
                                alt={card.title}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <p className="mb-1 font-light text-neutral-900 tracking-tight text-lg">
                            {card.title}
                        </p>

                        <p className="mb-2 text-sm text-gray-500">
                            {card.subtitle}
                        </p>

                        <div className="flex flex-col gap-2 items-center w-full">
                            <div
                                onClick={(e) => handleAdd(card.id, e)}
                                className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition"
                            >
                                <FaShoppingCart className="text-yellow-300" size={20} />
                                <p className="uppercase text-sm font-semibold text-yellow-500 border border-yellow-300 rounded-full px-3 py-1">
                                    Во кошничка
                                </p>
                            </div>

                            <div className="flex gap-2 items-center">
                                {card.sale && card.discountedPrice ? (
                                    <>
                                        <span className="line-through text-sm text-gray-500">
                                            {card.price}
                                        </span>
                                        <span className="text-lg font-bold text-red-500">
                                            {card.discountedPrice}
                                        </span>
                                    </>
                                ) : (
                                    <span className="text-lg font-bold text-yellow-900">
                                        {card.price}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}