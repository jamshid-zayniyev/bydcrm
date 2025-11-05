import { Customer, Call, Sale, ServiceRequest, KPI, AIRecommendation, User } from '../types';

export const currentUser: User = {
  id: '1',
  name: 'Алишер Каримов',
  role: 'admin',
  department: 'Администрация'
};

export const users: User[] = [
  { id: '1', name: 'Алишер Каримов', role: 'admin', department: 'Администрация' },
  { id: '2', name: 'Дилноза Рахимова', role: 'callcenter', department: 'Колл-центр' },
  { id: '3', name: 'Шахзод Усманов', role: 'callcenter', department: 'Колл-центр' },
  { id: '4', name: 'Нигора Азимова', role: 'marketing', department: 'Маркетинг' },
  { id: '5', name: 'Фарход Холмуродов', role: 'marketing', department: 'Маркетинг' },
  { id: '6', name: 'Азиз Махмудов', role: 'sales', department: 'Продажи' },
  { id: '7', name: 'Малика Юсупова', role: 'sales', department: 'Продажи' },
  { id: '8', name: 'Бахтиёр Назаров', role: 'sales', department: 'Продажи' },
  { id: '9', name: 'Дилбар Саидова', role: 'service', department: 'Сервис' },
  { id: '10', name: 'Жасур Турсунов', role: 'service', department: 'Сервис' }
];

export const customers: Customer[] = [
  {
    id: '1',
    name: 'Рустам Абдуллаев',
    phone: '+998 91 234 56 78',
    email: 'rustam@example.com',
    source: 'online',
    status: 'qualified',
    interestedIn: 'BYD Song Plus',
    location: 'Карши',
    assignedTo: 'Азиз Махмудов',
    createdAt: '2025-10-08',
    lastContact: '2025-10-11',
    sentiment: 'positive',
    notes: 'Очень заинтересован в покупке в течение 2 недель'
  },
  {
    id: '2',
    name: 'Гульнора Исмаилова',
    phone: '+998 93 456 78 90',
    source: 'walk-in',
    status: 'negotiation',
    interestedIn: 'BYD Han',
    location: 'Карши',
    assignedTo: 'Малика Юсупова',
    createdAt: '2025-10-09',
    lastContact: '2025-10-10',
    sentiment: 'positive'
  },
  {
    id: '3',
    name: 'Фарух Рахматов',
    phone: '+998 90 123 45 67',
    email: 'faruh@example.com',
    source: 'phone',
    status: 'contacted',
    interestedIn: 'BYD Atto 3',
    location: 'Карши',
    assignedTo: 'Азиз Махмудов',
    createdAt: '2025-10-10',
    lastContact: '2025-10-11',
    sentiment: 'neutral'
  },
  {
    id: '4',
    name: 'Лола Каримова',
    phone: '+998 94 567 89 01',
    source: 'online',
    status: 'new',
    interestedIn: 'BYD Seal',
    location: 'Карши',
    assignedTo: 'Бахтиёр Назаров',
    createdAt: '2025-10-11',
    sentiment: 'neutral'
  },
  {
    id: '5',
    name: 'Шухрат Маликов',
    phone: '+998 91 876 54 32',
    email: 'shuhrat@example.com',
    source: 'referral',
    status: 'won',
    interestedIn: 'BYD Tang',
    location: 'Карши',
    assignedTo: 'Малика Юсупова',
    createdAt: '2025-10-05',
    lastContact: '2025-10-09',
    sentiment: 'positive',
    notes: 'Сделка закрыта, автомобиль куплен'
  }
];

export const calls: Call[] = [
  {
    id: '1',
    customerId: '1',
    customerName: 'Рустам Абдуллаев',
    type: 'outgoing',
    duration: 420,
    timestamp: '2025-10-11T10:30:00',
    agentId: '2',
    agentName: 'Дилноза Рахимова',
    recorded: true,
    sentiment: 'positive',
    aiScore: 8.5,
    aiNotes: 'Отличное взаимодействие. Клиент готов к покупке. Рекомендуется предложить тест-драйв.'
  },
  {
    id: '2',
    customerId: '3',
    customerName: 'Фарух Рахматов',
    type: 'incoming',
    duration: 180,
    timestamp: '2025-10-11T11:15:00',
    agentId: '3',
    agentName: 'Шахзод Усманов',
    recorded: true,
    sentiment: 'neutral',
    aiScore: 6.5,
    aiNotes: 'Клиент задавал технические вопросы. Предложите детальную презентацию.'
  },
  {
    id: '3',
    customerId: '2',
    customerName: 'Гульнора Исмаилова',
    type: 'outgoing',
    duration: 540,
    timestamp: '2025-10-10T14:20:00',
    agentId: '2',
    agentName: 'Дилноза Рахимова',
    recorded: true,
    sentiment: 'positive',
    aiScore: 9.0,
    aiNotes: 'Превосходный звонок. Обсуждались условия финансирования.'
  },
  {
    id: '4',
    customerId: '4',
    customerName: 'Лола Каримова',
    type: 'incoming',
    duration: 240,
    timestamp: '2025-10-11T09:45:00',
    agentId: '3',
    agentName: 'Шахзод Усманов',
    recorded: true,
    sentiment: 'neutral',
    aiScore: 7.0,
    aiNotes: 'Первичный контакт. Клиент собирает информацию.'
  }
];

