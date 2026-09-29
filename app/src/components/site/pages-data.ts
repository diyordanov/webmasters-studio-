/**
 * Content for the inner pages (Услуги, Проекти, За нас, Контакти).
 * Facts come from the current webmasters.bg site: packages, team, values,
 * portfolio and client testimonials.
 */

export const PACKAGES = [
  {
    key: "landing",
    name: "Landing страница",
    days: "до 5 работни дни",
    text: "Една силна страница за продукт, услуга или кампания, която води към запитване.",
    features: ["Персонален responsive дизайн", "До 10 секции", "Оптимизирана скорост", "Красива и бърза мобилна версия", "Частична SEO оптимизация"],
  },
  {
    key: "vizitka",
    name: "Сайт тип визитка",
    days: "до 12 работни дни",
    text: "Пълен фирмен сайт с услуги, за нас, проекти и контакти, който управлявате сами.",
    features: ["До 10 страници", "Оптимизирана скорост", "Частична SEO оптимизация", "Viber и WhatsApp чат", "Видео обучение за работа с панела"],
  },
  {
    key: "magazin",
    name: "Онлайн магазин",
    days: "до 21 работни дни",
    text: "WooCommerce магазин с плащане с карта, готов да приема поръчки от първия ден.",
    features: ["Персонален responsive дизайн", "Настройка на WooCommerce", "Интеграции за плащане с карта", "Частична SEO оптимизация", "Обучение за работа с панела"],
  },
] as const;

export type ProjectCat = "shop" | "travel" | "business" | "brand";

export const PROJECT_CATS: Array<{ key: ProjectCat | "all"; label: string }> = [
  { key: "all", label: "Всички" },
  { key: "shop", label: "Онлайн магазини" },
  { key: "business", label: "Бизнес и услуги" },
  { key: "travel", label: "Туризъм и имоти" },
  { key: "brand", label: "Обучение и личен бранд" },
];

