import { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Target,
  Users,
  Award,
  Calendar,
  DollarSign,
  Car,
  Phone,
  ThumbsUp,
  ShoppingCart,
  Zap,
  Download,
  Plus,
  Eye,
  Filter,
  X,
  Star,
  Trophy,
  Clock,
  Activity,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import {
  LineChart as RechartsLine,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
  ComposedChart,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import { useTranslation } from "react-i18next";
import useKPI from "@/hooks/useKPI";
import { formatPrice } from "@/hooks/mlnNumber";

interface SalesmanKPI {
  id: string;
  name: string;
  role: string;
  avatar: string;
  kpis: {
    carsSold: {
      current: number;
      target: number;
      trend: "up" | "down";
      change: number;
    };
    revenue: {
      current: number;
      target: number;
      trend: "up" | "down";
      change: number;
    };
    conversionRate: {
      current: number;
      target: number;
      trend: "up" | "down";
      change: number;
    };
    testDrives: {
      current: number;
      target: number;
      trend: "up" | "down";
      change: number;
    };
    customerSatisfaction: {
      current: number;
      target: number;
      trend: "up" | "down";
      change: number;
    };
    upsells: {
      current: number;
      target: number;
      trend: "up" | "down";
      change: number;
    };
  };
  monthlyData: {
    month: string;
    carsSold: number;
    revenue: number;
    target: number;
  }[];
  score: number;
}

export function KPI() {
  const [selectedRole, setSelectedRole] = useState("all");
  const [reportPeriod, setReportPeriod] = useState("monthly");
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
  const { t } = useTranslation();

  const { kpiMonthly, kpiRevenue } = useKPI();

  // Mock data for salespeople
  const salesTeam: SalesmanKPI[] = [
    {
      id: "1",
      name: "Алексей Иванов",
      role: "Менеджер по продажам",
      avatar: "👨‍💼",
      score: 94,
      kpis: {
        carsSold: { current: 12, target: 10, trend: "up", change: 20 },
        revenue: { current: 420, target: 350, trend: "up", change: 20 },
        conversionRate: { current: 28, target: 25, trend: "up", change: 12 },
        testDrives: { current: 35, target: 30, trend: "up", change: 16.7 },
        customerSatisfaction: {
          current: 4.8,
          target: 4.5,
          trend: "up",
          change: 6.7,
        },
        upsells: { current: 8, target: 6, trend: "up", change: 33.3 },
      },
      monthlyData: [
        { month: "Янв", carsSold: 8, revenue: 280, target: 350 },
        { month: "Фев", carsSold: 10, revenue: 350, target: 350 },
        { month: "Мар", carsSold: 11, revenue: 385, target: 350 },
        { month: "Апр", carsSold: 9, revenue: 315, target: 350 },
        { month: "Май", carsSold: 12, revenue: 420, target: 350 },
      ],
    },
    {
      id: "2",
      name: "Мария Петрова",
      role: "Менеджер по продажам",
      avatar: "👩‍💼",
      score: 91,
      kpis: {
        carsSold: { current: 11, target: 10, trend: "up", change: 10 },
        revenue: { current: 385, target: 350, trend: "up", change: 10 },
        conversionRate: { current: 26, target: 25, trend: "up", change: 4 },
        testDrives: { current: 32, target: 30, trend: "up", change: 6.7 },
        customerSatisfaction: {
          current: 4.9,
          target: 4.5,
          trend: "up",
          change: 8.9,
        },
        upsells: { current: 7, target: 6, trend: "up", change: 16.7 },
      },
      monthlyData: [
        { month: "Янв", carsSold: 9, revenue: 315, target: 350 },
        { month: "Фев", carsSold: 10, revenue: 350, target: 350 },
        { month: "Мар", carsSold: 10, revenue: 350, target: 350 },
        { month: "Апр", carsSold: 11, revenue: 385, target: 350 },
        { month: "Май", carsSold: 11, revenue: 385, target: 350 },
      ],
    },
    {
      id: "3",
      name: "Дмитрий Сидоров",
      role: "Менеджер по продажам",
      avatar: "👨‍💻",
      score: 87,
      kpis: {
        carsSold: { current: 9, target: 10, trend: "down", change: -10 },
        revenue: { current: 315, target: 350, trend: "down", change: -10 },
        conversionRate: { current: 24, target: 25, trend: "down", change: -4 },
        testDrives: { current: 28, target: 30, trend: "down", change: -6.7 },
        customerSatisfaction: {
          current: 4.6,
          target: 4.5,
          trend: "up",
          change: 2.2,
        },
        upsells: { current: 5, target: 6, trend: "down", change: -16.7 },
      },
      monthlyData: [
        { month: "Янв", carsSold: 10, revenue: 350, target: 350 },
        { month: "Фев", carsSold: 11, revenue: 385, target: 350 },
        { month: "Мар", carsSold: 10, revenue: 350, target: 350 },
        { month: "Апр", carsSold: 8, revenue: 280, target: 350 },
        { month: "Май", carsSold: 9, revenue: 315, target: 350 },
      ],
    },
    {
      id: "4",
      name: "Елена Козлова",
      role: "Колл-центр",
      avatar: "📞",
      score: 92,
      kpis: {
        carsSold: { current: 0, target: 0, trend: "up", change: 0 },
        revenue: { current: 0, target: 0, trend: "up", change: 0 },
        conversionRate: { current: 35, target: 30, trend: "up", change: 16.7 },
        testDrives: { current: 45, target: 40, trend: "up", change: 12.5 },
        customerSatisfaction: {
          current: 4.7,
          target: 4.5,
          trend: "up",
          change: 4.4,
        },
        upsells: { current: 0, target: 0, trend: "up", change: 0 },
      },
      monthlyData: [
        { month: "Янв", carsSold: 0, revenue: 0, target: 0 },
        { month: "Фев", carsSold: 0, revenue: 0, target: 0 },
        { month: "Мар", carsSold: 0, revenue: 0, target: 0 },
        { month: "Апр", carsSold: 0, revenue: 0, target: 0 },
        { month: "Май", carsSold: 0, revenue: 0, target: 0 },
      ],
    },
    {
      id: "5",
      name: "Игорь Волков",
      role: "Сервисный менеджер",
      avatar: "🔧",
      score: 89,
      kpis: {
        carsSold: { current: 0, target: 0, trend: "up", change: 0 },
        revenue: { current: 85, target: 80, trend: "up", change: 6.25 },
        conversionRate: { current: 0, target: 0, trend: "up", change: 0 },
        testDrives: { current: 0, target: 0, trend: "up", change: 0 },
        customerSatisfaction: {
          current: 4.8,
          target: 4.5,
          trend: "up",
          change: 6.7,
        },
        upsells: { current: 12, target: 10, trend: "up", change: 20 },
      },
      monthlyData: [
        { month: "Янв", carsSold: 0, revenue: 70, target: 80 },
        { month: "Фев", carsSold: 0, revenue: 75, target: 80 },
        { month: "Мар", carsSold: 0, revenue: 80, target: 80 },
        { month: "Апр", carsSold: 0, revenue: 82, target: 80 },
        { month: "Май", carsSold: 0, revenue: 85, target: 80 },
      ],
    },
    {
      id: "6",
      name: "Ольга Новикова",
      role: "Маркетинг",
      avatar: "📱",
      score: 90,
      kpis: {
        carsSold: { current: 0, target: 0, trend: "up", change: 0 },
        revenue: { current: 0, target: 0, trend: "up", change: 0 },
        conversionRate: { current: 22, target: 20, trend: "up", change: 10 },
        testDrives: { current: 55, target: 50, trend: "up", change: 10 },
        customerSatisfaction: { current: 0, target: 0, trend: "up", change: 0 },
        upsells: { current: 0, target: 0, trend: "up", change: 0 },
      },
      monthlyData: [
        { month: "Янв", carsSold: 0, revenue: 0, target: 0 },
        { month: "Фев", carsSold: 0, revenue: 0, target: 0 },
        { month: "Мар", carsSold: 0, revenue: 0, target: 0 },
        { month: "Апр", carsSold: 0, revenue: 0, target: 0 },
        { month: "Май", carsSold: 0, revenue: 0, target: 0 },
      ],
    },
  ];

  const filteredEmployees =
    selectedRole === "all"
      ? salesTeam
      : salesTeam.filter((emp) => {
          if (selectedRole === "sales")
            return emp.role === "Менеджер по продажам";
          if (selectedRole === "callcenter") return emp.role === "Колл-центр";
          if (selectedRole === "service")
            return emp.role === "Сервисный менеджер";
          if (selectedRole === "marketing") return emp.role === "Маркетинг";
          return true;
        });

  // Team performance data
  const teamPerformanceData = [
    { month: "Янв", продажи: 27, выручка: 945, цель: 1050 },
    { month: "Фев", продажи: 31, выручка: 1085, цель: 1050 },
    { month: "Мар", продажи: 31, выручка: 1085, цель: 1050 },
    { month: "Апр", продажи: 28, выручка: 980, цель: 1050 },
    { month: "Май", продажи: 32, выручка: 1120, цель: 1050 },
  ];

  // Sales funnel data
  const salesFunnelData = [
    { stage: "Лиды", count: 280, conversion: 100 },
    { stage: "Квалиф.", count: 196, conversion: 70 },
    { stage: "Тест-драйв", count: 120, conversion: 43 },
    { stage: "Предложение", count: 80, conversion: 29 },
    { stage: "Продажа", count: 32, conversion: 11 },
  ];

  // Individual KPI comparison
  const kpiComparison = [
    { name: "Алексей И.", продажи: 12, выручка: 420, рейтинг: 4.8 },
    { name: "Мария П.", продажи: 11, выручка: 385, рейтинг: 4.9 },
    { name: "Дмитрий С.", продажи: 9, выручка: 315, рейтинг: 4.6 },
  ];

  const getScoreBadgeColor = (score: number) => {
    if (score >= 90) return "bg-green-100 text-green-800 border-green-200";
    if (score >= 80) return "bg-blue-100 text-blue-800 border-blue-200";
    if (score >= 70) return "bg-yellow-100 text-yellow-800 border-yellow-200";
    return "bg-red-100 text-red-800 border-red-200";
  };

  const formatCurrency = (value: number) => {
    return `${value} млн ₸`;
  };

  // Get selected employee for detailed report
  const selectedEmployeeData = salesTeam.find(
    (emp) => emp.id === selectedEmployee
  );

  // Detailed daily performance data for selected employee
  const dailyPerformance = [
    { day: "Пн", звонки: 8, встречи: 3, продажи: 2 },
    { day: "Вт", звонки: 12, встречи: 4, продажи: 3 },
    { day: "Ср", звонки: 10, встречи: 5, продажи: 2 },
    { day: "Чт", звонки: 15, встречи: 6, продажи: 4 },
    { day: "Пт", звонки: 14, встречи: 5, продажи: 3 },
    { day: "Сб", звонки: 9, встречи: 4, продажи: 2 },
    { day: "Вс", звонки: 6, встречи: 2, продажи: 1 },
  ];

  // Weekly comparison data
  const weeklyComparison = [
    { неделя: "Нед 1", план: 10, факт: 8 },
    { неделя: "Нед 2", план: 10, факт: 11 },
    { неделя: "Нед 3", план: 10, факт: 9 },
    { неделя: "Нед 4", план: 10, факт: 12 },
  ];

  // Skills radar data
  const skillsData = [
    { skill: "Продажи", value: 92 },
    { skill: "Переговоры", value: 88 },
    { skill: "Знание продукта", value: 95 },
    { skill: "Работа с возражениями", value: 85 },
    { skill: "Клиентский сервис", value: 90 },
    { skill: "Допродажи", value: 87 },
  ];

  // Achievements
  const achievements = [
    {
      title: "Продавец месяца",
      date: "Май 2024",
      icon: Trophy,
      color: "text-yellow-600",
    },
    {
      title: "План перевыполнен на 20%",
      date: "Апрель 2024",
      icon: Target,
      color: "text-green-600",
    },
    {
      title: "Лучший рейтинг клиентов",
      date: "Март 2024",
      icon: Star,
      color: "text-blue-600",
    },
    {
      title: "50+ успешных продаж",
      date: "Февраль 2024",
      icon: Award,
      color: "text-purple-600",
    },
  ];

  const salesRoles = [
    { value: "all", label: t("kpi.roles.all") },
    { value: "sales", label: t("kpi.roles.sales") },
    { value: "callcenter", label: t("kpi.roles.callcenter") },
    { value: "service", label: t("kpi.roles.service") },
    { value: "marketing", label: t("kpi.roles.marketing") },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl mb-2">{t("kpi.dashboard_title")}</h1>
          <p className="text-muted-foreground">{t("kpi.dashboard_subtitle")}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            {t("kpi.export")}
          </Button>
          <Button size="sm" className="bg-[#E60012] hover:bg-[#c00010]">
            <Plus className="h-4 w-4 mr-2" />
            {t("kpi.addGoal")}
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        <Card className="border-l-4 border-l-[#E60012]">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Всего продаж
                </p>
                <p className="text-3xl">{kpiMonthly?.current_sales}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                <Car className="h-6 w-6 text-[#E60012]" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2 text-sm">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="text-green-600">
                {kpiMonthly?.percent_change}%
              </span>
              <span className="text-muted-foreground">vs прошлый месяц</span>
            </div>
            <Progress
              value={kpiMonthly?.achievement_percent}
              className="mt-3 h-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              {t("kpi.target")}: {kpiMonthly?.target} авто
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Выручка</p>
                <p className="text-3xl">
                  {formatPrice(kpiRevenue?.revenue_current)}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2 text-sm">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="text-green-600">
                {kpiRevenue?.percent_change}%
              </span>
              <span className="text-muted-foreground">млн ₸</span>
            </div>
            <Progress
              value={kpiRevenue?.achievement_percent}
              className="mt-3 h-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              {t("kpi.target")}:{formatPrice(kpiRevenue?.target)}₸
            </p>
          </CardContent>
        </Card>

        {/* <Card className="border-l-4 border-l-blue-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Конверсия</p>
                <p className="text-3xl">11.4%</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2 text-sm">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="text-green-600">+0.7%</span>
              <span className="text-muted-foreground">лид → продажа</span>
            </div>
            <Progress value={95} className="mt-3 h-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {t("kpi.target")}: 12%
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Рейтинг команды
                </p>
                <p className="text-3xl">4.7</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
                <ThumbsUp className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2 text-sm">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="text-green-600">+0.2</span>
              <span className="text-muted-foreground">из 5.0</span>
            </div>
            <Progress value={94} className="mt-3 h-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {t("kpi.target")}: 4.5
            </p>
          </CardContent>
        </Card> */}
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">
            {t("kpi.review.reviewName")}
          </TabsTrigger>
          <TabsTrigger value="employees">
            {t("kpi.employees.employeesName")}
          </TabsTrigger>
          {/* <TabsTrigger value="funnel">{t("kpi.funnel.funnelName")}</TabsTrigger> */}
          <TabsTrigger value="analytics">
            {t("kpi.analytics.analyticsName")}
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>{t("kpi.review.dynamics")}</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={teamPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis
                      yAxisId="left"
                      label={{
                        value: "Продажи",
                        angle: -90,
                        position: "insideLeft",
                      }}
                    />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      label={{
                        value: "Выручка (млн)",
                        angle: 90,
                        position: "insideRight",
                      }}
                    />
                    <Tooltip />
                    <Legend />
                    <Bar
                      yAxisId="left"
                      dataKey="продажи"
                      fill="#E60012"
                      name="Продажи авто"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="выручка"
                      stroke="#10b981"
                      strokeWidth={3}
                      name="Выручка"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="цель"
                      stroke="#cbd5e1"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      name="Цель"
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t("kpi.review.topComparison")}</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={kpiComparison} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="name" width={100} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="продажи" fill="#E60012" name="Продажи" />
                    <Bar dataKey="рейтинг" fill="#fbbf24" name="Рейтинг" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Средний чек</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl mb-2">35 млн ₸</p>
                <Progress value={116.7} className="h-2 mb-2" />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Цель: 30 млн</span>
                  <span className="text-green-600">+16.7%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Тест-драйвы</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl mb-2">120 шт</p>
                <Progress value={100} className="h-2 mb-2" />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Цель: 120 шт</span>
                  <span className="text-green-600">100%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Допродажи</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl mb-2">20 шт</p>
                <Progress value={90.9} className="h-2 mb-2" />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Цель: 22 шт</span>
                  <span className="text-yellow-600">90.9%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Employees Tab */}
        <TabsContent value="employees" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="text-sm mb-2 block font-medium">
                    {t("kpi.roleEmployee")}
                  </label>
                  <Select value={selectedRole} onValueChange={setSelectedRole}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {salesRoles.map((role) => (
                        <SelectItem key={role.value} value={role.value}>
                          {role.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1">
                  <label className="text-sm mb-2 block font-medium">
                    {t("kpi.reporting")}
                  </label>
                  <Select value={reportPeriod} onValueChange={setReportPeriod}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">
                        {t("kpi.reportPeriods.monthly")}
                      </SelectItem>
                      <SelectItem value="quarterly">
                        {t("kpi.reportPeriods.quarterly")}
                      </SelectItem>
                      <SelectItem value="yearly">
                        {t("kpi.reportPeriods.yearly")}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredEmployees.map((employee) => (
              <Card
                key={employee.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-4xl">{employee.avatar}</div>
                      <div>
                        <CardTitle className="text-lg">
                          {employee.name}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {employee.role}
                        </p>
                      </div>
                    </div>
                    <Badge
                      className={getScoreBadgeColor(employee.score)}
                      variant="outline"
                    >
                      {employee.score}%
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* KPI Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {employee.role === "Менеджер по продажам" && (
                      <>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground flex items-center gap-1">
                              <Car className="h-3 w-3" />
                              {t("kpi.employees.sales")}
                            </span>
                            <div className="flex items-center gap-1">
                              <span className="font-medium">
                                {employee.kpis.carsSold.current}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                /{employee.kpis.carsSold.target}
                              </span>
                              {employee.kpis.carsSold.trend === "up" ? (
                                <TrendingUp className="h-3 w-3 text-green-600" />
                              ) : (
                                <TrendingDown className="h-3 w-3 text-red-600" />
                              )}
                            </div>
                          </div>
                          <Progress
                            value={
                              (employee.kpis.carsSold.current /
                                employee.kpis.carsSold.target) *
                              100
                            }
                            className="h-1.5"
                          />
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground flex items-center gap-1">
                              <DollarSign className="h-3 w-3" />
                              {t("kpi.employees.revenue")}
                            </span>
                            <div className="flex items-center gap-1">
                              <span className="font-medium">
                                {employee.kpis.revenue.current}м
                              </span>
                              <span className="text-xs text-muted-foreground">
                                /{employee.kpis.revenue.target}м
                              </span>
                              {employee.kpis.revenue.trend === "up" ? (
                                <TrendingUp className="h-3 w-3 text-green-600" />
                              ) : (
                                <TrendingDown className="h-3 w-3 text-red-600" />
                              )}
                            </div>
                          </div>
                          <Progress
                            value={
                              (employee.kpis.revenue.current /
                                employee.kpis.revenue.target) *
                              100
                            }
                            className="h-1.5"
                          />
                        </div>
                      </>
                    )}

                    {/* <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground flex items-center gap-1">
                          <Target className="h-3 w-3" />
                          {employee.role === "Менеджер по продажам"
                            ? t("kpi.employees.conversion")
                            : t("kpi.employees.efficiency")}
                        </span>
                        <div className="flex items-center gap-1">
                          <span className="font-medium">
                            {employee.kpis.conversionRate.current}%
                          </span>
                          {employee.kpis.conversionRate.target > 0 && (
                            <>
                              <span className="text-xs text-muted-foreground">
                                /{employee.kpis.conversionRate.target}%
                              </span>
                              {employee.kpis.conversionRate.trend === "up" ? (
                                <TrendingUp className="h-3 w-3 text-green-600" />
                              ) : (
                                <TrendingDown className="h-3 w-3 text-red-600" />
                              )}
                            </>
                          )}
                        </div>
                      </div>
                      <Progress
                        value={
                          employee.kpis.conversionRate.target > 0
                            ? (employee.kpis.conversionRate.current /
                                employee.kpis.conversionRate.target) *
                              100
                            : 100
                        }
                        className="h-1.5"
                      />
                    </div> */}

                    {/* <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground flex items-center gap-1">
                          <ThumbsUp className="h-3 w-3" />
                          {t("kpi.employees.rating")}
                        </span>
                        <div className="flex items-center gap-1">
                          <span className="font-medium">
                            {employee.kpis.customerSatisfaction.current}
                          </span>
                          {employee.kpis.customerSatisfaction.target > 0 && (
                            <>
                              <span className="text-xs text-muted-foreground">
                                /{employee.kpis.customerSatisfaction.target}
                              </span>
                              {employee.kpis.customerSatisfaction.trend ===
                              "up" ? (
                                <TrendingUp className="h-3 w-3 text-green-600" />
                              ) : (
                                <TrendingDown className="h-3 w-3 text-red-600" />
                              )}
                            </>
                          )}
                        </div>
                      </div>
                      <Progress
                        value={
                          employee.kpis.customerSatisfaction.target > 0
                            ? (employee.kpis.customerSatisfaction.current /
                                employee.kpis.customerSatisfaction.target) *
                              100
                            : 100
                        }
                        className="h-1.5"
                      />
                    </div> */}
                  </div>

                  {/* Monthly Trend Chart */}
                  {employee.role === "Менеджер по продажам" && (
                    <div className="pt-4 border-t">
                      <p className="text-sm mb-3 font-medium">
                        Динамика продаж (5 месяцев)
                      </p>
                      <ResponsiveContainer width="100%" height={120}>
                        <AreaChart data={employee.monthlyData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                          <YAxis tick={{ fontSize: 10 }} />
                          <Tooltip />
                          <Area
                            type="monotone"
                            dataKey="carsSold"
                            stroke="#E60012"
                            fill="#E60012"
                            fillOpacity={0.3}
                            name="Продажи"
                          />
                          <Line
                            type="monotone"
                            dataKey="target"
                            stroke="#cbd5e1"
                            strokeWidth={2}
                            strokeDasharray="5 5"
                            name="Цель"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  )}

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => setSelectedEmployee(employee.id)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    {t("kpi.employees.detailedReport")}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Funnel Tab */}
        {/* <TabsContent value="funnel" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Воронка продаж (текущий месяц)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {salesFunnelData.map((stage, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{stage.stage}</span>
                      <div className="flex items-center gap-4">
                        <span className="text-2xl">{stage.count}</span>
                        <Badge variant="secondary">{stage.conversion}%</Badge>
                      </div>
                    </div>
                    <div className="relative">
                      <Progress value={stage.conversion} className="h-8" />
                      <div className="absolute inset-0 flex items-center justify-center text-sm font-medium">
                        {idx < salesFunnelData.length - 1 && (
                          <span className="text-muted">
                            Конверсия в след. этап:{" "}
                            {Math.round(
                              (salesFunnelData[idx + 1].count / stage.count) *
                                100
                            )}
                            %
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  Ключевые метрики воронки
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Общая конверсия
                  </span>
                  <span className="font-medium">11.4%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Среднее время в воронке
                  </span>
                  <span className="font-medium">21 день</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Потери на этапе квалификации
                  </span>
                  <span className="font-medium text-red-600">30%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Конверсия тест-драйв → продажа
                  </span>
                  <span className="font-medium text-green-600">26.7%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Рекомендации</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <div className="h-2 w-2 rounded-full bg-red-500 mt-1.5 flex-shrink-0"></div>
                    <p className="text-sm">
                      Высокие потери на квалификации - усилить скрипты
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <div className="h-2 w-2 rounded-full bg-yellow-500 mt-1.5 flex-shrink-0"></div>
                    <p className="text-sm">
                      Увеличить количество тест-драйвов на 20%
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500 mt-1.5 flex-shrink-0"></div>
                    <p className="text-sm">
                      Отличная конверсия после тест-драйва
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent> */}

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("kpi.analytics.salesAnalysis")}</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={teamPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="продажи" fill="#E60012" name="Продажи факт" />
                  <Bar dataKey="цель" fill="#cbd5e1" name="Цель" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-l-4 border-l-green-500">
              <CardHeader>
                <CardTitle className="text-base">Сильные стороны</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Превышение плана продаж на 6.7%</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Высокая удовлетворенность клиентов</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Рост среднего чека на 16.7%</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-yellow-500">
              <CardHeader>
                <CardTitle className="text-base">Зоны внимания</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex gap-2">
                    <span className="text-yellow-600">!</span>
                    <span>Конверсия ниже целевой на 5%</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-yellow-600">!</span>
                    <span>Неравномерная нагрузка в команде</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-yellow-600">!</span>
                    <span>Допродажи недостигают цели</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-blue-500">
              <CardHeader>
                <CardTitle className="text-base">Действия</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex gap-2">
                    <span className="text-blue-600">→</span>
                    <span>Тренинг по допродажам</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-600">→</span>
                    <span>Оптимизация распределения лидов</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-600">→</span>
                    <span>Улучшение квалификации звонков</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Detailed Report Dialog */}
      <Dialog
        open={!!selectedEmployee}
        onOpenChange={() => setSelectedEmployee(null)}
      >
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <span className="text-4xl">{selectedEmployeeData?.avatar}</span>
              <div>
                <h2 className="text-2xl">{selectedEmployeeData?.name}</h2>
                <p className="text-muted-foreground text-base font-normal">
                  {selectedEmployeeData?.role}
                </p>
              </div>
              <Badge
                className={`ml-auto ${getScoreBadgeColor(
                  selectedEmployeeData?.score || 0
                )}`}
                variant="outline"
              >
                Общий балл: {selectedEmployeeData?.score}%
              </Badge>
            </DialogTitle>
          </DialogHeader>

          {selectedEmployeeData && (
            <div className="space-y-6 mt-4">
              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {selectedEmployeeData.role === "Менеджер по продажам" && (
                  <>
                    <Card>
                      <CardContent className="pt-4">
                        <div className="flex items-center justify-between">
                          <Car className="h-8 w-8 text-[#E60012]" />
                          <div className="text-right">
                            <p className="text-2xl">
                              {selectedEmployeeData.kpis.carsSold.current}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Продано авто
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="pt-4">
                        <div className="flex items-center justify-between">
                          <DollarSign className="h-8 w-8 text-green-600" />
                          <div className="text-right">
                            <p className="text-2xl">
                              {selectedEmployeeData.kpis.revenue.current}м
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Выручка
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </>
                )}

                <Card>
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between">
                      <Target className="h-8 w-8 text-blue-600" />
                      <div className="text-right">
                        <p className="text-2xl">
                          {selectedEmployeeData.kpis.conversionRate.current}%
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Конверсия
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between">
                      <Star className="h-8 w-8 text-yellow-600" />
                      <div className="text-right">
                        <p className="text-2xl">
                          {
                            selectedEmployeeData.kpis.customerSatisfaction
                              .current
                          }
                        </p>
                        <p className="text-xs text-muted-foreground">Рейтинг</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Detailed Tabs */}
              <Tabs defaultValue="performance" className="space-y-4">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="performance">
                    Производительность
                  </TabsTrigger>
                  <TabsTrigger value="skills">Навыки</TabsTrigger>
                  <TabsTrigger value="history">История</TabsTrigger>
                  <TabsTrigger value="achievements">Достижения</TabsTrigger>
                </TabsList>

                {/* Performance Tab */}
                <TabsContent value="performance" className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">
                          Ежедневная активность (текущая неделя)
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={250}>
                          <ComposedChart data={dailyPerformance}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="day" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar
                              dataKey="звонки"
                              fill="#3b82f6"
                              name="Звонки"
                            />
                            <Bar
                              dataKey="встречи"
                              fill="#10b981"
                              name="Встречи"
                            />
                            <Line
                              type="monotone"
                              dataKey="продажи"
                              stroke="#E60012"
                              strokeWidth={3}
                              name="Продажи"
                            />
                          </ComposedChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">
                          Недельные показатели
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={250}>
                          <BarChart data={weeklyComparison}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="неделя" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="план" fill="#cbd5e1" name="План" />
                            <Bar dataKey="факт" fill="#E60012" name="Факт" />
                          </BarChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Detailed KPI Progress */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">
                        Детализация KPI
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {selectedEmployeeData.role ===
                          "Менеджер по продажам" && (
                          <>
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <Car className="h-5 w-5 text-[#E60012]" />
                                  <span className="font-medium">
                                    Продажи автомобилей
                                  </span>
                                </div>
                                <div className="flex items-center gap-3">
                                  <span className="text-2xl">
                                    {selectedEmployeeData.kpis.carsSold.current}
                                  </span>
                                  <span className="text-muted-foreground">
                                    /{" "}
                                    {selectedEmployeeData.kpis.carsSold.target}
                                  </span>
                                  <Badge
                                    variant={
                                      selectedEmployeeData.kpis.carsSold
                                        .trend === "up"
                                        ? "default"
                                        : "destructive"
                                    }
                                  >
                                    {selectedEmployeeData.kpis.carsSold.change >
                                    0
                                      ? "+"
                                      : ""}
                                    {selectedEmployeeData.kpis.carsSold.change}%
                                  </Badge>
                                </div>
                              </div>
                              <Progress
                                value={
                                  (selectedEmployeeData.kpis.carsSold.current /
                                    selectedEmployeeData.kpis.carsSold.target) *
                                  100
                                }
                                className="h-3"
                              />
                              <p className="text-xs text-muted-foreground mt-1">
                                Осталось до цели:{" "}
                                {selectedEmployeeData.kpis.carsSold.target -
                                  selectedEmployeeData.kpis.carsSold
                                    .current}{" "}
                                авто
                              </p>
                            </div>

                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <DollarSign className="h-5 w-5 text-green-600" />
                                  <span className="font-medium">Выручка</span>
                                </div>
                                <div className="flex items-center gap-3">
                                  <span className="text-2xl">
                                    {selectedEmployeeData.kpis.revenue.current}м
                                  </span>
                                  <span className="text-muted-foreground">
                                    / {selectedEmployeeData.kpis.revenue.target}
                                    м
                                  </span>
                                  <Badge
                                    variant={
                                      selectedEmployeeData.kpis.revenue
                                        .trend === "up"
                                        ? "default"
                                        : "destructive"
                                    }
                                  >
                                    {selectedEmployeeData.kpis.revenue.change >
                                    0
                                      ? "+"
                                      : ""}
                                    {selectedEmployeeData.kpis.revenue.change}%
                                  </Badge>
                                </div>
                              </div>
                              <Progress
                                value={
                                  (selectedEmployeeData.kpis.revenue.current /
                                    selectedEmployeeData.kpis.revenue.target) *
                                  100
                                }
                                className="h-3"
                              />
                              <p className="text-xs text-muted-foreground mt-1">
                                Средний чек:{" "}
                                {(
                                  selectedEmployeeData.kpis.revenue.current /
                                  selectedEmployeeData.kpis.carsSold.current
                                ).toFixed(1)}{" "}
                                млн ₸
                              </p>
                            </div>
                          </>
                        )}

                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Target className="h-5 w-5 text-blue-600" />
                              <span className="font-medium">
                                Конверсия лид → продажа
                              </span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">
                                {
                                  selectedEmployeeData.kpis.conversionRate
                                    .current
                                }
                                %
                              </span>
                              {selectedEmployeeData.kpis.conversionRate.target >
                                0 && (
                                <>
                                  <span className="text-muted-foreground">
                                    /{" "}
                                    {
                                      selectedEmployeeData.kpis.conversionRate
                                        .target
                                    }
                                    %
                                  </span>
                                  <Badge
                                    variant={
                                      selectedEmployeeData.kpis.conversionRate
                                        .trend === "up"
                                        ? "default"
                                        : "destructive"
                                    }
                                  >
                                    {selectedEmployeeData.kpis.conversionRate
                                      .change > 0
                                      ? "+"
                                      : ""}
                                    {
                                      selectedEmployeeData.kpis.conversionRate
                                        .change
                                    }
                                    %
                                  </Badge>
                                </>
                              )}
                            </div>
                          </div>
                          {selectedEmployeeData.kpis.conversionRate.target >
                            0 && (
                            <Progress
                              value={
                                (selectedEmployeeData.kpis.conversionRate
                                  .current /
                                  selectedEmployeeData.kpis.conversionRate
                                    .target) *
                                100
                              }
                              className="h-3"
                            />
                          )}
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Star className="h-5 w-5 text-yellow-600" />
                              <span className="font-medium">
                                Удовлетворенность клиентов
                              </span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">
                                {
                                  selectedEmployeeData.kpis.customerSatisfaction
                                    .current
                                }
                              </span>
                              {selectedEmployeeData.kpis.customerSatisfaction
                                .target > 0 && (
                                <>
                                  <span className="text-muted-foreground">
                                    /{" "}
                                    {
                                      selectedEmployeeData.kpis
                                        .customerSatisfaction.target
                                    }
                                  </span>
                                  <Badge
                                    variant={
                                      selectedEmployeeData.kpis
                                        .customerSatisfaction.trend === "up"
                                        ? "default"
                                        : "destructive"
                                    }
                                  >
                                    {selectedEmployeeData.kpis
                                      .customerSatisfaction.change > 0
                                      ? "+"
                                      : ""}
                                    {
                                      selectedEmployeeData.kpis
                                        .customerSatisfaction.change
                                    }
                                    %
                                  </Badge>
                                </>
                              )}
                            </div>
                          </div>
                          {selectedEmployeeData.kpis.customerSatisfaction
                            .target > 0 && (
                            <Progress
                              value={
                                (selectedEmployeeData.kpis.customerSatisfaction
                                  .current /
                                  selectedEmployeeData.kpis.customerSatisfaction
                                    .target) *
                                100
                              }
                              className="h-3"
                            />
                          )}
                          <div className="flex gap-1 mt-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-5 w-5 ${
                                  star <=
                                  Math.round(
                                    selectedEmployeeData.kpis
                                      .customerSatisfaction.current
                                  )
                                    ? "text-yellow-600 fill-yellow-600"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Skills Tab */}
                <TabsContent value="skills" className="space-y-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">
                          Профиль навыков
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                          <RadarChart data={skillsData}>
                            <PolarGrid />
                            <PolarAngleAxis dataKey="skill" />
                            <PolarRadiusAxis angle={90} domain={[0, 100]} />
                            <Radar
                              name="Навыки"
                              dataKey="value"
                              stroke="#E60012"
                              fill="#E60012"
                              fillOpacity={0.6}
                            />
                            <Tooltip />
                          </RadarChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">
                          Детализация навыков
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {skillsData.map((skill, idx) => (
                            <div key={idx}>
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-medium">
                                  {skill.skill}
                                </span>
                                <span className="text-sm font-medium">
                                  {skill.value}%
                                </span>
                              </div>
                              <Progress value={skill.value} className="h-2" />
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">
                        Рекомендации по развитию
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                          <h4 className="font-medium text-green-900 mb-2">
                            Сильные стороны
                          </h4>
                          <ul className="text-sm text-green-800 space-y-1">
                            <li>• Отличное знание продукта (95%)</li>
                            <li>• Высокий уровень продаж (92%)</li>
                            <li>• Превосходный клиентский сервис (90%)</li>
                          </ul>
                        </div>
                        <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200">
                          <h4 className="font-medium text-yellow-900 mb-2">
                            Зоны роста
                          </h4>
                          <ul className="text-sm text-yellow-800 space-y-1">
                            <li>• Работа с возражениями - пройти тренинг</li>
                            <li>• Допродажи - изучить техники upsell</li>
                            <li>• Переговоры - развивать навыки</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* History Tab */}
                <TabsContent value="history" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">
                        История продаж (5 месяцев)
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={selectedEmployeeData.monthlyData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis yAxisId="left" />
                          <YAxis yAxisId="right" orientation="right" />
                          <Tooltip />
                          <Legend />
                          <Area
                            yAxisId="left"
                            type="monotone"
                            dataKey="carsSold"
                            stroke="#E60012"
                            fill="#E60012"
                            fillOpacity={0.3}
                            name="Продажи"
                          />
                          <Area
                            yAxisId="right"
                            type="monotone"
                            dataKey="revenue"
                            stroke="#10b981"
                            fill="#10b981"
                            fillOpacity={0.3}
                            name="Выручка (млн)"
                          />
                          <Line
                            yAxisId="right"
                            type="monotone"
                            dataKey="target"
                            stroke="#cbd5e1"
                            strokeWidth={2}
                            strokeDasharray="5 5"
                            name="Цель"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">
                          Лучший месяц
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center">
                          <p className="text-3xl text-[#E60012] mb-1">Май</p>
                          <p className="text-muted-foreground text-sm">
                            12 продаж / 420 млн ₸
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">
                          Средний результат
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center">
                          <p className="text-3xl text-blue-600 mb-1">10.2</p>
                          <p className="text-muted-foreground text-sm">
                            продаж в месяц
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Тренд</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center flex items-center justify-center gap-2">
                          <TrendingUp className="h-8 w-8 text-green-600" />
                          <p className="text-3xl text-green-600">+15%</p>
                        </div>
                        <p className="text-muted-foreground text-sm text-center mt-1">
                          рост за квартал
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                {/* Achievements Tab */}
                <TabsContent value="achievements" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">
                        Награды и достижения
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {achievements.map((achievement, idx) => {
                          const Icon = achievement.icon;
                          return (
                            <div
                              key={idx}
                              className="flex items-center gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow"
                            >
                              <div
                                className={`w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center ${achievement.color}`}
                              >
                                <Icon className="h-6 w-6" />
                              </div>
                              <div>
                                <p className="font-medium">
                                  {achievement.title}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {achievement.date}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">
                          Статистика всего времени
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">
                              Всего продано авто
                            </span>
                            <span className="font-medium text-lg">127</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">
                              Общая выручка
                            </span>
                            <span className="font-medium text-lg">
                              4,445 млн ₸
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">
                              Довольных клиентов
                            </span>
                            <span className="font-medium text-lg">119</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">
                              Средний рейтинг
                            </span>
                            <span className="font-medium text-lg">4.7 ⭐</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Рекорды</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Trophy className="h-5 w-5 text-yellow-600" />
                            <div>
                              <p className="font-medium">
                                Самый большой контракт
                              </p>
                              <p className="text-sm text-muted-foreground">
                                52 млн ₸ - BYD Tang Premium
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-5 w-5 text-blue-600" />
                            <div>
                              <p className="font-medium">
                                Самая быстрая сделка
                              </p>
                              <p className="text-sm text-muted-foreground">
                                2 дня от лида до продажи
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Activity className="h-5 w-5 text-green-600" />
                            <div>
                              <p className="font-medium">Лучшая серия</p>
                              <p className="text-sm text-muted-foreground">
                                5 продаж подряд за неделю
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
