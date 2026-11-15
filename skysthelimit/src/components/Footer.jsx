import { FaFacebookF, FaInstagram, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo_skys from '../assets/logo_skys.webp';

export default function Footer() {
  return (
    <footer className="relative w-full bg-[#07142b] overflow-hidden py-12 mt-auto">

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
                className="hover:text-amber-300 transition-colors duration-300"
              >
                За нас
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-amber-300 transition-colors duration-300"
              >
                Контакт
              </Link>
            </li>
            <li>
              <Link
                to="/delivery"
                className="hover:text-amber-300 transition-colors duration-300"
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
              className="p-3 rounded-full bg-white/10 ring-1 ring-white/15 text-amber-200 hover:bg-amber-300 hover:text-[#07142b] transition-all duration-300"
            >
              {item.icon}
            </a>
          ))}
        </div>
      </div>

      <div className="relative mt-10 border-t border-white/10 pt-4 text-center text-sm text-gray-200 font-light">
        © {new Date().getFullYear()} Sky’s the Limit. Сите права се задржани.
      </div>
    </footer>
  );
}
