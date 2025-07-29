export const EXPENSE_CATEGORIES = [
  { value: 'food', label: 'Food & Dining', color: '#EF4444' },
  { value: 'transport', label: 'Transportation', color: '#3B82F6' },
  { value: 'shopping', label: 'Shopping', color: '#8B5CF6' },
  { value: 'entertainment', label: 'Entertainment', color: '#F59E0B' },
  { value: 'healthcare', label: 'Healthcare', color: '#10B981' },
  { value: 'utilities', label: 'Utilities', color: '#06B6D4' },
  { value: 'education', label: 'Education', color: '#F97316' },
  { value: 'travel', label: 'Travel', color: '#EC4899' },
  { value: 'other', label: 'Other', color: '#6B7280' },
] as const;

export const getCategoryColor = (category: string): string => {
  const found = EXPENSE_CATEGORIES.find(cat => cat.value === category);
  return found?.color || '#6B7280';
};

export const getCategoryLabel = (category: string): string => {
  const found = EXPENSE_CATEGORIES.find(cat => cat.value === category);
  return found?.label || category;
};