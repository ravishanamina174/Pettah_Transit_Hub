"use client";
import React, { useState } from 'react';
import Navbar from '../../components/Navbar';

export default function BookingPage() {
  const destinations = ["Badulla", "Kandy", "Galle", "Rathnapura", "Kurunegala", "Gampaha"];
  
  // Initial seat map state (0: Avail, 1: Booked, 2: Selected)
  const [seatsData, setSeatsData] = useState([
    [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], 
    [1, 1, 0, 0, 1], [0, 0, 0, 0, 0], 
    [1, 1, 0, 0, 0], [0, 0, 1, 1, 0], 
    [0, 0, 0, 0, 0], [0, 0, 0, 2, 2]
  ]);

  const toggleSeat = (rowIdx: number, colIdx: number) => {
    const newSeats = [...seatsData];
    const currentState = newSeats[rowIdx][colIdx];
    
    if (currentState === 0) newSeats[rowIdx][colIdx] = 2; // Select
    else if (currentState === 2) newSeats[rowIdx][colIdx] = 0; // Deselect
    setSeatsData(newSeats);
  };

  return (
    <main style={{ background: '#F9F9F9', minHeight: '100vh', paddingBottom: '60px' }}>
      <div style={{ padding: '0.5rem' }}>
        <Navbar />
      </div>

      <div style={{ textAlign: 'center', marginTop: '35px', marginBottom: '35px' }}>
        <h1 style={{ fontSize: '2.4rem', fontWeight: '800', margin: '0 0 8px 0' }}>Book Your Journey</h1>
        <p style={{ color: '#666', fontSize: '0.95rem' }}>Find and reserve your seat in minutes.</p>
      </div>

      <div style={{ 
        maxWidth: '1100px', 
        margin: '0 auto', 
        display: 'grid', 
        gridTemplateColumns: '1.2fr 0.8fr', 
        gap: '20px',
        padding: '0 20px',
        alignItems: 'start' 
      }}>
        
        {/* Left Side: Search & Results */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={cardStyle}>
            <h3 style={titleStyle}>Search Routes</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '15px' }}>
              <InputGroup label="FROM" value="Pettah" readOnly bg="#FDF7E7" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={labelStyle}>TO</label>
                <select style={inputStyle}>
                  {destinations.map(city => <option key={city} value={city}>{city}</option>)}
                </select>
              </div>
              <InputGroup label="DATE" value="2026-04-21" type="date" />
              <InputGroup label="PASSENGERS" value="2" type="number" />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '15px' }}>
              <button 
                style={yellowBtnStyle}
                onMouseOver={(e) => e.currentTarget.style.background = '#d9ae36'}
                onMouseOut={(e) => e.currentTarget.style.background = '#EBBF41'}
              >
                Search Buses →
              </button>
            </div>
          </div>

          <div>
            <h3 style={{ ...titleStyle, marginBottom: '12px' }}>Available Buses</h3>
            <BusRow route="Colombo to Badulla" time="8:30 AM" type="AC Luxury" price="LKR 1505" seats="39" available />
            <BusRow route="Colombo to Badulla" time="9:00 AM" type="Normal" price="LKR 765" seats="0" />
          </div>
        </div>

        {/* Right Side: Seat Selection */}
        <div style={{ ...cardStyle, padding: '20px' }}>
          <h3 style={titleStyle}>Choose Seat</h3>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', margin: '15px 0' }}>
            <Legend dot="#fff" border="#ccc" text="Available" />
            <Legend dot="#72B15E" text="Selected" />
            <Legend dot="#D32F2F" text="Booked" />
          </div>

          <div style={busMapFrameStyle}>
            <div style={{ position: 'absolute', top: '12px', left: '15px', width: '18px', height: '25px', border: '1px solid #ccc' }} />
            <div style={{ position: 'absolute', top: '12px', right: '15px', width: '50px', height: '20px', background: '#666', borderRadius: '3px' }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {seatsData.map((row, rowIdx) => (
                <div key={rowIdx} style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <Seat state={row[0]} onClick={() => toggleSeat(rowIdx, 0)} />
                    <Seat state={row[1]} onClick={() => toggleSeat(rowIdx, 1)} />
                  </div>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <Seat state={row[2]} onClick={() => toggleSeat(rowIdx, 2)} />
                    <Seat state={row[3]} onClick={() => toggleSeat(rowIdx, 3)} />
                    <Seat state={row[4]} onClick={() => toggleSeat(rowIdx, 4)} />
                  </div>
                </div>
              ))}
              <div style={{ display: 'flex', gap: '6px', marginTop: '4px', justifyContent: 'center' }}>
                <Seat state={1} /><Seat state={1} /><Seat state={1} />
                <Seat state={0} /><Seat state={0} /><Seat state={0} />
              </div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid #EEE', marginTop: '20px', paddingTop: '15px' }}>
            <div style={rowBetween}>
              <span style={{ fontSize: '0.85rem', color: '#555' }}>Selected Seats</span>
              <span style={{ background: '#F0F0F0', padding: '4px 12px', borderRadius: '6px', fontSize: '0.8rem', border: '1px solid #CCC' }}>Seat 2</span>
            </div>
            <div style={{ ...rowBetween, marginTop: '15px' }}>
              <span style={{ fontWeight: '500', fontSize: '0.9rem' }}>Total Price</span>
              <span style={{ fontSize: '1.4rem', fontWeight: '800', color: '#D32F2F' }}>LKR 1580.00</span>
            </div>
            
            {/* Centering Wrapper for the Button */}
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
              <button 
                style={yellowBtnStyleFull}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                onMouseDown={(e) => e.currentTarget.style.background = '#d9ae36'}
                onMouseUp={(e) => e.currentTarget.style.background = '#EBBF41'}
              >
                Proceed to payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

/* --- Sub-Components --- */

const Seat = ({ state, onClick }: { state: number, onClick?: () => void }) => {
  const colors = {
    0: { bg: '#fff', border: '#ccc', cursor: 'pointer' },
    1: { bg: '#D32F2F', border: '#D32F2F', cursor: 'not-allowed' },
    2: { bg: '#72B15E', border: '#72B15E', cursor: 'pointer' }
  };
  const current = colors[state as keyof typeof colors];
  
  return (
    <div 
      onClick={onClick}
      style={{ 
        width: '28px', height: '28px', borderRadius: '5px', 
        border: `1px solid ${current.border}`, background: current.bg,
        cursor: current.cursor, transition: 'all 0.2s ease'
      }} 
      onMouseOver={(e) => { if(state !== 1) e.currentTarget.style.opacity = '0.8'; }}
      onMouseOut={(e) => { e.currentTarget.style.opacity = '1'; }}
    />
  );
};

const InputGroup = ({ label, value, type = "text", readOnly = false, bg = "#fff" }: any) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
    <label style={labelStyle}>{label}</label>
    <input type={type} defaultValue={value} readOnly={readOnly} style={{ ...inputStyle, background: bg }} />
  </div>
);

