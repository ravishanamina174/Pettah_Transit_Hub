"use client";
import Link from 'next/dist/client/link';
import Navbar from '../components/Navbar';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import ChatButton from '@/components/ChatButton';


export default function Home() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
  "https://pub-226e195565bd4889a8ed68fd02cc46ec.r2.dev/h1.jpg",
  "https://pub-226e195565bd4889a8ed68fd02cc46ec.r2.dev/h2.jpg",
  "https://pub-226e195565bd4889a8ed68fd02cc46ec.r2.dev/h3.jpg",
  "https://pub-226e195565bd4889a8ed68fd02cc46ec.r2.dev/h4.jpg",
  "https://pub-226e195565bd4889a8ed68fd02cc46ec.r2.dev/h5.jpg",
  "https://pub-226e195565bd4889a8ed68fd02cc46ec.r2.dev/h6.jpg",
  "https://pub-226e195565bd4889a8ed68fd02cc46ec.r2.dev/h7.jpg"
];




  const nextSlide = () => setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  return (
    <main className="w-screen min-h-screen bg-white overflow-x-hidden" style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}>
      <style>{`
        .pcw-navbtn { backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease; }
        .pcw-navbtn:hover { transform: translateY(-50%) scale(1.07); box-shadow: 0 10px 22px rgba(0,0,0,0.18); }
        .pcw-feature-card { transition: transform 0.28s ease, box-shadow 0.28s ease, background 0.28s ease; }
        .pcw-feature-card:hover { transform: translateY(-5px); box-shadow: 0 16px 34px rgba(0,0,0,0.08); background: rgba(255,255,255,0.85) !important; }
        .pcw-bubble { transition: transform 0.28s ease, box-shadow 0.28s ease; }
        .pcw-bubble:hover { transform: translateY(-5px) scale(1.035); box-shadow: 0 16px 30px rgba(0,0,0,0.12); }
        .pcw-dest-col { transition: transform 0.28s ease, box-shadow 0.28s ease, background 0.28s ease; }
        .pcw-dest-col:hover { transform: translateY(-4px); box-shadow: 0 16px 32px rgba(0,0,0,0.07); background: rgba(255,255,255,0.85) !important; }
        .pcw-footer-link { transition: color 0.2s ease, opacity 0.2s ease; }
        .pcw-footer-link:hover { color: #EBBF41 !important; opacity: 1; }
        .pcw-maps-pill { transition: transform 0.25s ease, background 0.25s ease, box-shadow 0.25s ease; }
        .pcw-maps-pill:hover { transform: translateY(-2px); box-shadow: 0 10px 22px rgba(0,0,0,0.25); }
        .pcw-timetable-btn { transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease; }
        .pcw-timetable-btn:hover { transform: translateY(-3px); }
      `}</style>
      <div style={{ padding: '0.5rem' }}>
        <Navbar />
      </div>
      <div>
        <ChatButton/>
      </div>

      <section className="home-hero-section" style={{ padding: '48px 20px', display: 'flex', justifyContent: 'center' }}>
      <div className="home-hero-card" style={{
        width: '100%',
        maxWidth: '1190px',
        border: '1px solid rgba(0,0,0,0.07)',
        borderRadius: '30px',
        padding: '16px',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '36px',
        alignItems: 'center',
        background: '#FFFFFF',
        minHeight: '500px',
        boxShadow: '0 24px 60px -20px rgba(0,0,0,0.10)'
      }}>

        {/* Carousel Section */}
        <div className="home-hero-carousel" style={{ 
          flex: 1.6, 
          position: 'relative', 
          height: '475px', 
          overflow: 'hidden', 
          borderRadius: '22px',
          background: '#f0f0f0',
          boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.04)'
        }}>
          {/* Navigation Buttons */}
          <button 
            className="pcw-navbtn"
            onClick={prevSlide}
            style={{ ...navBtnStyle, left: '20px' }}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.92)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.55)'}
          >‹</button>
          
          <button 
            className="pcw-navbtn"
            onClick={nextSlide}
            style={{ ...navBtnStyle, right: '20px' }}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.92)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.55)'}
          >›</button>

          {/* Main Image */}
          <img 
            src={images[currentIndex]} 
            alt="Hero Carousel" 
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: '0.5s ease-in-out' }} 
          />

          {/* Dot Indicators */}
          <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '8px' }}>
            {images.map((_, i) => (
              <div key={i} style={{
                width: '8px', height: '8px', borderRadius: '50%',
                background: i === currentIndex ? '#FFCC00' : 'rgba(255,255,255,0.55)',
                boxShadow: i === currentIndex ? '0 0 0 3px rgba(255,204,0,0.25)' : 'none',
                transition: '0.3s'
              }} />
            ))}
          </div>
        </div>

        {/* Text Content Section */}
        <div className="home-hero-content" style={{ flex: 0.85, display: 'flex', flexDirection: 'column', gap: '20px', alignSelf: 'flex-start', paddingTop: '20px' }}>
          <h1 style={{ fontSize: '2.7rem', fontWeight: '800', lineHeight: '1.12', margin: 0, color: '#0A0A0A', letterSpacing: '-1px' }}>
            Plan your journey from Pettah, Colombo's main transport hub
          </h1>

          <p style={{ fontSize: '0.98rem', color: '#5A5A5A', lineHeight: '1.7', margin: 0 }}>
            Travel across Sri Lanka with ease using real-time bus schedules,
            route guidance, and seamless seat booking from Pettah Central Bus Stand.
          </p>


          <button
      onClick={() => router.push('/booking')} // Redirection logic for Next.js
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        background: 'transparent',
        color: '#111',
        border: 'none',
        borderRadius: '0',
        padding: '6px 2px 2px 2px',
        cursor: 'pointer',
        fontSize: '15px',
        fontWeight: '600',
        transition: 'gap 0.25s ease, color 0.25s ease',
        position: 'relative',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.gap = '16px';
        e.currentTarget.style.color = '#ebbc02';
        const underline = e.currentTarget.querySelector('.underline') as HTMLElement;
        if (underline) {
          underline.style.borderBottomColor = '#ebbc02';
          underline.style.width = '100%';
        }
      }}
      onMouseLeave={e => {
        e.currentTarget.style.gap = '10px';
        e.currentTarget.style.color = '#111';
        const underline = e.currentTarget.querySelector('.underline') as HTMLElement;
        if (underline) {
          underline.style.borderBottomColor = '#111';
          underline.style.width = '42%';
        }
      }}
    >
      Book Your Seat Now
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span
        className="underline"
        style={{
          position: 'absolute',
          bottom: '0',
          left: '2px',
          width: '42%',
          borderBottomWidth: '1.5px',
          borderBottomStyle: 'solid',
          borderBottomColor: '#111',
          transition: 'border-color 0.25s ease, width 0.25s ease',
        }}
      />
    </button>
        </div>
      </div>
    </section> 
    
  <div className="home-features-row" style={{ 
  display: 'flex', 
  flexWrap: 'wrap',
  justifyContent: 'center', 
  alignItems: 'stretch', 
  maxWidth: '1190px', 
  margin: '40px auto', // Centers the whole section on the page
  gap: '24px',          // Space between the four columns
  padding: '0 20px' 
}}>
  
  {/* Item 1: Bus Terminal */}
  <div className="pcw-feature-card" style={infoItemStyle}>
    <img src="/bus.png" alt="Bus" style={iconStyle} />
    <p style={textStyle}>
      serving as the main terminal for intercity and local buses.
    </p>
  </div>

  {/* Item 2: Online Booking */}
  <div className="pcw-feature-card" style={infoItemStyle}>
    <img src="/online-booking.png" alt="Booking" style={iconStyle} />
    <p style={textStyle}>
      Easy access to schedules and online ticket reservations system
    </p>
  </div>

  {/* Item 3: Amenities */}
  <div className="pcw-feature-card" style={infoItemStyle}>
    <img src="/toilet.png" alt="Toilet" style={iconStyle} />
    <p style={textStyle}>
      Serving daily commuters with waiting areas and Washrooms
    </p>
  </div>
  
  {/* Item 4: Emergency */}
  <div className="pcw-feature-card" style={infoItemStyle}>
    <img src="/ambulance.png" alt="Ambulance" style={iconStyle} />
    <p style={textStyle}>
      Emergency services and hotlines ensuring passenger safety
    </p>
  </div>
  </div>

  {/* Location & Connectivity Section */}
