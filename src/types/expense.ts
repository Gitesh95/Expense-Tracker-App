export interface Expense {
  id: string;
  amount: number;
  category: string;
  date: string;
  description: string;
  createdAt: string;
}

export interface ExpenseFormData {
  amount: string;
  category: string;
  date: string;
  description: string;
}

export interface MonthlySum {
  month: string;
  total: number;
}

export interface CategorySum {
  category: string;
  total: number;
  percentage: number;
}