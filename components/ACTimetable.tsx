"use client";

import React, { useState, useEffect } from 'react';

interface Destination {
  english: string;
  sinhala: string;
  tamil: string;
}

interface BusSchedule {
  routeNo: string;
  destination: Destination;
  platform: string;
  time: string;
}

const ACTimetable: React.FC = () => {
  const [fullData, setFullData] = useState<Record<string, BusSchedule[]>>({});
  const [loading, setLoading] = useState(true);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/schedules-ac');
        const data = await response.json();
        setFullData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching AC schedules:", error);
      }
    };
    fetchData();
  }, []);

  const corridorKeys = Object.keys(fullData);

  if (loading) return <div style={s.page}>Loading AC Timetable...</div>;
  if (corridorKeys.length === 0) return <div style={s.page}>No AC data found.</div>;

  const next = () => setActiveIdx((prev) => (prev + 1) % corridorKeys.length);
  const prev = () => setActiveIdx((prev) => (prev - 1 + corridorKeys.length) % corridorKeys.length);

  const currentCorridor = corridorKeys[activeIdx];
  const currentList = fullData[currentCorridor];

  // Updated logic: Adds space before capitals, but treats "AC" as one block
  const formatName = (name: string) => 
    name.replace(/AC$/, ' AC') // Ensure AC has a space before it
        .replace(/([A-Z])(?=[a-z])/g, ' $1') // Space before capitals that start a word
        .trim();

  return (
    <div style={s.page}>
      <div style={s.headerContainer}>
        <h1 style={s.title}>{formatName(currentCorridor)}</h1>
        <div style={s.btnGroup}>
          <button onClick={prev} style={s.navBtn}>BACK</button>
          <button onClick={next} style={s.navBtn}>NEXT</button>
        </div>
      </div>

      <div style={s.tableBorder}>
        <div style={s.labelGrid}>
          <span>Route</span>
          <span>Destination</span>
          <span>Platform</span>
          <span>Time</span>
        </div>

        <div style={s.innerWrapper}>
          {currentList.map((item, i) => (
            <div key={i} style={s.row}>
              <div style={s.routeBox}>{item.routeNo}</div>
              <div style={s.destCell}>
                <div style={s.sin}>{item.destination.sinhala}</div>
                <div style={s.tam}>{item.destination.tamil}</div>
                <div style={s.eng}>{item.destination.english}</div>
              </div>
              <div style={s.platCell}>{item.platform}</div>
              <div style={s.timeCell}>{item.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const s: Record<string, React.CSSProperties> = {
  page: { padding: '40px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  headerContainer: { width: '100%', maxWidth: '800px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '20px' },
  title: { fontSize: '2.2rem', fontWeight: '900', margin: 0, textTransform: 'uppercase' },
  btnGroup: { display: 'flex', gap: '10px' },
  navBtn: { padding: '8px 20px', background: '#363636', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.8rem' },
  tableBorder: { width: '100%', maxWidth: '800px', border: '1px solid #ccc', padding: '25px', overflowX: 'auto' },
  labelGrid: { display: 'grid', gridTemplateColumns: '130px 1fr 130px 130px', textAlign: 'center', fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '15px', minWidth: '620px' },
  innerWrapper: { border: '1px solid #666', borderRadius: '4px', overflow: 'hidden' },
  row: { display: 'grid', gridTemplateColumns: '130px 1fr 130px 130px', borderBottom: '1px solid #ccc', minHeight: '110px', minWidth: '620px' },
  routeBox: { background: '#005aab', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.2rem', fontWeight: '800' },
  destCell: { padding: '10px 25px', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderRight: '1px solid #ccc' },
  sin: { fontSize: '1.1rem', marginBottom: '2px' },
  tam: { fontSize: '0.9rem', color: '#555', marginBottom: '4px' },
  eng: { fontSize: '1.3rem', fontWeight: '900' },
  platCell: { display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: '800', borderRight: '1px solid #ccc' },
  timeCell: { display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: '800' }
};

export default ACTimetable;