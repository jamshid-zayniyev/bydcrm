"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

interface Color {
  id: number;
  title: string;
  rgb: string;
}

interface ColorSelectProps {
  colors: Color[];
  value?: string;
  onChange?: (colorId: string) => void;
  placeholder?: string;
  errorsColor?: boolean;
}

export function ColorSelect({
  colors,
  value,
  onChange,
  placeholder = "Rang tanlang",
  errorsColor,
}: ColorSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  // string ni number ga o'girib topamiz
  const numericValue = value ? parseInt(value) : undefined;
  const selectedColor = colors.find((c) => c.id === numericValue);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-left flex items-center justify-between hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#E60012] transition-all"
        style={errorsColor ? { border: "1px solid #E60012" } : {}}
      >
        <div className="flex items-center gap-3">
          {selectedColor ? (
            <>
              <div
                className="w-6 h-6 rounded-full border-2 border-gray-300 shadow-sm"
                style={{ backgroundColor: selectedColor.rgb }}
                title={selectedColor.rgb}
              />
              <span
                className="font-medium text-gray-900"
                style={{
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {selectedColor.title}
              </span>
              {/* <span className="text-xs text-gray-500">
                ({selectedColor.rgb})
              </span> */}
            </>
          ) : (
            <span className="text-gray-500">{placeholder}</span>
          )}
        </div>
        <svg
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className="absolute top-full left-0 right-0 mt-2 border border-gray-300 rounded-lg bg-white shadow-lg z-50"
          style={{ height: "195px", overflowY: "auto" }}
        >
          {colors.length > 0 ? (
            <div className="max-h-64 overflow-y-auto">
              {colors.map((color) => (
                <button
                  key={color.id}
                  type="button"
                  onClick={() => {
                    onChange?.(color.id.toString());
                    setIsOpen(false);
                  }}
                  className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-100 text-left transition-colors ${
                    numericValue === color.id
                      ? "bg-gray-50 border-l-4 border-l-[#E60012]"
                      : ""
                  }`}
                >
                  <div
                    className="w-6 h-6 rounded-full border-2 border-gray-300 shadow-sm"
                    style={{ backgroundColor: color.rgb }}
                    title={color.rgb}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-gray-900">{color.title}</div>
                    {/* <div className="text-xs text-gray-500">{color.rgb}</div> */}
                  </div>
                  {numericValue === color.id && (
                    <svg
                      className="w-5 h-5 text-[#E60012] flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          ) : (
            <div className="px-4 py-3 text-gray-500 text-sm">
              {t("noInformation")}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
