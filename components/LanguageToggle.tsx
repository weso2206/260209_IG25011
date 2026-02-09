
import React from 'react';
import { Language } from '../types';

interface LanguageToggleProps {
  current: Language;
  onToggle: (lang: Language) => void;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ current, onToggle }) => {
  return (
    <div className="flex bg-white rounded-full p-1 shadow-sm border border-slate-200">
      <button
        onClick={() => onToggle(Language.JA)}
        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
          current === Language.JA 
            ? 'bg-indigo-600 text-white shadow-md' 
            : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        日本語
      </button>
      <button
        onClick={() => onToggle(Language.EN)}
        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
          current === Language.EN 
            ? 'bg-indigo-600 text-white shadow-md' 
            : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        English
      </button>
    </div>
  );
};

export default LanguageToggle;
