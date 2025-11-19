import React from 'react';
import { CartAnalysis } from '../types';

interface AIAssistantProps {
  analysis: CartAnalysis | null;
  onClose: () => void;
  isOpen: boolean;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ analysis, onClose, isOpen }) => {
  if (!isOpen || !analysis) return null;

  // Determine color based on health score
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    if (score >= 50) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const scoreClass = getScoreColor(analysis.healthScore);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <span className="text-3xl">🧑‍🍳</span> Chef AI Insights
            </h2>
            <p className="text-indigo-100 mt-1">Smart analysis of your shopping cart</p>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 space-y-6">
          
          {/* Health Score Section */}
          <div className="flex items-start gap-6">
             <div className={`flex flex-col items-center justify-center w-24 h-24 rounded-full border-4 flex-shrink-0 ${scoreClass}`}>
                <span className="text-3xl font-bold">{analysis.healthScore}</span>
                <span className="text-xs font-medium uppercase tracking-wide">Health Score</span>
             </div>
             <div>
                <h3 className="font-semibold text-gray-800 mb-1">Nutritional Summary</h3>
                <p className="text-gray-600 leading-relaxed">{analysis.healthSummary}</p>
             </div>
          </div>

          <div className="h-px bg-gray-100 w-full"></div>

          {/* Recipes Section */}
          <div>
             <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                Recommended Recipes
             </h3>
             <div className="grid md:grid-cols-2 gap-4">
                {analysis.recipes.map((recipe, idx) => (
                   <div key={idx} className="bg-orange-50/50 border border-orange-100 rounded-xl p-4 hover:bg-orange-50 transition-colors">
                      <h4 className="font-bold text-gray-800 mb-1">{recipe.name}</h4>
                      <p className="text-sm text-gray-600 mb-3">{recipe.description}</p>
                      
                      {recipe.missingIngredients.length > 0 ? (
                         <div className="text-xs bg-white/60 p-2 rounded border border-orange-200/50">
                            <span className="font-semibold text-orange-600">Missing: </span>
                            <span className="text-gray-600">{recipe.missingIngredients.join(", ")}</span>
                         </div>
                      ) : (
                         <div className="text-xs bg-emerald-100/50 text-emerald-700 p-2 rounded border border-emerald-200/50 font-medium">
                            You have all ingredients!
                         </div>
                      )}
                   </div>
                ))}
             </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end">
           <button onClick={onClose} className="px-6 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">
              Back to Cart
           </button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
