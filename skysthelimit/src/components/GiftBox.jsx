import gifts from "../data/Combo.js";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { FaGift } from "react-icons/fa";
import { addToCart } from "../data/Cart.js";
import { Link } from "react-router-dom";

export default function GiftBox() {
    const navigate = useNavigate();

    const handleAdd = (id, e) => {
        e.stopPropagation();
        addToCart(id);
    };

    const handleProductClick = (id, e) => {
        e.stopPropagation();
        navigate(`/product/${id}`);
    };

    return (
        <div className="flex flex-col items-center justify-center w-full py-10 px-4 mt-4">



            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-7xl mt-6">
                {gifts.map((gift) => (
                    <div
                        key={gift.id}
                        onClick={(e) => handleProductClick(gift.id, e)}
                        className="flex flex-col items-center text-center bg-white shadow-md p-4 rounded-xl w-full max-w-xs hover:shadow-2xl mx-auto cursor-pointer transition duration-300"
                    >
                        <img
                            src={gift.images[0]}
                            alt={gift.title}
                            className="w-full h-auto mb-4 rounded-xl object-contain drop-shadow-md"
                        />
                        <p className="mb-2 font-light text-neutral-900 tracking-tight text-lg">
                            {gift.title}
                        </p>

                        <div className="flex flex-col gap-2 items-center w-full">
                            <div
                                onClick={(e) => handleAdd(gift.id, e)}
                                className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition"
                            >
                                <FaShoppingCart className="text-yellow-300" size={20} />
                                <p className="uppercase text-sm font-semibold text-yellow-500 border border-yellow-300 rounded-full px-3 py-1">
                                    Во кошничка
                                </p>
                            </div>

                            <div className="flex gap-2 items-center">
                                {gift.sale && gift.discountedPrice ? (
                                    <>
                                        <span className="line-through text-sm text-gray-500">
                                            {gift.price}
                                        </span>
                                        <span className="text-lg font-bold text-red-500">
                                            {gift.discountedPrice}
                                        </span>
                                    </>
                                ) : (
                                    <span className="text-lg font-bold text-yellow-900">
                                        {gift.price}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="relative w-full max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-6 sm:p-8 mb-8 mt-12 text-center">
                <div className="flex flex-col items-center gap-3">
                    <FaGift className="text-yellow-500 text-4xl mb-1" />
                    <h2 className="text-xl sm:text-2xl font-light text-yellow-500">
                        Комбо пакет, корпоративни подароци, поголема нарачка?
                    </h2>
                    <p className="text-gray-700 text-base mb-4">
                        Доколку имаш идеја што ја немаме опфатено тука...
                    </p>
                    <Link
                        to="/contact"
                        className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-medium text-base px-5 py-2 rounded-xl shadow-sm transition duration-300"
                    >
                        Побарај понуда
                    </Link>
                </div>
            </div>
        </div>
    );
}
