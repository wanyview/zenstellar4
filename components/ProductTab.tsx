import React, { useState } from 'react';
import { IconSparkles } from './Icons';
import { ZodiacSign } from '../types';
import { getDailyFortune } from '../services/geminiService';

const zodiacSigns: ZodiacSign[] = [
  { name: '白羊座', icon: '♈', date: '3.21-4.19', element: 'Fire' },
  { name: '金牛座', icon: '♉', date: '4.20-5.20', element: 'Earth' },
  { name: '双子座', icon: '♊', date: '5.21-6.21', element: 'Air' },
  { name: '巨蟹座', icon: '♋', date: '6.22-7.22', element: 'Water' },
  { name: '狮子座', icon: '♌', date: '7.23-8.22', element: 'Fire' },
  { name: '处女座', icon: '♍', date: '8.23-9.22', element: 'Earth' },
  { name: '天秤座', icon: '♎', date: '9.23-10.23', element: 'Air' },
  { name: '天蝎座', icon: '♏', date: '10.24-11.22', element: 'Water' },
  { name: '射手座', icon: '♐', date: '11.23-12.21', element: 'Fire' },
  { name: '摩羯座', icon: '♑', date: '12.22-1.19', element: 'Earth' },
  { name: '水瓶座', icon: '♒', date: '1.20-2.18', element: 'Air' },
  { name: '双鱼座', icon: '♓', date: '2.19-3.20', element: 'Water' },
];

const ProductTab: React.FC = () => {
  const [selectedSign, setSelectedSign] = useState<ZodiacSign | null>(null);
  const [fortune, setFortune] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSignClick = async (sign: ZodiacSign) => {
    setSelectedSign(sign);
    setLoading(true);
    setFortune(null);
    try {
      const result = await getDailyFortune(sign.name);
      setFortune(result);
    } catch (e) {
      setFortune("星象模糊，请稍后重试。");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setSelectedSign(null);
    setFortune(null);
  };

  // Helper to render markdown-like text simply
  const renderFortuneContent = (text: string) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('##')) {
        return <h3 key={i} className="text-lg font-serif font-bold text-wood-800 mt-4 mb-2">{line.replace(/#/g, '')}</h3>;
      }
      if (line.trim().startsWith('- **')) {
        const parts = line.split('**');
        return (
          <div key={i} className="flex items-start mb-1 text-sm text-stone-700">
             <span className="font-bold text-wood-700 mr-2 min-w-[4rem]">{parts[1]}</span>
             <span>{parts[2]}</span>
          </div>
        );
      }
      if (line.trim() === '') return <div key={i} className="h-2" />;
      return <p key={i} className="text-sm text-stone-600 mb-1 leading-relaxed">{line}</p>;
    });
  };

  return (
    <div className="flex flex-col min-h-full pb-24 animate-in fade-in duration-500 bg-stone-50">
      
      {/* Header */}
      <div className="relative h-48 w-full rounded-b-[2rem] overflow-hidden shadow-lg bg-stone-900">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-stone-800 to-wood-900/80"></div>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-6">
           <IconSparkles className="text-wood-300 w-8 h-8 mb-2 animate-pulse" />
           <h1 className="text-3xl font-serif font-bold text-white tracking-widest">
            ZenStellar
          </h1>
          <p className="text-wood-200 text-xs tracking-[0.2em] mt-1 font-light uppercase">
            今日运势 · Daily Fortune
          </p>
        </div>
      </div>

      <div className="px-6 -mt-8 relative z-10">
        
        {!selectedSign ? (
          <div className="bg-white/90 backdrop-blur-sm border border-white/60 p-6 rounded-3xl shadow-lg">
            <h2 className="text-center font-serif text-stone-800 font-bold mb-6 flex items-center justify-center">
              <span className="w-8 h-[1px] bg-wood-300 mx-2"></span>
              选择你的星座
              <span className="w-8 h-[1px] bg-wood-300 mx-2"></span>
            </h2>
            
            <div className="grid grid-cols-3 gap-4">
              {zodiacSigns.map((sign) => (
                <button
                  key={sign.name}
                  onClick={() => handleSignClick(sign)}
                  className="flex flex-col items-center justify-center p-3 rounded-xl hover:bg-wood-50 active:bg-wood-100 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-full bg-stone-100 text-2xl flex items-center justify-center mb-2 group-hover:bg-wood-200 transition-colors shadow-inner">
                    {sign.icon}
                  </div>
                  <span className="text-xs font-bold text-stone-700">{sign.name}</span>
                  <span className="text-[10px] text-stone-400 scale-90">{sign.date}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white/95 backdrop-blur-md border border-white/60 rounded-3xl shadow-xl overflow-hidden min-h-[400px] flex flex-col">
             {/* Card Header */}
             <div className="bg-wood-50 p-4 flex items-center justify-between border-b border-wood-100">
                <button onClick={handleBack} className="text-stone-500 hover:text-stone-800 text-sm flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                  重选
                </button>
                <div className="flex flex-col items-end">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{selectedSign.icon}</span>
                    <span className="font-serif font-bold text-lg text-wood-800">{selectedSign.name}</span>
                  </div>
                  <span className="text-[10px] text-stone-400 uppercase tracking-wider">{new Date().toLocaleDateString()}</span>
                </div>
             </div>

             {/* Content */}
             <div className="p-6 flex-1">
               {loading ? (
                 <div className="h-full flex flex-col items-center justify-center py-12 space-y-4">
                   <div className="w-16 h-16 border-4 border-wood-100 border-t-wood-500 rounded-full animate-spin"></div>
                   <p className="text-stone-400 text-sm animate-pulse">正在连接星辰...</p>
                 </div>
               ) : (
                 <div className="animate-in slide-in-from-bottom-4 duration-500">
                    {fortune ? renderFortuneContent(fortune) : <p className="text-center text-stone-500">无法获取运势</p>}
                 </div>
               )}
             </div>

             {/* Footer decorative */}
             <div className="h-2 bg-gradient-to-r from-wood-200 via-wood-400 to-wood-200"></div>
          </div>
        )}

      </div>
      
      {!selectedSign && (
        <div className="px-8 mt-8 text-center">
          <p className="text-xs text-stone-400 italic font-serif">
            "Starry skies above, moral law within."
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductTab;
