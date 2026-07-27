'use client';
import { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, Timer, Award } from 'lucide-react';

interface Question {
  id: string;
  question_text: string;
  options: string[];
  correct_answer: string;
  explanation: string;
}

interface QuizModalProps {
  quizTitle: string;
  questions: Question[];
  onComplete: (score: number) => void;
  onClose: () => void;
}

export default function QuizModal({ quizTitle, questions, onComplete, onClose }: QuizModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds per question

  const currentQ = questions[currentIndex];

  useEffect(() => {
    if (isFinished) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleNext();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [currentIndex, isFinished]);

  const handleAnswer = (option: string) => {
    if (selectedAnswer) return; // Prevent multiple clicks
    setSelectedAnswer(option);
    if (option === currentQ.correct_answer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setTimeLeft(30);
    } else {
      setIsFinished(true);
      onComplete(score + (selectedAnswer === currentQ.correct_answer ? 1 : 0));
    }
  };

  if (isFinished) {
    return (
      <div className="p-8 text-center bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-md">
        <Award size={64} className="mx-auto text-yellow-400 mb-4" />
        <h2 className="text-2xl font-bold font-poppins mb-2">Quiz Completed!</h2>
        <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
          You scored <span className="font-bold text-indigo-600 text-2xl">{score}</span> out of {questions.length}
        </p>
        <button onClick={onClose} className="w-full py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition">
          Return to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-xl overflow-hidden border border-slate-100 dark:border-slate-700">
      <div className="p-4 bg-indigo-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
        <span className="font-bold text-indigo-800 dark:text-indigo-400 font-poppins">{quizTitle}</span>
        <div className="flex items-center gap-2 text-rose-500 font-medium font-mono">
          <Timer size={18} /> 00:{timeLeft.toString().padStart(2, '0')}
        </div>
      </div>

      <div className="p-6">
        <div className="text-sm text-slate-500 dark:text-slate-400 mb-2 font-medium">
          Question {currentIndex + 1} of {questions.length}
        </div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">
          {currentQ.question_text}
        </h3>

        <div className="space-y-3">
          {currentQ.options.map((option, idx) => {
            let btnClass = "w-full text-left p-4 rounded-xl border-2 transition-all font-medium ";
            
            if (!selectedAnswer) {
              btnClass += "border-slate-200 dark:border-slate-700 hover:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-slate-700 dark:bg-slate-800";
            } else if (option === currentQ.correct_answer) {
              btnClass += "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400";
            } else if (option === selectedAnswer) {
              btnClass += "border-rose-500 bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-400";
            } else {
              btnClass += "border-slate-200 dark:border-slate-700 opacity-50";
            }

            return (
              <button key={idx} onClick={() => handleAnswer(option)} disabled={!!selectedAnswer} className={btnClass}>
                <div className="flex justify-between items-center">
                  <span>{option}</span>
                  {selectedAnswer && option === currentQ.correct_answer && <CheckCircle2 className="text-emerald-500" size={20} />}
                  {selectedAnswer === option && option !== currentQ.correct_answer && <XCircle className="text-rose-500" size={20} />}
                </div>
              </button>
            );
          })}
        </div>

        {selectedAnswer && (
          <div className="mt-6 animate-slide-up">
            <div className="p-4 bg-blue-50 dark:bg-slate-900 rounded-lg text-sm text-blue-800 dark:text-blue-300 border border-blue-100 dark:border-slate-700 mb-4">
              <span className="font-bold block mb-1">Explanation:</span>
              {currentQ.explanation}
            </div>
            <button onClick={handleNext} className="w-full py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition shadow-md">
              {currentIndex + 1 === questions.length ? 'Finish Quiz' : 'Next Question'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
