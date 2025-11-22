import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationDemoProps {
  pgnCount?: number | null;
  fetchUsers: (
    page: number,
    search: string,
    status: number | string,
    service_type: string,
    filterDate: string
  ) => void;
  activePage: number;
  setActivePage: (page: number) => void;
  searchFilter: string;
  filterStatus: number | string;
  filterService: string;
  filterDate: string;
}

export function PaginationDemo({
  pgnCount,
  fetchUsers,
  activePage,
  setActivePage,
  searchFilter,
  filterStatus,
  filterService,
  filterDate,
}: PaginationDemoProps) {
  const totalPage = pgnCount ? Math.ceil(pgnCount / 10) : 0;

  // Next sahifa
  const handleNext = () => {
    if (activePage < totalPage) {
      const nextPage = activePage + 1;
      setActivePage(nextPage);
      fetchUsers(
        nextPage,
        searchFilter,
        filterStatus,
        filterService,
        filterDate
      );
    }
  };

  // Previous sahifa
  const handlePrevious = () => {
    if (activePage > 1) {
      const prevPage = activePage - 1;
      setActivePage(prevPage);
      fetchUsers(
        prevPage,
        searchFilter,
        filterStatus,
        filterService,
        filterDate
      );
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 space-y-6">
      {/* Paginatsiya kontroli */}
      <div className="flex items-center justify-center gap-4">
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={handlePrevious}
          disabled={activePage === 1}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        {/* Sahifa raqamlari */}
        <div className="flex items-center gap-1">
          {Array.from({ length: totalPage }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              disabled={page === activePage}
              onClick={() =>
                fetchUsers(
                  page,
                  searchFilter,
                  filterStatus,
                  filterService,
                  filterDate
                )
              }
              className={`h-8 w-8 rounded text-sm font-medium transition-colors
             border border-border ${
               page === activePage ? "bg-primary text-primary-foreground" : ""
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
          disabled={activePage === totalPage}
          className="gap-2"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