<section className="home-location-section" style={{ padding: '64px 20px', display: 'flex', justifyContent: 'center', background: '#F5F5F5' }}>
  <div className="home-location-grid" style={{
    width: '100%',
    maxWidth: '1190px',
    display: 'flex',
    gap: '60px',
    alignItems: 'center'
  }}>
    {/* Left Side: Text */}
    <div style={{ flex: 1 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
        <span style={{ fontSize: '1.2rem' }}>📍</span>
        <h2 style={{ 
          fontSize: '1.2rem', 
          fontWeight: '700', 
          margin: 0,
          paddingBottom: '2px',
          letterSpacing: '-0.2px',
          display: 'inline-block'
        }}>
          Location & Connectivity
        </h2>
      </div>
      
      <p style={{ fontSize: '1rem', color: '#3A3A3A', lineHeight: '1.7', marginBottom: '20px' }}>
        The Pettah Central Bus Stand is the main transport hub for long-distance and intercity buses in Colombo.
      </p>
      <p style={{ fontSize: '1rem', color: '#3A3A3A', lineHeight: '1.7', marginBottom: '20px' }}>
        Located along Olcott Mawatha, near Fort Railway Station, it provides convenient access for passengers traveling between rail and road transport.
      </p>
      <p style={{ fontSize: '1rem', color: '#3A3A3A', lineHeight: '1.7', marginBottom: '32px' }}>
        This central location makes it one of the busiest and most important transit points in the country.
      </p>

      <Link href="/timetable" >
      <button
      className="pcw-timetable-btn"
      style={{
        background: '#EBBF41',
        border: 'none',
        padding: '12px 30px',
        borderRadius: '50px',
        fontSize: '1rem',
        color: '#241f00',
        fontWeight: '700',
        cursor: 'pointer',
        boxShadow: '0 10px 24px rgba(235,191,65,0.35)'   
      }}
      onMouseOver={(e) => e.currentTarget.style.background = '#d9ae36'}
      onMouseOut={(e) => e.currentTarget.style.background = '#EBBF41'}
      >
        View Live Bus Timetable
      </button>
      </Link>


      <p style={{ fontSize: '0.82rem', color: '#888', marginTop: '14px', paddingLeft: '5px', lineHeight: '1.5' }}>
        Check daily and weekly schedules or find your route<br/> instantly using our smart route system.
      </p>
    </div>

    {/* Right Side: Map */}
<div className="home-map-wrap" style={{ flex: 1.2, position: 'relative' }}>
  {/* Open in Maps Button */}
  <a 
    className="pcw-maps-pill"
    href="https://www.google.com/maps/place/Pettah+CTB+bus+stand/@6.9336336,79.8485523,15.8z/data=!4m6!3m5!1s0x3ae2590051d7c54b:0x9c88d1d9c9a25b2a!8m2!3d6.9351176!4d79.8543603!16s%2Fg%2F11wwytbh94?entry=ttu&g_ep=EgoyMDI2MDQyMS4wIKXMDSoASAFQAw%3D%3D" 
    target="_blank" 
    rel="noopener noreferrer"
    style={{
      position: 'absolute',
      top: '20px',
      right: '20px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      background: 'rgba(0, 0, 0, 0.55)', // Dark translucent background
      color: '#FFFFFF',
      padding: '6px 16px',
      borderRadius: '20px',
      textDecoration: 'none',
      fontSize: '0.9rem',
      fontWeight: '600',
      backdropFilter: 'blur(8px)', // Glassmorphism effect
      WebkitBackdropFilter: 'blur(8px)',
      zIndex: 10,
      border: '1px solid rgba(255, 255, 255, 0.15)',
      boxShadow: '0 8px 20px rgba(0,0,0,0.18)'
    }}
    onMouseOver={(e) => e.currentTarget.style.background = 'rgba(0, 0, 0, 0.75)'}
    onMouseOut={(e) => e.currentTarget.style.background = 'rgba(0, 0, 0, 0.55)'}
  >
    {/* Google Maps Icon - Simple SVG version */}
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#089C13"/>
    </svg>
    Open in Maps
  </a>

  <img 
    src="https://pub-226e195565bd4889a8ed68fd02cc46ec.r2.dev/map.png" 
    alt="Pettah Map" 
    style={{ 
      width: '100%', 
      display: 'block',
      borderRadius: '18px', 
      boxShadow: '0 20px 45px rgba(0,0,0,0.10)' 
    }} 
  />
</div>
    </div>


</section>

{/* Hotlines & Help Desk Section */}
<section className="home-hotline-section" style={{ padding: '100px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#FFFFFF' }}>
  <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '60px', letterSpacing: '-0.5px' }}>Hotlines & help desk</h2>
  
  <div className="home-hotline-visual" style={{ 
    position: 'relative', 
    width: '100%', 
    maxWidth: '900px', 
    height: '450px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }}>
    {/* Central Illustration */}
    <img 
      src="/middle-bus.png" 
      alt="Bus Support Illustration" 
      style={{ width: '380px', zIndex: 1, filter: 'drop-shadow(0 12px 20px rgba(0,0,0,0.08))' }} 
    />

    {/* Bubble: SLTB Contact (Top) */}
    <div className="pcw-bubble" style={{ ...bubbleStyle, top: '0', left: '50%', transform: 'translateX(-50%)' }}>
      <span style={{ fontWeight: '700' }}>SLTB contact</span> 
      <span style={{ color: '#666', marginLeft: '15px' }}>011 755 5555</span>
    </div>

    {/* Bubble: Suwa Seriya (Mid-Left) */}
    <div className="pcw-bubble" style={{ ...bubbleStyle, top: '35%', left: '0' }}>
      <span style={{ fontWeight: '700' }}>Suwa Seriya</span> 
      <span style={{ color: '#666', marginLeft: '15px' }}>1990</span>
    </div>

    {/* Bubble: Hotline (Mid-Right) */}
    <div className="pcw-bubble" style={{ ...bubbleStyle, top: '40%', right: '0' }}>
      <span style={{ fontWeight: '700' }}>Hotline</span> 
      <span style={{ color: '#D32F2F', marginLeft: '15px' }}>1315</span>
    </div>

    {/* Bubble: Passenger Feedback (Bottom-Left) */}
    <div className="pcw-bubble" style={{ ...bubbleStyle, bottom: '15%', left: '-20px' }}>
      <span style={{ fontWeight: '700' }}>Passenger Feedback</span> 
      <span style={{ color: '#666', marginLeft: '15px' }}>1958</span>
    </div>

    {/* Bubble: Seat Booking (Bottom-Right) */}
    <div className="pcw-bubble" style={{ ...bubbleStyle, bottom: '15%', right: '-10px' }}>
      <span style={{ fontWeight: '700' }}>Seat booking</span> 
      <span style={{ color: '#666', marginLeft: '15px', textDecoration: 'underline' }}>1315.lk</span>
    </div>
  </div>
</section>

{/* System Works & Destinations Section */}
<section style={{ padding: '80px 20px', background: '#F9F7F2', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
  <div style={{ maxWidth: '1190px', width: '100%' }}>
    
    {/* How this system works */}
    <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '20px', letterSpacing: '-0.4px' }}>How this system works</h2>
    <p style={{ maxWidth: '1300px', color: '#4A4A4A', lineHeight: '1.7', marginBottom: '40px', fontSize: '1rem' }}>
      Passengers can browse routes, check timetables, and reserve seats through the web, app, or hotline-based booking flow. The official 1315/eseat 
      platform supports real-time seat reservation and passenger transport information, and users can choose seats from the vehicle's seat layout before 
      receiving confirmation by SMS or email, ensuring a convenient and efficient booking experience.
    </p>

    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '80px' }}>
      <img src="/steps.png" alt="Booking Steps" style={{ width: '100%', maxWidth: '600px', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.06))' }} />
    </div>

    {/* Top Destinations */}
    <div style={{ textAlign: 'center', marginBottom: '40px' }}>
      <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '10px', letterSpacing: '-0.4px' }}>Top Destinations and bus connections</h2>
      <p style={{ color: '#666', fontWeight: '600' }}>Cities</p>
      <div style={{ width: '100%', height: '1px', background: '#E0E0E0', marginTop: '20px' }}></div>
    </div>

    {/* Destinations Grid */}
    <div className="home-destination-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '20px' }}>
      <div className="pcw-dest-col" style={destinationColumnStyle}>
        <h4 style={columnTitleStyle}>Western / Colombo suburbs</h4>
        <ul style={listStyle}>
          <li>Gampaha</li><li>Pugoda</li><li>Kirindiwela</li><li>Malwana</li><li>Delgoda</li>
          <li>Negombo</li><li>Moratuwa</li><li>Panadura</li><li>Kalutara</li><li>Aluthgama</li>
          <li>Mattegoda</li><li>Rukmalgama</li><li>Avissawella</li><li>Padukka</li>
        </ul>
      </div>

      <div className="pcw-dest-col" style={destinationColumnStyle}>
        <h4 style={columnTitleStyle}>Southern corridor</h4>
        <ul style={listStyle}>
          <li>Galle</li><li>Matara</li><li>Tangalle</li><li>Kataragama</li><li>Deniyaya</li>
          <li>Mathugama</li><li>Elpitiya</li><li>Goluwamulla</li><li>Uragasmanhandiya</li>
        </ul>
      </div>

      <div className="pcw-dest-col" style={destinationColumnStyle}>
        <h4 style={columnTitleStyle}>Central / hill-country corridor</h4>
        <ul style={listStyle}>
          <li>Badulla</li><li>Passara</li><li>Bandarawela</li><li>Kandy</li><li>Digana</li>
          <li>Nawalapitiya</li><li>Hatton</li><li>Nuwara Eliya</li><li>Monaragala</li><li>Welimada</li>
        </ul>
      </div>

      <div className="pcw-dest-col" style={destinationColumnStyle}>
        <h4 style={columnTitleStyle}>North / Eastern corridor</h4>
        <ul style={listStyle}>
          <li>Anuradhapura</li><li>Vavuniya</li><li>Jaffna</li><li>Kankesanthurai</li><li>Point Pedro</li>
          <li>Mulathivu</li><li>Nandikadal</li><li>Welioya</li><li>Horowpathana</li><li>Akkaraipattu</li>
          <li>Ampara</li><li>Kalmunai</li><li>Trincomalee</li>
        </ul>
      </div>

      <div className="pcw-dest-col" style={destinationColumnStyle}>
        <h4 style={columnTitleStyle}>Sabaragamuwa corridor</h4>
        <ul style={listStyle}>
          <li>Ratnapura</li><li>Balangoda</li><li>Embilipitiya</li><li>Rakwana</li>
        </ul>
      </div>
    </div>
  </div>
