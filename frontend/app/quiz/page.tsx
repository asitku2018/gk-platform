'use client';
import { useState, useEffect } from 'react';
import QuizModal from '@/components/QuizModal';

export default function QuizPage() {
  const [isTakingQuiz, setIsTakingQuiz] = useState(false);
  const [questions, setQuestions] = useState([]);
  
  // Example data payload (in production, fetch this via `/api/v1/quizzes/:category`)
  const dummyQuiz = {
    title: "History: The Ancient World",
    category: "History",
    difficulty: "Medium",
    questions: [
      {
        id: "1",
        question_text: "Which civilization built the Machu Picchu?",
        options: ["Aztecs", "Incas", "Mayans", "Olmecs"],
        correct_answer: "Incas",
        explanation: "Machu Picchu is a 15th-century Inca citadel located in the Eastern Cordillera of southern Peru."
      },
      {
        id: "2",
        question_text: "Who was the first Emperor of Rome?",
        options: ["Julius Caesar", "Nero", "Augustus", "Marcus Aurelius"],
        correct_answer: "Augustus",
        explanation: "Augustus was the first Roman emperor, reigning from 27 BC until his death in AD 14."
      }
    ]
  };

  const handleComplete = async (score: number) => {
    // Make POST request to backend/Supabase to save progress here
    console.log(`Saved score: ${score}`);
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12 px-4 flex flex-col items-center">
      {!isTakingQuiz ? (
        <div className="max-w-md w-full bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-8 text-center">
          <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/50 rounded-2xl flex items-center justify-center mx-auto mb-6">
             <span className="text-3xl">🏛️</span>
          </div>
          <h1 className="text-2xl font-bold font-poppins mb-2">{dummyQuiz.title}</h1>
          <div className="flex justify-center gap-2 mb-6">
            <span className="px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-full text-xs font-semibold text-slate-600 dark:text-slate-300">
              {dummyQuiz.category}
            </span>
            <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 rounded-full text-xs font-semibold text-orange-600 dark:text-orange-400">
              {dummyQuiz.difficulty}
            </span>
          </div>
          <p className="text-slate-600 dark:text-slate-400 mb-8 text-sm">
            Test your knowledge with {dummyQuiz.questions.length} questions. You have 30 seconds per question. Good luck!
          </p>
          <button 
            onClick={() => {
              setQuestions(dummyQuiz.questions as any);
              setIsTakingQuiz(true);
            }} 
            className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 hover:shadow-lg transition-all"
          >
            Start Quiz
          </button>
        </div>
      ) : (
        <div className="w-full max-w-xl flex justify-center mt-8">
          <QuizModal 
            quizTitle={dummyQuiz.title} 
            questions={questions} 
            onComplete={handleComplete} 
            onClose={() => setIsTakingQuiz(false)} 
          />
        </div>
      )}
    </main>
  );
}
