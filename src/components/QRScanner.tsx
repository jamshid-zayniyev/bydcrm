import { QrCode, Camera, UserPlus, CheckCircle } from "lucide-react";
import { useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useTranslation } from "react-i18next";
import QrCodeScanner from "./ui/qrCodeScanner";

export function QRScanner() {
  const { t } = useTranslation();
  const [isScanning, setIsScanning] = useState(false);
  const [scannedCustomer, setScannedCustomer] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    vehicle: "",
  });

  const handleScan = () => {
    setIsScanning(true);
    // Simulate scanning
    setTimeout(() => {
      setIsScanning(false);
      setScannedCustomer("Азиз Турсунов");
    }, 2000);
  };

  const handleReset = () => {
    setScannedCustomer(null);
    setIsScanning(false);
  };

  const handleManualRegister = () => {
    if (formData.name && formData.phone && formData.vehicle) {
      alert(`Клиент ${formData.name} успешно зарегистрирован!`);
      setFormData({ name: "", phone: "", email: "", vehicle: "" });
    } else {
      alert("Пожалуйста, заполните все обязательные поля");
    }
  };

  console.log(isScanning);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900 mb-1">{t("qr.title")}</h2>
        <p className="text-gray-500 text-sm">{t("qr.description")}</p>
      </div>

      {/* Showroom Image */}
      <div className="relative h-40 rounded-xl overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1620987278429-ab178d6eb547?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCWUQlMjB2ZWhpY2xlJTIwc2hvd3Jvb218ZW58MXx8fHwxNzYwMTk0ODE5fDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="BYD Showroom"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#E60012]/90 to-transparent flex items-center px-6">
          <div>
            <h3 className="text-white mb-1">Добро пожаловать в салон BYD</h3>
            <p className="text-white/90 text-sm">
              Зарегистрируйтесь для получения персональной консультации
            </p>
          </div>
        </div>
      </div>

      {/* QR Scanner */}
      <div className="bg-white rounded-xl border-2 border-gray-200 p-6 shadow-sm">
        <div className="max-w-md mx-auto">
          <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl mb-6 relative overflow-hidden border-2 border-gray-200">
            {isScanning ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 border-4 border-[#E60012] rounded-xl relative animate-pulse">
                  <div className="absolute top-0 left-0 w-full h-1 bg-[#E60012] animate-pulse"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Camera className="w-12 h-12 text-[#E60012] animate-pulse" />
                  </div>
                </div>
              </div>
            ) : scannedCustomer ? (
              <div className="absolute inset-0 flex items-center justify-center bg-green-50">
                <div className="text-center">
                  <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                  <h3 className="text-gray-900 mb-2">
                    Клиент зарегистрирован!
                  </h3>
                  <p className="text-sm text-gray-600">{scannedCustomer}</p>
                </div>
              </div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <QrCode className="w-24 h-24 text-gray-400" />
              </div>
            )}
          </div>

          <button
            onClick={scannedCustomer ? handleReset : handleScan}
            disabled={isScanning}
            className="w-full px-6 py-3 bg-[#E60012] text-white rounded-xl hover:bg-[#b00010] disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors shadow-md"
          >
            {isScanning ? (
              <>
                <Camera className="w-5 h-5 animate-pulse" />
                <span>{t("qr.scanning.scan")}</span>
              </>
            ) : scannedCustomer ? (
              <>
                <UserPlus className="w-5 h-5" />
                <span>{t("qr.scanning.againScan")}</span>
              </>
            ) : (
              <>
                <Camera className="w-5 h-5" />
                <span>{t("qr.scanning.startScanning")}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <div className="w-12 h-12 bg-red-50 border-2 border-[#E60012] rounded-xl flex items-center justify-center mb-3">
            <QrCode className="w-6 h-6 text-[#E60012]" />
          </div>
          <h3 className="text-gray-900 mb-2">Быстрая регистрация</h3>
          <p className="text-sm text-gray-600">
            Посетители сканируют QR-код при входе для автоматической регистрации
            в систем��
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <div className="w-12 h-12 bg-green-50 border-2 border-green-600 rounded-xl flex items-center justify-center mb-3">
            <UserPlus className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-gray-900 mb-2">Автоматический профиль</h3>
          <p className="text-sm text-gray-600">
            Система автоматически создает профиль клиента с базовой информацией
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <div className="w-12 h-12 bg-gray-100 border-2 border-black rounded-xl flex items-center justify-center mb-3">
            <CheckCircle className="w-6 h-6 text-black" />
          </div>
          <h3 className="text-gray-900 mb-2">Учет посещений</h3>
          <p className="text-sm text-gray-600">
            Все визиты записываются в историю клиента для дальнейшего анализа
          </p>
        </div>
      </div>

      {/* Manual Registration */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="p-5 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-transparent">
          <h3 className="text-gray-900">{t("qr.manualRegistration.title")}</h3>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                {t("qr.manualRegistration.form.clientName.label")} *
              </label>
              <input
                type="text"
                placeholder={t(
                  "qr.manualRegistration.form.clientName.placeholder"
                )}
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E60012] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                {t("qr.manualRegistration.form.phone.label")} *
              </label>
              <input
                type="tel"
                placeholder="+998 XX XXX XX XX"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E60012] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                {t("qr.manualRegistration.form.email.label")}
              </label>
              <input
                type="email"
                placeholder="email@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E60012] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                {t("qr.manualRegistration.form.interestedModel.label")} *
              </label>
              <select
                value={formData.vehicle}
                onChange={(e) =>
                  setFormData({ ...formData, vehicle: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E60012] focus:border-transparent"
              >
                <option value="">Выберите модель</option>
                <option>BYD Song Plus</option>
                <option>BYD Han</option>
                <option>BYD Tang</option>
                <option>BYD Atto 3</option>
                <option>BYD Seal</option>
              </select>
            </div>
          </div>
          <button
            onClick={handleManualRegister}
            className="px-6 py-2 bg-[#E60012] text-white rounded-lg hover:bg-[#b00010] transition-colors shadow-sm"
          >
            {t("qr.manualRegistration.submitButton")}
          </button>
        </div>
      </div>

      {/* Recent Walk-ins */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="p-5 border-b border-gray-200">
          <h3 className="text-gray-900">{t("qr.recentVisits")}</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {[
            {
              name: "Олим Юлдашев",
              time: "10 минут назад",
              model: "BYD Song Plus",
            },
            {
              name: "Мадина Хасанова",
              time: "25 минут назад",
              model: "BYD Han",
            },
            {
              name: "Жавлон Каримов",
              time: "1 час назад",
              model: "BYD Atto 3",
            },
          ].map((visitor, index) => (
            <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-50 border-2 border-[#E60012] rounded-full flex items-center justify-center">
                    <UserPlus className="w-5 h-5 text-[#E60012]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-900">{visitor.name}</p>
                    <p className="text-xs text-gray-500">{visitor.model}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-500">{visitor.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