</section>

{/* Footer Section */}
<footer style={{ padding: '40px 20px 20px 20px', background: '#FFFFFF', display: 'flex', justifyContent: 'center' }}>
  <div style={{ maxWidth: '1190px', width: '100%' }}>
    <div className="home-footer-top" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
      
      {/* Footer Links */}
      <div className="home-footer-links" style={{ display: 'flex', gap: '80px' , marginTop: '35px'}}>
        <div style={footerLinkColStyle}>
          <a className="pcw-footer-link" href="#" style={footerLinkStyle}>Login</a>
          <a className="pcw-footer-link" href="#" style={footerLinkStyle}>Send Ticket</a>
          <a className="pcw-footer-link" href="#" style={footerLinkStyle}>Transfer Ticket</a>
          <a className="pcw-footer-link" href="#" style={footerLinkStyle}>Contact Us</a>
        </div>
        <div style={footerLinkColStyle}>
          <a className="pcw-footer-link" href="#" style={footerLinkStyle}>FAQ</a>
          <a className="pcw-footer-link" href="#" style={footerLinkStyle}>T & C</a>
          <a className="pcw-footer-link" href="#" style={footerLinkStyle}>Privacy Policy</a>
        </div>
      </div>

      {/* Footer Info & Logo */}
      <div className="home-footer-info" style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
        <img src="https://pub-226e195565bd4889a8ed68fd02cc46ec.r2.dev/sltb.png" alt="SLTB Logo" style={{ width: '120px', marginBottom: '15px' }} />
        <p style={{ fontWeight: '800', margin: '0 0 5px 0', fontSize: '0.9rem' }}>Sri Lanka Transport Board</p>
        <p style={footerDetailStyle}>No. 200, Kirula Road, Colombo 5</p>
        <p style={footerDetailStyle}>+94 (0) 11 7706000 | +94 (0) 11 25811120 - 4</p>
        <p style={footerDetailStyle}>+94 (0) 11 2589683 | info@sltb.lk</p>
      </div>
    </div>

    {/* Copyright */}
    <div style={{ borderTop: '1px solid #EEE', paddingTop: '20px', textAlign: 'center' }}>
      <p style={{ fontSize: '0.75rem', color: '#999', margin: 0 }}>
        © 2026 Sri Lanka Transport Board. All rights reserved.
      </p>
    </div>
  </div>
