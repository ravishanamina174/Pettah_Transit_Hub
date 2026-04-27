"use client";
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

// --- Configuration & Data ---
const DESTINATIONS = {
  "Badulla": 1100, "Kandy": 890, "Galle": 700, "Matara": 800,
  "Kurunegala": 750, "Gampaha": 350, "Negombo": 500,
  "Anuradhapura": 1000, "Rathnapura": 300
};

export default function BusBookingPage() {
  // State Management
  const [selectedDestination, setSelectedDestination] = useState("Badulla");
  const [passengers, setPassengers] = useState(1);
  const [searchTriggered, setSearchTriggered] = useState(false);
  const [availableBuses, setAvailableBuses] = useState<any[]>([]);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentStep, setPaymentStep] = useState('form'); // 'form' or 'success'

  // Seat state: 0=Avail, 1=Booked, 2=Selected
  const [seatsData, setSeatsData] = useState<number[][]>([]);

  // Initialize random seats on mount or search
  const initSeats = () => {
    const rows = 8;
    const cols = 5;
    const newMap = Array.from({ length: rows }, () => 
      Array.from({ length: cols }, () => (Math.random() > 0.8 ? 1 : 0))
    );
    setSeatsData(newMap);
  };

  useEffect(() => { initSeats(); }, []);

  const handleSearch = () => {
    setSearchTriggered(true);
    // Generate 3 dummy buses
    const buses = [
      { id: 1, time: "08:30 AM", type: "AC Luxury", avail: true },
      { id: 2, time: "11:00 AM", type: "Normal", avail: Math.random() > 0.3 },
      { id: 3, time: "04:45 PM", type: "AC Luxury", avail: true },
    ];
    setAvailableBuses(buses);
  };

  const toggleSeat = (rowIdx: number, colIdx: number) => {
    const newSeats = [...seatsData];
    const currentState = newSeats[rowIdx][colIdx];
    if (currentState === 0) newSeats[rowIdx][colIdx] = 2;
    else if (currentState === 2) newSeats[rowIdx][colIdx] = 0;
    setSeatsData(newSeats);
  };

  // Calculations
  const selectedSeatsCount = seatsData.flat().filter(s => s === 2).length;
  const unitPrice = DESTINATIONS[selectedDestination as keyof typeof DESTINATIONS];
  const totalPrice = selectedSeatsCount * unitPrice;

  return (
    
    <main style={{ background: '#F9F9F9', minHeight: '100vh', paddingBottom: '60px', fontFamily: 'sans-serif' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', padding: '40px 20px' }}>
        <h1 style={{ fontSize: '2.4rem', fontWeight: '800', margin: '0 0 8px 0', color: '#1a1a1a' }}>Book Your Journey</h1>
        <p style={{ color: '#666' }}>Secure your seat to {selectedDestination} in just a few clicks.</p>
      </div>

      <div style={containerStyle}>
        
        {/* Left Column: Search & Results */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={cardStyle}>
            <h3 style={titleStyle}>Search Routes</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '15px' }}>
              <InputGroup label="FROM" value="Colombo" readOnly bg="#FDF7E7" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={labelStyle}>TO</label>
                <select 
                  style={inputStyle} 
                  value={selectedDestination} 
                  onChange={(e) => setSelectedDestination(e.target.value)}
                >
                  {Object.keys(DESTINATIONS).map(city => <option key={city} value={city}>{city}</option>)}
                </select>
              </div>
              <InputGroup label="DATE" type="date" defaultValue="2026-04-21" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={labelStyle}>PASSENGERS</label>
                <input 
                  type="number" 
                  style={inputStyle} 
                  value={passengers} 
                  onChange={(e) => setPassengers(parseInt(e.target.value))} 
                />
              </div>
            </div>
            <button onClick={handleSearch} style={{...yellowBtnStyle, width: '100%', marginTop: '15px'}}>
              Search Buses →
            </button>
          </div>

          <div>
            <h3 style={{ ...titleStyle, marginBottom: '12px' }}>Available Buses</h3>
            {!searchTriggered ? (
              <p style={{fontSize: '0.8rem', color: '#999'}}>Select your criteria and click search.</p>
            ) : (
              availableBuses.map(bus => (
                <BusRow 
                  key={bus.id}
                  route={`Colombo to ${selectedDestination}`} 
                  time={bus.time} 
                  type={bus.type} 
                  price={`Rs. ${unitPrice}`} 
                  available={bus.avail}
                />
              ))
            )}
          </div>
        </div>

        {/* Right Column: Seat Selection */}
        <div style={cardStyle}>
          <h3 style={titleStyle}>Choose Seat</h3>
          <div style={legendContainer}>
            <Legend dot="#fff" border="#ccc" text="Avail" />
            <Legend dot="#72B15E" text="Selected" />
            <Legend dot="#D32F2F" text="Booked" />
          </div>

          <div style={busMapFrameStyle}>
            <div style={steeringWheel} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {seatsData.map((row, rIdx) => (
                <div key={rIdx} style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <Seat state={row[0]} onClick={() => toggleSeat(rIdx, 0)} />
                    <Seat state={row[1]} onClick={() => toggleSeat(rIdx, 1)} />
                  </div>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <Seat state={row[2]} onClick={() => toggleSeat(rIdx, 2)} />
                    <Seat state={row[3]} onClick={() => toggleSeat(rIdx, 3)} />
                    <Seat state={row[4]} onClick={() => toggleSeat(rIdx, 4)} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={checkoutSummaryStyle}>
            <div style={rowBetween}>
              <span style={{ color: '#666' }}>Selected Count</span>
              <span style={badgeStyle}>{selectedSeatsCount} Seats</span>
            </div>
            <div style={{ ...rowBetween, marginTop: '12px' }}>
              <span style={{ fontWeight: '600' }}>Total Amount</span>
              <span style={priceLargeStyle}>Rs. {totalPrice.toLocaleString()}</span>
            </div>
            <button 
              disabled={selectedSeatsCount === 0}
              onClick={() => setShowPayment(true)}
              style={{...yellowBtnStyle, width: '100%', marginTop: '20px', opacity: selectedSeatsCount === 0 ? 0.5 : 1}}
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>

      {/* Payment Modal Overlay */}
      {showPayment && (
        <div style={modalOverlay}>
          {paymentStep === 'form' ? (
            <div style={stripeCardStyle}>
              <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '20px'}}>
                <h2 style={{margin: 0}}>Pay with card</h2>
                <button onClick={() => setShowPayment(false)} style={{border: 'none', background: 'none', cursor: 'pointer'}}>✕</button>
              </div>
              <p style={{fontSize: '0.9rem', color: '#666', marginBottom: '20px'}}>Pay Rs. {totalPrice} to National Bus Lines</p>
              
              <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
                <div style={stripeInputBox}>
                   <label style={stripeLabel}>Card Number</label>
                   <input type="text" placeholder="1234 5678 9123 0000" style={stripeInput} />
                </div>
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px'}}>
                  <div style={stripeInputBox}>
                    <label style={stripeLabel}>Expiry</label>
                    <input type="text" placeholder="MM / YY" style={stripeInput} />
                  </div>
                  <div style={stripeInputBox}>
                    <label style={stripeLabel}>CVC</label>
                    <input type="text" placeholder="123" style={stripeInput} />
                  </div>
                </div>
                <button onClick={() => setPaymentStep('success')} style={stripeButton}>Pay Now</button>
              </div>
            </div>
          ) : (
            <div style={successPopupStyle}>
              <div style={successIcon}>✓</div>
              <h2 style={{margin: '10px 0'}}>Payment Successful!</h2>
              <p>Your seats are reserved. Redirecting to home...</p>
              <button 
                onClick={() => {setShowPayment(false); setPaymentStep('form');}} 
                style={{...stripeButton, background: '#2E7D32', marginTop: '20px'}}
              >
                Done
              </button>
            </div>
          )}
        </div>
      )}
    </main>
  );
}

/* --- Sub-Components --- */

const Seat = ({ state, onClick }: any) => {
  const colors = {
    0: { bg: '#fff', border: '#ccc', cursor: 'pointer' },
    1: { bg: '#D32F2F', border: '#D32F2F', cursor: 'not-allowed' },
    2: { bg: '#72B15E', border: '#72B15E', cursor: 'pointer' }
  };
  const current = colors[state as keyof typeof colors];
  return (
    <div 
      onClick={state !== 1 ? onClick : undefined}
      style={{ 
        width: '30px', height: '30px', borderRadius: '6px', 
        border: `1px solid ${current.border}`, background: current.bg,
        cursor: current.cursor, transition: 'all 0.1s'
      }} 
    />
  );
};

const BusRow = ({ route, time, type, price, available }: any) => (
  <div style={busRowStyle}>
    <div style={{ flex: 1 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <h4 style={{ margin: 0, fontSize: '0.9rem' }}>{route}</h4>
        <span style={{ 
          fontSize: '0.6rem', padding: '2px 6px', borderRadius: '4px', 
          background: available ? '#E8F5E9' : '#FFEBEE', 
          color: available ? '#2E7D32' : '#C62828', fontWeight: 'bold' 
        }}>
          {available ? 'AVAILABLE' : 'FULL'}
        </span>
      </div>
      <p style={{ margin: '4px 0 0 0', fontSize: '0.75rem', color: '#777' }}>{time} • {type}</p>
    </div>
    <div style={{ textAlign: 'right', borderLeft: '1px solid #eee', paddingLeft: '15px' }}>
      <div style={{ fontWeight: '800', fontSize: '0.9rem' }}>{price}</div>
      <button disabled={!available} style={{...selectBtnStyle, opacity: available ? 1 : 0.4}}>
        {available ? 'Select' : 'Sold Out'}
      </button>
    </div>
  </div>
);

const Legend = ({ dot, text, border = 'transparent' }: any) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
    <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: dot, border: `1px solid ${border}` }} />
    <span style={{ fontSize: '0.7rem', color: '#666' }}>{text}</span>
  </div>
);

