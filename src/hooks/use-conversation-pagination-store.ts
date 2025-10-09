import { create } from "zustand";

interface PaginationState {
  page: number;
  limit: number;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  nextPage: () => void;
  prevPage: () => void;
}

export const useConversationPaginationStore = create<PaginationState>(
  (set) => ({
    page: 1,
    limit: 10,
    setPage: (page) => set({ page }),
    setLimit: (limit) => set({ limit, page: 1 }),
    nextPage: () => set((state) => ({ page: state.page + 1 })),
    prevPage: () => set((state) => ({ page: Math.max(1, state.page - 1) })),
  }),
);
