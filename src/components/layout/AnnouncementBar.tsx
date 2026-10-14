import React from 'react';

export function AnnouncementBar() {
  return (
    <div
      role="region"
      aria-label="Announcement"
      className="bg-[#1A3A2A] text-[#E8DDD0] py-2.5 px-4 text-center text-[10.5px] sm:text-[11.5px] font-semibold tracking-[0.2em] uppercase border-b border-[#2D5842]"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
        <span>Made Fresh Daily</span>
        <span className="text-[#C88A3E] opacity-75">·</span>
        <span>Zero Preservatives</span>
        <span className="text-[#C88A3E] opacity-75">·</span>
        <span>Delivered Chilled Across Lagos</span>
        <span className="text-[#C88A3E] opacity-75 hidden md:inline">·</span>
        <a
          href="tel:07010731559"
          className="text-[#E5B370] hover:text-white underline underline-offset-2 transition-colors hidden md:inline"
        >
          Call 07010731559
        </a>
      </div>
    </div>
  );
}
