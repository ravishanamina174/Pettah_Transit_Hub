"use client";
import ChatButton from '@/components/ChatButton';
import Navbar from '../../../components/Navbar';
import ACTimetable from '@/components/ACTimetable';
 // Adjust path if you moved the folder

export default function TimetablePage() {
  return (
    <main>
      <div style={{ padding: '0.5rem' }}>
        <Navbar />
      </div>
      <ChatButton/>
      <div>
        <ACTimetable/>
      </div>
    </main>
  );
}