export interface VehicleVariant {
  id: string;
  series: string;
  color: string;
  colorHex: string;
  battery: string;
  range: string;
  price: number;
  stock: number;
}

export interface BYDVehicle {
  id: string;
  model: string;
  basePrice: number;
  totalAvailable: number;
  description: string;
  features: string[];
  brandColor: string;
  variants: VehicleVariant[];
}

export const bydVehicles: BYDVehicle[] = [
  {
    id: "1",
    model: "BYD Song Plus",
    basePrice: 380000000,
    totalAvailable: 3,
    description: "Премиальный SUV с передовыми технологиями",
    features: [
      "Дальность 505 км",
      "Быстрая зарядка",
      "Панорамная крыша",
      "Интеллектуальная система помощи",
    ],
    brandColor: "#E60012",
    variants: [
      {
        id: "sp1",
        series: "Champion Edition",
        color: "Атлантический серый",
        colorHex: "#4a5568",
        battery: "87.04 кВт·ч",
        range: "505 км",
        price: 380000000,
        stock: 1,
      },
      {
        id: "sp2",
        series: "Champion Edition",
        color: "Снежно-белый",
        colorHex: "#ffffff",
        battery: "87.04 кВт·ч",
        range: "505 км",
        price: 380000000,
        stock: 1,
      },
      {
        id: "sp3",
        series: "Premium",
        color: "Черный обсидиан",
        colorHex: "#1a1a1a",
        battery: "87.04 кВт·ч",
        range: "505 км",
        price: 420000000,
        stock: 1,
      },
    ],
  },
  {
    id: "2",
    model: "BYD Han",
    basePrice: 680000000,
    totalAvailable: 2,
    description: "Флагманский седан бизнес-класса",
    features: [
      "Дальность 605 км",
      "Роскошный интерьер",
      "Система автопилота",
      "Премиум звук Dynaudio",
    ],
    brandColor: "#000000",
    variants: [
      {
        id: "han1",
        series: "EV Premium",
        color: "Горный серый",
        colorHex: "#6b7280",
        battery: "85.44 кВт·ч",
        range: "605 км",
        price: 680000000,
        stock: 1,
      },
      {
        id: "han2",
        series: "EV Flagship",
        color: "Красный дракон",
        colorHex: "#E60012",
        battery: "85.44 кВт·ч",
        range: "605 км",
        price: 750000000,
        stock: 1,
      },
    ],
  },
  {
    id: "3",
    model: "BYD Tang",
    basePrice: 550000000,
    totalAvailable: 1,
    description: "Полноразмерный 7-местный SUV",
    features: [
      "Дальность 565 км",
      "7 мест",
      "Полный привод",
      "Адаптивная подвеска",
    ],
    brandColor: "#E60012",
    variants: [
      {
        id: "tang1",
        series: "EV AWD Premium",
        color: "Синий космос",
        colorHex: "#1e40af",
        battery: "108.8 кВт·ч",
        range: "565 км",
        price: 550000000,
        stock: 1,
      },
    ],
  },
  {
    id: "4",
    model: "BYD Atto 3",
    basePrice: 420000000,
    totalAvailable: 5,
    description: "Компактный электрический кроссовер",
    features: [
      "Дальность 480 км",
      "Просторный салон",
      "Современный дизайн",
      "Доступная цена",
    ],
    brandColor: "#000000",
    variants: [
      {
        id: "atto1",
        series: "Extended Range",
        color: "Серебристый металлик",
        colorHex: "#9ca3af",
        battery: "60.48 кВт·ч",
        range: "480 км",
        price: 420000000,
        stock: 2,
      },
      {
        id: "atto2",
        series: "Extended Range",
        color: "Небесно-синий",
        colorHex: "#3b82f6",
        battery: "60.48 кВт·ч",
        range: "480 км",
        price: 420000000,
        stock: 2,
      },
      {
        id: "atto3",
        series: "Standard Range",
        color: "Белый перламутр",
        colorHex: "#f3f4f6",
        battery: "49.92 кВт·ч",
        range: "420 км",
        price: 390000000,
        stock: 1,
      },
    ],
  },
  {
    id: "5",
    model: "BYD Seal",
    basePrice: 620000000,
    totalAvailable: 2,
    description: "Спортивный электрический седан",
    features: [
      "Дальность 570 км",
      "Динамичный дизайн",
      "0-100 км/ч за 3.8с",
      "CTB технология",
    ],
    brandColor: "#E60012",
    variants: [
      {
        id: "seal1",
        series: "Performance AWD",
        color: "Черный янтарь",
        colorHex: "#0f172a",
        battery: "82.56 кВт·ч",
        range: "570 км",
        price: 680000000,
        stock: 1,
      },
      {
        id: "seal2",
        series: "Premium RWD",
        color: "Серый титан",
        colorHex: "#64748b",
        battery: "82.56 кВт·ч",
        range: "650 км",
        price: 620000000,
        stock: 1,
      },
    ],
  },
];
