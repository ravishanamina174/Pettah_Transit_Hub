"use client";
import Navbar from '../../components/Navbar';
import './Metro.css';

export default function MetroHero() {
  const animationStyles = `
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .animate-hero {
      animation: fadeInUp 0.8s ease-out forwards;
    }

    /* Mobile Only Adjustments */
    @media (max-width: 768px) {
      /* Hero Adjustments */
      .metro-hero-top-row {
        flex-direction: column !important;
        gap: 30px !important;
      }
      
      .metro-hero-content {
        flex: none !important;
        width: 100% !important;
        margin-top: 0 !important;
      }

      .metro-title {
        font-size: 2rem !important;
      }

      .metro-points-grid {
        grid-template-columns: 1fr !important; 
        gap: 15px !important;
      }

      .metro-mobile-img-wrapper {
        flex: none !important;
        width: 100% !important;
      }

      /* Footer Adjustments */
      .footer-main-content {
        flex-direction: column !important;
        align-items: center !important;
        text-align: center !important;
        gap: 30px !important;
      }

      .footer-links-wrapper {
        width: 100%;
        justify-content: space-around !important;
      }

      .footer-bottom-bar {
        flex-direction: column !important;
        align-items: center !important;
        gap: 15px !important;
      }

      .footer-description {
        max-width: 100% !important;
      }
    }

    .footer-link {
      color: #666;
      text-decoration: none;
      transition: color 0.2s;
      font-size: 0.9rem;
    }
    .footer-link:hover {
      color: #d32f2f;
    }
  `;

  return (
    <main style={{ background: '#FFFFFF', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <style>{animationStyles}</style>

      <div style={{ padding: '0.5rem' }}>
        <Navbar />
      </div>

      <section className="metro-hero-section" style={{ padding: '40px 20px', display: 'flex', justifyContent: 'center' }}>
        <div className="metro-hero-container animate-hero" style={{ width: '100%', maxWidth: '1100px' }}>
          
          {/* Top Row */}
          <div className="metro-hero-top-row" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '40px', marginBottom: '70px' }}>
            
            {/* Left Side: Text Content */}
            <div className="metro-hero-content" style={{ flex: '1.2', marginTop: '27px'}}>
              <h1 className="metro-title" style={{ fontSize: '2.8rem', fontWeight: '700', color: '#1a1a1a', margin: '0 0 30px 0', lineHeight: '1.2' }}>
                New Priority Bus Service for Persons with Disabilities
              </h1>
              <p style={{ fontSize: '1.1rem', color: '#333', lineHeight: '1.6', marginBottom: '20px' }}>
                The Clean Sri Lanka programme and the Ministry of Transport have officially launched a dedicated 
                priority bus service to safeguard the mobility rights of persons with disabilities. This Rs. 430.7 million 
                initiative utilizes a fleet of modern, low-floor, air-conditioned buses designed to remove physical barriers 
                and provide safe, independent access to public transport.
              </p>
              
              <a 
                href="https://lankametro.lk/en" 
                target="_blank" 
                rel="noopener noreferrer"
                className="lmt-go-button"
              >
                LMT GO
              </a>

              {/* Points Section */}
              <div className="metro-points-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px 30px' }}>
                {[
                  { label: "Modern Fleet", text: "Operating 10 low-floor, wheelchair-accessible AC buses." },
                  { label: "Vital Hub", text: "Centered at Makumbura Multimodal Transport Centre." },
                  { label: "Direct Access", text: "Routes serving National and Apeksha Hospitals every 40 mins." },
                  { label: "Expert Care", text: "Staffed by 28 personnel trained in safety and sign language." },
                  { label: "Expansion", text: "Plans to scale to 100 buses for broader public use by August." }
                ].map((item, index) => (
                  <div key={index} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <div style={{ color: '#d32f2f', fontSize: '1.2rem', lineHeight: '1' }}>•</div>
                    <div style={{ fontSize: '0.95rem', lineHeight: '1.4', color: '#444' }}>
                      <strong style={{ color: '#000' }}>{item.label}:</strong> {item.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side: Mobile Phone Image */}
            <div className="metro-mobile-img-wrapper" style={{ flex: '0.6', display: 'flex', justifyContent: 'center' }}>
              <img 
                src="https://pub-226e195565bd4889a8ed68fd02cc46ec.r2.dev/metro-mobile.png" 
                alt="Metro App" 
                style={{ width: '100%', maxWidth: '300px', height: 'auto', objectFit: 'contain' }} 
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- Footer Section --- */}
      <footer style={{ borderTop: '1px solid #eee', padding: '40px 20px', marginTop: 'auto', background: '#fafafa' }}>
        <div className="footer-main-content" style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '10px', color: '#1a1a1a' }}>Pettah Transit Hub</h3>
            <p className="footer-description" style={{ fontSize: '0.85rem', color: '#666', lineHeight: '1.5', maxWidth: '300px' }}>
              Streamlining transportation across Sri Lanka with real-time updates and inclusive accessibility.
            </p>
          </div>

          <div className="footer-links-wrapper" style={{ display: 'flex', gap: '50px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <span style={{ fontWeight: '600', fontSize: '0.9rem', marginBottom: '5px' }}>Quick Links</span>
              <a href="#" className="footer-link">Schedules</a>
              <a href="#" className="footer-link">Route Map</a>
              <a href="#" className="footer-link">Booking</a>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <span style={{ fontWeight: '600', fontSize: '0.9rem', marginBottom: '5px' }}>Support</span>
              <a href="#" className="footer-link">Help Center</a>
              <a href="#" className="footer-link">Contact Us</a>
              <a href="#" className="footer-link">Feedback</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom-bar" style={{ maxWidth: '1100px', margin: '15px auto 0', borderTop: '1px solid #eee', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#999' }}>
          <span>© 2026 Pettah Transit Hub. All rights reserved.</span>
          <div style={{ display: 'flex', gap: '20px' }}>
            <a href="#" className="footer-link" style={{ fontSize: '0.75rem' }}>Privacy Policy</a>
            <a href="#" className="footer-link" style={{ fontSize: '0.75rem' }}>Terms of Service</a>
          </div>
        </div>
      </footer>
    </main>
  );
}