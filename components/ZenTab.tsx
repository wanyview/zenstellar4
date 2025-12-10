import React, { useState, useEffect, useRef } from 'react';
import { IconMusic } from './Icons';

const GUQIN_SONGS = [
  "高山流水", "梅花三弄", "平沙落雁", "渔樵问答", "广陵散",
  "阳关三叠", "醉渔唱晚", "胡笳十八拍", "潇湘水云", "汉宫秋月",
  "凤求凰", "酒狂", "忆故人", "流水", "高山",
  "关山月", "鸥鹭忘机", "秋风词", "良宵引", "玉楼春晓",
  "普庵咒", "神人畅", "石上流泉", "龙翔操", "梧叶舞秋风",
  "墨子悲丝", "长门怨", "鹤鸣九皋", "碧涧流泉", "归去来辞"
];

const ZenTab: React.FC = () => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timer, setTimer] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setTimer(t => t + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSongClick = (index: number) => {
    if (currentSongIndex === index) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentSongIndex(index);
      setIsPlaying(true);
      setTimer(0);
    }
  };

  return (
    <div className="flex flex-col h-full bg-stone-50">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
         <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[150%] h-[50%] bg-gradient-to-b from-wood-100/50 to-transparent rounded-b-full blur-3xl opacity-60" />
      </div>

      {/* Top Section: Visualizer */}
      <div className="flex-shrink-0 pt-8 pb-6 px-6 z-10 flex flex-col items-center">
        <h2 className="text-2xl font-serif text-stone-800 mb-6 tracking-wide">冥想 • 听韵</h2>
        
        {/* Breathing Visualizer */}
        <div className="relative mb-6">
          <div className={`w-40 h-40 rounded-full bg-gradient-to-tr from-wood-300 to-wood-100 shadow-2xl flex items-center justify-center transition-all duration-1000 ${isPlaying ? 'animate-breathe' : ''}`}>
             <div className="w-32 h-32 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center border border-white shadow-inner">
                <span className="font-serif text-2xl text-wood-800 tabular-nums">{formatTime(timer)}</span>
             </div>
          </div>
          {/* Ripples */}
          {isPlaying && (
            <>
              <div className="absolute inset-0 rounded-full border border-wood-300 animate-[ping_3s_linear_infinite] opacity-50" />
              <div className="absolute inset-0 rounded-full border border-wood-200 animate-[ping_3s_linear_infinite_1s] opacity-30" />
            </>
          )}
        </div>

        {/* Current Song Info */}
        <div className="text-center mb-2">
           <h3 className="text-xl font-bold font-serif text-wood-900">{GUQIN_SONGS[currentSongIndex]}</h3>
           <p className="text-xs text-stone-500 mt-1 uppercase tracking-widest">Ancient Guqin Collection</p>
        </div>

        {/* Main Controls */}
        <div className="flex items-center space-x-6 mt-2">
           <button 
             onClick={() => {
               const prev = currentSongIndex === 0 ? GUQIN_SONGS.length - 1 : currentSongIndex - 1;
               setCurrentSongIndex(prev);
               setTimer(0);
             }}
             className="text-wood-400 hover:text-wood-600 transition-colors"
           >
             <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>
           </button>

           <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all active:scale-95 ${isPlaying ? 'bg-wood-100 text-wood-700' : 'bg-wood-600 text-white'}`}
          >
            {isPlaying ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            )}
          </button>

          <button 
             onClick={() => {
               const next = currentSongIndex === GUQIN_SONGS.length - 1 ? 0 : currentSongIndex + 1;
               setCurrentSongIndex(next);
               setTimer(0);
             }}
             className="text-wood-400 hover:text-wood-600 transition-colors"
           >
             <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>
           </button>
        </div>
      </div>

      {/* Playlist Section */}
      <div className="flex-1 bg-white/60 backdrop-blur-lg rounded-t-[2.5rem] shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.05)] border-t border-white overflow-hidden flex flex-col z-20">
         <div className="px-8 py-5 border-b border-stone-100 flex items-center justify-between">
            <span className="text-sm font-bold text-stone-700 flex items-center">
              <IconMusic className="w-4 h-4 mr-2 text-wood-500" />
              古琴三十阕
            </span>
            <span className="text-[10px] bg-wood-100 text-wood-700 px-2 py-1 rounded-full">30 Tracks</span>
         </div>
         
         <div className="overflow-y-auto flex-1 p-4 pb-24" ref={scrollContainerRef}>
            <div className="space-y-2">
              {GUQIN_SONGS.map((song, index) => (
                <div 
                  key={index}
                  onClick={() => handleSongClick(index)}
                  className={`group flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer border ${
                    currentSongIndex === index 
                      ? 'bg-wood-50 border-wood-200 shadow-sm' 
                      : 'hover:bg-white border-transparent hover:border-stone-100'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className={`text-xs font-mono w-6 text-center ${currentSongIndex === index ? 'text-wood-500 font-bold' : 'text-stone-300'}`}>
                      {(index + 1).toString().padStart(2, '0')}
                    </span>
                    <div className="flex flex-col">
                      <span className={`text-sm font-medium ${currentSongIndex === index ? 'text-wood-900' : 'text-stone-600'}`}>
                        {song}
                      </span>
                    </div>
                  </div>
                  
                  {currentSongIndex === index && isPlaying && (
                    <div className="flex space-x-1 items-end h-3 mr-2">
                       <div className="w-1 bg-wood-400 rounded-t animate-[bounce_1s_infinite] h-2"></div>
                       <div className="w-1 bg-wood-400 rounded-t animate-[bounce_1.2s_infinite] h-3"></div>
                       <div className="w-1 bg-wood-400 rounded-t animate-[bounce_0.8s_infinite] h-1"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <p className="text-center text-[10px] text-stone-300 mt-8 mb-4">
               ZenStellar Audio Experience
            </p>
         </div>
      </div>
    </div>
  );
};

export default ZenTab;