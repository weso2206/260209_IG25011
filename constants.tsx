
import { Language, UIContent } from './types';

export const UI_STRINGS: Record<Language, UIContent> = {
  [Language.EN]: {
    title: "Learning Hub",
    subtitle: "Master Japanese vocabulary with AI-powered cards and quizzes",
    nameInputLabel: "Enter your name to start",
    namePlaceholder: "Your Name",
    startBtn: "Go to Dashboard",
    inputPlaceholder: "Enter a Japanese word (e.g., 絆, 木漏れ日)...",
    generateBtn: "Generate Study Set",
    loadingText: "Creating your personalized study material...",
    flashcardTitle: "Flashcard",
    quizTitle: "Knowledge Quiz (10 Questions)",
    flipPrompt: "Click to flip",
    nextBtn: "Next Question",
    finishBtn: "Complete & Save",
    scoreText: "Final Score",
    restartBtn: "Study Another Word",
    historyTitle: "Quiz History",
    historyName: "Name",
    historyKeyword: "Word",
    historyScore: "Score",
    historyDate: "Date",
    errorText: "Something went wrong. Please try another word.",
    noHistory: "No quiz history yet. Start learning!"
  },
  [Language.JA]: {
    title: "学習ハブ",
    subtitle: "AIが生成するフラッシュカードとクイズで単語をマスター",
    nameInputLabel: "名前を入力して開始してください",
    namePlaceholder: "名前を入力",
    startBtn: "ダッシュボードへ",
    inputPlaceholder: "日本語の単語を入力してください (例: 絆、木漏れ日)...",
    generateBtn: "学習セットを作成",
    loadingText: "パーソナライズされた教材を作成中...",
    flashcardTitle: "フラッシュカード",
    quizTitle: "確認クイズ（10問）",
    flipPrompt: "クリックして裏返す",
    nextBtn: "次の問題",
    finishBtn: "終了して保存",
    scoreText: "最終スコア",
    restartBtn: "別の単語を学習する",
    historyTitle: "クイズ履歴",
    historyName: "名前",
    historyKeyword: "単語",
    historyScore: "スコア",
    historyDate: "日付",
    errorText: "エラーが発生しました。別の単語を試してください。",
    noHistory: "履歴がありません。学習を始めましょう！"
  }
};
