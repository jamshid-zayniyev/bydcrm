import { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Car,
  ThumbsUp,
  Download,
  Plus,
  Eye,
  Star,
  PhoneCall,
  Wrench,
  DollarSignIcon,
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
} from "recharts";
import { useTranslation } from "react-i18next";
import useKPI from "@/hooks/useKPI";
import { formatPrice } from "@/hooks/mlnNumber";
import { usePieChart } from "@/hooks/usePieChart";
import formatCurrency from "@/hooks/formatCurrents";
import { NoUser } from "@/assets";
import { formatPriceNoT } from "@/hooks/mlnNumberNoT";
import Loading from "./ui/loading";

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

  const {
    kpiMonthly,
    kpiRevenue,
    bestStaff,
    salesPerformance,
    kpiTestDriveMonthly,
    kpiMostSoldCar,
    kpiSales,
    kpiStaffReports,
    btnEmployeeId,
    customersId,
    yearly,
    weeklyData,
    weeklyIndicatorsData,
    last5MonthsData,
    staffReports2Data,
    generalStatisticsData,
    loading,
  } = useKPI();
  const { bestSeller } = usePieChart();

  // Mock data for salespeople
  const salesTeam: SalesmanKPI[] = [
    {
      // employee_id
      id: "1",

      // full_name
      name: "Алексей Иванов",

      // role
      role: "Менеджер по продажам",

      // avatar
      avatar: "👨‍💼",

      // no
      score: 94,

      kpis: {
        carsSold: {
          // total_sales
          current: 12,
          // sales_target
          target: 10,
          trend: "up",
          change: 20,
        },
        revenue: {
          // total_revenue
          current: 420,
          // revenue_target
          target: 350,
          trend: "up",
          change: 20,
        },
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

  const getScoreBadgeColor = (score: number) => {
    if (score >= 90) return "bg-green-100 text-green-800 border-green-200";
    if (score >= 80) return "bg-blue-100 text-blue-800 border-blue-200";
    if (score >= 70) return "bg-yellow-100 text-yellow-800 border-yellow-200";
    return "bg-red-100 text-red-800 border-red-200";
  };

  // Get selected employee for detailed report
  const selectedEmployeeData = salesTeam.find(
    (emp) => emp.id === selectedEmployee
  );

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
                  {t("kpi.totalSalaes")}
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
              <span className="text-muted-foreground">{t("kpi.month")}</span>
            </div>
            <Progress
              value={kpiMonthly?.achievement_percent}
              className="mt-3 h-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              {t("kpi.target")}: {kpiMonthly?.target} {t("kpi.car")}
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  {t("kpi.revenue")}
                </p>
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
            </div>
            <Progress
              value={kpiRevenue?.achievement_percent}
              className="mt-3 h-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              {t("kpi.target")}: {formatPrice(kpiRevenue?.target)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overview">
            {t("kpi.review.reviewName")}
          </TabsTrigger>
          <TabsTrigger value="employees">
            {t("kpi.employees.employeesName")}
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="bg-white p-4 sm:p-6 rounded-lg sm:rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-gray-900 mb-3 sm:mb-4 text-base sm:text-lg">
              {t("dashboard.best.title")}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {bestSeller.map((employee, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        index === 0
                          ? "bg-[#E60012] text-white"
                          : index === 1
                          ? "bg-gray-800 text-white"
                          : index === 2
                          ? "bg-gray-600 text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-sm text-gray-900">
                        {employee?.full_name}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-900">
                      {employee.total_sales} {t("dashboard.best.sales")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>{t("kpi.review.dynamics")}</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={salesPerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month_label" />

                    {/* Tooltip formatter bilan */}
                    <Tooltip
                      formatter={(value: number, name: string) => {
                        // formatPrice funksiyasini chaqirish
                        if (name === "Выручка" || name === "Цель") {
                          return [formatCurrency(value), name];
                        }
                        return [value, name];
                      }}
                    />

                    <Legend />
                    <Bar
                      yAxisId="left"
                      dataKey="sales"
                      fill="#E60012"
                      name="Продажи авто"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="revenue"
                      stroke="#10b981"
                      strokeWidth={3}
                      name="Выручка"
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
                  <BarChart data={bestStaff} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="full_name" width={100} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="sales_count" fill="#E60012" name="Продажи" />
                    <Bar
                      dataKey="average_rating"
                      fill="#fbbf24"
                      name="Рейтинг"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">{t("kpi.chek")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl mb-2">
                  {formatPrice(kpiMostSoldCar?.price)}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  {t("kpi.testDrive")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl mb-2">
                  {kpiTestDriveMonthly?.test_drive_count} {t("kpi.pcs")}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  {t("kpi.upselling")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl mb-2">
                  {kpiSales?.purchased_customers} {t("kpi.pcs")}
                </p>
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
            {kpiStaffReports.map((employee) => (
              <Card
                key={employee.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-4xl">
                        <img
                          src={`${employee.avatar ? employee.avatar : NoUser}`}
                          alt={`${employee.full_name}`}
                          style={{
                            width: "36px",
                            height: "36px",
                            borderRadius: "50%",
                          }}
                        />
                      </div>
                      <div>
                        <CardTitle className="text-lg">
                          {employee.full_name}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {employee.role === "sa"
                            ? "Super Admin"
                            : employee.role === "s"
                            ? "Seller"
                            : employee.role === "t"
                            ? "Technikal"
                            : "Call-Center"}
                        </p>
                      </div>
                    </div>
                    {/* <Badge
                      className={getScoreBadgeColor(employee.score)}
                      variant="outline"
                    >
                      {employee.score}%
                    </Badge> */}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    {employee.role === "sa" ? (
                      "Super Admin"
                    ) : employee.role === "s" ? (
                      <>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground flex items-center gap-1">
                              <Car className="h-3 w-3" />
                              {t("kpi.employees.sales")}
                            </span>
                            <div className="flex items-center gap-1">
                              <span className="font-medium">
                                {employee.sales.value}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                /{" "}
                                {employee.sales.target
                                  ? employee.sales.target
                                  : 0}
                              </span>
                              {employee.sales.target < employee.sales.value ? (
                                <TrendingUp className="h-3 w-3 text-green-600" />
                              ) : (
                                <TrendingDown className="h-3 w-3 text-red-600" />
                              )}
                            </div>
                          </div>
                          <Progress
                            value={employee.sales.percent}
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
                                {(employee.revenue.value / 1000000).toFixed(0)}{" "}
                                {t("dashboard.cars.mln")}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                /
                                {employee.revenue.target
                                  ? `${(
                                      employee.revenue.target / 1000000
                                    ).toFixed(0)} ${t("dashboard.cars.mln")}`
                                  : `0 ${t("dashboard.cars.mln")}`}
                              </span>
                              {employee.revenue.target <
                              employee.revenue.value ? (
                                <TrendingUp className="h-3 w-3 text-green-600" />
                              ) : (
                                <TrendingDown className="h-3 w-3 text-red-600" />
                              )}
                            </div>
                          </div>
                          <Progress
                            value={employee.revenue.percent}
                            className="h-1.5"
                          />
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground flex items-center gap-1">
                              <ThumbsUp className="h-3 w-3" />
                              {t("kpi.employees.rating")}
                            </span>
                            <div className="flex items-center gap-1">
                              <span className="font-medium">
                                {employee.rating.value}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                /
                                {employee.rating.target
                                  ? employee.rating.target
                                  : 0}
                              </span>
                              {employee.rating.target <
                              employee.rating.value ? (
                                <TrendingUp className="h-3 w-3 text-green-600" />
                              ) : (
                                <TrendingDown className="h-3 w-3 text-red-600" />
                              )}
                            </div>
                          </div>
                          <Progress
                            value={employee.rating.percent}
                            className="h-1.5"
                          />
                        </div>
                      </>
                    ) : employee.role === "t" ? (
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground flex items-center gap-1">
                            <ThumbsUp className="h-3 w-3" />
                            {t("kpi.employees.rating")}
                          </span>
                          <div className="flex items-center gap-1">
                            <span className="font-medium">
                              {employee.rating.value}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              /
                              {employee.rating.target
                                ? employee.rating.target
                                : 0}
                            </span>
                            {employee.rating.target < employee.rating.value ? (
                              <TrendingUp className="h-3 w-3 text-green-600" />
                            ) : (
                              <TrendingDown className="h-3 w-3 text-red-600" />
                            )}
                          </div>
                        </div>
                        <Progress
                          value={employee.rating.percent}
                          className="h-1.5"
                        />
                      </div>
                    ) : (
                      <>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground flex items-center gap-1">
                              <DollarSign className="h-3 w-3" />
                              Calls
                            </span>
                            <div className="flex items-center gap-1">
                              <span className="font-medium">
                                {(employee.calls.value / 1000000).toFixed(0)}{" "}
                                {t("dashboard.cars.mln")}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                /
                                {employee.calls.target
                                  ? `${(
                                      employee.calls.target / 1000000
                                    ).toFixed(0)} ${t("dashboard.cars.mln")}`
                                  : `0 ${t("dashboard.cars.mln")}`}
                              </span>
                              {employee.calls.target < employee.calls.value ? (
                                <TrendingUp className="h-3 w-3 text-green-600" />
                              ) : (
                                <TrendingDown className="h-3 w-3 text-red-600" />
                              )}
                            </div>
                          </div>
                          <Progress
                            value={employee.calls.percent}
                            className="h-1.5"
                          />
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground flex items-center gap-1">
                              <ThumbsUp className="h-3 w-3" />
                              {t("kpi.employees.rating")}
                            </span>
                            <div className="flex items-center gap-1">
                              <span className="font-medium">
                                {employee.rating.value}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                /
                                {employee.rating.target
                                  ? employee.rating.target
                                  : 0}
                              </span>
                              {employee.rating.target <
                              employee.rating.value ? (
                                <TrendingUp className="h-3 w-3 text-green-600" />
                              ) : (
                                <TrendingDown className="h-3 w-3 text-red-600" />
                              )}
                            </div>
                          </div>
                          <Progress
                            value={employee.rating.percent}
                            className="h-1.5"
                          />
                        </div>
                      </>
                    )}
                  </div>

                  <div className="pt-4 border-t">
                    <p className="text-sm mb-3 font-medium">
                      {t("kpi.5Month")}
                    </p>
                    <ResponsiveContainer width="100%" height={120}>
                      <AreaChart data={employee.last_5_months}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                        <YAxis tick={{ fontSize: 10 }} />
                        <Tooltip />
                        <Area
                          type="monotone"
                          dataKey="sales"
                          stroke="#E60012"
                          fill="#E60012"
                          fillOpacity={0.3}
                          name="Продажи"
                        />
                        {/* <Line
                            type="monotone"
                            dataKey="target"
                            stroke="#cbd5e1"
                            strokeWidth={2}
                            strokeDasharray="5 5"
                            name="Цель"
                          /> */}
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      btnEmployeeId(employee.id, employee.role);
                      setSelectedEmployee(employee.id.toString());
                    }}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    {t("kpi.employees.detailedReport")}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Detailed Report Dialog */}
      <Dialog
        open={!!selectedEmployee}
        onOpenChange={() => setSelectedEmployee(null)}
      >
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          {loading ? (
            <Loading />
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <span className="text-4xl">
                    <img
                      src={`${
                        customersId?.avatar ? customersId?.avatar : NoUser
                      }`}
                      alt={`${customersId?.full_name}`}
                      className="rounded-full"
                      style={{ width: "36px", height: "36px" }}
                    />
                  </span>
                  <div>
                    <h2 className="text-2xl">{customersId?.full_name}</h2>
                    <p className="text-muted-foreground text-base font-normal">
                      {customersId?.role === "sa"
                        ? "Super Admin"
                        : customersId?.role === "s"
                        ? "Seller"
                        : customersId?.role === "t"
                        ? "Technikal"
                        : "Call-Center"}
                    </p>
                  </div>
                  <Badge
                    className={`ml-auto ${getScoreBadgeColor(
                      customersId?.rating_percent || 0
                    )}`}
                    variant="outline"
                  >
                    {t("kpi.score")} {customersId?.rating_percent}%
                  </Badge>
                </DialogTitle>
              </DialogHeader>

              {selectedEmployeeData && (
                <div className="space-y-6 mt-4">
                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    {customersId?.role === "sa" ? (
                      "Super Admin"
                    ) : customersId?.role === "s" ? (
                      <>
                        <Card>
                          <CardContent className="pt-4">
                            <div className="flex items-center justify-between">
                              <Car className="h-8 w-8 text-[#E60012]" />
                              <div className="text-right">
                                <p className="text-2xl">
                                  {customersId?.sales_count}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {t("kpi.salesCount")}
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
                                  {(
                                    customersId?.total_revenue / 1000000
                                  ).toFixed(0)}{" "}
                                  {t("dashboard.cars.mln")}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {t("kpi.totalRevenue")}
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
                                  {customersId?.average_rating}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  Рейтинг
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </>
                    ) : customersId?.role === "t" ? (
                      <>
                        <Card>
                          <CardContent className="pt-4">
                            <div className="flex items-center justify-between">
                              <Wrench className="h-8 w-8 text-[#E60012]" />

                              <div className="text-right">
                                <p className="text-2xl">
                                  {customersId?.average_rating}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {t("kpi.technikal")}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </>
                    ) : (
                      <>
                        <Card>
                          <CardContent className="pt-4">
                            <div className="flex items-center justify-between">
                              <PhoneCall className="h-8 w-8 text-[#E60012]" />

                              <div className="text-right">
                                <p className="text-2xl">
                                  {customersId?.calls_count}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {t("kpi.salesCount")}
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
                                  {customersId?.average_rating}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {t("kpi.averageRating")}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </>
                    )}
                  </div>

                  {/* Detailed Tabs */}
                  <Tabs defaultValue="performance" className="space-y-4">
                    <TabsList
                      className="grid w-full"
                      style={{
                        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                      }}
                    >
                      <TabsTrigger value="performance">
                        {t("kpi.performance")}
                      </TabsTrigger>
                      {customersId?.role === "t" ? (
                        <></>
                      ) : (
                        <TabsTrigger value="history">
                          {t("kpi.history")}
                        </TabsTrigger>
                      )}

                      <TabsTrigger value="achievements">
                        {t("kpi.achievements")}
                      </TabsTrigger>
                    </TabsList>

                    {/* Performance Tab */}
                    <TabsContent value="performance" className="space-y-4">
                      <div className="grid grid-cols-1 gap-4">
                        {customersId?.role === "t" ? (
                          <></>
                        ) : (
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-base">
                                {t("kpi.currentWeek")}
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ResponsiveContainer width="100%" height={250}>
                                <ComposedChart data={weeklyData?.data}>
                                  <CartesianGrid strokeDasharray="3 3" />
                                  <XAxis dataKey="day" />
                                  <YAxis />
                                  <Tooltip />
                                  <Legend />
                                  <Bar
                                    dataKey="calls"
                                    fill="#3b82f6"
                                    name={t("kpi.calls")}
                                  />
                                  {/* <Line
                                type="monotone"
                                dataKey="продажи"
                                stroke="#E60012"
                                strokeWidth={3}
                                name="Продажи"
                              /> */}
                                </ComposedChart>
                              </ResponsiveContainer>
                            </CardContent>
                          </Card>
                        )}

                        {customersId?.role === "s" ? (
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-base">
                                {t("kpi.weeklyIndicators")}
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ResponsiveContainer width="100%" height={250}>
                                <BarChart data={weeklyIndicatorsData}>
                                  <CartesianGrid strokeDasharray="3 3" />
                                  <XAxis dataKey="week" />
                                  <YAxis />
                                  <Tooltip />
                                  <Legend />
                                  <Bar
                                    dataKey="plan"
                                    fill="#cbd5e1"
                                    name={t("kpi.planed")}
                                  />
                                  <Bar
                                    dataKey="fact"
                                    fill="#E60012"
                                    name={t("kpi.fact")}
                                  />
                                </BarChart>
                              </ResponsiveContainer>
                            </CardContent>
                          </Card>
                        ) : (
                          <></>
                        )}
                      </div>

                      {/* Detailed KPI Progress */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">
                            {t("kpi.detailsKpi")}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-6">
                            {customersId?.role === "sa" ? (
                              "Super Admin"
                            ) : customersId?.role === "s" ? (
                              <>
                                <div>
                                  <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                      <Car className="h-5 w-5 text-[#E60012]" />
                                      <span className="font-medium">Car</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                      <span className="text-2xl">
                                        {staffReports2Data?.sales?.value}
                                      </span>
                                      <span className="text-muted-foreground">
                                        / {staffReports2Data?.sales?.target}
                                      </span>
                                      <Badge
                                      // variant={
                                      //   selectedEmployeeData.kpis.carsSold
                                      //     .trend === "up"
                                      //     ? "default"
                                      //     : "destructive"
                                      // }
                                      >
                                        {staffReports2Data?.sales?.percent}%
                                      </Badge>
                                    </div>
                                  </div>
                                  <Progress
                                    value={staffReports2Data?.sales?.percent}
                                    className="h-3"
                                  />
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {t("kpi.theGoal")}{" "}
                                    {staffReports2Data?.sales?.remaining}{" "}
                                    {t("kpi.avto")}
                                  </p>
                                </div>

                                <div>
                                  <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                      <DollarSignIcon className="h-5 w-5 text-yellow-600" />
                                      <span className="font-medium">
                                        {t("kpi.revenueStatistices")}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                      <span className="text-2xl">
                                        {formatPriceNoT(
                                          staffReports2Data?.revenue?.value
                                            ? staffReports2Data?.revenue?.value
                                            : 0
                                        )}{" "}
                                        {t("dashboard.cars.mln")}
                                      </span>
                                      /
                                      {formatPriceNoT(
                                        staffReports2Data?.revenue?.target
                                          ? staffReports2Data?.revenue?.target
                                          : 0
                                      )}{" "}
                                      {t("dashboard.cars.mln")}
                                      <Badge
                                      // variant={
                                      //   selectedEmployeeData.kpis.carsSold
                                      //     .trend === "up"
                                      //     ? "default"
                                      //     : "destructive"
                                      // }
                                      >
                                        {staffReports2Data?.revenue?.percent}%
                                      </Badge>
                                    </div>
                                  </div>

                                  <Progress
                                    value={staffReports2Data?.revenue?.percent}
                                    className="h-3"
                                  />
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {t("kpi.check")}{" "}
                                    {formatPriceNoT(
                                      staffReports2Data?.revenue?.average_check
                                        ? staffReports2Data?.revenue
                                            ?.average_check
                                        : 0
                                    )}{" "}
                                    {t("dashboard.cars.mln")}
                                  </p>
                                </div>

                                <div>
                                  <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                      <Star className="h-5 w-5 text-yellow-600" />
                                      <span className="font-medium">
                                        {t("kpi.customer")}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                      <span className="text-2xl">
                                        {staffReports2Data?.rating?.value}
                                      </span>
                                      /{staffReports2Data?.rating?.target}
                                      <Badge
                                      // variant={
                                      //   selectedEmployeeData.kpis.carsSold
                                      //     .trend === "up"
                                      //     ? "default"
                                      //     : "destructive"
                                      // }
                                      >
                                        {staffReports2Data?.rating?.percent}%
                                      </Badge>
                                    </div>
                                  </div>

                                  <Progress
                                    value={staffReports2Data?.rating?.percent}
                                    className="h-3"
                                  />
                                </div>
                              </>
                            ) : customersId?.role === "t" ? (
                              <>
                                <div>
                                  <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                      <Wrench className="h-5 w-5 text-yellow-600" />
                                      <span className="font-medium">
                                        {t("kpi.technikal")}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                      <span className="text-2xl">
                                        {staffReports2Data?.rating?.value}
                                      </span>
                                      /{staffReports2Data?.rating?.target}
                                      <Badge
                                      // variant={
                                      //   selectedEmployeeData.kpis.carsSold
                                      //     .trend === "up"
                                      //     ? "default"
                                      //     : "destructive"
                                      // }
                                      >
                                        {staffReports2Data?.rating?.percent}%
                                      </Badge>
                                    </div>
                                  </div>

                                  <Progress
                                    value={staffReports2Data?.rating?.percent}
                                    className="h-3"
                                  />
                                </div>
                              </>
                            ) : (
                              <>
                                <div>
                                  <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                      <PhoneCall className="h-5 w-5 text-[#E60012]" />
                                      <span className="font-medium">
                                        {t("kpi.callCenter")}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                      <span className="text-2xl">
                                        {staffReports2Data?.calls?.value}
                                      </span>
                                      <span className="text-muted-foreground">
                                        / {staffReports2Data?.calls?.target}
                                      </span>
                                      <Badge
                                      // variant={
                                      //   selectedEmployeeData.kpis.carsSold
                                      //     .trend === "up"
                                      //     ? "default"
                                      //     : "destructive"
                                      // }
                                      >
                                        {staffReports2Data?.calls?.percent}%
                                      </Badge>
                                    </div>
                                  </div>
                                  <Progress
                                    value={staffReports2Data?.calls?.percent}
                                    className="h-3"
                                  />
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {t("kpi.theGoal")}{" "}
                                    {staffReports2Data?.calls?.remaining}{" "}
                                    {t("kpi.avto")}
                                  </p>
                                </div>

                                <div>
                                  <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                      <Star className="h-5 w-5 text-yellow-600" />
                                      <span className="font-medium">
                                        {t("kpi.customer")}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                      <span className="text-2xl">
                                        {staffReports2Data?.rating?.value}
                                      </span>
                                      /{staffReports2Data?.rating?.target}
                                    </div>
                                  </div>

                                  <Progress
                                    value={staffReports2Data?.rating?.percent}
                                    className="h-3"
                                  />

                                  {/* <div className="flex gap-1 mt-2">
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
                              </div> */}
                                </div>
                              </>
                            )}

                            {/* <div>
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
                        </div> */}
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    {/* History Tab */}
                    <TabsContent value="history" className="space-y-4">
                      {customersId?.role === "s" ? (
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">
                              История продаж (5 месяцев)
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                              <AreaChart data={last5MonthsData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis yAxisId="left" />
                                <YAxis yAxisId="right" orientation="right" />
                                <Tooltip
                                  formatter={(value: any, name: string) => {
                                    // revenue va target uchun formatPriceNoT funksiyasini ishlatish
                                    if (
                                      name === "Выручка (млн)" ||
                                      name === "Цель"
                                    ) {
                                      return [formatPriceNoT(value), name];
                                    }
                                    return [value, name];
                                  }}
                                />
                                <Legend />
                                <Area
                                  yAxisId="left"
                                  type="monotone"
                                  dataKey="sales_count"
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
                      ) : (
                        <></>
                      )}

                      {customersId?.role === "t" ? (
                        ""
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-base">
                                {t("kpi.bestMonth")}
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="text-center">
                                <p className="text-3xl text-[#E60012] mb-1">
                                  {yearly?.month?.slice(0, 3)}
                                </p>
                                <p className="text-muted-foreground text-sm">
                                  {yearly?.record_sales}{" "}
                                  {t("kpi.bestMonthUnit")} /
                                  {yearly?.revenue
                                    ? formatPriceNoT(yearly?.revenue)
                                    : ""}{" "}
                                  {t("dashboard.cars.mln")}
                                </p>
                              </div>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardHeader>
                              <CardTitle className="text-base">
                                {t("kpi.averageResult")}
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="text-center">
                                <p className="text-3xl text-blue-600 mb-1">
                                  {yearly?.average_sales}
                                </p>
                                <p className="text-muted-foreground text-sm">
                                  {t("kpi.averageResultUnit")}
                                </p>
                              </div>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardHeader>
                              <CardTitle className="text-base">
                                {t("kpi.trend")}
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="text-center flex items-center justify-center gap-2">
                                {yearly?.quarterly_growth ? (
                                  <TrendingUp className="h-8 w-8 text-green-600" />
                                ) : (
                                  <TrendingDown className="h-8 w-8 text-red-600" />
                                )}

                                {yearly?.quarterly_growth ? (
                                  <p className="text-3xl text-green-600">
                                    `${+yearly?.quarterly_growth}%`{" "}
                                  </p>
                                ) : (
                                  <p className="text-3xl text-red-600">0</p>
                                )}
                              </div>
                              <p className="text-muted-foreground text-sm text-center mt-1">
                                {t("kpi.trendUnit")}
                              </p>
                            </CardContent>
                          </Card>
                        </div>
                      )}
                    </TabsContent>

                    {/* Achievements Tab */}
                    <TabsContent value="achievements" className="space-y-4">
                      <div className="grid grid-cols-1 gap-4">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">
                              {t("kpi.allTimeStats")}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            {customersId?.role === "sa" ? (
                              "Super Admin"
                            ) : customersId?.role === "s" ? (
                              <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm text-muted-foreground">
                                    {t("kpi.totalSold")}
                                  </span>
                                  <span className="font-medium text-lg">
                                    {generalStatisticsData?.total_sold}
                                  </span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-sm text-muted-foreground">
                                    {t("kpi.totalRevenue1")}
                                  </span>
                                  <span className="font-medium text-lg">
                                    {generalStatisticsData?.total_revenue}
                                  </span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-sm text-muted-foreground">
                                    {t("kpi.happyCustomers")}
                                  </span>
                                  <span className="font-medium text-lg">
                                    {generalStatisticsData?.satisfied_clients}
                                  </span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-sm text-muted-foreground">
                                    {t("kpi.averageRating1")}
                                  </span>
                                  <span className="font-medium text-lg">
                                    {generalStatisticsData?.average_rating} ⭐
                                  </span>
                                </div>
                              </div>
                            ) : customersId?.role === "t" ? (
                              <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm text-muted-foreground">
                                    {t("kpi.uslog")}
                                  </span>
                                  <span className="font-medium text-lg">
                                    {generalStatisticsData?.completed_services}
                                  </span>
                                </div>

                                <div className="flex items-center justify-between">
                                  <span className="text-sm text-muted-foreground">
                                    {t("kpi.averageRating1")}
                                  </span>
                                  <span className="font-medium text-lg">
                                    {generalStatisticsData?.average_rate} ⭐
                                  </span>
                                </div>
                              </div>
                            ) : (
                              <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm text-muted-foreground">
                                    {t("kpi.kolechtvo")}
                                  </span>
                                  <span className="font-medium text-lg">
                                    {generalStatisticsData?.total_calls}
                                  </span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-sm text-muted-foreground">
                                    {t("kpi.happyCustomers")}
                                  </span>
                                  <span className="font-medium text-lg">
                                    {generalStatisticsData?.positive_calls}
                                  </span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-sm text-muted-foreground">
                                    {t("kpi.averageRating1")}
                                  </span>
                                  <span className="font-medium text-lg">
                                    {generalStatisticsData?.average_score} ⭐
                                  </span>
                                </div>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
