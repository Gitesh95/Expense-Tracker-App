import React from 'react';
import { DollarSign, TrendingUp, Calendar, PieChart } from 'lucide-react';
import { MonthlySum, CategorySum } from '../types/expense';

interface DashboardProps {
  totalAmount: number;
  expenseCount: number;
  monthlyData: MonthlySum[];
  categoryData: CategorySum[];
}

export function Dashboard({ totalAmount, expenseCount, monthlyData, categoryData }: DashboardProps) {
  const currentMonth = monthlyData[monthlyData.length - 1];
  const previousMonth = monthlyData[monthlyData.length - 2];
  const monthlyChange = currentMonth && previousMonth 
    ? ((currentMonth.total - previousMonth.total) / previousMonth.total) * 100 
    : 0;

  const averageExpense = expenseCount > 0 ? totalAmount / expenseCount : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Expenses</p>
            <p className="text-2xl font-bold text-gray-900">${totalAmount.toFixed(2)}</p>
          </div>
          <div className="p-3 bg-blue-100 rounded-lg">
            <DollarSign className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Transactions</p>
            <p className="text-2xl font-bold text-gray-900">{expenseCount}</p>
          </div>
          <div className="p-3 bg-green-100 rounded-lg">
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Average per Transaction</p>
            <p className="text-2xl font-bold text-gray-900">${averageExpense.toFixed(2)}</p>
          </div>
          <div className="p-3 bg-purple-100 rounded-lg">
            <PieChart className="w-6 h-6 text-purple-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Monthly Change</p>
            <p className={`text-2xl font-bold ${monthlyChange >= 0 ? 'text-red-600' : 'text-green-600'}`}>
              {monthlyChange >= 0 ? '+' : ''}{monthlyChange.toFixed(1)}%
            </p>
          </div>
          <div className="p-3 bg-orange-100 rounded-lg">
            <Calendar className="w-6 h-6 text-orange-600" />
          </div>
        </div>
      </div>
    </div>
  );
}