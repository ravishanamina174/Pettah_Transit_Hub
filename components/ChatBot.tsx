import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  Clock, 
  Bookmark, 
  Sparkles, 
  ArrowUp 
} from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  time: string;
}

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Configuration: Change this to your server URL if different
  const API_URL = "http://localhost:8000/api/query"; 

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const defaultSuggestions = [
    "Colombo to Badulla timetable",
    "Next bus to kandy",
    "Hotline numbers",
    "Seat booking info"
  ];

  const handleSuggestionClick = (text: string) => {
    if (isTyping) return;
    sendMessage(text);
  };

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    // 1. Add User Message to UI
    const userMsg: Message = {
      id: Date.now(),
      text: text,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    try {
      // 2. Call the FastAPI Backend
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: text }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      // 3. Add AI Message to UI
      const aiMsg: Message = {
        id: Date.now() + 1,
        text: data.answer, // Matching your FastAPI return key: {"answer": ...}
        sender: 'ai',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);

    } catch (error) {
      // 4. Handle Errors
      const errorMsg: Message = {
        id: Date.now() + 1,
        text: "Sorry, I'm having trouble connecting to the transit server. Please try again later.",
        sender: 'ai',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
      console.error("Fetch Error:", error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex h-dvh w-screen overflow-hidden bg-[#F8F9FA] p-4 font-sans text-[#333] md:h-screen md:p-8">
      <div className="flex h-full w-full flex-col gap-4 transition-transform duration-300 lg:flex-row lg:gap-0 lg:scale-[0.9] lg:origin-top">
        
        {/* LEFT SIDEBAR (No changes needed) */}
        <div className="hidden w-full shrink-0 flex-col gap-6 lg:mr-8 lg:flex lg:w-64">
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4 text-[#4A4A4A] font-semibold">
              <Sparkles size={18} className="text-green-500" />
              <span>AI Route Assistant</span>
            </div>
            <ul className="space-y-4 text-sm text-gray-500">
              <li onClick={() => handleSuggestionClick("How to book a seat?")} className="cursor-pointer hover:text-black">How to book a seat?</li>
              <li onClick={() => handleSuggestionClick("Pettah to Galle fare")} className="cursor-pointer hover:text-black">Pettah to Galle fare</li>
              <li onClick={() => handleSuggestionClick("AC bus availability")} className="cursor-pointer hover:text-black">AC bus availability</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4 text-[#4A4A4A] font-semibold">
              <Clock size={18} className="text-green-500" />
              <span>Recent Searches</span>
            </div>
            <ul className="space-y-4 text-sm text-gray-500">
              <li className="text-xs">colombo → Kandy</li>
              <li className="text-xs">Night bus to Badulla</li>
              <li className="text-xs">Hotline 1315</li>
            </ul>
          </div>
        </div>

        {/* MAIN CHAT AREA */}
        <div className="flex flex-1 flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm md:rounded-[32px]">
          
          <div className="flex items-center justify-between border-b border-gray-100 p-4 md:p-5 md:px-8">
            <div className="flex items-center gap-3 md:gap-4">
              <img src="/chatbotAI.png" alt="Bot" className="h-10 w-10 object-contain" />
              <div>
                <h2 className="font-bold text-gray-800 text-base">AI Route Assistant</h2>
                <p className="text-xs text-gray-500">Real-time Pettah CTB Information</p>
              </div>
            </div>
            <div className="hidden items-center gap-2 text-sm font-medium text-green-600 sm:flex">
              <Sparkles size={16} />
              <span>Live System</span>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto bg-[#FBFBFC] p-4 md:p-8">
            {messages.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="relative mb-6">
                  <div className="absolute inset-0 scale-150 animate-pulse bg-green-100 blur-2xl rounded-full opacity-50"></div>
                  <img src="/busBlue.png" alt="Bus" className="relative z-10 h-20 w-20" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-gray-900">Ask about Pettah bus schedules</h3>
                <p className="max-w-sm px-2 text-sm text-gray-500 md:px-0">I am connected to the CTB live database. How can I help you today?</p>
              </div>
            ) : (
              <div className="space-y-6">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className="flex max-w-[92%] items-start gap-2 md:max-w-[80%] md:gap-3">
                      {msg.sender === 'ai' && <img src="/chatbotAI.png" alt="Bot" className="h-6 w-6 mt-1" />}
                      <div className={`rounded-2xl px-5 py-3 text-sm shadow-sm ${msg.sender === 'user' ? 'bg-[#3D3D3D] text-white rounded-tr-lg' : 'bg-white border border-gray-100 text-gray-700 rounded-tl-lg'}`}>
                        {msg.text}
                      </div>
                    </div>
                    <span className="mt-1 px-4 text-[10px] text-gray-400 md:px-10">{msg.time}</span>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex items-start gap-3">
                    <img src="/chatbotAI.png" alt="Bot" className="h-6 w-6 animate-bounce" />
                    <div className="bg-white border border-gray-100 px-4 py-2 rounded-2xl rounded-tl-none shadow-sm">
                      <div className="flex gap-1">
                        <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-green-400"></div>
                        <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-green-400 [animation-delay:0.2s]"></div>
                        <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-green-400 [animation-delay:0.4s]"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="bg-[#FBFBFC] p-4 pt-2 md:p-6 md:pt-2">
            <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
              {defaultSuggestions.map((text, idx) => (
                <button 
                  key={idx} 
                  disabled={isTyping}
                  onClick={() => handleSuggestionClick(text)} 
                  className="whitespace-nowrap rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                  {text}
                </button>
              ))}
            </div>

            <div className="relative flex items-center rounded-[24px] border border-gray-200 bg-white p-2 px-3 shadow-lg focus-within:ring-2 focus-within:ring-green-100 md:px-4">
              <input
                type="text"
                value={inputValue}
                disabled={isTyping}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage(inputValue)}
                placeholder="Type your route question..."
                className="flex-1 bg-transparent py-3 px-2 text-sm outline-none placeholder:text-gray-400"
              />
              <div className="flex items-center gap-3">
                <button className="text-gray-400 hover:text-gray-600"><Mic size={20} /></button>
                <button 
                  disabled={isTyping}
                  onClick={() => sendMessage(inputValue)} 
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#3D3D3D] text-white disabled:bg-gray-400"
                >
                  <ArrowUp size={20} strokeWidth={3} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;