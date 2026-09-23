import Link from 'next/link';

export default function ChatButton() {
  return (
    <Link
      href="/askAI"
      aria-label="Ask AI"
      className="group fixed bottom-6 right-6 z-50"
    >
      <div
        className="
          relative flex items-center
          h-14 w-14
          overflow-hidden
          rounded-full
          border border-white/20
          bg-gradient-to-br from-zinc-900 via-gray-700 to-black
          text-white
          shadow-[0_8px_30px_rgba(0,0,0,0.25)]
          transition-all duration-500 ease-out

          hover:w-[150px]
          hover:shadow-[0_12px_40px_rgba(0,0,0,0.35)]
        "
      >
        {/* Subtle gradient glow */}
        <div
          className="
            absolute inset-0
            bg-gradient-to-r
            from-violet-500/20
            via-blue-500/10
            to-cyan-400/20
            opacity-0
            transition-opacity duration-500
            group-hover:opacity-100
          "
        />

        {/* AI icon */}
        <div
          className="
            relative z-10
            flex h-14 w-14 shrink-0
            items-center justify-center
            transition-transform duration-500
            group-hover:rotate-6
          "
        >
          <div
            className="
              absolute h-8 w-8 rounded-full
              bg-gradient-to-br from-violet-400 to-cyan-400
              opacity-20 blur-md
              transition-all duration-500
              group-hover:opacity-40
            "
          />

          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="relative h-6 w-6"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 3v3" />
            <path d="M9.5 6h5" />
            <rect x="5" y="7" width="14" height="12" rx="3" />
            <circle cx="9" cy="12" r="1" />
            <circle cx="15" cy="12" r="1" />
            <path d="M9.5 16h5" />
            <path d="M5 11H3" />
            <path d="M21 11h-2" />
          </svg>
        </div>

        {/* Label */}
        <span
          className="
            relative z-10
            -ml-1
            whitespace-nowrap
            text-sm font-medium
            tracking-tight
            opacity-0
            translate-x-2
            transition-all duration-300
            group-hover:translate-x-0
            group-hover:opacity-100
          "
        >
          Ask AI
        </span>

        {/* Shine */}
        <div
          className="
            pointer-events-none
            absolute inset-0
            -translate-x-full
            bg-gradient-to-r
            from-transparent
            via-white/10
            to-transparent
            transition-transform duration-700
            group-hover:translate-x-full
          "
        />
      </div>
    </Link>
  );
}