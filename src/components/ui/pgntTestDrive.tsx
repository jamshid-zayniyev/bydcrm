import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationDemoProps {
  pgnCount?: number | null;
  fetchUsers: (
    tabs: string,
    search: string,
    page: number,
    service_type: string,
    filterDate: string
  ) => void;
  activePage: number;
  setActivePage: (page: number) => void;
  filterStatus: string;
  searchFilter: string;
  filterService: string;
  filterDate: string;
}

export function PgntTestDrive({
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

  // getPageNumbers funksiyasi
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxPagesToShow = 3; // Bir vaqtda ko'rsatiladigan sahifalar soni

    if (totalPage <= maxPagesToShow) {
      // Agar jami sahifalar kam bo'lsa, hammasini ko'rsat
      for (let i = 1; i <= totalPage; i++) {
        pages.push(i);
      }
    } else {
      const halfWindow = Math.floor(maxPagesToShow / 2);
      let startPage = Math.max(1, activePage - halfWindow);
      let endPage = Math.min(totalPage, activePage + halfWindow);

      // Agar sahifalar soni maxPagesToShow dan kam bo'lsa
      if (endPage - startPage + 1 < maxPagesToShow) {
        if (startPage === 1) {
          endPage = Math.min(totalPage, startPage + maxPagesToShow - 1);
        } else {
          startPage = Math.max(1, endPage - maxPagesToShow + 1);
        }
      }

      // Birinchi sahifa va "..." qo'shish
      if (startPage > 1) {
        pages.push(1);
      }

      if (startPage > 2) {
        pages.push("...");
      }

      // Asosiy sahifalar
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      // Oxirgi sahifa oldidan "..." qo'shish
      if (endPage < totalPage - 1) {
        pages.push("...");
      }

      // Oxirgi sahifa
      if (endPage < totalPage) {
        pages.push(totalPage);
      }
    }

    return pages;
  };

  // Next sahifa
  const handleNext = () => {
    if (activePage < totalPage) {
      const nextPage = activePage + 1;
      setActivePage(nextPage);
      fetchUsers(
        filterStatus,
        searchFilter,
        nextPage,
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
        filterStatus,
        searchFilter,
        prevPage,
        filterService,
        filterDate
      );
    }
  };

  // Sahifaga o'tish
  const handlePageClick = (page: number) => {
    setActivePage(page);
    fetchUsers(filterStatus, searchFilter, page, filterService, filterDate);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 space-y-6">
      {/* Paginatsiya kontroli */}
      <div className="flex items-center justify-center gap-4 sm:gap-2">
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={handlePrevious}
          disabled={activePage === 1}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        {/* Sahifa raqamlari - getPageNumbers yordamida */}
        <div className="flex items-center gap-1">
          {getPageNumbers().map((page, index) => (
            <button
              key={index}
              disabled={page === activePage || typeof page === "string"}
              onClick={() => typeof page === "number" && handlePageClick(page)}
              className={`h-8 w-8 rounded text-sm font-medium transition-colors border border-border ${
                page === activePage
                  ? "bg-primary text-primary-foreground"
                  : typeof page === "string"
                  ? "cursor-default text-muted-foreground"
                  : "hover:bg-accent"
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
