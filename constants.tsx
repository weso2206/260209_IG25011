
import { Language, UIContent } from './types';

export const UI_STRINGS: Record<Language, UIContent> = {
  [Language.EN]: {
    title: "Learning Hub",
    subtitle: "Master Japanese vocabulary with AI-powered cards and quizzes",
    inputPlaceholder: "Enter a Japanese word (e.g., 絆, 木漏れ日)...",
    generateBtn: "Generate Study Set",
    loadingText: "Creating your personalized study material...",
    flashcardTitle: "Flashcard",
    quizTitle: "Knowledge Quiz (10 Questions)",
    flipPrompt: "Click to flip",
    nextBtn: "Next",
    prevBtn: "Previous",
    finishBtn: "Show Results",
    scoreText: "Your Final Score",
    restartBtn: "Start New Study Session",
    errorText: "Something went wrong. Please try another word."
  },
  [Language.JA]: {
    title: "学習ハブ",
    subtitle: "AIが生成するフラッシュカードとクイズで単語をマスター",
    inputPlaceholder: "日本語の単語を入力してください (例: 絆、木漏れ日)...",
    generateBtn: "学習セットを作成",
    loadingText: "パーソナライズされた教材を作成中...",
    flashcardTitle: "フラッシュカード",
    quizTitle: "確認クイズ（10問）",
    flipPrompt: "クリックして裏返す",
    nextBtn: "次へ",
    prevBtn: "前へ",
    finishBtn: "結果を表示",
    scoreText: "最終スコア",
    restartBtn: "新しいセッションを開始",
    errorText: "エラーが発生しました。別の単語を試してください。"
  }
};
