
import React, { useState, useEffect } from 'react';
import { Language, FlashcardData, QuizHistoryEntry } from './types';
import { UI_STRINGS } from './constants';
import { generateStudyMaterial } from './services/geminiService';
import LanguageToggle from './components/LanguageToggle';
import Flashcard from './components/Flashcard';
import Quiz from './components/Quiz';
import HistoryList from './components/HistoryList';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>(Language.JA);
  const [userName, setUserName] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<FlashcardData | null>(null);
  const [history, setHistory] = useState<QuizHistoryEntry[]>([]);

  const ui = UI_STRINGS[lang];

  // Load history on mount
  useEffect(() => {
    const saved = localStorage.getItem('quizHistory');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load history", e);
      }
    }
  }, []);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (userName.trim()) {
      setIsRegistered(true);
    }
  };

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

  const saveToHistory = (score: number) => {
    if (!data) return;
    
    const newEntry: QuizHistoryEntry = {
      id: Date.now().toString(),
      userName: userName,
      keyword: data.term,
      score: score,
      date: new Date().toLocaleString(lang === Language.JA ? 'ja-JP' : 'en-US')
    };

    const updatedHistory = [...history, newEntry];
    setHistory(updatedHistory);
    localStorage.setItem('quizHistory', JSON.stringify(updatedHistory));
  };

  const handleRestart = () => {
    setData(null);
    setKeyword('');
    setError(null);
  };

  // Welcome Screen
  if (!isRegistered) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl p-10 animate-fadeIn">
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white text-4xl font-black">L</div>
          </div>
          <h1 className="text-3xl font-black text-slate-800 text-center mb-2">{ui.title}</h1>
          <p className="text-slate-500 text-center mb-8">{ui.subtitle}</p>
          
          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">
                {ui.nameInputLabel}
              </label>
              <input
                type="text"
                required
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder={ui.namePlaceholder}
                className="w-full bg-slate-50 border-2 border-slate-100 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl py-4 px-6 outline-none transition-all"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-5 rounded-2xl shadow-xl shadow-indigo-100 transition-all transform hover:-translate-y-1"
            >
              {ui.startBtn}
            </button>
          </form>
          
          <div className="mt-8 flex justify-center">
            <LanguageToggle current={lang} onToggle={setLang} />
          </div>
        </div>
      </div>
    );
  }

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
          <div className="flex items-center space-x-4">
             <div className="hidden md:block text-sm font-bold text-slate-400 italic">Hi, {userName}!</div>
             <LanguageToggle current={lang} onToggle={setLang} />
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-8">
        {!data && !isLoading && (
          <div className="space-y-12">
            <div className="max-w-2xl mx-auto text-center animate-fadeIn pt-12">
              <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-4 leading-tight">
                Welcome back, {userName}
              </h2>
              <p className="text-lg text-slate-500 mb-12">
                {ui.subtitle}
              </p>

              <form onSubmit={handleGenerate} className="relative max-w-xl mx-auto mb-16">
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder={ui.inputPlaceholder}
                  className="w-full bg-white border-2 border-slate-200 focus:border-indigo-500 rounded-2xl py-5 px-6 text-lg outline-none transition-all shadow-sm pr-40"
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
                <div className="mb-8 p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 font-medium">
                  {error}
                </div>
              )}
            </div>

            <section className="animate-fadeIn delay-100">
              <HistoryList history={history} ui={ui} />
            </section>
          </div>
        )}

        {isLoading && (
          <div className="flex flex-col items-center justify-center py-24 animate-pulse">
            <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-6"></div>
            <p className="text-xl font-medium text-slate-600">{ui.loadingText}</p>
          </div>
        )}

        {data && (
          <div className="animate-fadeIn space-y-12">
            <div className="flex items-center justify-between">
              <button 
                onClick={handleRestart}
                className="text-slate-500 hover:text-indigo-600 flex items-center font-bold transition-colors"
              >
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                {lang === Language.EN ? 'Back' : '戻る'}
              </button>
              <span className="bg-indigo-600 text-white px-6 py-2 rounded-full text-sm font-black shadow-lg">
                STUDYING: {data.term}
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
              <Quiz 
                questions={data.quizzes} 
                ui={ui} 
                onComplete={saveToHistory} 
                onRestart={handleRestart} 
              />
            </section>
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-slate-200 py-10">
        <div className="max-w-5xl mx-auto px-4 text-center text-slate-400 text-sm font-medium">
          <p>© 2024 Japanease Learning Hub - Final Exam Project</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
