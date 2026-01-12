"use client";

import { CustomersList } from "@/types/testDrive";
import { Search } from "lucide-react";
import { useState, useRef, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";

interface ColorSelectProps {
  colors: CustomersList[];
  value?: string;
  onChange?: (colorId: string) => void;
  placeholder?: string;
  errorsColor?: boolean;
  editForm?: (id: number) => void;
}

export function NameSelect({
  colors,
  value,
  onChange,
  placeholder = "Ismni tanlang",
  errorsColor,
  editForm,
}: ColorSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");

  // string ni number ga o'girib topamiz
  const numericValue = value ? parseInt(value) : undefined;
  const selectedColor = colors.find((c) => c.id === numericValue);

  const filteredNames = useMemo(() => {
    if (colors.length <= 10) {
      return colors;
    }
    if (!searchTerm.trim()) {
      return colors;
    }
    return colors.filter(({ full_name }) =>
      full_name.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

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
              {/* <div
                className="w-6 h-6 rounded-full border-2 border-gray-300 shadow-sm"
                style={{ backgroundColor: selectedColor.full_name }}
                title={selectedColor.full_name}
              /> */}
              <span
                className="font-medium text-gray-900"
                style={{
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {selectedColor.full_name}
              </span>
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
        <div className="absolute top-full left-0 right-0 mt-2 border border-gray-300 rounded-lg bg-white shadow-lg z-50">
          {colors.length > 10 && (
            <div
              className="sticky top-0 bg-white p-3 border-b border-slate-700"
              style={{ position: "sticky" }}
            >
              <div className="relative flex items-center">
                <Search
                  className="absolute left-3 text-cyan-400 pointer-events-none"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Qidirish..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 bg-slate-700/50 border border-slate-600 placeholder-slate-500 rounded focus:border-cyan-500 focus:outline-none text-sm"
                  autoFocus
                />
              </div>
            </div>
          )}
          <div style={{ maxHeight: "150px", overflowY: "auto" }}>
            {filteredNames.length > 0 ? (
              <div className="max-h-64 overflow-y-auto">
                {filteredNames.map((color) => (
                  <button
                    key={color.id}
                    type="button"
                    onClick={() => {
                      onChange?.(color.id.toString());
                      editForm?.(color.id);
                      setIsOpen(false);
                    }}
                    className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-100 text-left transition-colors ${
                      numericValue === color.id
                        ? "bg-gray-50 border-l-4 border-l-[#E60012]"
                        : ""
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="text-gray-900">{color.full_name}</div>
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
              <div className="px-4 py-3  text-center text-gray-500 text-sm">
                {t("noInformation")}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
