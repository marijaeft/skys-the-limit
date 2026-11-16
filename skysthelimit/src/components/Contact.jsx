import { useLang } from "../i18n/routing.jsx";

export default function Contact() {
    const { t } = useLang();
    return (
        <div className="relative bg-gray-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">

                <h1 className="text-4xl font-light text-yellow-400 mt-5 mb-6">{t("contact.title")}</h1>
                <p className="text-lg text-gray-700 mb-12">
                    {t("contact.intro")}
                </p>

                <div className="bg-white shadow-2xl rounded-3xl p-8 sm:p-12">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                        {t("contact.sendEmail")}
                    </h2>
                    <p className="text-gray-600 mb-6">
                        {t("contact.writeUs")}
                        <a
                            href="mailto:info@skysthelimit.mk"
                            className="text-yellow-500 hover:text-yellow-600 font-medium px-1"
                        >
                            info@skysthelimit.mk
                        </a>
                    </p>

                    <form
                        action="mailto:info@skysthelimit.mk"
                        method="post"
                        encType="text/plain"
                        className="space-y-4"
                    >
                        <input
                            type="text"
                            name="name"
                            placeholder={t("contact.name")}
                            className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder={t("contact.email")}
                            className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                            required
                        />
                        <textarea
                            name="message"
                            placeholder={t("contact.message")}
                            rows="5"
                            className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                            required
                        ></textarea>
                        <button
                            type="submit"
                            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-3 rounded-xl shadow-md transition duration-300"
                        >
                            {t("contact.send")}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
