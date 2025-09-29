import travelPlannerImg from '../assets/travel-planner.webp';
import travelPlannerImg1 from "../assets/travel-planner1.webp"
import travelPlannerImg2 from "../assets/travel-planner2.webp"
import travelPlannerImg3 from "../assets/travel-planner3.webp"
import travelPlannerBanner from "../assets/travel-planner-banner.webp"
import weddingGoldImg from '../assets/wedding-planner-gold.webp';
import weddingRoseGoldImg from '../assets/wedding-planner-rosegold.webp';
import WeddingPlannerGold from "../assets/wedding-planner-gold1.webp"
import WeddingPlannerRoseGold from "../assets/wedding-planner-rosegold1.webp"
import WeddingPlannerRoseGoldBanner from "../assets/wedding-planner-rosegold-banner.webp"
import WeddingPlannerGoldBanner from "../assets/wedding-planner-gold-banner.webp"
import WeddingPlannerImg1 from "../assets/wedding-planner-2.webp"
import WeddingPlannerImg2 from "../assets/wedding-planner-3.webp"
import RecipeBook from "../assets/recipe-book.webp"
import RecipeBookImg1 from "../assets/recipe-book-1.webp"
import RecipeBookImg2 from "../assets/recipe-book-2.webp"
import RecipeBookImg3 from "../assets/recipe-book-3.webp"
import RecipeBookBanner from "../assets/recipe-book-banner.webp"
import AcademicPlanner from "../assets/academic-planner.webp"
import AcademicPlannerImg1 from "../assets/academic-planner-1.webp"
import AcademicPlannerImg2 from "../assets/academic-planner-2.webp"
import AcademicPlannerImg3 from "../assets/academic-planner-3.webp"
import AcademicPlannerBanner from "../assets/academic-planner-banner.webp"
import BabyBook from "../assets/baby-book.webp"
import BabyBookImg1 from "../assets/baby-book-1.webp"
import BabyBookImg2 from "../assets/baby-book-2.webp"
import BabyBookImg3 from "../assets/baby-book-3.webp"
import BabyBookBanner from "../assets/baby-book-banner.webp"
import WorkPlanner from "../assets/work-planner.webp"
import WorkPlannerImg1 from "../assets/work-planner-1.webp"
import WorkPlannerImg2 from "../assets/work-planner-2.webp"
import WorkPlannerImg3 from "../assets/work-planner-3.webp"
import WorkPlannerBanner from "../assets/work-planner-banner.webp"