const InputGroup = ({ label, value, defaultValue, type = "text", readOnly = false, bg = "#fff" }: any) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
    <label style={labelStyle}>{label}</label>
    <input type={type} value={value} defaultValue={defaultValue} readOnly={readOnly} style={{ ...inputStyle, background: bg }} />
  </div>
);

/* --- Styles --- */

const containerStyle: React.CSSProperties = {
  maxWidth: '1100px', margin: '0 auto', display: 'grid', 
  gridTemplateColumns: '1.2fr 0.8fr', gap: '25px', padding: '0 20px'
};

const cardStyle: React.CSSProperties = { 
  background: '#FFF', padding: '24px', borderRadius: '16px', 
  boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #EAEAEA' 
};

const titleStyle: React.CSSProperties = { fontSize: '1.1rem', fontWeight: '800', margin: 0, color: '#333' };
const labelStyle: React.CSSProperties = { fontSize: '0.65rem', fontWeight: '700', color: '#999', letterSpacing: '0.5px' };
const inputStyle: React.CSSProperties = { width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #EEE', fontSize: '0.9rem', outline: 'none' };
const yellowBtnStyle: React.CSSProperties = { background: '#E0B277', border: 'none', padding: '14px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', transition: '0.2s' };

const busRowStyle: React.CSSProperties = { 
  background: '#FFF', padding: '15px', borderRadius: '12px', border: '1px solid #EEE', 
  display: 'flex', alignItems: 'center', marginBottom: '10px', transition: '0.2s' 
};

const selectBtnStyle: React.CSSProperties = { 
  border: '1px solid #333', background: 'none', borderRadius: '6px', 
  fontSize: '0.7rem', padding: '4px 12px', cursor: 'pointer', marginTop: '5px' 
};

const busMapFrameStyle: React.CSSProperties = { 
  border: '2px solid #ddd', borderRadius: '20px 20px 10px 10px', 
  padding: '60px 20px 20px', maxWidth: '240px', margin: '20px auto', position: 'relative', background: '#fff' 
};

const steeringWheel: React.CSSProperties = { 
  position: 'absolute', top: '15px', right: '20px', width: '32px', 
  height: '30px', borderRadius: '35%', border: '4px double #555' 
};

const legendContainer: React.CSSProperties = { display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '15px' };
const rowBetween: React.CSSProperties = { display: 'flex', justifyContent: 'space-between', alignItems: 'center' };
const checkoutSummaryStyle: React.CSSProperties = { borderTop: '1px solid #eee', marginTop: '20px', paddingTop: '20px' };
const badgeStyle: React.CSSProperties = { background: '#f0f0f0', padding: '4px 10px', borderRadius: '6px', fontSize: '0.8rem' };
const priceLargeStyle: React.CSSProperties = { fontSize: '1.5rem', fontWeight: '800', color: '#D32F2F' };

// Payment Styles
const modalOverlay: React.CSSProperties = {
  position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
  background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
};

const stripeCardStyle: React.CSSProperties = {
  background: 'white', padding: '30px', borderRadius: '12px', width: '100%', maxWidth: '400px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
};

const stripeInputBox: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: '5px' };
const stripeLabel: React.CSSProperties = { fontSize: '0.8rem', fontWeight: '600', color: '#444' };
const stripeInput: React.CSSProperties = { padding: '12px', border: '1px solid #e0e0e0', borderRadius: '4px', fontSize: '1rem' };
const stripeButton: React.CSSProperties = { background: '#635bff', color: 'white', border: 'none', padding: '12px', borderRadius: '4px', fontWeight: '600', cursor: 'pointer', fontSize: '1rem' };

const successPopupStyle: React.CSSProperties = {
  background: 'white', padding: '40px', borderRadius: '20px', textAlign: 'center', width: '320px'
};

const successIcon: React.CSSProperties = {
  width: '60px', height: '60px', background: '#4BB543', color: 'white', borderRadius: '50%',
  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '30px', margin: '0 auto'
};