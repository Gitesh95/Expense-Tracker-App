import { useState, useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { Expense, ExpenseFormData, MonthlySum, CategorySum } from '../types/expense';
import { format, parseISO, startOfMonth, endOfMonth, isWithinInterval } from 'date-fns';

export function useExpenses() {
  const [expenses, setExpenses] = useLocalStorage<Expense[]>('expenses', []);
  const [dateFilter, setDateFilter] = useState({ start: '', end: '' });
  const [categoryFilter, setCategoryFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const addExpense = (formData: ExpenseFormData) => {
    const newExpense: Expense = {
      id: Date.now().toString(),
      amount: parseFloat(formData.amount),
      category: formData.category,
      date: formData.date,
      description: formData.description,
      createdAt: new Date().toISOString(),
    };
    
    setExpenses(prev => [newExpense, ...prev]);
  };

  const deleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(expense => expense.id !== id));
  };

  const updateExpense = (id: string, updatedData: Partial<Expense>) => {
    setExpenses(prev =>
      prev.map(expense =>
        expense.id === id ? { ...expense, ...updatedData } : expense
      )
    );
  };

  const filteredExpenses = useMemo(() => {
    return expenses.filter(expense => {
      const expenseDate = parseISO(expense.date);
      
      // Date filter
      if (dateFilter.start && dateFilter.end) {
        const start = parseISO(dateFilter.start);
        const end = parseISO(dateFilter.end);
        if (!isWithinInterval(expenseDate, { start, end })) {
          return false;
        }
      }
      
      // Category filter
      if (categoryFilter && expense.category !== categoryFilter) {
        return false;
      }
      
      // Search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          expense.description.toLowerCase().includes(searchLower) ||
          expense.category.toLowerCase().includes(searchLower)
        );
      }
      
      return true;
    });
  }, [expenses, dateFilter, categoryFilter, searchTerm]);

  const monthlyData = useMemo((): MonthlySum[] => {
    const monthlyTotals = new Map<string, number>();
    
    expenses.forEach(expense => {
      const month = format(parseISO(expense.date), 'yyyy-MM');
      monthlyTotals.set(month, (monthlyTotals.get(month) || 0) + expense.amount);
    });
    
    return Array.from(monthlyTotals.entries())
      .map(([month, total]) => ({ month, total }))
      .sort((a, b) => a.month.localeCompare(b.month));
  }, [expenses]);

  const categoryData = useMemo((): CategorySum[] => {
    const categoryTotals = new Map<string, number>();
    const totalAmount = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    
    filteredExpenses.forEach(expense => {
      categoryTotals.set(
        expense.category,
        (categoryTotals.get(expense.category) || 0) + expense.amount
      );
    });
    
    return Array.from(categoryTotals.entries())
      .map(([category, total]) => ({
        category,
        total,
        percentage: totalAmount > 0 ? (total / totalAmount) * 100 : 0,
      }))
      .sort((a, b) => b.total - a.total);
  }, [filteredExpenses]);

  const totalAmount = useMemo(() => {
    return filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  }, [filteredExpenses]);

  return {
    expenses: filteredExpenses,
    allExpenses: expenses,
    addExpense,
    deleteExpense,
    updateExpense,
    monthlyData,
    categoryData,
    totalAmount,
    filters: {
      dateFilter,
      setDateFilter,
      categoryFilter,
      setCategoryFilter,
      searchTerm,
      setSearchTerm,
    },
  };
}