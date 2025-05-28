import { BrewSize, Balance, Strength, Pour } from '@/utils/calculate-brew';

export type Brew = {
  id: string;
  userId: string;
  brewSize: BrewSize;
  balance: Balance;
  strength: Strength;
  coffeeAmount: number;
  waterAmount: number;
  pours: Pour[]; // ✅ precise type, no more any
  coffeeBeanId?: string;
  grindSize?: string;
  notes?: string;
  tasteRating?: number;
  createdAt: string;
};
