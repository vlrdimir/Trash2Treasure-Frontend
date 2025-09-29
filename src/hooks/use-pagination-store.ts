import { create } from "zustand";

type PaginationState = {
  page: number;
  itemsPerPage: number;
  totalItems: number;
  setPage: (page: number) => void;
  setTotalItems: (totalItems: number) => void;
  nextPage: () => void;
  prevPage: () => void;
};

export const usePaginationStore = create<PaginationState>((set, get) => ({
  page: 1,
  itemsPerPage: 5,
  totalItems: 0,
  setPage: (page) => set({ page }),
  setTotalItems: (totalItems) => set({ totalItems, page: 1 }),
  nextPage: () => {
    const { page, itemsPerPage, totalItems } = get();
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    if (page < totalPages) {
      set({ page: page + 1 });
    }
  },
  prevPage: () => {
    const { page } = get();
    if (page > 1) {
      set({ page: page - 1 });
    }
  },
}));
