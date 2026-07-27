'use client';
import { useState, useRef, useEffect } from 'react';
import { Play, Pause, X, RotateCcw, FastForward } from 'lucide-react';
import { useStore } from '@/store/useStore';

export default function AudioPlayer() {
  const { audioState, closeAudio } = useStore();
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Auto-play when audio state changes
  useEffect(() => {
    if (audioState?.url && audioRef.current) {
      audioRef.current.play().catch(e => console.error("Autoplay prevented:", e));
      setIsPlaying(true);
      setSpeed(1); // Reset speed on new track
    }
  }, [audioState]);

  if (!audioState) return null;

  const togglePlay = () => {
    if (isPlaying) audioRef.current?.pause();
    else audioRef.current?.play();
    setIsPlaying(!isPlaying);
  };

  const changeSpeed = () => {
    const nextSpeed = speed === 1 ? 1.5 : speed === 1.5 ? 2 : 1;
    setSpeed(nextSpeed);
    if (audioRef.current) audioRef.current.playbackRate = nextSpeed;
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[95%] max-w-lg bg-indigo-900/95 backdrop-blur-md text-white rounded-2xl shadow-2xl p-4 flex items-center justify-between z-50 animate-slide-up border border-indigo-700">
      <div className="flex flex-col truncate w-3/5 pr-4">
        <span className="text-[10px] text-indigo-300 uppercase tracking-wider font-bold mb-1">AI Narrator</span>
        <span className="font-semibold text-sm truncate font-poppins">{audioState.title}</span>
      </div>
      
      <div className="flex items-center gap-3">
        <button onClick={changeSpeed} className="text-xs font-bold bg-indigo-800 hover:bg-indigo-700 px-2 py-1 rounded transition">
          {speed}x
        </button>
        <button onClick={togglePlay} className="p-3 bg-white text-indigo-900 rounded-full hover:scale-105 transition shadow-lg">
          {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
        </button>
        <button onClick={closeAudio} className="p-2 text-indigo-300 hover:text-white hover:bg-indigo-800 rounded-full transition ml-1">
          <X size={20} />
        </button>
      </div>
      
      <audio 
        ref={audioRef} 
        src={audioState.url} 
        onEnded={() => setIsPlaying(false)} 
        className="hidden" 
      />
    </div>
  );
}
