import React, { useState, useRef, useEffect } from 'react';
import { IconSend, IconBrain } from './Icons';
import { ChatMessage } from '../types';
import { sendMessageToSage } from '../services/geminiService';

const ChatTab: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: '星光闪烁，禅意悠长。我是星禅智者。无论您想探寻星象奥秘，还是寻求内心的宁静，我都在此为您指引方向。',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: inputText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const responseText = await sendMessageToSage(userMsg.text);
      
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)]">
      
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md p-4 shadow-sm z-10 flex items-center justify-between">
        <div className="flex items-center space-x-2">
           <div className="w-8 h-8 bg-wood-100 rounded-full flex items-center justify-center text-wood-600">
             <IconBrain className="w-5 h-5" />
           </div>
           <div>
             <h2 className="font-serif font-bold text-stone-800">星禅智者</h2>
             <p className="text-[10px] text-stone-500">Astrology & Zen Sage</p>
           </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-wood-600 text-white rounded-br-none' 
                  : 'bg-white text-stone-800 border border-stone-100 rounded-bl-none font-serif'
              }`}
            >
              {msg.role === 'model' && (
                <div className="text-[10px] text-wood-500 mb-1 font-bold uppercase tracking-wider">
                  ZenStellar Sage
                </div>
              )}
              <div className="whitespace-pre-wrap">{msg.text}</div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
             <div className="bg-white border border-stone-100 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-wood-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-wood-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-wood-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-stone-100">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="询问星象、寻求指引..."
            className="flex-1 bg-stone-50 border border-stone-200 rounded-full px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-wood-300 transition-all text-stone-800 placeholder-stone-400"
          />
          <button 
            onClick={handleSend}
            disabled={isLoading || !inputText.trim()}
            className="p-3 bg-wood-600 text-white rounded-full shadow-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-wood-700 transition-colors"
          >
            <IconSend className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatTab;