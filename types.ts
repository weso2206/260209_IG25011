
export enum Language {
  JA = 'ja',
  EN = 'en'
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface FlashcardData {
  term: string;
  reading: string;
  meaning: string;
  explanation: string;
  exampleSentence: string;
  exampleMeaning: string;
  quizzes: QuizQuestion[];
}

export interface QuizHistoryEntry {
  id: string;
  userName: string;
  keyword: string;
  score: number;
  date: string;
}

export interface UIContent {
  title: string;
  subtitle: string;
  nameInputLabel: string;
  namePlaceholder: string;
  startBtn: string;
  inputPlaceholder: string;
  generateBtn: string;
  loadingText: string;
  flashcardTitle: string;
  quizTitle: string;
  flipPrompt: string;
  nextBtn: string;
  finishBtn: string;
  scoreText: string;
  restartBtn: string;
  historyTitle: string;
  historyName: string;
  historyKeyword: string;
  historyScore: string;
  historyDate: string;
  errorText: string;
  noHistory: string;
}