/** Portfolio beyond the five featured mockups. `url` is the live site when public. */
export const PROJECTS: Array<{ name: string; note: string; cat: ProjectCat; url?: string }> = [
  { name: "Агро Зона", note: "Онлайн агроаптека", cat: "shop", url: "https://www.agrozone.bg/" },
  { name: "Imarketbg", note: "Онлайн магазин", cat: "shop", url: "https://imarketbg.com/" },
  { name: "Reklamni Materiali", note: "Двуезичен каталог с рекламни продукти", cat: "shop", url: "https://reklamnimateriali.eu/" },
  { name: "Плакети Монов", note: "Плакети, трофеи и медали", cat: "shop", url: "https://plaketimonov.com/" },
  { name: "The Graffs", note: "Графити бранд и онлайн магазин", cat: "shop", url: "https://thegraffs.bg/" },
  { name: "OM Computers", note: "Нови и реновирани лаптопи и компютри", cat: "shop", url: "https://omcomputers.bg/" },
  { name: "MG Computers", note: "Магазин, SEO и реклама в Google и Facebook", cat: "shop", url: "https://mgcomputers.bg/" },
  { name: "Air Conditioners", note: "Онлайн магазин за климатици", cat: "shop", url: "https://airconditioners.bg/" },
  { name: "Lollipop", note: "Бижута и аксесоари", cat: "shop", url: "https://lollipophh.com/" },
  { name: "DSM Mon Platin", note: "Магазин за натурална козметика", cat: "shop", url: "https://www.dsm-bg.com/" },
  { name: "GlamLip", note: "Онлайн магазин за козметика", cat: "shop" },
  { name: "Coparts", note: "Магазин за авточасти от САЩ и Канада", cat: "shop" },
  { name: "Walora", note: "Сайт за дигитална агенция в Австрия", cat: "business", url: "https://dev.walora.at/" },
  { name: "Solar String", note: "Фотоволтаични системи", cat: "business", url: "https://solarstring.bg/" },
  { name: "Bash Gabions", note: "Производител на габиони", cat: "business", url: "https://bashgabions.com/" },
  { name: "Roof Building", note: "Навеси и дограми", cat: "business", url: "https://naves-dogrami.com/" },
  { name: "Burger Revolution", note: "Верига за бургери", cat: "business", url: "https://burger-revolution.com/" },
  { name: "KM Moto", note: "Внос и продажба на мотоциклети", cat: "business", url: "https://kmmoto.bg/" },
  { name: "Lion Trans", note: "Внос на коли от САЩ", cat: "business", url: "https://liontrans.bg/" },
  { name: "Disto Cars", note: "Луксозни автомобилни услуги", cat: "business", url: "https://distocars.com/" },
  { name: "Account EM", note: "Счетоводни и финансови услуги", cat: "business", url: "https://account-em.com/" },
  { name: "Boutique Events", note: "Организиране на събития", cat: "business", url: "https://boutique-events.bg/" },
  { name: "BBB Marketing", note: "Агенция за дигитален маркетинг", cat: "business", url: "https://bbb-marketing.com/" },
  { name: "Luchcoled", note: "LED осветителни системи", cat: "business", url: "https://luchcoled.com/" },
  { name: "Disto-Industriebau", note: "Индустриално строителство", cat: "business", url: "https://disto-industriebau.com/" },
  { name: "Disto Metal Products", note: "Метални изделия и конструкции", cat: "business", url: "https://disto-metalproducts.com/" },
  { name: "Mebeli Terziev", note: "Мебели по поръчка", cat: "business", url: "https://terzievdesign.com/" },
  { name: "Jarava", note: "Преводи и легализация на документи", cat: "business", url: "https://jaravabg.online/" },
  { name: "Kristin Therapy", note: "Рехабилитация и масажи във Варна", cat: "business", url: "https://kristin-therapy.com/" },
  { name: "Vinoartissimo", note: "Семейна винарна", cat: "business" },
  { name: "Feet It Insoles", note: "Ортопедични стелки по поръчка", cat: "business" },
  { name: "Zakopane Summer", note: "Вили под наем в Закопане", cat: "travel", url: "https://zakopanesummer.com/" },
  { name: "CamperTime", note: "Кемпери под наем", cat: "travel", url: "https://campertime-bg.eu/" },
  { name: "Green Osam", note: "Къща за гости", cat: "travel", url: "https://zeleniaosam.com/" },
  { name: "DreamView Lozenets", note: "Ваканционни имоти", cat: "travel", url: "https://dreamview-lozenets.com/" },
  { name: "TopTime Real Estate", note: "Недвижими имоти", cat: "travel", url: "https://toptimerealestate.com/" },
  { name: "Villa Utopia", note: "Луксозна вила на Черноморието", cat: "travel", url: "https://villa-utopia.bg/" },
  { name: "Бистра Георгиева", note: "Писател, книги и блог", cat: "brand", url: "https://bistraigeorgieva.com/" },
  { name: "Lovella", note: "Дигитални музикални албуми", cat: "brand", url: "https://lovellamusic.eu/" },
  { name: "Invitely", note: "Видео и анимирани покани", cat: "brand", url: "https://invitely.bg/" },
  { name: "Happy Women", note: "Консултации, програми и ретрийти", cat: "brand", url: "https://elenamaleva.bg/" },
  { name: "Mama Energy", note: "Менторство, блог и магазин", cat: "brand", url: "https://mamaenergy.bg/" },
  { name: "Академията", note: "Курсове и записване за деца", cat: "brand", url: "https://akademiyata.bg/" },
  { name: "Schoolman", note: "Езиков център", cat: "brand", url: "https://schoolman.bg/" },
  { name: "Учебен център Варна", note: "Езикови курсове за деца и възрастни", cat: "brand", url: "https://uc-varna.eu/" },
  { name: "Vangela.art", note: "Сайт за художник", cat: "brand", url: "https://vangela.art/" },
];

