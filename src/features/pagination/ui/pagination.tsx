import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/shared/ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePagination } from "../hooks/use-pagination";
import { range } from "@/shared/helpers";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";

interface PeoplesPaginationProps {
  onSetPage: (page: number) => void;
  currentPage: number;
  total: number;
}

interface PaginationButtonProps {
  page: number;
  onClick: () => void;
  isActive: boolean;
}

const PaginationButton = ({
  page,
  onClick,
  isActive,
}: PaginationButtonProps) => {
  return (
    <Button
      className="font-medium relative size-4 p-3 flex items-center justify-center group text-center cursor-pointer"
      variant="clean"
      size="clean"
      onClick={onClick}
    >
      <span className="text-xs">{page}</span>
      <div
        className={cn(
          "absolute h-0.5 w-0 rounded-2xl bottom-0 z-1 left-0 red-sword group-hover:w-full",
          { "w-full": isActive }
        )}
      />
    </Button>
  );
};

export const PeoplesPagination = ({
  onSetPage,
  currentPage,
  total,
}: PeoplesPaginationProps) => {
  const {
    isNextPageActive,
    isPrevPageActive,
    start,
    end,
    nextPage,
    prevPage,
    totalPages,
  } = usePagination(currentPage, total);

  return (
    <Pagination className="w-full p-3 bg-background">
      <PaginationContent className="text-white">
        {isPrevPageActive && (
          <PaginationItem className="flex items-center">
            <Button
              variant="clean"
              size="clean"
              onClick={() => onSetPage(prevPage)}
            >
              <ChevronLeft />
            </Button>
          </PaginationItem>
        )}

        {start !== 1 && (
          <>
            <PaginationButton
              page={1}
              onClick={() => onSetPage(1)}
              isActive={false}
              key="first"
            />
            <PaginationEllipsis />
          </>
        )}

        {range(start, end).map((item) => (
          <PaginationButton
            page={item}
            onClick={() => onSetPage(item)}
            isActive={currentPage === item}
            key={item}
          />
        ))}

        {end !== totalPages && (
          <>
            <PaginationEllipsis />
            <PaginationButton
              page={totalPages}
              onClick={() => onSetPage(totalPages)}
              isActive={false}
              key="first"
            />
          </>
        )}

        {isNextPageActive && (
          <PaginationItem className="flex items-center">
            <Button
              variant="clean"
              size="clean"
              onClick={() => onSetPage(nextPage)}
            >
              <ChevronRight />
            </Button>
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};
