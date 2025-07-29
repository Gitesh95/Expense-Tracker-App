import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import { MonthlySum, CategorySum } from '../types/expense';
import { getCategoryColor, getCategoryLabel } from '../constants/categories';
import { format, parseISO } from 'date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface ChartsProps {
  monthlyData: MonthlySum[];
  categoryData: CategorySum[];
}

export function Charts({ monthlyData, categoryData }: ChartsProps) {
  const monthlyChartData = {
    labels: monthlyData.map(item => format(parseISO(`${item.month}-01`), 'MMM yyyy')),
    datasets: [
      {
        label: 'Monthly Expenses',
        data: monthlyData.map(item => item.total),
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
        borderRadius: 8,
      },
    ],
  };

  const categoryChartData = {
    labels: categoryData.map(item => getCategoryLabel(item.category)),
    datasets: [
      {
        data: categoryData.map(item => item.total),
        backgroundColor: categoryData.map(item => getCategoryColor(item.category)),
        borderColor: categoryData.map(item => getCategoryColor(item.category)),
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
      },
    },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Expenses</h3>
        <div className="h-64">
          <Bar data={monthlyChartData} options={chartOptions} />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Expenses by Category</h3>
        <div className="h-64">
          <Doughnut data={categoryChartData} options={doughnutOptions} />
        </div>
      </div>
    </div>
  );
}