export const TESTIMONIALS = [
  {
    who: "Евдокия Цветичкова",
    role: "CEO, Epsilon Marketing",
    quote: "Работя в областта на маркетинга и рекламата повече от 20 години и имам опит с американски, европейски и азиатски компании. Искрено препоръчвам Димо Йорданов като целенасочен, креативен и отговорен професионалист!",
  },
  {
    who: "Калоян Дичев",
    role: "CEO, BBB Marketing",
    quote: "Работя с Димо вече повече от 6 месеца и той е най-изключителният дизайнер, когото съм срещал. Той успява да предложи страхотни дизайни, които ме впечатляват.",
  },
  {
    who: "д-р Димитър Маринов",
    role: "Практикуващ лекар",
    quote: "Той беше изключително отзивчив и ми предложи отлични идеи по време на процеса, което доведе до страхотен блог. Определено ще го наема отново в бъдеще!",
  },
  {
    who: "Павел Павлов",
    role: "Studio M Tattoos",
    quote: "Слуша нуждите на клиента и е много професионален. Имаме приятен опит и нашият сайт сега изглежда страхотно.",
  },
  {
    who: "Solar String",
    role: "Фотоволтаични системи",
    quote: "Дизайнът е модерен и ясен, а информацията е представена по начин, който улеснява клиентите ни да вземат решение. Още в първите седмици след старта започнахме да получаваме повече запитвания.",
  },
  {
    who: "MG Computers",
    role: "Онлайн магазин",
    quote: "SEO оптимизацията, която направиха, значително подобри видимостта на нашия сайт и доведе до увеличаване на органичния трафик.",
  },
  {
    who: "Академията",
    role: "Образователен център",
    quote: "Благодарение на тях, родителите лесно намират необходимата информация и записват децата си за курсове.",
  },
  {
    who: "Disto Cars",
    role: "Автомобилни услуги",
    quote: "Те създадоха стилен и функционален уебсайт, който отразява нашите луксозни услуги. Благодарение на техния професионализъм, нашето онлайн присъствие значително се подобри.",
  },
];

export const VALUES = [
  { title: "Обичаме това, което правим", text: "Страстта към уеб дизайна и уникалните дигитални преживявания ни кара да надхвърляме очакванията и да постигаме реални резултати за клиентите си." },
  { title: "Доверие", text: "Изграждаме дълготрайни отношения, основани на откритост, честност и надеждност. Доверието е основата на всяко успешно партньорство." },
  { title: "Комуникация", text: "Ценим двустранния диалог и осигуряваме яснота на всеки етап от проекта. Откритият разговор е ключът към добрия резултат." },
  { title: "Открити и лоялни", text: "Залагаме на честност във всеки аспект от работата: ясни срокове, ясен обхват и ясна цена още преди старта." },
];

export const TEAM: Array<{ name: string; first: string; role: string; text: string; initials: string; photo?: string }> = [
  {
    name: "Димо Йорданов",
    first: "Димо",
    role: "Основател и маркетинг специалист",
    text: "Димо е основателят на Web masters, водещ мениджър и маркетинг специалист. Със своя богат опит и креативен подход, той е в основата на успеха на нашата агенция, предоставяйки иновативни решения, които помагат на бизнесите да се развиват и да се открояват в дигиталния свят.",
    initials: "ДЙ",
    photo: "/assets/team/dimo",
  },
  {
    name: "Десислава Горанова",
    first: "Деси",
    role: "Графичен дизайнер",
    text: "Десислава е талантлив графичен дизайнер в Web masters. С уникално чувство за естетика и опит в създаването на впечатляващи визуални концепции. Нейните креативни решения правят всяка идея реалност.",
    initials: "ДГ",
    photo: "/assets/team/desislava",
  },
  {
    name: "Камелия Йорданова",
    first: "Ками",
    role: "Търговски представител",
    text: "Камелия е търговски представител на Web masters и първият контакт за новите ни клиенти. Тя изслушва нуждите на бизнеса ви и ви насочва към решението, което ще донесе най-добри резултати.",
    initials: "КЙ",
    photo: "/assets/team/kameliya",
  },
];

export const STATS = [
  { value: 50, suffix: "+", label: "завършени проекта" },
  { value: 5, suffix: "", label: "дни за landing страница" },
  { value: 3, suffix: "", label: "специалисти в екипа" },
  { value: 100, suffix: "%", label: "проекти с договор и фактура" },
];
