import React, { useMemo } from 'react';
import { CartItem } from '../types';

interface CartSidebarProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onCheckout: () => void;
  onClear: () => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ 
  items, 
  onUpdateQuantity, 
  onCheckout, 
  onClear,
  onAnalyze,
  isAnalyzing 
}) => {
  const subtotal = useMemo(() => items.reduce((sum, item) => sum + item.price * item.quantity, 0), [items]);
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  return (
    <div className="flex flex-col h-full bg-white shadow-xl border-l border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-emerald-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
          </svg>
          Current Cart
        </h2>
        <span className="text-sm font-mono bg-gray-200 px-2 py-1 rounded text-gray-600">
          {items.reduce((acc, i) => acc + i.quantity, 0)} items
        </span>
      </div>

      {/* Items List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {items.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 opacity-50">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 5.484c.944 3.883-2.147 7.035-5.755 6.911l.01.001h-6.63a5.625 5.625 0 01-5.668-5.687l1.172-5.708a4.5 4.5 0 014.41-3.674h9.193c1.624 0 3.068 1.02 3.715 2.52z" />
            </svg>
            <p>Your cart is empty</p>
          </div>
        ) : (
          items.map((item) => (
            <div key={item.id} className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-100 shadow-sm animate-in slide-in-from-left-2 duration-300">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${item.color}`}>
                  {item.emoji}
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">{item.name}</h4>
                  <p className="text-xs text-gray-500 font-mono">${item.price.toFixed(2)}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 bg-gray-50 rounded-full px-2 py-1 border border-gray-200">
                <button 
                  onClick={() => onUpdateQuantity(item.id, -1)}
                  className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-white text-gray-600 hover:text-red-500 transition-colors"
                >
                  -
                </button>
                <span className="text-sm font-semibold w-4 text-center">{item.quantity}</span>
                <button 
                  onClick={() => onUpdateQuantity(item.id, 1)}
                  className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-white text-gray-600 hover:text-emerald-500 transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Action Buttons - AI */}
      {items.length > 0 && (
         <div className="px-6 py-2">
            <button 
              onClick={onAnalyze}
              disabled={isAnalyzing}
              className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl shadow-md hover:shadow-lg hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAnalyzing ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813a3.75 3.75 0 002.576-2.576l.813-2.846A.75.75 0 019 4.5zM9 15a.75.75 0 01.75.75v1.5h1.5a.75.75 0 010 1.5h-1.5v1.5a.75.75 0 01-1.5 0v-1.5h-1.5a.75.75 0 010-1.5h1.5v-1.5A.75.75 0 019 15z" clipRule="evenodd" />
                </svg>
              )}
              {isAnalyzing ? 'Analyzing...' : 'Ask Chef AI'}
            </button>
         </div>
      )}

      {/* Summary & Checkout */}
      <div className="p-6 bg-gray-50 border-t border-gray-200 space-y-4">
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="font-mono font-medium">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax (8%)</span>
            <span className="font-mono font-medium">${tax.toFixed(2)}</span>
          </div>
        </div>
        
        <div className="flex justify-between items-end border-t border-gray-200 pt-4">
          <span className="font-bold text-gray-800 text-lg">Total</span>
          <span className="font-mono font-bold text-2xl text-emerald-700">${total.toFixed(2)}</span>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-4">
           <button 
            onClick={onClear}
            className="py-3 px-4 rounded-xl border border-red-200 text-red-600 font-medium hover:bg-red-50 transition-colors"
          >
            Clear
          </button>
          <button 
            onClick={onCheckout}
            disabled={items.length === 0}
            className="py-3 px-4 rounded-xl bg-emerald-600 text-white font-bold shadow-lg shadow-emerald-200 hover:bg-emerald-700 hover:shadow-xl active:translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;
