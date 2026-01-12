"use client";

import { useState, useMemo } from "react";
import { Search, ChevronDown } from "lucide-react";
import { CustomersList } from "@/types/testDrive";

interface NameSelectProps {
  names: CustomersList[];
  selectedName: string;
  onSelect: (name: string) => void;
}

export function NameSelect({ names, selectedName, onSelect }: NameSelectProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredNames = useMemo(() => {
    if (names.length <= 10) {
      return names;
    }
    if (!searchTerm.trim()) {
      return names;
    }
    return names.filter((name) =>
      name.full_name.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
  }, [searchTerm, names]);

  return (
    <div className="relative group max-w-md mx-auto">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg blur opacity-0 group-hover:opacity-20 transition duration-300"></div>
      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="w-full flex items-center justify-between px-4 py-4 bg-slate-800/50 border border-slate-700 rounded-lg hover:border-cyan-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30 transition-all duration-200"
          style={{ height: "39px" }}
        >
          <span className={selectedName ? "text-black" : "text-slate-500"}>
            {selectedName || "Ismni tanlang..."}
          </span>
          <ChevronDown
            size={20}
            className={`text-cyan-400 transition-transform duration-200 ${
              dropdownOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {dropdownOpen && (
          <div className="absolute bg-white top-full left-0 right-0 mt-2 bg-slate-800/95 border border-slate-700 rounded-lg shadow-2xl z-50 backdrop-blur-sm">
            {names.length > 10 && (
              <div className="p-3 border-b border-slate-700">
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

            <div
              // className="max-h-60 overflow-y-auto"
              style={{ maxHeight: "200px", overflowY: "auto" }}
            >
              {filteredNames.length > 0 ? (
                filteredNames.map((name) => (
                  <button
                    key={name?.id}
                    onClick={() => {
                      onSelect(name?.full_name);
                      setDropdownOpen(false);
                      setSearchTerm("");
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-slate-700/50 transition-colors duration-150 border-b border-slate-700/30 last:border-b-0"
                  >
                    {name?.full_name}
                  </button>
                ))
              ) : (
                <div className="px-4 py-6 text-center text-slate-400">
                  Natija topilmadi
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
