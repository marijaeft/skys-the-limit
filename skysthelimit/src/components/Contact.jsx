export default function Contact() {
    return (
        <div className="relative bg-gray-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">

                <h1 className="text-4xl font-light text-yellow-400 mt-5 mb-6">Контакт</h1>
                <p className="text-lg text-gray-700 mb-12">
                    Имате прашања, идеи или сакате повеќе информации за нашите производи?
                    Слободно контактирајте нè - со задоволство ќе Ви одговориме.
                </p>

                <div className="bg-white shadow-2xl rounded-3xl p-8 sm:p-12">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                        Испратете ни е-пошта
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Пратете ни порака на:
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
                            placeholder="Вашето име"
                            className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Вашата е-пошта"
                            className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                            required
                        />
                        <textarea
                            name="message"
                            placeholder="Вашата порака"
                            rows="5"
                            className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                            required
                        ></textarea>
                        <button
                            type="submit"
                            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-3 rounded-xl shadow-md transition duration-300"
                        >
                            Испрати порака
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
