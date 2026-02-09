
import React, { useState } from 'react';
import { QuizQuestion, UIContent } from '../types';

interface QuizProps {
  questions: QuizQuestion[];
  ui: UIContent;
  onRestart: () => void;
}

const Quiz: React.FC<QuizProps> = ({ questions, ui, onRestart }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const handleAnswer = (idx: number) => {
    if (showExplanation) return;
    setSelectedAnswer(idx);
    setShowExplanation(true);
    if (idx === questions[currentIdx].correctAnswerIndex) {
      setScore(s => s + 1);
    }
  };

  const nextQuestion = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setIsFinished(true);
    }
  };

  if (isFinished) {
    return (
      <div className="bg-white rounded-3xl p-8 shadow-lg text-center max-w-xl mx-auto border border-slate-100">
        <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6 text-indigo-600">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-slate-800 mb-2">{ui.scoreText}</h2>
        <div className="text-6xl font-black text-indigo-600 mb-8">
          {score} <span className="text-2xl text-slate-400">/ {questions.length}</span>
        </div>
        <button
          onClick={onRestart}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl transition-all transform hover:-translate-y-1"
        >
          {ui.restartBtn}
        </button>
      </div>
    );
  }

  const q = questions[currentIdx];

  return (
    <div className="max-w-2xl mx-auto mb-12">
      <div className="flex justify-between items-center mb-4 px-2">
        <span className="text-sm font-bold text-indigo-600 uppercase tracking-widest">Question {currentIdx + 1} of 10</span>
        <div className="w-48 h-2 bg-slate-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-indigo-500 transition-all duration-300" 
            style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 md:p-10 shadow-lg border border-slate-100">
        <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-8 leading-snug">
          {q.question}
        </h3>

        <div className="space-y-4">
          {q.options.map((option, idx) => {
            let variant = "bg-slate-50 border-slate-200 text-slate-700 hover:border-indigo-300 hover:bg-indigo-50";
            if (showExplanation) {
              if (idx === q.correctAnswerIndex) {
                variant = "bg-green-100 border-green-500 text-green-800";
              } else if (idx === selectedAnswer) {
                variant = "bg-red-100 border-red-500 text-red-800";
              } else {
                variant = "bg-slate-50 border-slate-200 text-slate-400 opacity-60";
              }
            }

            return (
              <button
                key={idx}
                disabled={showExplanation}
                onClick={() => handleAnswer(idx)}
                className={`w-full text-left px-6 py-4 rounded-2xl border-2 transition-all font-medium ${variant}`}
              >
                <div className="flex items-center">
                  <span className="w-8 h-8 rounded-full border border-current flex items-center justify-center mr-4 text-sm font-bold shrink-0">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  {option}
                </div>
              </button>
            );
          })}
        </div>

        {showExplanation && (
          <div className="mt-8 animate-fadeIn">
            <div className={`p-4 rounded-2xl mb-6 ${selectedAnswer === q.correctAnswerIndex ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
              <p className="font-bold mb-1">
                {selectedAnswer === q.correctAnswerIndex ? 'Correct!' : 'Keep learning!'}
              </p>
              <p className="text-sm leading-relaxed">{q.explanation}</p>
            </div>
            <button
              onClick={nextQuestion}
              className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-4 rounded-2xl transition-all"
            >
              {currentIdx === questions.length - 1 ? ui.finishBtn : ui.nextBtn}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
