const PER_PAGE = 10;

export const usePagination = (currentPage: number, total: number) => {
  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));
  const page = Math.min(Math.max(1, currentPage), totalPages);
  const visible = 5;

  let start = Math.max(1, page - Math.floor(visible / 2));
  let end = start + visible - 1;

  if (end > totalPages) {
    end = totalPages;
    start = Math.max(1, end - visible + 1);
  }

  return {
    totalPages,
    isPrevPageActive: page > 1,
    isNextPageActive: page < totalPages,
    prevPage: page - 1,
    nextPage: page + 1,
    start,
    end,
  };
};
