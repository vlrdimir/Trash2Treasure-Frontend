import { create } from "zustand";

type PaginationState = {
  page: number;
  limit: number;
  totalPages: number;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  setTotalPages: (totalPages: number) => void;
  nextPage: () => void;
  prevPage: () => void;
};

export const useHistoryPaginationStore = create<PaginationState>((set) => ({
  page: 1,
  limit: 10,
  totalPages: 1,
  setPage: (page) => set({ page }),
  setLimit: (limit) => set({ limit, page: 1 }),
  setTotalPages: (totalPages) => set({ totalPages }),
  nextPage: () =>
    set((state) => ({
      page: Math.min(state.totalPages, state.page + 1),
    })),
  prevPage: () => set((state) => ({ page: Math.max(1, state.page - 1) })),
}));
