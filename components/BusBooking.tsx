"use client";
import React, { useState, useEffect, useMemo } from 'react';
import Navbar from '../components/Navbar';

// --- Configuration & Data ---
const DESTINATIONS = {
  "Badulla": 1100, "Kandy": 890, "Galle": 700, "Matara": 800,
  "Kurunegala": 750, "Gampaha": 350, "Negombo": 500,
  "Anuradhapura": 1000, "Rathnapura": 300
};

// --- Palette (only these five are used, at full opacity or as tints) ---
const C = {
  white: '#FFFFFF',
  sage: '#8B9A6E',
  cream: '#F7F2EB',
  coral: '#D96868',
  ink: '#262626',
};

const PROCESSING_STAGES = ['Verifying card', 'Contacting bank', 'Confirming seats', 'Issuing ticket'];
const SEAT_LETTERS = ['A', 'B', 'C', 'D', 'E'];

type Ticket = {
  id: string;
  route: string;
  date: string;
  time: string;
  busType: string;
  seats: string[];
  passengers: number;
  total: number;
};

const generateTicketId = () => {
  const a = Date.now().toString(36).toUpperCase().slice(-4);
  const b = Math.random().toString(36).toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 4);
  return `NBL-${a}-${b}`;
};

export default function BusBookingPage() {
  // State Management
  const [selectedDestination, setSelectedDestination] = useState("Badulla");
  const [passengers, setPassengers] = useState(1);
  const [searchTriggered, setSearchTriggered] = useState(false);
  const [availableBuses, setAvailableBuses] = useState<any[]>([]);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'form' | 'processing' | 'success'>('form');
  const [travelDate, setTravelDate] = useState('2026-04-21');
  const [selectedBusId, setSelectedBusId] = useState<number | null>(null);

  // Seat state: 0=Avail, 1=Booked, 2=Selected
  const [seatsData, setSeatsData] = useState<number[][]>([]);

  // Ticket flow
  const [processingStage, setProcessingStage] = useState(0);
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [showTicket, setShowTicket] = useState(false);
  const [copied, setCopied] = useState(false);

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
    setSelectedBusId(null);
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

  // Purely presentational — derived from existing state, no new business logic
  const currentStep: 1 | 2 | 3 = showPayment ? 3 : searchTriggered ? 2 : 1;

  // --- Payment processing animation: steps through PROCESSING_STAGES, then finalizes the ticket ---
  useEffect(() => {
    if (paymentStep !== 'processing') return;
    setProcessingStage(0);
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      if (i >= PROCESSING_STAGES.length) {
        clearInterval(id);
        finalizePurchase();
        setPaymentStep('success');
      } else {
        setProcessingStage(i);
      }
    }, 620);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentStep]);

  const finalizePurchase = () => {
    const seatLabels: string[] = [];
    seatsData.forEach((row, rIdx) => {
      row.forEach((s, cIdx) => {
        if (s === 2) seatLabels.push(`${rIdx + 1}${SEAT_LETTERS[cIdx]}`);
      });
    });
    const bus = availableBuses.find(b => b.id === selectedBusId) || availableBuses[0];
    const newTicket: Ticket = {
      id: generateTicketId(),
      route: `Colombo → ${selectedDestination}`,
      date: travelDate,
      time: bus?.time || 'Next available',
      busType: bus?.type || 'Standard',
      seats: seatLabels,
      passengers,
      total: totalPrice,
    };
    setTicket(newTicket);
    // Seats the rider just paid for become permanently booked
    setSeatsData(prev => prev.map(row => row.map(s => (s === 2 ? 1 : s))));
  };

  const closeDrawer = () => {
    setShowPayment(false);
    setPaymentStep('form');
  };

  const handleDone = () => {
    setShowPayment(false);
    setPaymentStep('form');
    setShowTicket(true);
  };

  const handleCopyId = () => {
    if (!ticket) return;
    navigator.clipboard?.writeText(ticket.id).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <main className="booking-main bb-main" style={mainStyle}>
      <style>{`
        .bb-input:focus, .bb-select:focus { outline: none; border-color: ${C.ink} !important; box-shadow: 0 0 0 3px rgba(38,38,38,0.08); }
        .bb-btn-primary:hover:not(:disabled) { filter: brightness(0.93); }
        .bb-bus-card:hover { border-color: rgba(38,38,38,0.22) !important; }
        .bb-seat:not(.bb-seat-booked):hover { transform: scale(1.08); }
        .bb-drawer-close:hover { background: rgba(38,38,38,0.1) !important; }
        .bb-copy:hover { filter: brightness(0.95); }
        .bb-ticket-link:hover { text-decoration: underline; }
        @keyframes bb-slide-in { from { transform: translateX(100%); } to { transform: translateX(0); } }
        @keyframes bb-fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes bb-pop-in { from { opacity: 0; transform: scale(0.92) translateY(6px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        @keyframes bb-spin { to { transform: rotate(360deg); } }
        @keyframes bb-check-pop { 0% { transform: scale(0.4); opacity: 0; } 60% { transform: scale(1.12); opacity: 1; } 100% { transform: scale(1); } }

        /* ---- Mobile responsive overrides (desktop layout/logic untouched above this width) ---- */
        @media (max-width: 860px) {
          .bb-shell { grid-template-columns: 1fr !important; max-width: 94% !important; }
          .bb-rail { border-right: none !important; border-bottom: 1px solid rgba(38,38,38,0.08) !important; }
          .bb-workspace { grid-template-columns: 1fr !important; gap: 26px !important; }
        }
        @media (max-width: 600px) {
          .bb-main { padding: 20px 12px !important; }
          .bb-shell { max-width: 100% !important; border-radius: 8px !important; }
          .bb-mainpanel { padding: 18px 14px 26px !important; }
          .bb-rail { padding: 20px 16px !important; }
          .bb-searchbar { flex-direction: column !important; align-items: stretch !important; padding: 12px !important; }
          .bb-searchfield { width: 100% !important; padding: 8px 4px !important; }
          .bb-searchdivider { display: none !important; }
          .bb-searchbtn { margin-left: 0 !important; width: 100% !important; margin-top: 4px !important; }
          .bb-seatcard { padding: 14px 12px !important; }
          .bb-miniticket { flex-direction: column !important; align-items: flex-start !important; gap: 10px !important; }
          .bb-drawer { width: 100% !important; max-width: 100% !important; border-radius: 0 !important; }
          .bb-ticket-modal { max-width: 92vw !important; }
        }
      `}</style>

      <div className="bb-shell" style={shellStyle}>
        {/* ---- Left rail: identity + step progress + running total ---- */}
        <aside className="bb-rail" style={railStyle}>
          <div>
            <div style={brandRow}>
              <p style={railBrand}>Bus Lines</p>
            </div>
            <h1 style={railTitle}>Colombo<br />→ {selectedDestination}</h1>
          </div>

          <ol style={stepListStyle}>
            <StepItem icon="route" color={C.sage} label="Route" active={currentStep === 1} done={currentStep > 1} />
            <StepItem icon="seat" color={C.coral} label="Seats" active={currentStep === 2} done={currentStep > 2} />
            <StepItem icon="card" color={C.ink} label="Payment" active={currentStep === 3} done={false} />
          </ol>

          <div style={railTotalBox}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <WalletIcon />
              <span style={{ fontSize: '0.78rem', color: 'rgba(38,38,38,0.55)' }}>Total</span>
            </div>
            <div style={railTotalPrice}>Rs. {totalPrice.toLocaleString()}</div>
            <div style={{ fontSize: '0.78rem', color: 'rgba(38,38,38,0.55)', marginTop: '4px' }}>
              {selectedSeatsCount} {selectedSeatsCount === 1 ? 'seat' : 'seats'} · {passengers} {passengers === 1 ? 'passenger' : 'passengers'}
            </div>
          </div>
        </aside>

        {/* ---- Main panel ---- */}
        <section className="bb-mainpanel" style={mainPanelStyle}>

          {/* Route search bar — always visible, compact */}
          <div className="bb-searchbar" style={searchBarStyle}>
            <div className="bb-searchfield" style={searchField}>
              <span style={searchFieldLabel}>From</span>
              <span style={searchFieldValue}>Colombo</span>
            </div>
            <div className="bb-searchdivider" style={searchDivider} />
            <div className="bb-searchfield" style={searchField}>
              <span style={searchFieldLabel}>To</span>
              <select
                className="bb-select"
                value={selectedDestination}
                onChange={(e) => setSelectedDestination(e.target.value)}
                style={searchFieldSelect}
              >
                {Object.keys(DESTINATIONS).map(city => <option key={city} value={city}>{city}</option>)}
              </select>
            </div>
            <div className="bb-searchdivider" style={searchDivider} />
            <div className="bb-searchfield" style={searchField}>
              <span style={searchFieldLabel}>Date</span>
              <input
                type="date"
                value={travelDate}
                onChange={(e) => setTravelDate(e.target.value)}
                className="bb-input"
                style={searchFieldInput}
              />
            </div>
            <div className="bb-searchdivider" style={searchDivider} />
            <div className="bb-searchfield" style={searchField}>
              <span style={searchFieldLabel}>Passengers</span>
              <input
                type="number"
                min={1}
                value={passengers}
                onChange={(e) => {
                  const n = parseInt(e.target.value, 10);
                  setPassengers(Number.isNaN(n) || n < 1 ? 1 : n);
                }}
                className="bb-input"
                style={{ ...searchFieldInput, width: '48px' }}
              />
            </div>
            <button className="bb-btn-primary bb-searchbtn" onClick={handleSearch} style={searchBtnStyle}>Search</button>
          </div>

          {/* Step 1/2 content: bus list + seat map side by side once searched */}
          {!searchTriggered ? (
            <div style={emptyPanelStyle}>
              <p style={{ fontSize: '0.95rem', color: 'rgba(38,38,38,0.55)', margin: 0 }}>Choose a destination and search to see today&rsquo;s buses.</p>
            </div>
          ) : (
            <div className="bb-workspace" style={workspaceGrid}>
              {/* Bus list as a vertical timeline */}
              <div>
                <h3 style={panelHeading}>Departures</h3>
                <div style={timelineStyle}>
                  {availableBuses.map((bus, i) => (
                    <TimelineBus
                      key={bus.id}
                      first={i === 0}
                      time={bus.time}
                      type={bus.type}
                      price={`Rs. ${unitPrice}`}
                      available={bus.avail}
                      selected={selectedBusId === bus.id}
                      onSelect={() => bus.avail && setSelectedBusId(bus.id)}
                    />
                  ))}
                </div>
              </div>

              {/* Seat map: airline-row style */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h3 style={panelHeading}>Seat map</h3>
                  <div style={{ display: 'flex', gap: '14px' }}>
                    <Legend swatch={C.white} border="rgba(38,38,38,0.3)" text="Open" />
                    <Legend swatch={C.coral} border={C.coral} text="Yours" />
                    <Legend swatch={C.cream} border="rgba(38,38,38,0.2)" text="Taken" />
                  </div>
                </div>

                <div className="bb-seatcard" style={seatCardStyle}>
                  <div style={cockpitRow}>
                    <span style={{ fontSize: '0.7rem', color: 'rgba(38,38,38,0.5)' }}>Front of bus</span>
                    <div style={wheelIcon} />
                  </div>
                  {seatsData.map((row, rIdx) => (
                    <div key={rIdx} style={seatRowStyle}>
                      <span style={rowNumberStyle}>{rIdx + 1}</span>
                      <div style={{ display: 'flex', gap: '7px' }}>
                        <SeatDot state={row[0]} onClick={() => toggleSeat(rIdx, 0)} />
                        <SeatDot state={row[1]} onClick={() => toggleSeat(rIdx, 1)} />
                      </div>
                      <div style={aisleGap} />
                      <div style={{ display: 'flex', gap: '7px' }}>
                        <SeatDot state={row[2]} onClick={() => toggleSeat(rIdx, 2)} />
                        <SeatDot state={row[3]} onClick={() => toggleSeat(rIdx, 3)} />
                        <SeatDot state={row[4]} onClick={() => toggleSeat(rIdx, 4)} />
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  className="bb-btn-primary"
                  disabled={selectedSeatsCount === 0}
                  onClick={() => setShowPayment(true)}
                  style={{ ...primaryBtnStyle, width: '100%', marginTop: '18px', opacity: selectedSeatsCount === 0 ? 0.35 : 1, cursor: selectedSeatsCount === 0 ? 'not-allowed' : 'pointer' }}
                >
                  Continue to payment · Rs. {totalPrice.toLocaleString()}
                </button>
              </div>
            </div>
          )}

          {/* ---- Last ticket: persists after the popup is closed ---- */}
          {ticket && (
            <div style={lastTicketWrap}>
              <h3 style={panelHeading}>Last ticket</h3>
              <MiniTicket ticket={ticket} onView={() => setShowTicket(true)} />
            </div>
          )}
        </section>
      </div>

      {/* ---- Payment: slide-in drawer, not a centered modal ---- */}
      {showPayment && (
        <>
          <div style={drawerScrim} onClick={() => paymentStep === 'form' && closeDrawer()} />
          <div className="bb-drawer" style={drawerStyle}>
            {paymentStep === 'form' && (
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={drawerHeader}>
                  <div>
                    <h2 style={drawerTitle}>Payment details</h2>
                    <p style={{ margin: '4px 0 0', fontSize: '0.82rem', color: 'rgba(38,38,38,0.55)' }}>Rs. {totalPrice.toLocaleString()} to National Bus Lines</p>
                  </div>
                  <button className="bb-drawer-close" onClick={closeDrawer} style={drawerCloseBtn} aria-label="Close">✕</button>
                </div>

                <div style={{ padding: '22px', display: 'flex', flexDirection: 'column', gap: '14px', flex: 1 }}>
                  <FieldBox label="Name*" placeholder="Name on card" />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <FieldBox label="Card number*" placeholder="Number on card" />
                    <FieldBox label="CVV*" placeholder="CVV" />
                  </div>
                  <FieldBox label="Date*" placeholder="DD/MM/YYYY" />
                </div>

                <div style={{ padding: '16px 22px 22px' }}>
                  <button className="bb-btn-primary" onClick={() => setPaymentStep('processing')} style={{ ...primaryBtnStyle, width: '100%' }}>
                    Request booking
                  </button>
                </div>
              </div>
            )}

            {paymentStep === 'processing' && (
              <div style={processingWrap}>
                <div style={spinnerOuter}>
                  <div style={spinnerRing} />
                  <div style={spinnerCore}>
                    <BusIcon />
                  </div>
                </div>
                <p style={{ margin: '22px 0 4px', fontSize: '0.98rem', fontWeight: 700, color: C.ink }}>
                  {PROCESSING_STAGES[processingStage]}…
                </p>
                <p style={{ margin: 0, fontSize: '0.78rem', color: 'rgba(38,38,38,0.5)' }}>Don&rsquo;t close this window</p>

                <div style={progressTrack}>
                  <div style={{ ...progressFill, width: `${((processingStage + 1) / PROCESSING_STAGES.length) * 100}%` }} />
                </div>

                <div style={stageListWrap}>
                  {PROCESSING_STAGES.map((s, i) => (
                    <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: i <= processingStage ? 1 : 0.35 }}>
                      <span style={{
                        width: '14px', height: '14px', borderRadius: '50%', flexShrink: 0,
                        background: i < processingStage ? C.sage : i === processingStage ? C.coral : 'transparent',
                        border: i >= processingStage ? '1.5px solid rgba(38,38,38,0.25)' : 'none',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                      }}>
                        {i < processingStage && <span style={{ color: C.white, fontSize: '8px', fontWeight: 900 }}>✓</span>}
                      </span>
                      <span style={{ fontSize: '0.78rem', color: C.ink }}>{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {paymentStep === 'success' && (
              <div style={drawerSuccessWrap}>
                <div style={successIcon}>✓</div>
                <h2 style={{ margin: '20px 0 6px', fontSize: '1.25rem', fontWeight: 700, color: C.ink }}>Payment successful</h2>
                <p style={{ color: 'rgba(38,38,38,0.55)', fontSize: '0.9rem', margin: 0 }}>Your seats are confirmed. Grab your ticket below.</p>
                <button
                  className="bb-btn-primary"
                  onClick={handleDone}
                  style={{ ...primaryBtnStyle, width: '100%', marginTop: '24px' }}
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </>
      )}

      {/* ---- Ticket: centered popup, shown after Done ---- */}
      {showTicket && ticket && (
        <div style={ticketOverlay} onClick={() => setShowTicket(false)}>
          <div className="bb-ticket-modal" style={ticketModalStyle} onClick={(e) => e.stopPropagation()}>
            <div style={ticketModalHeader}>
              <span style={{ fontSize: '0.9rem', fontWeight: 700, color: C.ink }}>Your ticket</span>
              <button className="bb-drawer-close" onClick={() => setShowTicket(false)} style={drawerCloseBtn} aria-label="Close">✕</button>
            </div>

            <TicketVisual ticket={ticket} large />

            <div style={{ padding: '0 22px 22px', display: 'flex', gap: '10px' }}>
              <button className="bb-copy" onClick={handleCopyId} style={copyBtnStyle}>
                {copied ? 'Copied ✓' : `Copy ID · ${ticket.id}`}
              </button>
              <button className="bb-btn-primary" onClick={() => setShowTicket(false)} style={{ ...primaryBtnStyle, flex: '0 0 110px' }}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

/* --- Icons (inline SVG, palette colors only) --- */

const BusIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="5" width="20" height="12" rx="4" fill={C.ink} />
    <rect x="5" y="8" width="4" height="3.5" rx="1" fill={C.white} />
    <rect x="10.5" y="8" width="4" height="3.5" rx="1" fill={C.white} />
    <rect x="16" y="8" width="3" height="3.5" rx="1" fill={C.white} />
    <circle cx="7" cy="18" r="2" fill={C.ink} />
    <circle cx="17" cy="18" r="2" fill={C.ink} />
  </svg>
);

const WalletIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="6" width="20" height="14" rx="3" stroke={C.sage} strokeWidth="2" />
    <path d="M2 10h20" stroke={C.sage} strokeWidth="2" />
    <circle cx="17" cy="15" r="1.6" fill={C.sage} />
  </svg>
);

const StepIcon = ({ type, on }: { type: string; on: boolean }) => {
  const col = on ? C.white : 'rgba(38,38,38,0.45)';
  if (type === 'route') {
    return (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
        <path d="M12 2C7.6 2 4 5.6 4 10c0 6 8 12 8 12s8-6 8-12c0-4.4-3.6-8-8-8z" fill={col} />
        <circle cx="12" cy="10" r="3" fill={on ? C.sage : 'transparent'} stroke={on ? C.sage : col} strokeWidth="1" />
      </svg>
    );
  }
  if (type === 'seat') {
    return (
      <svg width="12" height="12" viewBox="0 0 26 26" fill="none">
        <rect x="7" y="2.5" width="12" height="9.5" rx="3.5" fill={col} />
        <rect x="4" y="10.5" width="18" height="12.5" rx="4" fill={col} />
      </svg>
    );
  }
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="5" width="20" height="14" rx="3" fill={col} />
      <rect x="2" y="9" width="20" height="3" fill={on ? C.ink : C.white} opacity={on ? 0.35 : 1} />
    </svg>
  );
};

/* --- Sub-Components --- */

const StepItem = ({ icon, color, label, active, done }: any) => {
  const on = active || done;
  return (
    <li style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 0' }}>
      <span style={{
        width: '22px', height: '22px', borderRadius: '7px', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: on ? color : 'transparent',
        border: on ? 'none' : '1.5px solid rgba(38,38,38,0.2)'
      }}>
        <StepIcon type={icon} on={on} />
      </span>
      <span style={{ fontSize: '0.78rem', fontWeight: active ? 700 : 500, color: active ? C.ink : 'rgba(38,38,38,0.5)' }}>{label}</span>
    </li>
  );
};

const SeatDot = ({ state, onClick }: any) => {
  const map = {
    0: { fill: C.white, stroke: 'rgba(38,38,38,0.3)', cursor: 'pointer', cls: '' },
    1: { fill: C.cream, stroke: 'rgba(38,38,38,0.2)', cursor: 'not-allowed', cls: 'bb-seat-booked' },
    2: { fill: C.ink, stroke: C.ink, cursor: 'pointer', cls: '' }
  };
  const c = map[state as keyof typeof map];
  return (
    <div
      className={`bb-seat ${c.cls}`}
      onClick={state !== 1 ? onClick : undefined}
      style={{ position: 'relative', width: '22px', height: '22px', cursor: c.cursor, transition: 'transform 0.12s' }}
    >
      <svg width="22" height="22" viewBox="0 0 26 26" fill="none">
        <rect x="7" y="2.5" width="12" height="9.5" rx="3" fill={c.fill} stroke={c.stroke} strokeWidth="1.3" />
        <rect x="4" y="10.5" width="18" height="12.5" rx="3.5" fill={c.fill} stroke={c.stroke} strokeWidth="1.3" />
        <rect x="1.5" y="14" width="3" height="7.5" rx="1.2" fill={c.fill} stroke={c.stroke} strokeWidth="1.1" />
        <rect x="21.5" y="14" width="3" height="7.5" rx="1.2" fill={c.fill} stroke={c.stroke} strokeWidth="1.1" />
      </svg>
      {state === 2 && (
        <span style={{
          position: 'absolute', top: '-3px', right: '-3px', width: '10px', height: '10px', borderRadius: '50%',
          background: C.white, color: C.coral, fontSize: '7px', fontWeight: 900,
          display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 0 1.5px ${C.coral}`
        }}>✓</span>
      )}
    </div>
  );
};

const TimelineBus = ({ first, time, type, price, available, selected, onSelect }: any) => (
  <div
    className="bb-bus-card"
    style={{ ...timelineItemStyle, opacity: available ? 1 : 0.6 }}
    onClick={onSelect}
  >
    <div style={timelineDotCol}>
      <div style={{ width: '9px', height: '9px', borderRadius: '50%', background: available ? C.sage : 'rgba(38,38,38,0.25)' }} />
      {!first === false && <div style={{ width: '1px', flex: 1, background: 'rgba(38,38,38,0.12)', marginTop: '4px' }} />}
    </div>
    <div style={{ flex: 1, padding: '2px 0 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span style={{ fontWeight: 700, fontSize: '0.98rem', color: C.ink }}>{time}</span>
        <span style={{ fontWeight: 700, fontSize: '0.9rem', color: C.ink }}>{price}</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
        <span style={{ fontSize: '0.8rem', color: 'rgba(38,38,38,0.55)' }}>{type}</span>
        <span style={{ fontSize: '0.72rem', fontWeight: 700, color: !available ? C.coral : selected ? C.coral : C.sage }}>
          {!available ? 'Sold out' : selected ? 'Selected ✓' : 'Select →'}
        </span>
      </div>
    </div>
  </div>
);

const Legend = ({ swatch, border, text }: any) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
    <div style={{ width: '11px', height: '11px', borderRadius: '3px', background: swatch, border: `1.5px solid ${border}` }} />
    <span style={{ fontSize: '0.74rem', color: 'rgba(38,38,38,0.55)' }}>{text}</span>
  </div>
);

const FieldBox = ({ label, placeholder }: any) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
    <label style={{ fontSize: '0.74rem', fontWeight: 500, color: C.ink }}>{label}</label>
    <input type="text" placeholder={placeholder} className="bb-input" style={fieldInputStyle} />
  </div>
);

/* --- Ticket visuals --- */

const hashSeed = (str: string) => {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h;
};

const TicketQR = ({ seed, size = 72 }: { seed: string; size?: number }) => {
  const h = useMemo(() => hashSeed(seed), [seed]);
  const cells = 6;
  const cellSize = size / cells;
  const isFinder = (r: number, c: number) =>
    (r < 2 && c < 2) || (r < 2 && c > cells - 3) || (r > cells - 3 && c < 2);
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <rect width={size} height={size} fill={C.white} />
      {Array.from({ length: cells }).map((_, r) =>
        Array.from({ length: cells }).map((__, c) => {
          if (isFinder(r, c)) {
            return <rect key={`${r}-${c}`} x={c * cellSize} y={r * cellSize} width={cellSize} height={cellSize} fill={C.ink} />;
          }
          const bit = (h >> ((r * cells + c) % 30)) & 1;
          if (!bit) return null;
          return <rect key={`${r}-${c}`} x={c * cellSize} y={r * cellSize} width={cellSize} height={cellSize} fill={C.ink} />;
        })
      )}
    </svg>
  );
};

const TicketVisual = ({ ticket, large }: { ticket: Ticket; large?: boolean }) => (
  <div style={large ? ticketBodyLarge : ticketBodyCompact}>
    <div style={ticketTopRow}>
      <div>
        <p style={ticketRouteText}>{ticket.route}</p>
        <p style={ticketSubText}>{ticket.date} · {ticket.time} · {ticket.busType}</p>
      </div>
      <BusIcon />
    </div>

    <div style={ticketPerforation}>
      <span style={ticketNotchLeft} />
      <span style={ticketDashLine} />
      <span style={ticketNotchRight} />
    </div>

    <div style={ticketBottomRow}>
      <div style={{ display: 'flex', gap: large ? '22px' : '14px' }}>
        <TicketField label="Seats" value={ticket.seats.length ? ticket.seats.join(', ') : '—'} />
        <TicketField label="Passengers" value={String(ticket.passengers)} />
        <TicketField label="Total" value={`Rs. ${ticket.total.toLocaleString()}`} />
      </div>
      {large && <TicketQR seed={ticket.id} size={64} />}
    </div>

    <div style={ticketIdRow}>
      <span style={{ fontSize: '0.68rem', color: 'rgba(38,38,38,0.5)' }}>Ticket ID</span>
      <span style={ticketIdText}>{ticket.id}</span>
    </div>
  </div>
);

const TicketField = ({ label, value }: any) => (
  <div>
    <div style={{ fontSize: '0.62rem', color: 'rgba(38,38,38,0.5)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</div>
    <div style={{ fontSize: '0.84rem', fontWeight: 700, color: C.ink, marginTop: '2px' }}>{value}</div>
  </div>
);

const MiniTicket = ({ ticket, onView }: { ticket: Ticket; onView: () => void }) => (
  <div className="bb-miniticket" style={miniTicketWrap}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <div style={miniTicketIconWrap}><BusIcon /></div>
      <div>
        <div style={{ fontSize: '0.88rem', fontWeight: 700, color: C.ink }}>{ticket.route}</div>
        <div style={{ fontSize: '0.76rem', color: 'rgba(38,38,38,0.55)' }}>
          {ticket.date} · {ticket.seats.join(', ') || 'Seat pending'} · <span style={{ fontFamily: 'monospace' }}>{ticket.id}</span>
        </div>
      </div>
    </div>
    <button className="bb-ticket-link" onClick={onView} style={miniTicketBtn}>View ticket →</button>
  </div>
);

/* --- Styles --- */

const mainStyle: React.CSSProperties = {
  background: C.white, minHeight: '100vh', padding: '36px 20px',
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Inter', sans-serif", color: C.ink,
  overflowX: 'hidden'
};

const shellStyle: React.CSSProperties = {
  display: 'grid', gridTemplateColumns: '210px 1fr', maxWidth: '80%', margin: '0 auto',
  borderRadius: '10px', overflow: 'hidden', boxShadow: '0 16px 40px rgba(38,38,38,0.08)',
  border: '1px solid rgba(38,38,38,0.08)'
};

const railStyle: React.CSSProperties = {
  background: C.white, color: C.ink, padding: '26px 20px',
  display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
  borderRight: '1px solid rgba(38,38,38,0.08)'
};

const brandRow: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' };
const railBrand: React.CSSProperties = { margin: 0, fontSize: '0.75rem', color: 'rgba(38,38,38,0.55)', letterSpacing: '0.06em' };
const railTitle: React.CSSProperties = { margin: 0, fontSize: '1.15rem', fontWeight: 700, lineHeight: 1.3, color: C.ink };

const stepListStyle: React.CSSProperties = { listStyle: 'none', margin: '28px 0', padding: 0 };

const railTotalBox: React.CSSProperties = {
  borderTop: '1px solid rgba(38,38,38,0.12)', paddingTop: '14px'
};

const railTotalPrice: React.CSSProperties = { fontSize: '1.25rem', fontWeight: 700, marginTop: '3px', color: C.ink };

const mainPanelStyle: React.CSSProperties = { padding: '26px 28px 40px', background: C.white };

const searchBarStyle: React.CSSProperties = {
  display: 'flex', alignItems: 'center', background: C.white, border: '1px solid rgba(38,38,38,0.12)',
  borderRadius: '10px', padding: '7px 7px 7px 14px', gap: '4px', flexWrap: 'wrap'
};

const searchField: React.CSSProperties = { display: 'flex', flexDirection: 'column', padding: '3px 12px', gap: '2px' };
const searchFieldLabel: React.CSSProperties = { fontSize: '0.6rem', color: 'rgba(38,38,38,0.5)', textTransform: 'uppercase', letterSpacing: '0.04em' };
const searchFieldValue: React.CSSProperties = { fontSize: '0.82rem', fontWeight: 600, color: C.ink };
const searchFieldSelect: React.CSSProperties = { border: 'none', outline: 'none', fontSize: '0.82rem', fontWeight: 600, background: 'transparent', color: C.ink, cursor: 'pointer' };
const searchFieldInput: React.CSSProperties = { border: 'none', outline: 'none', fontSize: '0.82rem', fontWeight: 600, background: 'transparent', color: C.ink };
const searchDivider: React.CSSProperties = { width: '1px', height: '24px', background: 'rgba(38,38,38,0.1)' };

const searchBtnStyle: React.CSSProperties = {
  marginLeft: 'auto', background: C.coral, color: C.white, border: 'none', padding: '8px 18px',
  borderRadius: '8px', fontWeight: 600, fontSize: '0.8rem', cursor: 'pointer'
};

const emptyPanelStyle: React.CSSProperties = {
  marginTop: '20px', border: '1px dashed rgba(38,38,38,0.18)', borderRadius: '10px', padding: '32px', textAlign: 'center'
};

const workspaceGrid: React.CSSProperties = {
  display: 'grid', gridTemplateColumns: '0.85fr 1.15fr', gap: '32px', marginTop: '26px'
};

const panelHeading: React.CSSProperties = { fontSize: '0.9rem', fontWeight: 700, margin: '0 0 12px', color: C.ink };

const timelineStyle: React.CSSProperties = { display: 'flex', flexDirection: 'column' };

const timelineItemStyle: React.CSSProperties = { display: 'flex', gap: '12px', cursor: 'pointer' };
const timelineDotCol: React.CSSProperties = { display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '6px' };

const seatCardStyle: React.CSSProperties = {
  background: C.white, border: '1px solid rgba(38,38,38,0.1)', borderRadius: '12px', padding: '16px 20px'
};

const cockpitRow: React.CSSProperties = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', paddingBottom: '10px', borderBottom: '1px dashed rgba(38,38,38,0.15)' };
const wheelIcon: React.CSSProperties = { width: '18px', height: '18px', borderRadius: '35%', border: `3px double rgba(38,38,38,0.25)` };

const seatRowStyle: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: '9px', padding: '3.5px 0' };
const rowNumberStyle: React.CSSProperties = { width: '14px', fontSize: '0.62rem', color: 'rgba(38,38,38,0.4)', textAlign: 'right' };
const aisleGap: React.CSSProperties = { width: '16px' };

const primaryBtnStyle: React.CSSProperties = {
  background: C.ink, color: C.white, border: 'none', padding: '10px',
  borderRadius: '8px', fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer'
};

// Drawer (payment) styles
const drawerScrim: React.CSSProperties = {
  position: 'fixed', inset: 0, background: 'rgba(38,38,38,0.45)', zIndex: 1000,
  animation: 'bb-fade-in 0.15s ease'
};

const drawerStyle: React.CSSProperties = {
  position: 'fixed', top: 0, right: 0, height: '100%', width: '360px', maxWidth: '92vw',
  background: C.white, zIndex: 1001, boxShadow: '-8px 0 40px rgba(38,38,38,0.18)',
  borderRadius: '14px 0 0 14px', animation: 'bb-slide-in 0.22s ease'
};

const drawerHeader: React.CSSProperties = {
  display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
  padding: '22px 22px 16px', borderBottom: '1px solid rgba(38,38,38,0.1)'
};

const drawerTitle: React.CSSProperties = { margin: 0, fontSize: '1.1rem', fontWeight: 700, color: C.ink };

const drawerCloseBtn: React.CSSProperties = {
  border: 'none', background: C.cream, width: '26px', height: '26px', borderRadius: '50%',
  cursor: 'pointer', color: C.ink, fontSize: '0.72rem'
};

const fieldInputStyle: React.CSSProperties = {
  padding: '10px 12px', border: '1.5px solid rgba(38,38,38,0.15)', borderRadius: '8px', fontSize: '0.82rem',
  outline: 'none', fontFamily: 'inherit'
};

const drawerSuccessWrap: React.CSSProperties = {
  height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
  textAlign: 'center', padding: '0 40px'
};

const successIcon: React.CSSProperties = {
  width: '54px', height: '54px', background: C.sage, color: C.white, borderRadius: '50%',
  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px',
  animation: 'bb-check-pop 0.4s cubic-bezier(0.34,1.56,0.64,1)'
};

// Processing animation styles
const processingWrap: React.CSSProperties = {
  height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
  textAlign: 'center', padding: '0 32px'
};

const spinnerOuter: React.CSSProperties = {
  position: 'relative', width: '58px', height: '58px', display: 'flex', alignItems: 'center', justifyContent: 'center'
};

const spinnerRing: React.CSSProperties = {
  position: 'absolute', inset: 0, borderRadius: '50%',
  border: '3px solid rgba(38,38,38,0.1)', borderTopColor: C.coral,
  animation: 'bb-spin 0.85s linear infinite'
};

const spinnerCore: React.CSSProperties = {
  width: '34px', height: '34px', borderRadius: '50%', background: C.cream,
  display: 'flex', alignItems: 'center', justifyContent: 'center'
};

const progressTrack: React.CSSProperties = {
  width: '100%', height: '6px', borderRadius: '4px', background: 'rgba(38,38,38,0.1)',
  marginTop: '22px', overflow: 'hidden'
};

const progressFill: React.CSSProperties = {
  height: '100%', background: C.coral, borderRadius: '4px', transition: 'width 0.4s ease'
};

const stageListWrap: React.CSSProperties = {
  marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '9px', alignSelf: 'stretch'
};

// Ticket popup styles
const ticketOverlay: React.CSSProperties = {
  position: 'fixed', inset: 0, background: 'rgba(38,38,38,0.5)', zIndex: 1100,
  display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px',
  animation: 'bb-fade-in 0.15s ease'
};

const ticketModalStyle: React.CSSProperties = {
  background: C.white, borderRadius: '16px', width: '100%', maxWidth: '380px',
  boxShadow: '0 24px 60px rgba(38,38,38,0.25)', animation: 'bb-pop-in 0.22s cubic-bezier(0.2,0.9,0.3,1.1)'
};

const ticketModalHeader: React.CSSProperties = {
  display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 22px 4px'
};

const copyBtnStyle: React.CSSProperties = {
  flex: 1, background: C.cream, color: C.ink, border: '1px solid rgba(38,38,38,0.12)',
  borderRadius: '8px', fontWeight: 600, fontSize: '0.78rem', cursor: 'pointer', padding: '10px', fontFamily: 'monospace'
};

// Ticket visual (shared between popup + mini card)
const ticketBodyLarge: React.CSSProperties = { padding: '10px 22px 0' };
const ticketBodyCompact: React.CSSProperties = { padding: 0 };

const ticketTopRow: React.CSSProperties = { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' };
const ticketRouteText: React.CSSProperties = { margin: 0, fontSize: '1.02rem', fontWeight: 700, color: C.ink };
const ticketSubText: React.CSSProperties = { margin: '4px 0 0', fontSize: '0.76rem', color: 'rgba(38,38,38,0.55)' };

const ticketPerforation: React.CSSProperties = { position: 'relative', display: 'flex', alignItems: 'center', margin: '16px 0' };
const ticketDashLine: React.CSSProperties = { flex: 1, borderTop: '1.5px dashed rgba(38,38,38,0.25)' };
const ticketNotchLeft: React.CSSProperties = { width: '14px', height: '14px', borderRadius: '50%', background: C.cream, marginRight: '4px', flexShrink: 0 };
const ticketNotchRight: React.CSSProperties = { width: '14px', height: '14px', borderRadius: '50%', background: C.cream, marginLeft: '4px', flexShrink: 0 };

const ticketBottomRow: React.CSSProperties = { display: 'flex', justifyContent: 'space-between', alignItems: 'center' };

const ticketIdRow: React.CSSProperties = {
  marginTop: '18px', paddingTop: '14px', borderTop: '1px solid rgba(38,38,38,0.08)',
  display: 'flex', justifyContent: 'space-between', alignItems: 'center'
};
const ticketIdText: React.CSSProperties = { fontFamily: 'monospace', fontSize: '0.82rem', fontWeight: 700, color: C.coral };

// Last-ticket section (page bottom)
const lastTicketWrap: React.CSSProperties = { marginTop: '36px' };

const miniTicketWrap: React.CSSProperties = {
  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
  background: C.cream, border: '1px solid rgba(38,38,38,0.08)', borderRadius: '12px', padding: '14px 18px'
};

const miniTicketIconWrap: React.CSSProperties = {
  width: '34px', height: '34px', borderRadius: '8px', background: C.white,
  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
};

const miniTicketBtn: React.CSSProperties = {
  background: 'none', border: 'none', color: C.coral, fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer'
};