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

    const userMsg: Message = {
      id: Date.now(),
      text: text,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const aiMsg: Message = {
        id: Date.now() + 1,
        text: getDummyResponse(text),
        sender: 'ai',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const getDummyResponse = (query: string) => {
    if (query.includes("Badulla")) return "Colombo → Badulla buses run hourly between 5:00 AM - 9:00 PM. The express service (No. 99) takes ~7h.";
    if (query.includes("kandy")) return "The next Intercity AC bus to Kandy departs from Pettah at 10:30 PM.";
    return "I'm trained on the entire Pettah transit network. How else can I help you?";
  };

  return (
    /* Added scale-90 and origin-top to shrink the entire UI by 10% */
    <div className="flex h-screen w-full bg-[#F8F9FA] p-8 font-sans text-[#333] overflow-hidden">
      <div className="flex w-full h-full scale-[0.9] origin-top transition-transform duration-300">
        
        {/* LEFT SIDEBAR */}
        <div className="flex w-64 flex-col gap-6 mr-8 shrink-0">
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4 text-[#4A4A4A] font-semibold">
              <Sparkles size={18} className="text-green-500" />
              <span>AI Route Assistant</span>
            </div>
            <ul className="space-y-4 text-sm text-gray-500">
              <li className="cursor-pointer hover:text-black">How to book a seat?</li>
              <li className="cursor-pointer hover:text-black">Pettah to Galle fare</li>
              <li className="cursor-pointer hover:text-black">AC bus availability</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4 text-[#4A4A4A] font-semibold">
              <Clock size={18} className="text-green-500" />
              <span>Recent Searches</span>
            </div>
            <ul className="space-y-4 text-sm text-gray-500">
              <li className="cursor-pointer hover:text-black">colombo → Kandy</li>
              <li className="cursor-pointer hover:text-black">Night bus to Badulla</li>
              <li className="cursor-pointer hover:text-black">Hotline 1315</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4 text-[#4A4A4A] font-semibold">
              <Bookmark size={18} className="text-green-500" />
              <span>Saved Routes</span>
            </div>
            <ul className="space-y-4 text-sm text-gray-500">
              <li className="cursor-pointer hover:text-black">Pettah → Badulla</li>
              <li className="cursor-pointer hover:text-black">Pettah → Galle</li>
            </ul>
          </div>
        </div>

        {/* MAIN CHAT AREA */}
        <div className="flex flex-1 flex-col overflow-hidden rounded-[32px] border border-gray-200 bg-white shadow-sm">
          
          <div className="flex items-center justify-between border-b border-gray-100 p-5 px-8">
            <div className="flex items-center gap-4">
              <img src="/chatbotAI.png" alt="Bot" className="h-10 w-10 object-contain" />
              <div>
                <h2 className="font-bold text-gray-800 text-base">AI Route Assistant</h2>
                <p className="text-xs text-gray-500">Ask about routes, timetables, bookings, and travel info</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-green-600">
              <Sparkles size={16} />
              <span>Online</span>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto bg-[#FBFBFC] p-8">
            {messages.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="relative mb-6">
                  <div className="absolute inset-0 scale-150 animate-pulse bg-green-100 blur-2xl rounded-full opacity-50"></div>
                  <img src="/busBlue.png" alt="Bus" className="relative z-10 h-20 w-20" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-gray-900">Start by asking about bus routes</h3>
                <p className="max-w-sm text-sm text-gray-500">Try one of the suggestions below. I'm trained on the entire Pettah transit network.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className="flex items-start gap-3 max-w-[80%]">
                      {msg.sender === 'ai' && <img src="/chatbotAI.png" alt="Bot" className="h-6 w-6 mt-1" />}
                      <div className={`rounded-2xl px-5 py-3 text-sm shadow-sm ${msg.sender === 'user' ? 'bg-[#3D3D3D] text-white rounded-tr-lg' : 'bg-white border border-gray-100 text-gray-700 rounded-tl-lg'}`}>
                        {msg.text}
                      </div>
                    </div>
                    <span className="mt-1 text-[10px] text-gray-400 px-10">{msg.time}</span>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex items-start gap-3">
                    <img src="/chatbotAI.png" alt="Bot" className="h-6 w-6 animate-bounce" />
                    <div className="bg-white border border-gray-100 px-4 py-2 rounded-2xl rounded-tl-none shadow-sm">
                      <div className="flex gap-1">
                        <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-300"></div>
                        <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-300 [animation-delay:0.2s]"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="p-6 pt-2 bg-[#FBFBFC]">
            <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
              {defaultSuggestions.map((text, idx) => (
                <button key={idx} onClick={() => handleSuggestionClick(text)} className="whitespace-nowrap rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50">
                  {text}
                </button>
              ))}
            </div>

            <div className="relative flex items-center rounded-[24px] border border-gray-200 bg-white p-2 px-4 shadow-lg focus-within:ring-2 focus-within:ring-green-100">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage(inputValue)}
                placeholder="Ask about routes, timings, or destinations..."
                className="flex-1 bg-transparent py-3 px-2 text-sm outline-none placeholder:text-gray-400"
              />
              <div className="flex items-center gap-3">
                <button className="text-gray-400 hover:text-gray-600"><Mic size={20} /></button>
                <button onClick={() => sendMessage(inputValue)} className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#3D3D3D] text-white">
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