export const sales: Sale[] = [
  {
    id: '1',
    customerId: '5',
    customerName: 'Шухрат Маликов',
    vehicle: 'BYD Tang',
    amount: 550000000,
    date: '2025-10-09',
    salesPerson: 'Малика Юсупова',
    status: 'completed'
  },
  {
    id: '2',
    customerId: '2',
    customerName: 'Гульнора Исмаилова',
    vehicle: 'BYD Han',
    amount: 680000000,
    date: '2025-10-11',
    salesPerson: 'Малика Юсупова',
    status: 'pending'
  }
];

export const serviceRequests: ServiceRequest[] = [
  {
    id: '1',
    customerId: '5',
    customerName: 'Шухрат Маликов',
    vehicle: 'BYD Tang',
    serviceType: 'Плановое ТО',
    date: '2025-10-12',
    status: 'scheduled',
    technician: 'Жасур Турсунов'
  },
  {
    id: '2',
    customerId: '1',
    customerName: 'Рустам Абдуллаев',
    vehicle: 'BYD Song Plus',
    serviceType: 'Диагностика',
    date: '2025-10-11',
    status: 'in-progress',
    technician: 'Дилбар Саидова',
    rating: 5
  }
];

export const kpiData: KPI[] = [
  {
    employeeId: '2',
    employeeName: 'Дилноза Рахимова',
    department: 'Колл-центр',
    callsMade: 28,
    callsTarget: 30,
    averageCallDuration: 380,
    customerSatisfaction: 4.5
  },
  {
    employeeId: '3',
    employeeName: 'Шахзод Усманов',
    department: 'Колл-центр',
    callsMade: 25,
    callsTarget: 30,
    averageCallDuration: 320,
    customerSatisfaction: 4.2
  },
  {
    employeeId: '4',
    employeeName: 'Нигора Азимова',
    department: 'Маркетинг',
    leadsGenerated: 45,
    customerSatisfaction: 4.6
  },
  {
    employeeId: '5',
    employeeName: 'Фарход Холму��одов',
    department: 'Маркетинг',
    leadsGenerated: 38,
    customerSatisfaction: 4.3
  },
  {
    employeeId: '6',
    employeeName: 'Азиз Махмудов',
    department: 'Продажи',
    salesClosed: 3,
    customerSatisfaction: 4.8
  },
  {
    employeeId: '7',
    employeeName: 'Малика Юсупова',
    department: 'Продажи',
    salesClosed: 5,
    customerSatisfaction: 4.9
  },
  {
    employeeId: '8',
    employeeName: 'Бахтиёр Назаров',
    department: 'Продажи',
    salesClosed: 2,
    customerSatisfaction: 4.4
  },
  {
    employeeId: '9',
    employeeName: 'Дилбар Саидова',
    department: 'Сервис',
    customerSatisfaction: 4.7
  },
  {
    employeeId: '10',
    employeeName: 'Жасур Турсунов',
    department: 'Сервис',
    customerSatisfaction: 4.5
  }
];

export const aiRecommendations: AIRecommendation[] = [
  {
    id: '1',
    type: 'lead-scoring',
    priority: 'high',
    title: 'Горячий лид: Рустам Абдуллаев',
    description: 'Клиент показывает высокую заинтересованность. Вероятность покупки: 87%. Рекомендуется назначить тест-драйв в ближайшие 48 часов.',
    targetCustomerId: '1',
    targetCustomerName: 'Рустам Абдуллаев',
    confidence: 87,
    createdAt: '2025-10-11T08:00:00'
  },
  {
    id: '2',
    type: 'sales-strategy',
    priority: 'high',
    title: 'Оптимальное время для контакта',
    description: 'Клиент Фарух Рахматов наиболее активен в период 14:00-16:00. Рекомендуется связаться в это время для повышения конверсии.',
    targetCustomerId: '3',
    targetCustomerName: 'Фарух Рахматов',
    confidence: 75,
    createdAt: '2025-10-11T07:30:00'
  },
  {
    id: '3',
    type: 'upsell',
    priority: 'medium',
    title: 'Возможность дополнительной продажи',
    description: 'Шухрату Маликову можно предложить расширенную гарантию и аксессуары для BYD Tang. Потенциальная дополнительная выручка: 15 млн сум.',
    targetCustomerId: '5',
    targetCustomerName: 'Шухрат Маликов',
    confidence: 68,
    createdAt: '2025-10-10T16:00:00'
  },
  {
    id: '4',
    type: 'call-quality',
    priority: 'low',
    title: 'Улучшение техники продаж',
    description: 'Шахзод Усманов может улучшить конверсию, используя более персонализированный подход. Средняя оценка звонков: 6.8/10.',
    confidence: 72,
    createdAt: '2025-10-11T06:00:00'
  }
];

// Legacy vehicle data for backwards compatibility
export const vehicles = [
  { id: '1', model: 'BYD Song Plus', available: 3, price: 380000000 },
  { id: '2', model: 'BYD Han', available: 2, price: 680000000 },
  { id: '3', model: 'BYD Tang', available: 1, price: 550000000 },
  { id: '4', model: 'BYD Atto 3', available: 5, price: 420000000 },
  { id: '5', model: 'BYD Seal', available: 2, price: 620000000 }
];