
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

export interface UIContent {
  title: string;
  subtitle: string;
  inputPlaceholder: string;
  generateBtn: string;
  loadingText: string;
  flashcardTitle: string;
  quizTitle: string;
  flipPrompt: string;
  nextBtn: string;
  prevBtn: string;
  finishBtn: string;
  scoreText: string;
  restartBtn: string;
  errorText: string;
}
