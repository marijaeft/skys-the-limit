import logo from "../assets/peperutka.webp";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full min-h-[500px]">
      <img 
        src={logo} 
        alt="Sky’s The Limit Logo" 
        className="w-24 h-24 animate-spin-slow mb-4"
      />
      <p className="text-gray-700 text-2xl text-yellow-400 font-medium">Loading...</p>
    </div>
  );
}
