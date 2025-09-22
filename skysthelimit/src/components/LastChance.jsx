import planners from "../data/planners-data.js";
import lastChance from "../data/LastChance.js";
import { FaShoppingCart } from "react-icons/fa";
import { addToCart } from '../data/Cart.js';
import { useNavigate } from "react-router-dom";

export default function LastChance() {
  const navigate = useNavigate();
  const popularPlanners = planners.filter((planner) =>
    lastChance.includes(planner.id)
  );

  const handleAdd = (id) => {
    addToCart(id);
  };
  const handleProductClick = (e, id) => {
    e.stopPropagation()
    navigate(`/product/${id}`)
  }

  return (
    <>
      <p className="text-2xl italic flex items-center justify-center pt-5 text-red-600 text-center px-4">
        Производи на попуст
      </p>
      <div className="flex flex-col items-center justify-center w-full py-10 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-7xl">
          {popularPlanners.map((p) => (
            <div
              key={p.id}
              onClick={(e) => handleProductClick(e, p.id)}
              className="flex flex-col items-center text-center bg-white shadow-md p-4 rounded-xl w-full max-w-xs hover:shadow-2xl mx-auto"
            >
              <img
                src={p.cardImage}
                alt={p.title}
                className="w-full h-auto mb-4 rounded"
              />
              <p className="mb-2 font-light text-neutral-900 tracking-tight text-lg">{p.title}</p>

              <div className="flex flex-col gap-1 items-center w-full">
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAdd(p.id);
                  }}
                  className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition"
                >

                  <FaShoppingCart className="text-yellow-300" size={20} />
                  <p className="uppercase text-sm font-semibold text-yellow-500 border border-yellow-300 rounded-full px-2 py-1">
                    Во кошничка
                  </p>
                </div>
                <div className="flex gap-2 items-center">
                  {p.discountedPrice && (
                    <span className="line-through text-sm text-gray-500">
                      {p.price}
                    </span>
                  )}
                  <span className="text-lg font-bold text-red-500">
                    {p.discountedPrice}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <button
            onClick={() => navigate('/sale')}
            className="justify-end px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-full shadow-md transition duration-300"
          >
            Види повеќе
          </button>
        </div>
      </div>

    </>
  );
}
