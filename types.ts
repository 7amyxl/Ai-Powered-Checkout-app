export enum Category {
  PRODUCE = 'Produce',
  DAIRY = 'Dairy',
  BAKERY = 'Bakery',
  MEAT = 'Meat',
  PANTRY = 'Pantry',
  BEVERAGES = 'Beverages'
}

export interface Product {
  id: string;
  name: string;
  price: number;
  emoji: string;
  category: Category;
  color: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Recipe {
  name: string;
  description: string;
  missingIngredients: string[];
}

export interface CartAnalysis {
  healthScore: number;
  healthSummary: string;
  recipes: Recipe[];
}

export enum AppView {
  POS = 'POS',
  RECEIPT = 'RECEIPT'
}
