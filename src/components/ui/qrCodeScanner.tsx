// QrCodeScanner.tsx

import { Camera } from "lucide-react";

interface QrScannerProps {
  onScanSuccess?: (decodedText: string) => void;
  onScanError?: (error: string) => void;
}

const QrCodeScanner: React.FC<QrScannerProps> = ({}) => {
  return (
    <div className="max-w-md mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white p-4 text-center">
          <h2 className="text-xl font-bold flex items-center justify-center gap-3">
            <Camera className="w-7 h-7" />
            QR Kod Skaner
          </h2>
        </div>

        <div className="p-6">
          <div
            className="relative rounded-xl overflow-hidden bg-gray-900"
            style={{ minHeight: "380px" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default QrCodeScanner;