</footer>

    </main>    
  );
}

// Reusable Image Styling
const imageStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: '20px'
};

// --- Styles for perfect alignment ---
const infoItemStyle: React.CSSProperties = {
  flex: '1 1 220px',          // Gives all 4 items roughly the same width, wraps gracefully
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',       // Centers icon and text horizontally
  textAlign: 'center',        // Centers the lines of text
  background: 'rgba(255,255,255,0.55)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  border: '1px solid rgba(0,0,0,0.06)',
  borderRadius: '20px',
  padding: '28px 20px',
  boxShadow: '0 8px 24px rgba(0,0,0,0.04)'
};

const iconStyle: React.CSSProperties = {
  width: '50px',
  height: '50px',
  objectFit: 'contain',
  marginBottom: '16px',        // Clean space between icon and text
  filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.06))'
};

const textStyle: React.CSSProperties = {
  fontSize: '0.95rem',
  color: '#3F3F3F',
  lineHeight: '1.5',
  margin: 0,
  maxWidth: '220px'           // Prevents text from stretching too wide
};

const bubbleStyle: React.CSSProperties = {
  position: 'absolute',
  background: 'rgba(255,255,255,0.65)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  border: '1px solid rgba(0,0,0,0.08)',
  padding: '12px 24px',
  borderRadius: '50px',
  fontSize: '1rem',
  display: 'flex',
  alignItems: 'center',
  whiteSpace: 'nowrap',
  boxShadow: '0 10px 24px rgba(0,0,0,0.07)',
  zIndex: 2
};

const destinationColumnStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  background: 'rgba(255,255,255,0.55)',
  backdropFilter: 'blur(8px)',
  WebkitBackdropFilter: 'blur(8px)',
  border: '1px solid rgba(0,0,0,0.06)',
  borderRadius: '16px',
  padding: '22px 20px',
  boxShadow: '0 6px 18px rgba(0,0,0,0.04)'
};

const columnTitleStyle: React.CSSProperties = {
  fontSize: '0.95rem',
  fontWeight: '800',
  marginBottom: '15px',
  color: '#000',
  letterSpacing: '-0.1px'
};

const listStyle: React.CSSProperties = {
  listStyle: 'none',
  padding: 0,
  margin: 0,
  fontSize: '0.85rem',
  lineHeight: '1.9',
  color: '#3F3F3F'
};

const footerLinkColStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '15px'
};

const footerLinkStyle: React.CSSProperties = {
  textDecoration: 'none',
  color: '#000',
  fontSize: '0.9rem',
  fontWeight: '500'
};

const footerDetailStyle: React.CSSProperties = {
  fontSize: '0.8rem',
  color: '#3F3F3F',
  margin: '2px 0'
};

const navBtnStyle: React.CSSProperties = {
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  background: 'rgba(255, 255, 255, 0.55)',
  border: '1px solid rgba(255,255,255,0.5)',
  width: '45px',
  height: '45px',
  borderRadius: '50%',
  cursor: 'pointer',
  fontSize: '1.5rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
  zIndex: 2
};