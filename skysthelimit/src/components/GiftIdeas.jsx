import { Link } from "react-router-dom";
export default function GiftIdeas() {
  return (
    <div className="w-full max-w-6xl mx-auto bg-white border border-neutral-200 rounded-3xl px-6 sm:px-12 py-10 sm:py-14 flex flex-col sm:flex-row items-center justify-between gap-8 shadow-sm hover:shadow-md transition-all duration-300 mt-6 mb-12">

      <div className="text-center sm:text-left max-w-xl">
        <h2 className="text-3xl sm:text-4xl font-light text-neutral-900 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600">
          Ти треба идеја за подарок?
        </h2>
        <p className="text-md sm:text-lg text-neutral-500 mt-4 leading-relaxed">
          Ние креиравме уникатни gift box сетови, внимателно избрани за посебни моменти. Дозволи ни да ти помогнеме да подариш нешто значајно.
        </p>
      </div>

      <Link to="/gifts"><button className="text-neutral-800 text-md sm:text-lg font-medium border border-yellow-400 hover:border-black px-6 py-3 rounded-full transition-all duration-300 ">
        Одбери совршен подарок
      </button></Link>
    </div>
  );
}
