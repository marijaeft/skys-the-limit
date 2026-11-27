import card1 from '../assets/cestitka1.webp';
import card2 from '../assets/cestitka2.webp';
import card3 from '../assets/cestitka3.webp';
import card4 from '../assets/cestitka4.webp';
import card5 from '../assets/cestitka5.webp';
import card6 from '../assets/cestitka6.webp';
import card7 from '../assets/cestitka7.webp';
import card8 from '../assets/cestitka8.webp';
import card9 from '../assets/cestitka9.webp';
import card10 from '../assets/cestitka10.webp';
import card11 from '../assets/cestitka11.webp';
import card12 from '../assets/cestitka12.webp';
import card13 from '../assets/cestitka13.webp';
import card14 from '../assets/cestitka14.webp';
import card15 from '../assets/cestitka15.webp';
import card16 from '../assets/cestitka16.webp';
import card17 from '../assets/cestitka17.webp';
import card18 from '../assets/cestitka18.webp';
import card19 from '../assets/cestitka19.webp';
import card20 from '../assets/cestitka20.webp';
import card21 from '../assets/cestitka21.webp';
import card22 from '../assets/cestitka22.webp';
import card23 from '../assets/cestitka23.webp';
import card24 from '../assets/cestitka24.webp';

const commonCharacteristics = [
    "230g рапава хартија",
    "A6 формат",
    "Вклучен плик"
];

const cards = [
    { id: 30, title: "Со тебе не гледам саат", subtitle: "Честитка", characteristics: commonCharacteristics, cardImage: card4, price: "80 ден", sale: true, discountedPrice: "50 ден" },
    { id: 31, title: "За најдобрата мајка", subtitle: "Честитка", characteristics: commonCharacteristics, cardImage: card5, price: "80 ден", sale: true, discountedPrice: "50 ден" },
    { id: 32, title: "Дома си е дома", subtitle: "Честитка", characteristics: commonCharacteristics, cardImage: card6, price: "80 ден", sale: true, discountedPrice: "50 ден" },
    { id: 33, title: "На муабет", subtitle: "Честитка", characteristics: commonCharacteristics, cardImage: card7, price: "80 ден", sale: true, discountedPrice: "50 ден" },
    { id: 34, title: "Животот е прекрасен со тебе", subtitle: "Честитка", characteristics: commonCharacteristics, cardImage: card8, price: "80 ден", sale: true, discountedPrice: "50 ден" },
    { id: 35, title: "Dancing in the kitchen", subtitle: "Честитка", characteristics: commonCharacteristics, cardImage: card10, price: "80 ден", sale: true, discountedPrice: "50 ден" },
    { id: 36, title: "Happy Birthday", subtitle: "Честитка", characteristics: commonCharacteristics, cardImage: card11, price: "80 ден", sale: true, discountedPrice: "50 ден" },
    { id: 37, title: "Тивка љубов", subtitle: "Честитка", characteristics: commonCharacteristics, cardImage: card12, price: "80 ден", sale: true, discountedPrice: "50 ден" },
    { id: 38, title: "Пролет", subtitle: "Честитка", characteristics: commonCharacteristics, cardImage: card13, price: "80 ден", sale: true, discountedPrice: "50 ден" },
    { id: 39, title: "Честитки за новиот дом!", subtitle: "Честитка", characteristics: commonCharacteristics, cardImage: card14, price: "80 ден", sale: true, discountedPrice: "50 ден" },
    { id: 40, title: "Време за славење", subtitle: "Честитка", characteristics: commonCharacteristics, cardImage: card15, price: "80 ден", sale: true, discountedPrice: "50 ден" },
    { id: 41, title: "Мирис на спомени", subtitle: "Честитка", characteristics: commonCharacteristics, cardImage: card2, price: "80 ден", sale: true, discountedPrice: "50 ден" },
    { id: 42, title: "Боите на љубовта", subtitle: "Честитка", characteristics: commonCharacteristics, cardImage: card3, price: "80 ден", sale: true, discountedPrice: "50 ден" },
    { id: 43, title: "За најдобрата мајка", subtitle: "Честитка", characteristics: commonCharacteristics, cardImage: card16, price: "80 ден", sale: true, discountedPrice: "50 ден" },
    { id: 44, title: "Заедно до крајот", subtitle: "Честитка", characteristics: commonCharacteristics, cardImage: card1, price: "80 ден", sale: true, discountedPrice: "50 ден" },
    { id: 45, title: "Nice Bum", subtitle: "Честитка", characteristics: commonCharacteristics, cardImage: card9, price: "80 ден", sale: true, discountedPrice: "50 ден" },
];

// Празнични честитки – ја следат цената/попустот на останатите честитки.
const holidayCards = [
    { id: 46, title: "Зимска бајка", cardImage: card17 },
    { id: 47, title: "Кога бевме деца", cardImage: card18 },
    { id: 48, title: "Rocking around the Christmas tree", cardImage: card19 },
    { id: 49, title: "Празнично утро", cardImage: card20 },
    { id: 50, title: "Хо хо хо", cardImage: card21 },
    { id: 51, title: "Среќни празници", cardImage: card22 },
    { id: 52, title: "Ретро", cardImage: card23 },
    { id: 53, title: "Долгоочекувани празници", cardImage: card24 },
].map((c) => ({
    subtitle: "Честитка",
    characteristics: commonCharacteristics,
    price: cards[0].price,
    sale: cards[0].sale,
    discountedPrice: cards[0].discountedPrice,
    ...c,
}));

// Измешан редослед: новите одат после секоја втора постоечка.
// „Зимска бајка" е последна во листата = прва на страницата (Cards.jsx ја превртува),
// а „Nice Bum" го зема нејзиното место.
const mixed = cards.flatMap((c, i) =>
    i % 2 === 1 && holidayCards[(i + 1) / 2] ? [c, holidayCards[(i + 1) / 2]] : [c]
);
const allCards = [mixed[mixed.length - 1], ...mixed.slice(0, -1), holidayCards[0]];

export default allCards;