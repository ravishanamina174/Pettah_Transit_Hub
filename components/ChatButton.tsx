import Link from 'next/link';

export default function ChatButton() {
  return (
    <Link href="/askAI" className="fixed bottom-20 right-0 z-50">
      <button 
        className="
          flex items-center gap-3 
          bg-[#E0B277] hover:bg-[#c2a485] 
          text-black font-bold 
          py-1.5 px-2.5 
          rounded-l-full  
          transition-all duration-300 ease-in-out
          group
        "
      >
        {/* Chatbot Icon */}
        <div className="w-7 h-7">
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M12 8V4m0 0H8m4 0h4m-4 13a4 4 0 100-8 4 4 0 000 8z" />
            <rect x="5" y="11" width="14" height="10" rx="2" />
            <circle cx="9" cy="15" r="1" />
            <circle cx="15" cy="15" r="1" />
            <path d="M10 18h4" />
            <path d="M14 6h1a2 2 0 012 2v1" />
          </svg>
        </div>

        {/* Text */}
        <span className="text-1xl tracking-tight">Ask AI</span>
      </button>
    </Link>
  );
}