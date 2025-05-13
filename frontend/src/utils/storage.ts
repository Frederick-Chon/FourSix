import { Brew } from "@/types/brew";

const STORAGE_KEY = 'brewHistory';

export const getStoredBrews = (): Brew[] => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveBrew = (brew: Brew) => {
  const existing = getStoredBrews();
  const updated = [brew, ...existing];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

export const deleteBrew = (id: string) => {
  const existing = getStoredBrews();
  const updated = existing.filter(b => b.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};
