"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationDemoProps {
  itemsPerPage?: number;
}

export function PaginationDemo({ itemsPerPage = 10 }: PaginationDemoProps) {
  const [currentPage, setCurrentPage] = useState(1);

  // Mock data - 50 ta malumot
  const allItems = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `Element ${i + 1}`,
    description: `Bu ${i + 1}-chi element tavsifi`,
  }));

  // Paginatsiya hisob-kitoblari
  const totalPages = Math.ceil(allItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = useMemo(
    () => allItems.slice(startIndex, endIndex),
    [currentPage, itemsPerPage]
  );

  const handlePrevious = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : totalPages));
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  // Sahifalar ro'yxatini yaratish (max 5 ta)
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        if (!pages.includes(i)) {
          pages.push(i);
        }
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 space-y-6">
      {/* Paginatsiya kontroli */}
      <div className="flex items-center justify-between gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Oldingi
        </Button>

        {/* Sahifa raqamlari */}
        <div className="flex items-center gap-1">
          {getPageNumbers().map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === "number" && handlePageClick(page)}
              disabled={typeof page === "string"}
              className={`h-8 w-8 rounded text-sm font-medium transition-colors ${
                page === currentPage
                  ? "bg-primary text-primary-foreground"
                  : typeof page === "string"
                  ? "cursor-default text-muted-foreground"
                  : "border border-border hover:bg-accent"
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="gap-2"
        >
          Keyingi
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
