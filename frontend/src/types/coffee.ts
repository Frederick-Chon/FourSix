export type CoffeeBean = {
  id: string;
  userId: string;
  name: string;
  roaster: string;
  origin: string;
  process?: string;
  roastDate: string;
  totalWeight: number;
  gramsRemaining: number;
  opened: boolean;
  addedDate?: string;
};
