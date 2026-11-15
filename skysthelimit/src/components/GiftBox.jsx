import Reveal from "./Reveal.jsx";
import gifts from "../data/Combo.js";
import { FaGift } from "react-icons/fa";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard.jsx";

export default function GiftBox() {
    return (
        <div className="flex flex-col items-center justify-center w-full py-10 px-4 mt-4">



            <Reveal className="text-center mb-12 mt-16">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-700">Комбо пакети</p>
                <h1 className="font-serif text-4xl sm:text-5xl text-stone-900 mt-3">Подари нешто значајно</h1>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl">
                {gifts.map((gift, i) => (
                    <ProductCard delay={(i % 4) * 90} key={gift.id} product={gift} image={gift.images[0]} />
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
