import gallery1 from "../assets/gallery1.webp";
import gallery2 from "../assets/gallery2.webp";
import gallery3 from "../assets/gallery3.webp";
import gallery4 from "../assets/gallery4.webp";
import gallery5 from "../assets/gallery5.webp";
import gallery6 from "../assets/gallery6.webp";
import gallery7 from "../assets/gallery7.webp";

export function AboutUs() {
    const galleryImages = [gallery5, gallery3, gallery2, gallery4, gallery6, gallery7];

    return (
        <div className="relative bg-gray-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">

                <h1 className="text-4xl text-center mb-5 mt-5 font-light text-yellow-400 leading-snug pb-1">
                    За нас
                </h1>

                <div className="relative bg-white rounded-3xl shadow-2xl p-6 sm:p-10 space-y-6 overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/assets/pattern.svg')] bg-contain bg-right-top opacity-10 pointer-events-none"></div>

                    <div className="relative space-y-4 sm:space-y-6 text-gray-800 text-base sm:text-lg leading-relaxed">
                        <p>
                            <span className="font-semibold text-yellow-600">Sky’s The Limit</span> е креативен бизнис кој се стреми да инспирира продуктивност, позитивен начин на размислување и подобро ментално здравје. Нашата цел е да создадеме производи кои ќе го олеснат секојдневието и ќе ги мотивираат корисниците да ги остварат своите цели, додека уживаат во процесот.
                        </p>

                        <p>
                            Нудиме уникатни планери и тематски дневници кои се повеќе од обични алатки за организирање – тие се вашите партнери за креативност, самодисциплина и личен развој. Со нив лесно можете да ги планирате обврските, да го следите напредокот, да управувате со времето и да станете најдобрата верзија од себе.
                        </p>

                        <p>
                            Приказната започна како <span className="italic text-gray-500">хоби во ноември 2022 година</span>, но денес <span className="font-semibold text-yellow-600">Sky’s The Limit</span> е дел од секојдневието на повеќе од <span className="font-semibold text-yellow-600">2000 луѓе</span>, на кои им помагаме да го организираат своето време, да ги постигнат целите и да бидат среќни и самоуверени.
                        </p>

                        <p>
                            Особено се грижиме и за <span className="font-semibold text-yellow-600">менталното здравје</span> – затоа многу од нашите планери содржат делови посветени на <span className="italic text-gray-500">нега на добросостојбата</span>, кои постојано ве потсетуваат дека вистинскиот успех започнува со рамнотежа и грижа за себе.
                        </p>
                    </div>
                </div>

                <div className="mt-12">
                    <div className="flex overflow-x-auto space-x-4 sm:space-x-6 pb-4 scrollbar-hide">
                        {galleryImages.map((img, idx) => (
                            <div
                                key={idx}
                                className="flex-shrink-0 w-80 sm:w-96 md:w-[20rem] rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
                            >
                                <img
                                    src={img}
                                    alt={`Наш успех ${idx + 1}`}
                                    className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-xl"
                                />
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
