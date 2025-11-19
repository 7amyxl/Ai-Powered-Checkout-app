import React from 'react';
import { CartItem } from '../types';

interface ReceiptModalProps {
  isOpen: boolean;
  items: CartItem[];
  total: number;
  onClose: () => void;
}

const ReceiptModal: React.FC<ReceiptModalProps> = ({ isOpen, items, total, onClose }) => {
  if (!isOpen) return null;

  const date = new Date().toLocaleString();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
       <div className="bg-white w-full max-w-sm shadow-2xl overflow-hidden flex flex-col relative animate-in slide-in-from-bottom-4 duration-300">
          {/* Zigzag receipt top */}
          <div className="absolute top-0 left-0 right-0 h-4 bg-gray-800" style={{maskImage: 'linear-gradient(45deg, #000 25%, transparent 25%), linear-gradient(-45deg, #000 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #000 75%), linear-gradient(-45deg, transparent 75%, #000 75%)', maskSize: '20px 20px', maskPosition: '0 0, 0 10px, 10px -10px, -10px 0px'}}></div>

          <div className="p-8 pt-10 bg-white text-center">
             <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                   <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
                </svg>
             </div>
             <h2 className="text-xl font-bold text-gray-900">Payment Successful</h2>
             <p className="text-sm text-gray-500 mt-1">FreshCart POS</p>
             <p className="text-xs text-gray-400 mt-1">{date}</p>

             <div className="border-t border-b border-dashed border-gray-300 my-6 py-4 space-y-2">
                {items.map((item) => (
                   <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-600 text-left"><span className="font-mono text-xs text-gray-400 mr-2">{item.quantity}x</span>{item.name}</span>
                      <span className="text-gray-900 font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                   </div>
                ))}
             </div>

             <div className="flex justify-between items-center mb-6">
                <span className="font-bold text-gray-900">Total Paid</span>
                <span className="font-bold text-xl text-gray-900">${total.toFixed(2)}</span>
             </div>

             <button 
                onClick={onClose}
                className="w-full py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors shadow-lg"
             >
                Start New Order
             </button>
          </div>

          {/* Zigzag receipt bottom */}
          <div className="h-2 w-full bg-white" style={{backgroundImage: 'linear-gradient(45deg, #ffffff 25%, transparent 25%), linear-gradient(-45deg, #ffffff 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ffffff 75%), linear-gradient(-45deg, transparent 75%, #ffffff 75%)', backgroundSize: '20px 20px', backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'}}></div>
       </div>
    </div>
  );
};

export default ReceiptModal;