const planners = [
    {
        id : 1,
        title: "Планер за патување",
        subtitle : "10 комплетно испланирани патувања во еден планер!",
        characteristics : [
            "A5 формат",
            "146 страни",
            "Достапен само на македонски",
            "Тврда корица",
            "Златни спирали"
        ],
        content : 
        [
            "Листа на желби за патувања",
            "Следење и планирање на буџет",
            "Детален план за дестинации (знаменитости, храна, места за фотографии, транспорт)",
            "Дневно планирање за секое патување",
            "To-do листа пред тргнување",
            "Листа за пакување",
            "Дневно планирање на модни комбинации",
            "Простор за белешки",
            "Простор за лепење на слики"
        ],
        bannerImg: travelPlannerBanner,
        cardImage : travelPlannerImg,
        images :
        [
            travelPlannerImg1,
            travelPlannerImg2,
            travelPlannerImg3
        ],
        price : "750 ден",
        sale : false,
        discountedPrice: "690 ден"

    },

    {
        id : 2,
        title: "Свадбен планер - Gold",
        subtitle : "Испланирајте ја вашата свадба до детал!",
        characteristics : [
            "A5 формат",
            "122 страни",
            "Достапен само на македонски",
            "Тврда корица",
            "Златни спирали"
        ],
        content : 
        [
            "Месечен приказ(уште -- месеци до нашата свадба)(x15)",
            "Распределување на задачи и следење на завршени задачи",
            "Список на свадбени трошоци(следење на рокови, платен капар...)",
            "Распределба на буџет",
            "Организација на буџетот",
            "Листа со обврски(организирање на обврските според останати 10,6 и 3 месеци до свадбата)",
            "Пробна фризура",
            "Пробно шминкање",
            "Избор на венчаница, распоред за пробување, трошоци...",
            "Избор на место за одржување на свадбата(x2)",
            "Листа на гости (до 280)",
            "Распоред на седење(место на масите за 10 гости, содржи 57 маси)",
            "Мени понуда и белешки(x2)",
            "Подароци за гости,кум,кума...",
            "Декорации за церемонија, прием и дома",
            "Дневна забава кај невестата",
            "Дневна забава кај младоженецот",
            "Палета на бои",
            "Организирање на моминска забава",
            "Место за лепење на омилените слики од моминската забава",
            "Место за лепење на омилените слики од свадбата",
            "Список за проверка за промена на презимето",
            "Одлучување за дестинацијата за меден месец",
            "План за патување",
            "Место за лепење на омилените слики од медениот месец"     
        ],
        bannerImg: WeddingPlannerGoldBanner,
        cardImage : weddingGoldImg,
        images :
        [
            WeddingPlannerGold,
            WeddingPlannerImg1,
            WeddingPlannerImg2
        ],
        price : "750 ден",
        sale : false,
        discountedPrice: "690 ден"
    },

    {
        id : 3,
        title: "Свадбен планер - Rose Gold",
        subtitle : "Испланирајте ја вашата свадба до детал!",
        characteristics : [
            "A5 формат",
            "122 страни",
            "Достапен само на македонски",
            "Тврда корица",
            "Златни спирали"
        ],
        content : 
        [
            "Месечен приказ(уште -- месеци до нашата свадба)(x15)",
            "Распределување на задачи и следење на завршени задачи",
            "Список на свадбени трошоци(следење на рокови, платен капар...)",
            "Распределба на буџет",
            "Организација на буџетот",
            "Листа со обврски(организирање на обврските според останати 10,6 и 3 месеци до свадбата)",
            "Пробна фризура",
            "Пробно шминкање",
            "Избор на венчаница, распоред за пробување, трошоци...",
            "Избор на место за одржување на свадбата(x2)",
            "Листа на гости (до 280)",
            "Распоред на седење(место на масите за 10 гости, содржи 57 маси)",
            "Мени понуда и белешки(x2)",
            "Подароци за гости,кум,кума...",
            "Декорации за церемонија, прием и дома",
            "Дневна забава кај невестата",
            "Дневна забава кај младоженецот",
            "Палета на бои",
            "Организирање на моминска забава",
            "Место за лепење на омилените слики од моминската забава",
            "Место за лепење на омилените слики од свадбата",
            "Список за проверка за промена на презимето",
            "Одлучување за дестинацијата за меден месец",
            "План за патување",
            "Место за лепење на омилените слики од медениот месец"     
        ],
        bannerImg: WeddingPlannerRoseGoldBanner,
        cardImage : weddingRoseGoldImg,
        images :
        [
             WeddingPlannerRoseGold,
            WeddingPlannerImg1,
            WeddingPlannerImg2
        ],
        price : "750 ден",
        sale : false,
        discountedPrice: "690 ден"
    },
      {
        id : 4,
        title: "Дневник за рецепти",
        subtitle : "Запишете си ги сите рецепти на едно место!",
        characteristics : [
            "A5 формат",
            "122 страни",
            "Достапен само на македонски",
            "Тврда корица",
            "Бели спирали"
        ],
        content : 
        [
            "Пишување на содржина (имиња и страни на рецептите за полесно да се најдат) на почетокот",
            "Има место за запишување на 115 рецепти"
        ],
        bannerImg: RecipeBookBanner,
        cardImage : RecipeBook,
        images :
        [
            RecipeBookImg1,
            RecipeBookImg2,
            RecipeBookImg3
        ],
        price : "750 ден",
        sale : true,
        discountedPrice: "690 ден"
    },

    {
        id : 5,
        title: "Академски планер",
        subtitle : "Целосна организација на 2 семестри!",
        characteristics : [
            "A5 формат",
            "140 страни",
            "Достапен само на англиски",
            "Тврда корица",
            "Бели спирали"
        ],
        content : 
        [
            "Поставување цели",
            "Месечно планирање",
            "Месечно планирање на буџет",
            "Месечно планирање на задачи и следење на рокови",
            "Неделно планирање на обврски, место за белешки и организирање на неделата",
            "Месечно следење на навики",
            "План за учење и спремање на испити"  
        ],
        bannerImg: AcademicPlannerBanner,
        cardImage : AcademicPlanner,
        images :
        [
            AcademicPlannerImg1,
            AcademicPlannerImg2,
            AcademicPlannerImg3
        ],
        price : "750 ден",
        sale : false,
        discountedPrice: "690 ден"
    },
      {
        id : 6,
        title: "Бебешка книга - Baby Book",
        subtitle : "Создадете спомени што ќе останат засекогаш!",
        characteristics : [
            "Достапен само на македонски",
            "Тврда корица",
            "Бели спирали"
        ],
        content : 
        [
            "Пополнете ja оваа книгичка со вашите омилени слики и први најслатки моменти со вашето бебе. Зачувајте ги првите чекорчиња, првото забче, зборче, патување и сите први и посебни моменти на едно место."
        ],
        bannerImg:  BabyBookBanner  ,
        cardImage : BabyBook,
        images :
        [
            BabyBookImg1,
            BabyBookImg2,
            BabyBookImg3
        ],
        price : "1150 ден",
        sale : true,
        discountedPrice: "990 ден"

    },

    {
        id : 7,
        title: "Работен планер",
        subtitle : "Овој планер е совршен за професионалци кои сакаат ефективно да ги организираат своите задачи, проекти и состаноци.",
        characteristics : [
            "Достапен само на македонски",
            "Тврда корица",
            "Бели спирали"
        ],
        content : 
        [
            "Планирање на проекти: Јасно дефинирајте цели, чекори и крајни рокови за вашите проекти.",
            "Организација на состаноци: Простор за белешки, агенди и задачи поврзани со состаноците.",
            "Планирање време: Распоред за приоритизација на најважните обврски и нивно завршување.",
            "Овој планер е создаден за оние кои сакаат да ја преземат контролата врз своето време и да постигнат максимален успех на професионален план."
        ],
        bannerImg: WorkPlannerBanner,
        cardImage : WorkPlanner,
        images :
        [
            WorkPlannerImg1,
            WorkPlannerImg2,
            WorkPlannerImg3
        ],
        price : "1100 ден",
        sale : true,
        discountedPrice: "550 ден"
    },
]
export default planners