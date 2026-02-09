
import React, { useState, useCallback } from 'react';
import { Language, FlashcardData } from './types';
import { UI_STRINGS } from './constants';
import { generateStudyMaterial } from './services/geminiService';
import LanguageToggle from './components/LanguageToggle';
import Flashcard from './components/Flashcard';
import Quiz from './components/Quiz';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>(Language.JA);
  const [keyword, setKeyword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<FlashcardData | null>(null);

  const ui = UI_STRINGS[lang];

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword.trim()) return;

    setIsLoading(true);
    setError(null);
    setData(null);

    try {
      const result = await generateStudyMaterial(keyword, lang);
      setData(result);
    } catch (err) {
      console.error(err);
      setError(ui.errorText);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRestart = () => {
    setData(null);
    setKeyword('');
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">L</div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {ui.title}
            </h1>
          </div>
          <LanguageToggle current={lang} onToggle={setLang} />
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-8">
        {!data && !isLoading && (
          <div className="max-w-2xl mx-auto mt-12 text-center animate-fadeIn">
            <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-4 leading-tight">
              {ui.title}
            </h2>
            <p className="text-lg text-slate-500 mb-12">
              {ui.subtitle}
            </p>

            <form onSubmit={handleGenerate} className="relative max-w-xl mx-auto">
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder={ui.inputPlaceholder}
                className="w-full bg-white border-2 border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl py-5 px-6 text-lg outline-none transition-all shadow-sm pr-40"
              />
              <button
                type="submit"
                disabled={!keyword.trim()}
                className="absolute right-2 top-2 bottom-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-bold px-6 rounded-xl transition-all"
              >
                {ui.generateBtn}
              </button>
            </form>

            {error && (
              <div className="mt-6 p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 font-medium">
                {error}
              </div>
            )}

            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 opacity-60">
              <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
                <div className="text-indigo-600 mb-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                </div>
                <p className="text-sm font-bold">{lang === Language.EN ? 'Deep Meaning' : '深い意味の理解'}</p>
              </div>
              <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
                <div className="text-indigo-600 mb-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                </div>
                <p className="text-sm font-bold">{lang === Language.EN ? 'Interactive Quizzes' : 'インタラクティブクイズ'}</p>
              </div>
              <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
                <div className="text-indigo-600 mb-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <p className="text-sm font-bold">{lang === Language.EN ? 'AI Powered' : 'AIによる自動生成'}</p>
              </div>
            </div>
          </div>
        )}

        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20 animate-pulse">
            <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-6"></div>
            <p className="text-lg font-medium text-slate-600">{ui.loadingText}</p>
          </div>
        )}

        {data && (
          <div className="animate-fadeIn space-y-12">
            <div className="flex items-center justify-between">
              <button 
                onClick={handleRestart}
                className="text-slate-500 hover:text-indigo-600 flex items-center font-medium transition-colors"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                {lang === Language.EN ? 'Back' : '戻る'}
              </button>
              <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-bold">
                Study Set: {data.term}
              </span>
            </div>

            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
                <span className="w-2 h-8 bg-indigo-500 rounded-full mr-3"></span>
                {ui.flashcardTitle}
              </h2>
              <Flashcard data={data} ui={ui} />
            </section>

            <section className="pt-12 border-t border-slate-200">
              <h2 className="text-2xl font-bold text-slate-800 mb-8 flex items-center">
                <span className="w-2 h-8 bg-purple-500 rounded-full mr-3"></span>
                {ui.quizTitle}
              </h2>
              <Quiz questions={data.quizzes} ui={ui} onRestart={handleRestart} />
            </section>
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-slate-200 py-8">
        <div className="max-w-5xl mx-auto px-4 text-center text-slate-400 text-sm">
          <p>© 2024 Japanease Learning Hub - Final Exam Project</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
