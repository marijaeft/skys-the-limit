import { FaFacebookF, FaInstagram, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo_skys from '../assets/logo_skys.webp';

export default function Footer() {
  return (
    <footer className="relative w-full bg-slate-800 overflow-hidden py-12 mt-auto">

      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-radial-atl blur-[120px] opacity-20 animate-smoke1"></div>
        <div className="absolute top-[-60%] left-[-60%] w-[220%] h-[220%] bg-radial-atl blur-[150px] opacity-15 animate-smoke2"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-8 items-start">

        <div className="flex flex-col items-center justify-center text-center">
          <Link to="/">
            <div className="w-[180px] md:w-[250px]">
              <img
                src={logo_skys}
                className="w-full h-auto mx-auto"
                alt="Sky's The Limit Logo"
              />
            </div>
          </Link>

          <p className="w-[150px] md:w-[250px] text-sm text-neutral-200 mt-2 font-light">
            Be the Best Version of Yourself.
          </p>
        </div>

        <div className="text-center sm:text-left">
          <h3 className="text-lg font-semibold text-gray-300 mb-2">Информации</h3>
          <ul className="text-gray-200 space-y-1">
            <li>
              <Link
                to="/about-us"
                className="hover:text-yellow-400 transition-colors duration-300"
              >
                За нас
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-yellow-400 transition-colors duration-300"
              >
                Контакт
              </Link>
            </li>
            <li>
              <Link
                to="/delivery"
                className="hover:text-yellow-400 transition-colors duration-300"
              >
                Испорака, Враќање, Замена
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex justify-center sm:justify-end space-x-4 sm:space-x-6 text-xl">
          {[{
            icon: <FaFacebookF />,
            href: "https://www.facebook.com/profile.php?id=100089244623048",
            label: "Facebook"
          }, {
            icon: <FaInstagram />,
            href: "https://www.instagram.com/skysthelimit.mk/",
            label: "Instagram"
          }, {
            icon: <FaEnvelope />,
            href: "mailto:info@skysthelimit.com",
            label: "Email"
          }].map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              aria-label={item.label}
              target={item.label !== "Email" ? "_blank" : "_self"}
              rel={item.label !== "Email" ? "noopener noreferrer" : ""}
              className="p-3 rounded-full bg-gray-200 hover:bg-gray-400 text-stone-900 hover:text-yellow-50 transition-all duration-300 shadow-sm hover:shadow-lg"
            >
              {item.icon}
            </a>
          ))}
        </div>
      </div>

      <div className="relative mt-10 border-t border-gray-400/30 pt-4 text-center text-sm text-gray-200 font-light">
        © {new Date().getFullYear()} Sky’s the Limit. Сите права се задржани.
      </div>
    </footer>
  );
}
