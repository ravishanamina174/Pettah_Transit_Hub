"use client";
import ChatButton from '@/components/ChatButton';
import Navbar from '../../components/Navbar';
import BusBooking  from '@/components/BusBooking'; // Adjust path if you moved the folder

export default function BusBookingPage() {
  return (
    <main>
      <div style={{ padding: '0.5rem' }}>
        <Navbar />
      </div>
      <div>
       <ChatButton/>
      </div>
      <div>
        <BusBooking/>
      </div>
    </main>
  );
}