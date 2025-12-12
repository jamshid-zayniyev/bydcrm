import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuthContext } from "../../contexts/AuthContext";
import { Car, Eye, EyeOff, Loader, Shield, User } from "lucide-react";

export function Login() {
  const { t } = useTranslation();
  const { login, isLoading } = useAuthContext();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!credentials.username || !credentials.password) {
      setError(t("login.fillAllFields"));
      return;
    }

    const success = await login(credentials);
    if (!success) {
      setError(t("login.invalidCredentials"));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const demoLogins = [
    {
      username: "admin",
      password: "123",
      role: "Super Admin",
      icon: <Shield className="w-4 h-4" />,
    },
  ];

  const handleDemoLogin = (demo: (typeof demoLogins)[0]) => {
    setCredentials({
      username: demo.username,
      password: demo.password,
    });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 bg-white"
      style={{ height: "100vh" }}
    >
      <div className="max-w-sm w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-[#E60012] rounded-xl flex items-center justify-center">
              <Car className="w-6 h-6 text-white" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-grey">{t("login.welcome")}</h2>
          <p className="mt-1 text-gray-400 text-sm">{t("login.subtitle")}</p>
        </div>

        {/* Login Form */}

        <div className="flex items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className="w-full xl:w-1/2 bg-white p-6 rounded-xl shadow-sm border border-gray-80"
            style={{
              margin: "10px 0 20px",
              // width: "100%",
              width: window.innerWidth >= 1280 ? "50%" : "100%",
            }}
          >
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-sm mb-4">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {t("login.username")}
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={credentials.username}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#E60012] focus:border-[#E60012] transition-colors"
                  placeholder={t("login.usernamePlaceholder")}
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {t("login.password")}
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={credentials.password}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#E60012] focus:border-[#E60012] transition-colors pr-10"
                    placeholder={t("login.passwordPlaceholder")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-4 bg-blue-50 border border-blue-100 rounded-lg p-3 text-xs">
              <h4 className="font-medium text-blue-800 mb-1">Demo Loginlar:</h4>
              <div className="text-blue-700 space-y-1">
                <p>
                  <strong>Super Admin:</strong> admin / 123
                </p>
                <p>
                  <strong>Saller:</strong> employee1 / user1234
                </p>
                <p>
                  <strong>Manager:</strong> manager / user1234
                </p>
                <p>
                  <strong>Call-Center:</strong> call1 / user1234
                </p>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-4 w-full bg-[#E60012] text-white py-2.5 px-4 rounded-lg font-medium hover:bg-[#c4000f] focus:ring-2 focus:ring-[#E60012] focus:ring-offset-1 transition-colors mt-6 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{ height: "42px" }}
            >
              {isLoading ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  {t("login.signingIn")}
                </>
              ) : (
                t("login.signIn")
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-xs text-gray-400">
            {t("login.version")} 1.0.0 • BYD Карши
          </p>
        </div>
      </div>
    </div>
  );
}
