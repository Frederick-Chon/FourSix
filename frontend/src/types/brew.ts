import { BrewSize, Balance, Strength } from '@/utils/calculate-brew';

export type Brew = {
  id: string;
  date: string;
  size: BrewSize;
  balance: Balance;
  strength: Strength;
  coffeeGrams: number;
  waterGrams: number;
  notes?: string;
};
