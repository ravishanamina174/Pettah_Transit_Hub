"use client";

import React, { useState } from 'react';

// --- Types ---
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

const TimetableCarousel: React.FC = () => {
  // Full Dataset mapped from your prompt
  const fullData: Record<string, BusSchedule[]> = {
    "Western Corridor": [
      { "routeNo": "244", "destination": { "english": "Gampaha", "sinhala": "ගම්පහ", "tamil": "கம்பஹா" }, "platform": "W1", "time": "06:00" },
      { "routeNo": "244", "destination": { "english": "Gampaha", "sinhala": "ගම්පහ", "tamil": "கம்பஹா" }, "platform": "W1", "time": "06:30" },
      { "routeNo": "04", "destination": { "english": "Negombo", "sinhala": "මීගමුව", "tamil": "நீர்கொழும்பு" }, "platform": "W1", "time": "07:00" },
      { "routeNo": "04", "destination": { "english": "Negombo", "sinhala": "මීගමුව", "tamil": "நீர்கொழும்பு" }, "platform": "W1", "time": "07:30" },
      { "routeNo": "17", "destination": { "english": "Moratuwa", "sinhala": "මොරටුව", "tamil": "மொரட்டுவா" }, "platform": "W2", "time": "08:00" },
      { "routeNo": "87", "destination": { "english": "Avissawella", "sinhala": "අවිස්සාවේල්ල", "tamil": "அவிசாவெல்லா" }, "platform": "W3", "time": "09:00" },
      { "routeNo": "125", "destination": { "english": "Padukka", "sinhala": "පාදුක්ක", "tamil": "பாதுக்கா" }, "platform": "W3", "time": "10:00" },
      { "routeNo": "138", "destination": { "english": "Kirindiwela", "sinhala": "කිරිඳිවැල", "tamil": "கிரிந்திவெலா" }, "platform": "W4", "time": "11:00" },
      { "routeNo": "154", "destination": { "english": "Malwana", "sinhala": "මාල්වාන", "tamil": "மால்வானா" }, "platform": "W4", "time": "12:30" },
      { "routeNo": "190", "destination": { "english": "Kalutara", "sinhala": "කළුතර", "tamil": "களுத்துறை" }, "platform": "W5", "time": "14:00" },
      { "routeNo": "255", "destination": { "english": "Panadura", "sinhala": "පානදුර", "tamil": "பாணதுறை" }, "platform": "W2", "time": "15:00" },
      { "routeNo": "305", "destination": { "english": "Pugoda", "sinhala": "පුගොඩ", "tamil": "புகொட" }, "platform": "W4", "time": "17:00" },
      { "routeNo": "330", "destination": { "english": "Delgoda", "sinhala": "දෙල්ගොඩ", "tamil": "டெல்கொட" }, "platform": "W4", "time": "18:30" },
      { "routeNo": "410", "destination": { "english": "Rukmalgama", "sinhala": "රුක්මල්ගම", "tamil": "ருக்மல்கம" }, "platform": "W5", "time": "20:30" }
    ],
    "Southern Corridor": [
      { "routeNo": "02", "destination": { "english": "Galle", "sinhala": "ගාල්ල", "tamil": "காலி" }, "platform": "S1", "time": "06:00" },
      { "routeNo": "02", "destination": { "english": "Galle", "sinhala": "ගාල්ල", "tamil": "காலி" }, "platform": "S1", "time": "06:30" },
      { "routeNo": "32", "destination": { "english": "Matara", "sinhala": "මාතර", "tamil": "மாத்தறை" }, "platform": "S2", "time": "07:00" },
      { "routeNo": "32", "destination": { "english": "Matara", "sinhala": "මාතර", "tamil": "மாத்தறை" }, "platform": "S2", "time": "08:00" },
      { "routeNo": "26", "destination": { "english": "Tangalle", "sinhala": "තංගල්ල", "tamil": "தங்கல்லை" }, "platform": "S3", "time": "09:00" },
      { "routeNo": "48", "destination": { "english": "Kataragama", "sinhala": "කතරගම", "tamil": "கதிர்காமம்" }, "platform": "S4", "time": "10:00" },
      { "routeNo": "64", "destination": { "english": "Deniyaya", "sinhala": "දෙනියාය", "tamil": "தெனியாய" }, "platform": "S5", "time": "12:00" },
      { "routeNo": "76", "destination": { "english": "Mathugama", "sinhala": "මතුගම", "tamil": "மதுகம" }, "platform": "S5", "time": "13:30" },
      { "routeNo": "89", "destination": { "english": "Elpitiya", "sinhala": "ඇල්පිටිය", "tamil": "எல்பிட்டிய" }, "platform": "S4", "time": "15:00" },
      { "routeNo": "110", "destination": { "english": "Goluwamulla", "sinhala": "කොලුවමුල්ල", "tamil": "கொலுவமுல்லா" }, "platform": "S3", "time": "17:00" },
      { "routeNo": "140", "destination": { "english": "Uragasmanhandiya", "sinhala": "උරගස්මන්හන්දිය", "tamil": "உராகஸ்மன்ஹந்தியா" }, "platform": "S3", "time": "19:30" }
    ],
    "central Corridor": [
    { "routeNo": "01", "destination": { "english": "Kandy", "sinhala": "මහනුවර", "tamil": "கண்டி" }, "platform": "C1", "time": "06:00" },
    { "routeNo": "01", "destination": { "english": "Kandy", "sinhala": "මහනුවර", "tamil": "கண்டி" }, "platform": "C1", "time": "06:20" },
    { "routeNo": "01", "destination": { "english": "Kandy", "sinhala": "මහනුවර", "tamil": "கண்டி" }, "platform": "C1", "time": "07:00" },
    { "routeNo": "18", "destination": { "english": "Hatton", "sinhala": "හැටන්", "tamil": "ஹட்டன்" }, "platform": "C2", "time": "08:00" },
    { "routeNo": "58", "destination": { "english": "Nuwara Eliya", "sinhala": "නුවර එළිය", "tamil": "நுவரெலியா" }, "platform": "C2", "time": "09:00" },
    { "routeNo": "99", "destination": { "english": "Badulla", "sinhala": "බදුල්ල", "tamil": "பதுளை" }, "platform": "C4", "time": "10:00" },
    { "routeNo": "74", "destination": { "english": "Bandarawela", "sinhala": "බණ්ඩාරවෙල", "tamil": "பண்டாரவளை" }, "platform": "C4", "time": "11:00" },
    { "routeNo": "79", "destination": { "english": "Passara", "sinhala": "පස්සර", "tamil": "பஸ்ஸரா" }, "platform": "C4", "time": "12:00" },
    { "routeNo": "102", "destination": { "english": "Nawalapitiya", "sinhala": "නාවලපිටිය", "tamil": "நாவலபிட்டிய" }, "platform": "C2", "time": "14:00" },
    { "routeNo": "145", "destination": { "english": "Monaragala", "sinhala": "මොණරාගල", "tamil": "மொணராகலை" }, "platform": "C5", "time": "17:00" },
    { "routeNo": "160", "destination": { "english": "Welimada", "sinhala": "වැලිමඩ", "tamil": "வெலிமடை" }, "platform": "C5", "time": "19:00" }
  ],

  "north Eastern Corridor": [
    { "routeNo": "15", "destination": { "english": "Jaffna", "sinhala": "යාපනය", "tamil": "யாழ்ப்பாணம்" }, "platform": "N1", "time": "06:00" },
    { "routeNo": "15", "destination": { "english": "Jaffna", "sinhala": "යාපනය", "tamil": "யாழ்ப்பாணம்" }, "platform": "N1", "time": "10:00" },
    { "routeNo": "57", "destination": { "english": "Anuradhapura", "sinhala": "අනුරාධපුර", "tamil": "அனுராதபுரம்" }, "platform": "N2", "time": "07:00" },
    { "routeNo": "49", "destination": { "english": "Trincomalee", "sinhala": "ත්‍රිකුණාමලය", "tamil": "திருகோணமலை" }, "platform": "N3", "time": "08:00" },
    { "routeNo": "87", "destination": { "english": "Kebithigollewa", "sinhala": "කෙබිතිගොල්ලෑව", "tamil": "கெபித்திகொல்லாவ" }, "platform": "N4", "time": "09:00" },
    { "routeNo": "90", "destination": { "english": "Vavuniya", "sinhala": "වවුනියාව", "tamil": "வவுனியா" }, "platform": "N2", "time": "12:00" },
    { "routeNo": "103", "destination": { "english": "Mullaitivu", "sinhala": "මුලතිව්", "tamil": "முல்லைத்தீவு" }, "platform": "N1", "time": "14:00" },
    { "routeNo": "121", "destination": { "english": "Point Pedro", "sinhala": "පොයින්ට් පෙඩ්රෝ", "tamil": "பாயிண்ட் பேட்ரோ" }, "platform": "N1", "time": "16:00" },
    { "routeNo": "130", "destination": { "english": "Kalmunai", "sinhala": "කල්මුණේ", "tamil": "கல்முனை" }, "platform": "N5", "time": "18:00" },
    { "routeNo": "144", "destination": { "english": "Ampara", "sinhala": "අම්පාර", "tamil": "அம்பாறை" }, "platform": "N5", "time": "19:30" },
    { "routeNo": "166", "destination": { "english": "Akkaraipattu", "sinhala": "අක්කරෙයිපත්තුව", "tamil": "அக்கரைப்பற்று" }, "platform": "N5", "time": "21:00" }
  ],
  "sabaragamuwa Corridor": [
    { "routeNo": "122", "destination": { "english": "Ratnapura", "sinhala": "රත්නපුර", "tamil": "ரத்தினபுரம்" }, "platform": "SB1", "time": "06:30" },
    { "routeNo": "122", "destination": { "english": "Ratnapura", "sinhala": "රත්නපුර", "tamil": "ரத்தினபுரம்" }, "platform": "SB1", "time": "07:00" },
    { "routeNo": "122", "destination": { "english": "Ratnapura", "sinhala": "රත්නපුර", "tamil": "ரத்தினபுரம்" }, "platform": "SB1", "time": "08:00" },
    { "routeNo": "99", "destination": { "english": "Balangoda", "sinhala": "බලංගොඩ", "tamil": "பலாங்கொட" }, "platform": "SB2", "time": "09:00" },
    { "routeNo": "138", "destination": { "english": "Embilipitiya", "sinhala": "ඇඹිලිපිටිය", "tamil": "எம்பிலிபிட்டிய" }, "platform": "SB3", "time": "10:30" },
    { "routeNo": "152", "destination": { "english": "Rakwana", "sinhala": "රක්වාන", "tamil": "ரக்வான" }, "platform": "SB4", "time": "12:00" },
    { "routeNo": "122", "destination": { "english": "Ratnapura", "sinhala": "රත්නපුර", "tamil": "ரத்தினபுரம்" }, "platform": "SB1", "time": "13:30" },
    { "routeNo": "99", "destination": { "english": "Balangoda", "sinhala": "බලංගොඩ", "tamil": "பலாங்கொட" }, "platform": "SB2", "time": "15:00" },
    { "routeNo": "138", "destination": { "english": "Embilipitiya", "sinhala": "ඇඹිලිපිටිය", "tamil": "எம்பிலிபிட்டிய" }, "platform": "SB3", "time": "16:30" },
    { "routeNo": "152", "destination": { "english": "Rakwana", "sinhala": "රක්වාන", "tamil": "ரக்வான" }, "platform": "SB4", "time": "18:00" },
    { "routeNo": "122", "destination": { "english": "Ratnapura", "sinhala": "රත්නපුර", "tamil": "ரத்தினபுரம்" }, "platform": "SB1", "time": "19:30" },
    { "routeNo": "99", "destination": { "english": "Balangoda", "sinhala": "බලංගොඩ", "tamil": "பலாங்கொட" }, "platform": "SB2", "time": "21:00" }
  ]
    // Add other corridors here...
  };

  const corridorKeys = Object.keys(fullData);
  const [activeIdx, setActiveIdx] = useState(0);

  const next = () => setActiveIdx((prev) => (prev + 1) % corridorKeys.length);
  const prev = () => setActiveIdx((prev) => (prev - 1 + corridorKeys.length) % corridorKeys.length);

  const currentCorridor = corridorKeys[activeIdx];
  const currentList = fullData[currentCorridor];

  return (
    <div style={s.page}>
      {/* 1. Header with Corridor Name */}
      <div style={s.headerContainer}>
        <h1 style={s.title}>{currentCorridor}</h1>
        <div style={s.btnGroup}>
          <button onClick={prev} style={s.navBtn}>BACK</button>
          <button onClick={next} style={s.navBtn}>NEXT</button>
        </div>
      </div>

      {/* 2. Timetable Section */}
      <div style={s.tableBorder}>
        {/* Table Labels */}
        <div style={s.labelGrid}>
          <span>Route</span>
          <span>Destination</span>
          <span>Platform</span>
          <span>Time</span>
        </div>

        {/* List of Rows */}
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

// --- Precise Styles to Match Screenshot ---
const s: Record<string, React.CSSProperties> = {
  page: { padding: '40px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  headerContainer: { width: '100%', maxWidth: '800px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '20px' },
  title: { fontSize: '2.2rem', fontWeight: '900', margin: 0, textTransform: 'uppercase' },
  btnGroup: { display: 'flex', gap: '10px' },
  navBtn: { padding: '8px 20px', background: '#363636', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.8rem' },
  
  tableBorder: { width: '100%', maxWidth: '800px', border: '1px solid #ccc', padding: '25px' },
  labelGrid: { display: 'grid', gridTemplateColumns: '130px 1fr 130px 130px', textAlign: 'center', fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '15px' },
  
  innerWrapper: { border: '1px solid #666', borderRadius: '4px', overflow: 'hidden' },
  row: { display: 'grid', gridTemplateColumns: '130px 1fr 130px 130px', borderBottom: '1px solid #ccc', minHeight: '110px' },
  
  routeBox: { background: '#444', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.2rem', fontWeight: '800' },
  destCell: { padding: '10px 25px', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderRight: '1px solid #ccc' },
  sin: { fontSize: '1.1rem', marginBottom: '2px' },
  tam: { fontSize: '0.9rem', color: '#555', marginBottom: '4px' },
  eng: { fontSize: '1.3rem', fontWeight: '900' },
  
  platCell: { display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: '800', borderRight: '1px solid #ccc' },
  timeCell: { display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: '800' }
};

export default TimetableCarousel;