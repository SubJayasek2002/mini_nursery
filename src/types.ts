// types.ts

export type Difficulty = 'Easy' | 'Medium' | 'Hard';
export type Light = 'Low' | 'Medium' | 'Bright';
export type Water = 'Low' | 'Moderate' | 'Frequent';
export type Rarity = 'Common' | 'Uncommon' | 'Rare';

export interface Plant {
  id: number;
  name: string;
  scientific?: string;
  difficulty: Difficulty;
  light: Light;
  water: Water;
  rarity?: Rarity;
  description: string;
}
