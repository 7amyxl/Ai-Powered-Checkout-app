import { Product, Category } from './types';

export const PRODUCTS: Product[] = [
  { id: '1', name: 'Banana', price: 0.79, emoji: '🍌', category: Category.PRODUCE, color: 'bg-yellow-100' },
  { id: '2', name: 'Apple', price: 1.20, emoji: '🍎', category: Category.PRODUCE, color: 'bg-red-100' },
  { id: '3', name: 'Avocado', price: 2.50, emoji: '🥑', category: Category.PRODUCE, color: 'bg-green-100' },
  { id: '4', name: 'Carrot', price: 0.50, emoji: '🥕', category: Category.PRODUCE, color: 'bg-orange-100' },
  { id: '5', name: 'Broccoli', price: 1.80, emoji: '🥦', category: Category.PRODUCE, color: 'bg-green-100' },
  { id: '6', name: 'Milk', price: 3.50, emoji: '🥛', category: Category.DAIRY, color: 'bg-blue-100' },
  { id: '7', name: 'Cheese', price: 4.99, emoji: '🧀', category: Category.DAIRY, color: 'bg-yellow-200' },
  { id: '8', name: 'Yogurt', price: 1.25, emoji: '🥣', category: Category.DAIRY, color: 'bg-pink-100' },
  { id: '9', name: 'Bread', price: 2.99, emoji: '🍞', category: Category.BAKERY, color: 'bg-amber-100' },
  { id: '10', name: 'Croissant', price: 1.99, emoji: '🥐', category: Category.BAKERY, color: 'bg-amber-200' },
  { id: '11', name: 'Steak', price: 15.99, emoji: '🥩', category: Category.MEAT, color: 'bg-red-200' },
  { id: '12', name: 'Chicken', price: 8.50, emoji: '🍗', category: Category.MEAT, color: 'bg-orange-200' },
  { id: '13', name: 'Pasta', price: 1.50, emoji: '🍝', category: Category.PANTRY, color: 'bg-yellow-50' },
  { id: '14', name: 'Rice', price: 2.00, emoji: '🍚', category: Category.PANTRY, color: 'bg-slate-100' },
  { id: '15', name: 'Tomato Sauce', price: 2.50, emoji: '🥫', category: Category.PANTRY, color: 'bg-red-50' },
  { id: '16', name: 'Water', price: 0.99, emoji: '💧', category: Category.BEVERAGES, color: 'bg-blue-50' },
  { id: '17', name: 'Coffee', price: 5.99, emoji: '☕', category: Category.BEVERAGES, color: 'bg-amber-900/10' },
  { id: '18', name: 'Orange Juice', price: 3.99, emoji: '🧃', category: Category.BEVERAGES, color: 'bg-orange-100' },
];

export const CATEGORIES = Object.values(Category);
