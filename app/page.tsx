"use client";
import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <main>
      <div style={{ padding: '0.5rem' }}>
        <Navbar />
      </div>

      <section style={{ padding: '40px 20px', display: 'flex', justifyContent: 'center' }}>
       <div style={{
         width: '100%',
         maxWidth: '1190px',
         border: '1px solid #B5B4B3',
         borderRadius: '30px',
         padding: '13px 13px',
         display: 'flex',
         gap: '36px',
         alignItems: 'center',
         background: '#FFFFFF',
         minHeight: '500px'
       }}>

    {/* Left Side: Image Grid */}
    <div style={{ flex: 1.6, display: 'flex', flexDirection: 'column', gap: '15px' }}>

      {/* Top Row — 2 images, taller */}
      <div style={{ display: 'flex', gap: '15px', height: '285px' }}>
        <img src="/h1.jpg" alt="Pettah 1" style={imageStyle} />
        <img src="/h2.jpg" alt="Pettah 2" style={imageStyle} />
      </div>

      {/* Bottom Row — 3 images, shorter */}
      <div style={{ display: 'flex', gap: '15px', height: '175px' }}>
        <img src="/h3.jpg" alt="Pettah 3" style={imageStyle} />
        <img src="/h4.jpg" alt="Pettah 4" style={imageStyle} />
        <img src="/h5.jpg" alt="Pettah 5" style={imageStyle} />
      </div>
    </div>

    {/* Right Side: Text Content */}
  <div style={{ 
    flex: 0.85, 
    display: 'flex', 
    flexDirection: 'column', 
   gap: '18px',
    alignSelf: 'flex-start', // 1. Break away from the vertical center
    paddingTop: '20px'       // 2. Adjust this to match the exact top alignment you want
  }}>
  <h1 style={{
    fontSize: '2.6rem',
    fontWeight: '800',
    lineHeight: '1.15',
    margin: 0,
    color: '#000',
    letterSpacing: '-0.5px'
  }}>
    Plan your journey from Pettah, Colombo's main transport hub
  </h1>

  <p style={{
    fontSize: '0.95rem',
    color: '#666',
    lineHeight: '1.6',
    margin: 0,
  }}>
    Travel across Sri Lanka with ease using real-time bus schedules,
    route guidance, and seamless seat booking from Pettah Central Bus Stand.
  </p>

  <button style={{
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    background: '#000',
    color: '#fff',
    padding: '5px 5px 5px 18px',
    borderRadius: '100px',
    width: 'fit-content',
    border: '1px solid #FFCC00',
    cursor: 'pointer',
    fontSize: '0.85rem',
    fontWeight: '600',
    letterSpacing: '0.1px',
    marginTop: '8px',
    boxShadow: '0 0 12px rgba(255, 204, 0, 0.1)',
    transition: 'all 0.2s ease',
  }}>
    Book Your Seat Now
    <div style={{
      background: '#FFCC00',
      color: '#000',
      borderRadius: '50%',
      width: '26px',
      height: '26px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '0.9rem',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
    }}>
      <span style={{ transform: 'translateY(-1px)' }}>→</span>
    </div>
   </button>
   </div>
  </div>
  </section> 
    
  <div style={{ 
  display: 'flex', 
  justifyContent: 'center', 
  alignItems: 'flex-start', 
  maxWidth: '1190px', 
  margin: '40px auto', // Centers the whole section on the page
  gap: '40px',          // Space between the four columns
  padding: '0 20px' 
}}>
  
  {/* Item 1: Bus Terminal */}
  <div style={infoItemStyle}>
    <img src="/bus.png" alt="Bus" style={iconStyle} />
    <p style={textStyle}>
      serving as the main terminal for intercity and local buses.
    </p>
  </div>

  {/* Item 2: Online Booking */}
  <div style={infoItemStyle}>
    <img src="/online-booking.png" alt="Booking" style={iconStyle} />
    <p style={textStyle}>
      Easy access to schedules and online ticket reservations system
    </p>
  </div>

  {/* Item 3: Amenities */}
  <div style={infoItemStyle}>
    <img src="/toilet.png" alt="Toilet" style={iconStyle} />
    <p style={textStyle}>
      Serving daily commuters with waiting areas and Washrooms
    </p>
  </div>
  
  {/* Item 4: Emergency */}
  <div style={infoItemStyle}>
    <img src="/ambulance.png" alt="Ambulance" style={iconStyle} />
    <p style={textStyle}>
      Emergency services and hotlines ensuring passenger safety
    </p>
  </div>
  </div>

  {/* Location & Connectivity Section */}
