import Link from 'next/link';
import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import './Navbar.css'; 

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
        boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
        position: 'relative' // Added for absolute positioning of dropdown
      }}>
        
        {/* Left Side: Logo & Title */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', gap: '10px' }}>
          <img 
            src="https://pub-226e195565bd4889a8ed68fd02cc46ec.r2.dev/bus-logo.png" 
            alt="Logo" 
            style={{ width: '60px', height: '60px', objectFit: 'contain' }} 
          />
          <div style={{ display: 'flex', flexDirection: 'column', marginTop: '4px' }}>
            <span style={{ fontWeight: '800', fontSize: '1rem', color: '#000', lineHeight: '1' }}>Pettah</span>
            <span style={{ fontSize: '0.75rem', color: '#777' }}>Transit Hub</span>
          </div>
        </Link>

        {/* Center: Navigation Links */}
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

          {/* Dropdown Menu Item */}
          <li className="dropdown">
            <span className="nav-link" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
              Bus Timetable <span style={{ fontSize: '0.6rem' }}>▼</span>
            </span>
            <div className="dropdown-menu">
              <Link href="/timetable" className="dropdown-item">Normal Bus Timetable</Link>
              <Link href="/timetable/AC" className="dropdown-item">AC Bus Timetable</Link>
            </div>
          </li>

          <li>
            <Link href="/our-services" className="nav-link">
              Our Services 
            </Link>
          </li>
        </ul>

        {/* Right Side: Account */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <Show when="signed-out">
            <SignInButton mode="modal">
              <button style={{ background: 'transparent', color: '#000', border: 'none', fontSize: '0.85rem', cursor: 'pointer', textDecoration: 'underline' }}>
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="bg-black text-white rounded-full font-extralight text-sm lg:text-sm sm:text-base lg:h-8.5 lg:px-4 sm:h-8 sm:px-3 cursor-pointer">
                Sign Up
              </button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <UserButton />
          </Show>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;