"use client";
import ChatButton from '@/components/ChatButton';
import Navbar from '../../components/Navbar';
import Timetable from '@/components/Timetable'; // Adjust path if you moved the folder

export default function TimetablePage() {
  return (
    <main>
      <div style={{ padding: '0.5rem' }}>
        <Navbar />
      </div>
      <div>
        <ChatButton/>
      </div>
      <div>
        <Timetable/>
      </div>
 
    </main>
  );
}