<section style={{ padding: '60px 20px', display: 'flex', justifyContent: 'center', background: '#F5F5F5' }}>
  <div style={{
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
          fontSize: '1.5rem', 
          fontWeight: '700', 
          margin: 0,
          borderBottom: '2px solid #0070f3',
          paddingBottom: '2px',
          display: 'inline-block'
        }}>
          Location & Connectivity
        </h2>
      </div>
      
      <p style={{ fontSize: '1.1rem', color: '#333', lineHeight: '1.6', marginBottom: '20px' }}>
        The Pettah Central Bus Stand is the main transport hub for long-distance and intercity buses in Colombo.
      </p>
      <p style={{ fontSize: '1.1rem', color: '#333', lineHeight: '1.6', marginBottom: '20px' }}>
        Located along Olcott Mawatha, near Fort Railway Station, it provides convenient access for passengers traveling between rail and road transport.
      </p>
      <p style={{ fontSize: '1.1rem', color: '#333', lineHeight: '1.6', marginBottom: '32px' }}>
        This central location makes it one of the busiest and most important transit points in the country.
      </p>

      <button style={{
        background: '#EBBF41',
        border: 'none',
        padding: '14px 28px',
        borderRadius: '50px',
        fontSize: '1.1rem',
        fontWeight: '700',
        cursor: 'pointer',
        boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
      }}>
        View Live Bus Timetable
      </button>
      <p style={{ fontSize: '0.8rem', color: '#888', marginTop: '12px', paddingLeft: '5px' }}>
        Check daily and weekly schedules or find your route<br/> instantly using our smart route system.
      </p>
    </div>

    {/* Right Side: Map */}
    <div style={{ flex: 1.2, position: 'relative' }}>
      <img 
        src="/map.png" 
        alt="Pettah Map" 
        style={{ width: '100%', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }} 
      />
    </div>
  </div>
</section>

{/* Hotlines & Help Desk Section */}
<section style={{ padding: '100px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#FFFFFF' }}>
  <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '60px' }}>Hotlines & help desk</h2>
  
  <div style={{ 
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
      style={{ width: '380px', zIndex: 1 }} 
    />

    {/* Bubble: SLTB Contact (Top) */}
    <div style={{ ...bubbleStyle, top: '0', left: '50%', transform: 'translateX(-50%)' }}>
      <span style={{ fontWeight: '700' }}>SLTB contact</span> 
      <span style={{ color: '#666', marginLeft: '15px' }}>011 755 5555</span>
    </div>

    {/* Bubble: Suwa Seriya (Mid-Left) */}
    <div style={{ ...bubbleStyle, top: '35%', left: '0' }}>
      <span style={{ fontWeight: '700' }}>Suwa Seriya</span> 
      <span style={{ color: '#666', marginLeft: '15px' }}>1990</span>
    </div>

    {/* Bubble: Hotline (Mid-Right) */}
    <div style={{ ...bubbleStyle, top: '40%', right: '0' }}>
      <span style={{ fontWeight: '700' }}>Hotline</span> 
      <span style={{ color: '#D32F2F', marginLeft: '15px' }}>1315</span>
    </div>

    {/* Bubble: Passenger Feedback (Bottom-Left) */}
    <div style={{ ...bubbleStyle, bottom: '15%', left: '-20px' }}>
      <span style={{ fontWeight: '700' }}>Passenger Feedback</span> 
      <span style={{ color: '#666', marginLeft: '15px' }}>1958</span>
    </div>

    {/* Bubble: Seat Booking (Bottom-Right) */}
    <div style={{ ...bubbleStyle, bottom: '15%', right: '-10px' }}>
      <span style={{ fontWeight: '700' }}>Seat booking</span> 
      <span style={{ color: '#666', marginLeft: '15px', textDecoration: 'underline' }}>1315.lk</span>
    </div>
  </div>
</section>

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
  flex: 1,                    // Gives all 4 items exactly the same width
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',       // Centers icon and text horizontally
  textAlign: 'center'         // Centers the lines of text
};

const iconStyle: React.CSSProperties = {
  width: '50px',
  height: '50px',
  objectFit: 'contain',
  marginBottom: '15px'        // Clean space between icon and text
};

const textStyle: React.CSSProperties = {
  fontSize: '1rem',
  color: '#333',
  lineHeight: '1.4',
  margin: 0,
  maxWidth: '220px'           // Prevents text from stretching too wide
};

const bubbleStyle: React.CSSProperties = {
  position: 'absolute',
  background: '#FFF',
  border: '1px solid #000',
  padding: '12px 24px',
  borderRadius: '50px',
  fontSize: '1rem',
  display: 'flex',
  alignItems: 'center',
  whiteSpace: 'nowrap',
  boxShadow: '0 4px 10px rgba(0,0,0,0.03)',
  zIndex: 2
};