const BusRow = ({ route, time, type, price, seats, available = false }: any) => (
  <div style={busRowStyle}>
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '12px' }}>
      <span style={{ fontSize: '1.3rem' }}>🚌</span>
      <div>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <h4 style={{ margin: 0, fontSize: '0.9rem' }}>{route}</h4>
          <span style={{ fontSize: '0.55rem', padding: '2px 5px', borderRadius: '3px', background: available ? '#E8F5E9' : '#FFEBEE', color: available ? '#2E7D32' : '#C62828', fontWeight: '700' }}>
            {available ? 'AVAILABLE' : 'FULL'}
          </span>
        </div>
        <p style={{ margin: '2px 0 0 0', fontSize: '0.75rem', color: '#777' }}>{time} | {type}</p>
      </div>
    </div>
    <div style={{ width: '120px', borderLeft: '1px dashed #DDD', paddingLeft: '12px', textAlign: 'center' }}>
      <div style={{ fontWeight: '800', fontSize: '0.9rem' }}>{price}</div>
      <div style={{ fontSize: '0.65rem', color: '#888' }}>{seats} left</div>
      <button 
        style={available ? selectBtnStyle : { ...selectBtnStyle, opacity: 0.4, cursor: 'not-allowed' }}
        onMouseOver={(e) => { if(available) e.currentTarget.style.background = '#f0f0f0'; }}
        onMouseOut={(e) => { e.currentTarget.style.background = 'none'; }}
      >
        {available ? 'Select Bus' : 'sold out'}
      </button>
    </div>
  </div>
);

const Legend = ({ dot, text, border = 'transparent' }: any) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
    <div style={{ width: '14px', height: '14px', borderRadius: '3px', background: dot, border: `1px solid ${border}` }} />
    <span style={{ fontSize: '0.75rem', color: '#666' }}>{text}</span>
  </div>
);

/* --- Styles --- */

const cardStyle: React.CSSProperties = { background: '#FFF', padding: '20px', borderRadius: '18px', border: '1px solid #EAEAEA' };
const titleStyle: React.CSSProperties = { fontSize: '1rem', fontWeight: '800', margin: 0 };
const labelStyle: React.CSSProperties = { fontSize: '0.65rem', fontWeight: '700', color: '#888' };
const inputStyle: React.CSSProperties = { width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #DDD', fontSize: '0.85rem', outline: 'none' };
const yellowBtnStyle: React.CSSProperties = { background: '#EBBF41', border: 'none', padding: '10px 20px', borderRadius: '50px', fontWeight: '700', fontSize: '0.85rem', cursor: 'pointer', transition: 'background 0.2s' };

// Updated this to work with the centering wrapper
const yellowBtnStyleFull: React.CSSProperties = { 
  background: '#EBBF41', 
  border: 'none', 
  borderRadius: '50px', 
  fontWeight: '700', 
  cursor: 'pointer', 
  width: '67%', // Adjusted for better balance in the center
  marginTop: '20px', 
  padding: '10px', 
  fontSize: '0.95rem', 
  transition: 'all 0.2s' 
};

const selectBtnStyle: React.CSSProperties = { width: '100%', border: '1px solid #000', background: 'none', borderRadius: '20px', fontSize: '0.65rem', padding: '3px 0', cursor: 'pointer', marginTop: '4px', transition: 'background 0.2s' };
const busRowStyle: React.CSSProperties = { background: '#FFF', padding: '12px', borderRadius: '12px', border: '1px solid #EEE', display: 'flex', alignItems: 'center', marginBottom: '10px' };
const busMapFrameStyle: React.CSSProperties = { border: '1px solid #AAA', borderRadius: '12px', padding: '40px 20px 20px 20px', maxWidth: '260px', margin: '0 auto', position: 'relative' };
const rowBetween: React.CSSProperties = { display: 'flex', justifyContent:'space-evenly', alignItems: 'center' };