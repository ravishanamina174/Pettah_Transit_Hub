"use client";
import ChatBot from '@/components/ChatBot';
import Navbar from '../../components/Navbar';


export default function BusBookingPage() {
  return (
    <main className="w-screen min-h-screen bg-white">
      <div style={{ padding: '0.5rem' }}>
        <Navbar />
      </div>
      <ChatBot/>
    </main>
  );
}