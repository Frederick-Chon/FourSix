import type { Pour } from '@/utils/calculate-brew';
import type { CoffeeBean } from '@/types/coffee';

export type BrewPayload = {
  userId: string;
  brewSize: string;
  balance: string;
  strength: string;
  coffeeAmount: number;
  waterAmount: number;
  pours: Pour[];
  coffeeBeanId?: string;
  notes?: string;
  grindSize?: string;
  tasteRating?: number;
};

/* Brew Route */

// Create a new brew
export const createBrew = async (brewData: BrewPayload) => {
  const response = await fetch('/api/brews', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(brewData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error?.error || 'Failed to create brew');
  }

  return await response.json();
};

// Get all brews
export const fetchBrews = async () => {
  const response = await fetch('/api/brews');
  if (!response.ok) {
    throw new Error('Failed to fetch brews');
  }
  return await response.json();
};

// Update a brew
export const updateBrew = async (id: string, updates: Partial<BrewPayload>) => {
  const response = await fetch(`/api/brews/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    throw new Error('Failed to update brew');
  }

  return await response.json();
};

// Delete a brew
export const deleteBrew = async (id: string) => {
  const response = await fetch(`/api/brews/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete brew');
  }
  return await response.json();
};

/* Coffee Route */

// Get all coffee beans
export const fetchCoffees = async (): Promise<CoffeeBean[]> => {
  const response = await fetch('/api/coffee');
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Failed to add coffee bean');
  }

  const json = await response.json();
  return json.data;
};

// Add a new coffee bean
export const addCoffee = async (coffee: Partial<CoffeeBean>) => {
  const response = await fetch('/api/coffee', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(coffee),
  });
  if (!response.ok) {
    throw new Error('Failed to add coffee bean');
  }
  const data = await response.json();
  return data.data;
};

// Update an existing coffee bean
export const updateCoffee = async (id: string, coffee: Partial<CoffeeBean>) => {
  const response = await fetch(`/api/coffee/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(coffee),
  });
  if (!response.ok) {
    throw new Error('Failed to update coffee bean');
  }
  const data = await response.json();
  return data.data;
};

// Delete a coffee bean
export const deleteCoffee = async (id: string) => {
  const response = await fetch(`/api/coffee/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete coffee bean');
  }
  return await response.json();
};