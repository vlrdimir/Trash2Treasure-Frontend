export type Probabilities = Record<string, number>;

export interface HistoryResultItem {
  id: number;
  email: string;
  imageUrl: string;
  label: string;
  percentage: string;
  probabilities: Probabilities;
  createdAt: string;
}

export interface SavedResultItem {
  id: number;
  email: string;
  slugContent: string;
  createdAt: string;
}

export interface Pagination {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ApiResponse<T> {
  status: boolean;
  result: T;
  pagination?: Pagination;
}
