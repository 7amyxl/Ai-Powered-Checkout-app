import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAdd: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAdd }) => {
  return (
    <button
      onClick={() => onAdd(product)}
      className={`${product.color} hover:brightness-95 transition-all duration-200 rounded-xl p-4 flex flex-col items-center justify-center gap-2 border border-black/5 shadow-sm active:scale-95 h-32 w-full`}
      aria-label={`Add ${product.name} to cart`}
    >
      <span className="text-4xl filter drop-shadow-sm">{product.emoji}</span>
      <div className="text-center">
        <h3 className="font-semibold text-gray-800 text-sm leading-tight">{product.name}</h3>
        <p className="text-gray-600 text-xs mt-1 font-mono">${product.price.toFixed(2)}</p>
      </div>
    </button>
  );
};

export default ProductCard;
