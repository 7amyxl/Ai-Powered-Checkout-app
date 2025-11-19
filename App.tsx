import React, { useState, useCallback } from 'react';
import { Product, CartItem, Category, CartAnalysis } from './types';
import { PRODUCTS, CATEGORIES } from './constants';
import ProductCard from './components/ProductCard';
import CartSidebar from './components/CartSidebar';
import AIAssistant from './components/AIAssistant';
import ReceiptModal from './components/ReceiptModal';
import { analyzeCartWithGemini } from './services/geminiService';

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // AI State
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<CartAnalysis | null>(null);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  // Receipt State
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);

  // --- Cart Logic ---
  const addToCart = useCallback((product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }, []);

  const updateQuantity = useCallback((id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(0, item.quantity + delta) };
      }
      return item;
    }).filter(item => item.quantity > 0));
  }, []);

  const clearCart = useCallback(() => {
    if(window.confirm("Are you sure you want to clear the cart?")) {
      setCart([]);
      setAiAnalysis(null);
    }
  }, []);

  // --- Filter Logic ---
  const filteredProducts = PRODUCTS.filter(product => {
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // --- AI Logic ---
  const handleAnalyzeCart = async () => {
    setIsAnalyzing(true);
    try {
      const result = await analyzeCartWithGemini(cart);
      setAiAnalysis(result);
      setIsAiModalOpen(true);
    } catch (error) {
      alert("Failed to analyze cart. Please check your internet connection.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  // --- Checkout Logic ---
  const handleCheckout = () => {
    setIsReceiptOpen(true);
  };

  const handleCloseReceipt = () => {
    setIsReceiptOpen(false);
    setCart([]);
    setAiAnalysis(null);
  };

  const calculateTotal = () => {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return subtotal * 1.08;
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-100 text-gray-900">
      
      {/* Left Side: Product Grid */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        
        {/* Header / Navbar */}
        <header className="bg-white p-4 shadow-sm z-10 flex items-center justify-between shrink-0">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                 FC
              </div>
              <div>
                 <h1 className="font-bold text-xl tracking-tight">FreshCart POS</h1>
                 <p className="text-xs text-gray-500">Store #402 • Cashier: John Doe</p>
              </div>
           </div>
           
           {/* Search Bar */}
           <div className="relative w-64 lg:w-96">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
              </svg>
              <input 
                type="text" 
                placeholder="Search products..." 
                className="w-full pl-10 pr-4 py-2 bg-gray-100 border-transparent focus:bg-white focus:border-emerald-500 focus:ring-0 rounded-lg transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
           </div>
        </header>

        {/* Category Tabs */}
        <div className="px-4 py-3 overflow-x-auto whitespace-nowrap shrink-0 bg-gray-50 border-b border-gray-200">
          <div className="flex gap-2">
            <button 
              onClick={() => setActiveCategory('All')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === 'All' ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 hover:bg-gray-200'}`}
            >
              All Items
            </button>
            {CATEGORIES.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === cat ? 'bg-emerald-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-200'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
             {filteredProducts.map(product => (
               <ProductCard key={product.id} product={product} onAdd={addToCart} />
             ))}
             {filteredProducts.length === 0 && (
                <div className="col-span-full py-20 text-center text-gray-400">
                   <p className="text-lg">No products found matching "{searchQuery}"</p>
                </div>
             )}
          </div>
        </div>
      </div>

      {/* Right Side: Cart Sidebar (Fixed width) */}
      <div className="w-96 shrink-0 h-full hidden md:block">
        <CartSidebar 
           items={cart} 
           onUpdateQuantity={updateQuantity}
           onCheckout={handleCheckout}
           onClear={clearCart}
           onAnalyze={handleAnalyzeCart}
           isAnalyzing={isAnalyzing}
        />
      </div>

      {/* Mobile Cart Toggle (Floating) */}
      <div className="md:hidden fixed bottom-4 right-4 z-40">
         <button 
            onClick={() => alert("Mobile cart view not fully implemented in this demo version. Please use desktop width.")}
            className="bg-emerald-600 text-white p-4 rounded-full shadow-lg flex items-center gap-2"
         >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
            <span className="font-bold">{cart.reduce((a, c) => a + c.quantity, 0)}</span>
         </button>
      </div>

      {/* Modals */}
      <AIAssistant 
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        analysis={aiAnalysis}
      />

      <ReceiptModal 
        isOpen={isReceiptOpen}
        onClose={handleCloseReceipt}
        items={cart}
        total={calculateTotal()}
      />

    </div>
  );
};

export default App;
