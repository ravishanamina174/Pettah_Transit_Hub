import Link from 'next/link';
import './Navbar.css'; // Import the hover styles

const Navbar = () => {
  return (
    <div style={{ padding: '10px 20px', display: 'flex', justifyContent: 'center' }}>
      <nav style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 25px',
        background: '#FFFFFF',
        border: '0.5px solid #898989',
        borderRadius: '40px', 
        width: '100%',
        maxWidth: '1200px',
        height: '60px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
      }}>
        
        {/* Left Side: Logo & Title */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', gap: '10px' }}>
          <img 
            src="/bus-logo.png" 
            alt="Logo" 
            style={{ width: '60px', height: '60px', objectFit: 'contain' }} 
          />
          <div style={{ display: 'flex', flexDirection: 'column',marginTop: '4px' }}>
            <span style={{ fontWeight: '800', fontSize: '1rem', color: '#000', lineHeight: '1' }}>Pettah</span>
            <span style={{ fontSize: '0.75rem', color: '#777' }}>Transit Hub</span>
          </div>
        </Link>

        {/* Center: Navigation Links with Hover Class */}
        <ul style={{
          display: 'flex',
          gap: '15px', 
          listStyle: 'none',
          margin: 0,
          padding: 0,
          alignItems: 'center'
        }}>
          <li>
            <Link href="/booking" className="nav-link">
              Seat Booking 
            </Link>
          </li>
          <li>
            <Link href="/timetable" className="nav-link">
              Bus Timetable
            </Link>
          </li>
          <li>
            <Link href="#" className="nav-link">
              Our Services 
            </Link>
          </li>
        </ul>

        {/* Right Side: Account */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link href="#" style={{ 
            color: '#000', 
            textDecoration: 'none', 
            fontSize: '0.85rem',
            borderBottom: '1px solid #aaa' 
          }}>
            Create an account
          </Link>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            border: '1px solid #000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1rem'
          }}>
            👤
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;