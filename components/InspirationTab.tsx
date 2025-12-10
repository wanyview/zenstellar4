import React, { useState } from 'react';
import { IconBulb, IconSparkles } from './Icons';
import { generateInspirationImage } from '../services/geminiService';

const InspirationTab: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [generationCount, setGenerationCount] = useState(0);

  const handleGenerate = async () => {
    setLoading(true);
    
    try {
      const result = await generateInspirationImage();
      if (result) {
        setImageUrl(result);
        setGenerationCount(c => c + 1);
      }
    } catch (e) {
      console.error("Failed to generate inspiration");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-stone-50 pb-20">
      
      {/* Header */}
      <div className="px-6 pt-8 pb-4">
        <h1 className="text-3xl font-serif font-bold text-wood-900 flex items-center">
          <span className="bg-wood-200 p-2 rounded-xl mr-3">
             <IconBulb className="w-6 h-6 text-wood-700" />
          </span>
          灵感瞬间
        </h1>
        <p className="text-xs text-stone-500 mt-2 tracking-widest uppercase">
          ZenStellar Creative Muse
        </p>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-6 flex flex-col justify-center items-center">
        
        {/* Image Card */}
        <div className="relative w-full aspect-[9/16] max-h-[60vh] bg-white rounded-3xl shadow-xl border-4 border-white overflow-hidden group">
          
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt="AI Generated Inspiration" 
              className={`w-full h-full object-cover transition-opacity duration-700 ${loading ? 'opacity-80 blur-sm scale-105' : 'opacity-100 scale-100'}`}
            />
          ) : (
            <div className="w-full h-full bg-stone-100 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-20 h-20 bg-wood-100 rounded-full flex items-center justify-center mb-4 animate-pulse">
                <IconSparkles className="w-10 h-10 text-wood-400" />
              </div>
              <p className="font-serif text-lg text-stone-600 mb-2">
                "Parce que tu n'as rien,<br/>tu peux tout créer."
              </p>
              <p className="text-xs text-stone-400">
                因为你一无所有，所以你能创造一切。
              </p>
            </div>
          )}

          {/* Loading Overlay */}
          {loading && (
             <div className="absolute inset-0 bg-black/20 backdrop-blur-sm flex flex-col items-center justify-center z-10">
                <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin mb-4"></div>
                <span className="text-white font-serif text-sm tracking-widest animate-pulse">CREATING...</span>
             </div>
          )}
          
          {/* Watermark / Logo Overlay similar to reference */}
          {imageUrl && !loading && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full text-white/90 text-[10px] font-serif tracking-[0.2em] border border-white/20">
              ZENSTELLAR · AI ART
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="mt-8 w-full max-w-xs">
           <button
             onClick={handleGenerate}
             disabled={loading}
             className="w-full py-4 bg-wood-700 hover:bg-wood-800 text-white rounded-2xl shadow-lg shadow-wood-500/30 flex items-center justify-center space-x-2 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed group"
           >
             <IconSparkles className={`w-5 h-5 ${loading ? 'animate-spin' : 'group-hover:animate-pulse'}`} />
             <span className="font-medium tracking-wide">
               {imageUrl ? '打开新的灵感胶囊' : '打开灵感胶囊'}
             </span>
           </button>
           <p className="text-center text-[10px] text-stone-400 mt-4">
             AI generated · Unique every time
           </p>
        </div>

      </div>
    </div>
  );
};

export default InspirationTab;