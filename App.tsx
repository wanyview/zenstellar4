import React, { useState } from 'react';
import { TabView } from './types';
import FortuneTab from './components/FortuneTab';
import ZenTab from './components/ZenTab';
import ChatTab from './components/ChatTab';
import InspirationTab from './components/InspirationTab';
import { IconFeather, IconMessage, IconSparkles, IconBulb } from './components/Icons';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabView>(TabView.FORTUNE);

  const renderContent = () => {
    switch (activeTab) {
      case TabView.FORTUNE:
        return <FortuneTab />;
      case TabView.ZEN:
        return <ZenTab />;
      case TabView.CHAT:
        return <ChatTab />;
      case TabView.INSPIRATION:
        return <InspirationTab />;
      default:
        return <FortuneTab />;
    }
  };

  return (
    <div className="min-h-screen max-w-md mx-auto bg-stone-50 shadow-2xl overflow-hidden relative border-x border-stone-200">
      
      {/* Main Content Area */}
      <div className={`h-full overflow-y-auto pb-20 ${activeTab === TabView.CHAT ? 'pb-0' : ''}`}>
        {renderContent()}
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-stone-200 pb-safe z-50">
        <div className="flex justify-around items-center h-16 px-2">
          <button 
            onClick={() => setActiveTab(TabView.FORTUNE)}
            className={`flex flex-col items-center justify-center space-y-1 w-full h-full transition-colors ${activeTab === TabView.FORTUNE ? 'text-wood-600' : 'text-stone-400 hover:text-stone-600'}`}
          >
            <div className={`transition-transform duration-300 ${activeTab === TabView.FORTUNE ? 'scale-110' : ''}`}>
               <IconSparkles className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-medium tracking-wide">运势</span>
          </button>
          
          <button 
            onClick={() => setActiveTab(TabView.ZEN)}
            className={`flex flex-col items-center justify-center space-y-1 w-full h-full transition-colors ${activeTab === TabView.ZEN ? 'text-wood-600' : 'text-stone-400 hover:text-stone-600'}`}
          >
            <div className={`transition-transform duration-300 ${activeTab === TabView.ZEN ? 'scale-110' : ''}`}>
              <IconFeather className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-medium tracking-wide">禅境</span>
          </button>
          
          <button 
            onClick={() => setActiveTab(TabView.INSPIRATION)}
            className={`flex flex-col items-center justify-center space-y-1 w-full h-full transition-colors ${activeTab === TabView.INSPIRATION ? 'text-wood-600' : 'text-stone-400 hover:text-stone-600'}`}
          >
            <div className={`transition-transform duration-300 ${activeTab === TabView.INSPIRATION ? 'scale-110' : ''}`}>
               <IconBulb className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-medium tracking-wide">灵感</span>
          </button>
          
          <button 
            onClick={() => setActiveTab(TabView.CHAT)}
            className={`flex flex-col items-center justify-center space-y-1 w-full h-full transition-colors ${activeTab === TabView.CHAT ? 'text-wood-600' : 'text-stone-400 hover:text-stone-600'}`}
          >
            <div className={`transition-transform duration-300 ${activeTab === TabView.CHAT ? 'scale-110' : ''}`}>
               <IconMessage className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-medium tracking-wide">星语</span>
          </button>
        </div>
      </div>

    </div>
  );
};

export default App;