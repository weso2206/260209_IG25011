
import React, { useState } from 'react';
import { FlashcardData, UIContent } from '../types';

interface FlashcardProps {
  data: FlashcardData;
  ui: UIContent;
}

const Flashcard: React.FC<FlashcardProps> = ({ data, ui }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto my-8">
      <div 
        className="relative w-full h-80 perspective-1000 cursor-pointer group"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
          {/* Front */}
          <div className="absolute w-full h-full backface-hidden bg-white border-2 border-indigo-100 rounded-3xl shadow-xl flex flex-col items-center justify-center p-8">
            <span className="text-indigo-500 text-sm font-semibold uppercase tracking-wider mb-2">{data.reading}</span>
            <h2 className="text-6xl font-bold text-slate-800 mb-4">{data.term}</h2>
            <p className="text-slate-400 text-sm mt-8 animate-pulse">{ui.flipPrompt}</p>
          </div>
          
          {/* Back */}
          <div className="absolute w-full h-full backface-hidden bg-indigo-600 text-white border-2 border-indigo-700 rounded-3xl shadow-xl flex flex-col p-8 rotate-y-180 overflow-y-auto">
            <div className="mb-4">
              <h3 className="text-xl font-bold border-b border-indigo-400 pb-2 mb-2">{data.meaning}</h3>
              <p className="text-indigo-100 leading-relaxed text-sm">{data.explanation}</p>
            </div>
            <div className="bg-indigo-700/50 p-4 rounded-xl border border-indigo-500/30 mt-auto">
              <p className="text-sm font-bold text-indigo-200 mb-1">Example:</p>
              <p className="text-lg mb-1 leading-snug">{data.exampleSentence}</p>
              <p className="text-indigo-300 text-xs italic">{data.exampleMeaning}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
