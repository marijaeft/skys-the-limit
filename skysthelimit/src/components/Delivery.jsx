export function Delivery() {
    return (
        <div className="relative bg-gray-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">

                <h1 className="text-3xl sm:text-4xl text-center mb-6 mt-6 font-light text-yellow-400 leading-snug pb-1">
                    Испорака, Враќање и Замена
                </h1>

                <div className="relative bg-white rounded-3xl shadow-2xl p-6 sm:p-10 space-y-8 overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/assets/pattern.svg')] bg-contain bg-right-top opacity-5 pointer-events-none"></div>

                    <div className="relative space-y-4 text-gray-800 text-base sm:text-lg leading-relaxed">
                        <h2 className="text-2xl font-semibold text-yellow-600">Испорака</h2>
                        <p>
                            Доставата изнесува <span className="font-semibold">150 денари</span> за секоја нарачка.
                        </p>
                        <p>
                            Доколку нарачката е направена по <span className="font-semibold">16:00 часот</span>, таа ќе биде
                            обработена наредниот работен ден. Нарачките направени во <span className="font-semibold">петок по 16:00 часот</span> се обработуваат во понеделник.
                        </p>
                        <p>
                            Испораката е <span className="italic">директно до вашата врата</span>. Секој потрошувач има обврска да внесе
                            точни информации за достава – <span className="font-semibold">точна адреса и телефонски број</span>.
                        </p>
                        <p>
                            Рокот за испорака е <span className="font-semibold">3 до 5 работни дена</span>.
                        </p>
                    </div>

                    <div className="relative space-y-4 text-gray-800 text-base sm:text-lg leading-relaxed">
                        <h2 className="text-2xl font-semibold text-yellow-600">Враќање и Замена</h2>

                        <div className="space-y-2">
                            <h3 className="text-lg font-semibold">Замена на оштетен производ</h3>
                            <p>
                                Доколку производот е оштетен при испорака, купувачот е должен да достави <span className="font-semibold">слики и доказ</span> за оштетувањето во рок од <span className="font-semibold">12 часа</span> од приемот на нарачката.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-lg font-semibold">Замена за друг производ или враќање на средства</h3>
                            <p>
                                Доколку сакате замена за друг производ или враќање на средствата, рокот е <span className="font-semibold">15 дена</span> од денот на испораката.
                                Потребно е да се приложи доказ дека производот <span className="font-semibold">не е употребуван</span> и е вратен во оригинална состојба.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
