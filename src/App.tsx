import React, { useState } from 'react';
import { Plus, Wallet, BarChart3, List } from 'lucide-react';
import { useExpenses } from './hooks/useExpenses';
import { ExpenseForm } from './components/ExpenseForm';
import { ExpenseList } from './components/ExpenseList';
import { Dashboard } from './components/Dashboard';
import { Charts } from './components/Charts';
import { Filters } from './components/Filters';

type ViewType = 'dashboard' | 'expenses' | 'analytics';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const {
    expenses,
    addExpense,
    deleteExpense,
    monthlyData,
    categoryData,
    totalAmount,
    filters,
  } = useExpenses();

  const navigation = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
    { id: 'expenses', name: 'Expenses', icon: List },
    { id: 'analytics', name: 'Analytics', icon: BarChart3 },
  ] as const;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Expense Tracker</h1>
            </div>

            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <Plus className="w-4 h-4" />
              Add Expense
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation */}
        <div className="flex gap-4 mb-8">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id as ViewType)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentView === item.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.name}
              </button>
            );
          })}
        </div>

        {/* Dashboard View */}
        {currentView === 'dashboard' && (
          <>
            <Dashboard
              totalAmount={totalAmount}
              expenseCount={expenses.length}
              monthlyData={monthlyData}
              categoryData={categoryData}
            />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Expenses</h2>
                <ExpenseList expenses={expenses.slice(0, 5)} onDelete={deleteExpense} />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Category Breakdown</h2>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  {categoryData.slice(0, 5).map((category) => (
                    <div key={category.category} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: categoryData.find(c => c.category === category.category)?.category ? 
                            categoryData.find(c => c.category === category.category)?.category : '#6B7280' }}
                        />
                        <span className="text-sm font-medium text-gray-900">
                          {category.category.charAt(0).toUpperCase() + category.category.slice(1)}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">${category.total.toFixed(2)}</div>
                        <div className="text-xs text-gray-500">{category.percentage.toFixed(1)}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Expenses View */}
        {currentView === 'expenses' && (
          <>
            <Filters {...filters} />
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">All Expenses</h2>
              <div className="text-sm text-gray-600">
                Showing {expenses.length} expenses • Total: ${totalAmount.toFixed(2)}
              </div>
            </div>
            <ExpenseList expenses={expenses} onDelete={deleteExpense} />
          </>
        )}

        {/* Analytics View */}
        {currentView === 'analytics' && (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Analytics</h2>
            <Charts monthlyData={monthlyData} categoryData={categoryData} />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Breakdown</h3>
                <div className="space-y-3">
                  {monthlyData.slice(-6).map((month) => (
                    <div key={month.month} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                      <span className="text-sm font-medium text-gray-900">{month.month}</span>
                      <span className="text-sm font-medium text-gray-900">${month.total.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Summary</h3>
                <div className="space-y-3">
                  {categoryData.map((category) => (
                    <div key={category.category} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                      <span className="text-sm font-medium text-gray-900">
                        {category.category.charAt(0).toUpperCase() + category.category.slice(1)}
                      </span>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">${category.total.toFixed(2)}</div>
                        <div className="text-xs text-gray-500">{category.percentage.toFixed(1)}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Expense Form Modal */}
      <ExpenseForm
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        onSubmit={addExpense}
      />
    </div>
  );
}

export default App;