import planners from "../data/Planners.js";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { addToCart } from "../data/Cart.js";

export default function Planners() {
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
    <div className="flex flex-col items-center justify-center w-full py-10 px-4">

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-7xl mt-10">
        {planners.map((planner) => (
          <div
            key={planner.id}
            onClick={(e) => handleProductClick(planner.id, e)}
            className="flex flex-col items-center text-center bg-white shadow-md p-4 rounded-xl w-full max-w-xs hover:shadow-2xl mx-auto cursor-pointer transition duration-300"
          >
            <img
              src={planner.images[0]}
              alt={planner.title}
              className="w-full h-auto mb-4 rounded-xl object-contain drop-shadow-md"
            />
            <p className="mb-2 font-light text-neutral-900 tracking-tight text-lg">
              {planner.title}
            </p>

            <div className="flex flex-col gap-2 items-center w-full">
              <div
                onClick={(e) => handleAdd(planner.id, e)}
                className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition"
              >
                <FaShoppingCart className="text-yellow-300" size={20} />
                <p className="uppercase text-sm font-semibold text-yellow-500 border border-yellow-300 rounded-full px-3 py-1">
                  Во кошничка
                </p>
              </div>
              <div className="flex gap-2 items-center">
                {planner.sale && planner.discountedPrice ? (
                  <>
                    <span className="line-through text-sm text-gray-500">
                      {planner.price}
                    </span>
                    <span className="text-lg font-bold text-red-500">
                      {planner.discountedPrice}
                    </span>
                  </>
                ) : (
                  <span className="text-lg font-bold text-yellow-900">
                    {planner.price}
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
