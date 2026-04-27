"use client";
import ChatBot from '@/components/ChatBot';
import Navbar from '../../components/Navbar';


export default function BusBookingPage() {
  return (
    <main>
      <div style={{ padding: '0.5rem' }}>
        <Navbar />
      </div>
      <ChatBot/>
    </main>
  );
}