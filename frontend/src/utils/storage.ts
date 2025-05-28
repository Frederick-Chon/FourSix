import type { Brew } from '@/types/brew';
import type { CoffeeBean } from '@/types/coffee';

// Brew History
const BREW_KEY = 'brewHistory';

export const getStoredBrews = (): Brew[] => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(BREW_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveBrew = (brew: Brew) => {
  const existing = getStoredBrews();
  const updated = [brew, ...existing];
  localStorage.setItem(BREW_KEY, JSON.stringify(updated));
};

export const deleteBrew = (id: string) => {
  const existing = getStoredBrews();
  const updated = existing.filter(b => b.id !== id);
  localStorage.setItem(BREW_KEY, JSON.stringify(updated));
};

export const updateBrew = (updated: Brew) => {
  const existing = getStoredBrews();
  const newHistory = existing.map((brew) =>
    brew.id === updated.id ? updated : brew
  );
  localStorage.setItem(BREW_KEY, JSON.stringify(newHistory));
};

// Coffee Inventory
const COFFEE_KEY = 'coffeeInventory';

export const getStoredCoffees = (): CoffeeBean[] => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(COFFEE_KEY);
  return data ? JSON.parse(data) : [];
};

export const addCoffee = (bean: CoffeeBean) => {
  const existing = getStoredCoffees();
  const updated = [bean, ...existing];
  localStorage.setItem(COFFEE_KEY, JSON.stringify(updated));
};

export const updateCoffee = (updatedBean: CoffeeBean) => {
  const existing = getStoredCoffees();
  const updated = existing.map(bean =>
    bean.id === updatedBean.id ? updatedBean : bean
  );
  localStorage.setItem(COFFEE_KEY, JSON.stringify(updated));
};

export const deleteCoffee = (id: string) => {
  const existing = getStoredCoffees();
  const updated = existing.filter(bean => bean.id !== id);
  localStorage.setItem(COFFEE_KEY, JSON.stringify(updated));
};
