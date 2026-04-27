import Link from 'next/link';

export default function ChatButton() {
  return (
    <Link href="/askAI" className="fixed bottom-20 right-0 z-50">
      <button 
        className="
          flex items-center gap-3 
          cursor-pointer
          
          /* 1. Base Glass Effect */
          bg-[#E0B277]/50 
          backdrop-blur-lg
          
          /* 2. Border & Strong Visible Shadow */
          border border-white/20 border-r-0
          
          
          /* 3. Text & Sizing */
          text-black font-bold 
          py-2 px-4 
          rounded-l-full  
          
          /* 4. Expansion & Hover Effects */
          transition-all duration-300 ease-in-out
          /* This increases the width by adding padding on the left */
          hover:pl-7 
          hover:bg-[#c2a485] 
          
          
          active:scale-95
          group
        "
      >
        {/* Chatbot Icon */}
        <div className="w-7 h-7 group-hover:scale-110 transition-transform duration-300">
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
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
        <span className="text-md tracking-tight whitespace-nowrap">Ask AI</span>
      </button>
    </Link>
  );
}