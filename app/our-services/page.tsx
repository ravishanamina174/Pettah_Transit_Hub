"use client";
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { useState } from 'react';

export default function OurServices() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [heroImageIndex, setHeroImageIndex] = useState(0);
  const comparisonImages = ['old.jpg', 'new.jpg'];
  const facilitiesImages = ['old.jpg', 'new.jpg'];
  const heroImages = ['old.jpg', 'new.jpg'];

  const handleComparisonNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % comparisonImages.length);
  };

  const nextHeroSlide = () => setHeroImageIndex((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1));
  const prevHeroSlide = () => setHeroImageIndex((prev) => (prev === 0 ? heroImages.length - 1 : prev - 1));

  const navBtnStyle: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'rgba(255, 255, 255, 0.8)',
    border: 'none',
    width: '45px',
    height: '45px',
    borderRadius: '50%',
    cursor: 'pointer',
    fontSize: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    zIndex: 2,
    transition: 'background 0.2s ease'
  };

  return (
    <main>
      {/* Navbar */}
      <div style={{ padding: '0.5rem' }}>
        <Navbar />
      </div>

      {/* SECTION 1: HERO + INTRO */}
      <section style={{ padding: '40px 20px', display: 'flex', justifyContent: 'center' }}>
        <div style={{
          width: '100%',
          maxWidth: '1190px',
          border: '1px solid #B5B4B3',
          borderRadius: '30px',
          padding: '13px',
          display: 'flex',
          gap: '36px',
          alignItems: 'center',
          background: '#FFFFFF',
          minHeight: '500px'
        }}>
          {/* Carousel Section */}
          <div style={{
            flex: 1.6,
            position: 'relative',
            height: '475px',
            overflow: 'hidden',
            borderRadius: '20px',
            background: '#f0f0f0'
          }}>
            {/* Navigation Buttons */}
            <button
              onClick={prevHeroSlide}
              style={{ ...navBtnStyle, left: '20px' }}
              onMouseOver={(e) => e.currentTarget.style.background = '#fff'}
              onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)'}
            >‹</button>

            <button
              onClick={nextHeroSlide}
              style={{ ...navBtnStyle, right: '20px' }}
              onMouseOver={(e) => e.currentTarget.style.background = '#fff'}
              onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)'}
            >›</button>

            {/* Main Image */}
            <Image
              src={`/${heroImages[heroImageIndex]}`}
              alt="Pettah Transit Hub Transformation"
              fill
              style={{ objectFit: 'cover', transition: '0.5s ease-in-out' }}
              priority
            />

            {/* Dot Indicators */}
            <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '8px' }}>
              {heroImages.map((_, i) => (
                <div key={i} style={{
                  width: '8px', height: '8px', borderRadius: '50%',
                  background: i === heroImageIndex ? '#FFCC00' : 'rgba(255,255,255,0.5)',
                  transition: '0.3s'
                }} />
              ))}
            </div>
          </div>

          {/* Text Content Section */}
          <div style={{ flex: 0.85, display: 'flex', flexDirection: 'column', gap: '18px', alignSelf: 'flex-start', paddingTop: '20px' }}>
            <h1 style={{ fontSize: '2.6rem', fontWeight: '800', lineHeight: '1.15', margin: 0, color: '#000', letterSpacing: '-0.5px' }}>
              The Pettah Hub Heritage & Transit
            </h1>

            <p style={{ fontSize: '1.1rem', color: '#666', fontWeight: '500', margin: 0, lineHeight: '1.5' }}>
              A modern transformation of Sri Lanka's busiest transport hub
            </p>

            <p style={{ fontSize: '0.95rem', color: '#666', lineHeight: '1.6', margin: 0 }}>
              Over six decades of heritage seamlessly blended with 21st-century efficiency.
              The Pettah Central Bus Stand stands as a testament to Sri Lanka's commitment
              to modern public transport infrastructure.
            </p>

            <Link href="#heritage" style={{ textDecoration: 'none' }}>
              <button
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
                  fontWeight: '500',
                  transition: 'gap 0.2s, color 0.2s',
                  position: 'relative',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.gap = '16px';
                  e.currentTarget.style.color = '#ebbc02';
                  const underline = e.currentTarget.querySelector('.underline') as HTMLElement;
                  if (underline) underline.style.borderBottomColor = '#ebbc02';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.gap = '10px';
                  e.currentTarget.style.color = '#111';
                  const underline = e.currentTarget.querySelector('.underline') as HTMLElement;
                  if (underline) underline.style.borderBottomColor = '#111';
                }}
              >
                Learn Our Story
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span
                  className="underline"
                  style={{
                    position: 'absolute',
                    bottom: '0',
                    left: '2px',
                    width: '95%',
                    borderBottomWidth: '1.5px',
                    borderBottomStyle: 'solid',
                    borderBottomColor: '#111',
                    transition: 'border-color 0.2s',
                  }}
                />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* BEFORE & AFTER COMPARISON */}
      {/* <section style={{ padding: '60px 20px', display: 'flex', justifyContent: 'center', background: '#F9F9F9' }}>
        <div style={{
          width: '100%',
          maxWidth: '1190px',
          display: 'flex',
          flexDirection: 'column',
          gap: '32px'
        }}>
          <div>
            <h2 style={{
              fontSize: '1.4rem',
              fontWeight: '700',
              margin: '0 0 8px 0',
              color: '#000'
            }}>
              The Transformation
            </h2>
            <p style={{
              fontSize: '0.95rem',
              color: '#666',
              margin: 0
            }}>
              From heritage to modernity
            </p>
          </div> */}

          {/* Carousel Container */}
          {/* <div style={{
            position: 'relative',
            height: '400px',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
            background: '#f0f0f0'
          }}> */}
            {/* Navigation Buttons */}
            {/* <button
              onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? comparisonImages.length - 1 : prev - 1))}
              style={{ ...navBtnStyle, left: '20px' }}
              onMouseOver={(e) => e.currentTarget.style.background = '#fff'}
              onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)'}
            >‹</button>

            <button
              onClick={handleComparisonNext}
              style={{ ...navBtnStyle, right: '20px' }}
              onMouseOver={(e) => e.currentTarget.style.background = '#fff'}
              onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)'}
            >›</button> */}

            {/* Main Image */}
            {/* <Image
              src={`/${comparisonImages[currentImageIndex]}`}
              alt={`Pettah Transformation - ${currentImageIndex === 0 ? 'Before 2026' : 'After Renovation'}`}
              fill
              style={{ objectFit: 'cover', transition: '0.5s ease-in-out' }}
            /> */}

            {/* Image Label Overlay */}
            {/* <div style={{
              position: 'absolute',
              bottom: '0',
              left: '0',
              right: '0',
              background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
              padding: '40px 30px 30px 30px',
              color: '#fff'
            }}>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                margin: '0 0 8px 0'
              }}>
                {currentImageIndex === 0 ? 'Before 2026' : 'After Renovation'}
              </h3>
              <p style={{
                fontSize: '0.95rem',
                margin: 0,
                opacity: 0.9
              }}>
                {currentImageIndex === 0
                  ? 'The historic Pettah Central Bus Stand in its original form'
                  : 'Modernized facility with enhanced amenities and infrastructure'
                }
              </p>
            </div> */}

            {/* Dot Indicators */}
            {/* <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '8px' }}>
              {comparisonImages.map((_, i) => (
                <div key={i} style={{
                  width: '8px', height: '8px', borderRadius: '50%',
                  background: i === currentImageIndex ? '#FFCC00' : 'rgba(255,255,255,0.5)',
                  transition: '0.3s'
                }} />
              ))}
            </div>
          </div>
        </div>
      </section> */}

      {/* SECTION 2: OUR HERITAGE */}
      <section id="heritage" style={{ padding: '40px 20px 80px', display: 'flex', justifyContent: 'center' }}>
        <div style={{
          width: '100%',
          maxWidth: '900px',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px'
        }}>
          {/* Section Heading */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* <span style={{ fontSize: '1.4rem' }}>🚌</span> */}
            <h2 style={{
              fontSize: '1.6rem',
              fontWeight: '700',
              margin: 0,
              color: '#000'
            }}>
              Our Heritage: The Heart of Sri Lankan Transit
            </h2>
          </div>

          {/* Heritage Paragraph */}
          <p style={{
            fontSize: '1.02rem',
            color: '#444',
            lineHeight: '1.85',
            margin: 0,
            textAlign: 'justify'
          }}>
            Established in 1964, the Pettah Central Bus Stand has served as the heartbeat of Sri Lanka's public transport for over six decades. 
            Situated on Olcott Mawatha, it is the national focal point where all nine provinces meet. In April 2026, we entered a new era 
            with a comprehensive modernization project supported by the Sri Lanka Air Force. Today, we manage over 2,000 bus movements and 
            75,000 commuters daily, bridging the gap between historical significance and 21st-century efficiency.
          </p>

          {/* Timeline */}
          {/* <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '40px',
            justifyContent: 'space-around',
            padding: '32px',
            background: '#F9F9F9',
            borderRadius: '16px',
            marginTop: '16px'
          }}>
            
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: '#000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontWeight: '700',
                fontSize: '0.9rem'
              }}>
                1964
              </div>
              <p style={{ fontSize: '0.95rem', fontWeight: '600', margin: 0, color: '#333', textAlign: 'center' }}>
                Founding
              </p>
            </div>

            
            <div style={{
              height: '2px',
              flex: 1,
              background: 'linear-gradient(to right, #000, #CCC)',
              maxWidth: '150px'
            }} />

            
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: '#EBBF41',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#000',
                fontWeight: '700',
                fontSize: '0.9rem'
              }}>
                2026
              </div>
              <p style={{ fontSize: '0.95rem', fontWeight: '600', margin: 0, color: '#333', textAlign: 'center' }}>
                Modernization
              </p>
            </div>
          </div> */}
        </div>
      </section>

      {/* SECTION 3: SPECIALIZED TRANSIT SERVICES */}
      <section style={{ padding: '60px 20px', display: 'flex', justifyContent: 'center', background: '#F5F5F5' }}>
        <div style={{
          width: '100%',
          maxWidth: '1190px',
          display: 'flex',
          flexDirection: 'column',
          gap: '40px'
        }}>
          <h2 style={{
            fontSize: '1.6rem',
            fontWeight: '700',
            margin: 0,
            color: '#000'
          }}>
            Specialized Transit Services
          </h2>

          {/* Cards Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '28px'
          }}>
            {/* Card 1: Sisu Seriya */}
            <ServiceCard
              icon="🎓"
              title="Sisu Seriya"
              description="School transport with student concession rates and dedicated routes for educational institutions"
              buttonText="Check Schedule"
            />

            {/* Card 2: Gami Seriya */}
            <ServiceCard
              icon="🏡"
              title="Gami Seriya"
              description="Rural connectivity connecting village communities to main transport hub with affordable fares"
              buttonText="Check Schedule"
            />

            {/* Card 3: Nisi Seriya */}
            <ServiceCard
              icon="🌛"
              title="Nisi Seriya"
              description="Night service with GPS tracking and enhanced security for late-night commuters"
              buttonText="Check Schedule"
            />
          </div>
        </div>
      </section>

      {/* SECTION 4: MODERN FACILITIES */}
      {/* <section style={{ padding: '80px 20px', display: 'flex', justifyContent: 'center' }}>
        <div style={{
          width: '100%',
          maxWidth: '1190px',
          display: 'flex',
          flexDirection: 'column',
          gap: '64px'
        }}>
          <h2 style={{
            fontSize: '1.6rem',
            fontWeight: '700',
            margin: '0 0 32px 0',
            color: '#000'
          }}>
            Modern Facilities & Commuter Comfort
          </h2> */}

          {/* Two Column Layout */}
          {/* <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '60px',
            alignItems: 'start'
          }}> */}
            {/* Left: Text */}
            {/* <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <p style={{
                fontSize: '1rem',
                color: '#444',
                lineHeight: '1.75',
                margin: 0
              }}>
                The comprehensive modernization of Pettah Central Bus Stand reflects our commitment to passenger safety, comfort, and convenience. 
                Our facilities now feature state-of-the-art amenities designed to serve the 75,000+ daily commuters.
              </p>
              <p style={{
                fontSize: '1rem',
                color: '#444',
                lineHeight: '1.75',
                margin: 0
              }}>
                With enhanced infrastructure, we've created an environment that honors our heritage while embracing future-ready technology. 
                Every detail, from seating arrangements to information displays, has been carefully planned for optimal user experience.
              </p>
            </div> */}

            {/* Right: Image Carousel/Showcase */}
            {/* <div style={{
              position: 'relative',
              height: '350px',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 8px 24px rgba(0,0,0,0.08)'
            }}>
              <Image
                src={`/${facilitiesImages[currentImageIndex]}`}
                alt={`Modern facilities - ${currentImageIndex === 0 ? 'Heritage' : 'Contemporary'}`}
                fill
                style={{ objectFit: 'cover', transition: 'opacity 0.5s ease' }}
              /> */}
              
              {/* Image Switch Button */}
              {/* <button
                onClick={handleComparisonNext}
                style={{
                  position: 'absolute',
                  bottom: '16px',
                  right: '16px',
                  background: 'rgba(0, 0, 0, 0.6)',
                  color: '#fff',
                  border: '1px solid rgba(255,255,255,0.2)',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  backdropFilter: 'blur(4px)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 0, 0, 0.8)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 0, 0, 0.6)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                }}
              >
                {currentImageIndex === 0 ? 'View Modern →' : '← View Heritage'}
              </button>
            </div>
          </div> */}

          {/* Features Grid */}
          {/* <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '32px',
            marginTop: '32px'
          }}>
            <FeatureItem icon="📹" label="24/7 Security Monitoring" />
            <FeatureItem icon="📶" label="High-Speed WiFi" />
            <FeatureItem icon="🎓" label="Student Accommodation" />
          </div>
        </div>
      </section> */}

      {/* SECTION 5: STRATEGIC CONNECTIVITY */}
      <section style={{ padding: '80px 20px', display: 'flex', justifyContent: 'center' }}>
        <div style={{
          width: '100%',
          maxWidth: '900px',
          display: 'flex',
          flexDirection: 'column',
          gap: '48px'
        }}>
          {/* Section Heading */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '1.4rem' }}>📍</span>
            <h2 style={{
              fontSize: '1.6rem',
              fontWeight: '700',
              margin: 0,
              color: '#000'
            }}>
              Strategic Connectivity
            </h2>
          </div>

          {/* Article Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <p style={{
              fontSize: '1.02rem',
              color: '#333',
              lineHeight: '1.85',
              margin: 0,
              textAlign: 'justify'
            }}>
              Located at the convergence of Sri Lanka's major transport routes, Pettah Central Bus Stand serves as
              the primary gateway connecting all nine provinces. Our strategic position on Olcott Mawatha ensures
              seamless integration with railway networks, creating a unified multi-modal transport experience.
            </p>

            <p style={{
              fontSize: '1.02rem',
              color: '#333',
              lineHeight: '1.85',
              margin: 0,
              textAlign: 'justify'
            }}>
              Whether you're traveling north to the Western highlands or south to the coastal regions, Pettah stands
              as your reliable connection point for all intercity and local bus services. The facility's proximity to
              key landmarks makes it an essential hub for both daily commuters and long-distance travelers.
            </p>

            {/* Connectivity Details */}
            <div style={{
              background: '#F9F9F9',
              borderRadius: '16px',
              padding: '25px',
              border: '1px solid #E5E7EB'
            }}>
              <h3 style={{
                fontSize: '1.2rem',
                fontWeight: '700',
                margin: '0 0 24px 0',
                color: '#000'
              }}>
                Key Connectivity Points
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '14px',
                  background: '#FFFFFF',
                  borderRadius: '12px',
                  border: '1px solid #E5E7EB'
                }}>
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: '600', margin: '0 0 4px 0', color: '#000' }}>
                      Fort Railway Station
                    </h4>
                    <p style={{ fontSize: '0.9rem', color: '#666', margin: 0 }}>
                      Direct rail connection to Colombo's central business district
                    </p>
                  </div>
                  <span style={{
                    fontSize: '1rem',
                    fontWeight: '700',
                    color: '#D41C04',
                    background: '#FFF',
                    padding: '1px 12px',
                    borderRadius: '20px',
                    border: '1px solid #000'
                  }}>
                    5 mins
                  </span>
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '14px',
                  background: '#FFFFFF',
                  borderRadius: '12px',
                  border: '1px solid #E5E7EB'
                }}>
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: '600', margin: '0 0 4px 0', color: '#000' }}>
                      Bastian Mawatha
                    </h4>
                    <p style={{ fontSize: '0.9rem', color: '#666', margin: 0 }}>
                      Access to commercial and shopping districts
                    </p>
                  </div>
                  <span style={{
                    fontSize: '1rem',
                    fontWeight: '700',
                    color: '#D41C04',
                    background: '#FFF',
                    padding: '1px 12px',
                    borderRadius: '20px',
                    border: '1px solid #000'
                  }}>
                    2 mins
                  </span>
                </div>
              </div>
            </div>

            {/* Regional Coverage */}
            <div style={{
              background: '#FFFFFF',
              borderRadius: '16px',
              padding: '25px',
              border: '1px solid #E5E7EB',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
            }}>
              <h3 style={{
                fontSize: '1.2rem',
                fontWeight: '700',
                margin: '0 0 24px 0',
                color: '#000'
              }}>
                Regional Coverage
              </h3>

              <p style={{
                fontSize: '0.95rem',
                color: '#555',
                lineHeight: '1.6',
                margin: '0 0 24px 0'
              }}>
                Our extensive network connects you to all corners of Sri Lanka, from the northern peninsula
                to the southern coastal regions, ensuring comprehensive coverage across the nation's diverse landscapes.
              </p>

              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px'
              }}>
                {[
                  { name: 'Northern Province', desc: 'Jaffna, Kilinochchi, Mullaitivu' },
                  { name: 'Southern Province', desc: 'Galle, Matara, Hambantota' },
                  { name: 'Eastern Province', desc: 'Trincomalee, Batticaloa, Ampara' },
                  { name: 'Central Province', desc: 'Kandy, Nuwara Eliya, Matale' }
                ].map((region) => (
                  <div
                    key={region.name}
                    style={{
                      flex: '1 1 280px',
                      padding: '10px',
                      background: '#F9F9F9',
                      borderRadius: '12px',
                      border: '1px solid #E5E7EB',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.boxShadow = '0 8px 20px rgba(0,0,0,0.06)';
                      el.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.boxShadow = 'none';
                      el.style.transform = 'translateY(0)';
                    }}
                  >
                    <h4 style={{
                      fontSize: '1rem',
                      fontWeight: '700',
                      margin: '0 0 8px 0',
                      color: '#000'
                    }}>
                      {region.name}
                    </h4>
                    <p style={{
                      fontSize: '0.9rem',
                      color: '#666',
                      margin: 0,
                      lineHeight: '1.5'
                    }}>
                      {region.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '30px 20px 80px', display: 'flex', justifyContent: 'center' }}>
        <div style={{
          width: '100%',
          maxWidth: '900px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px'
        }}>
          <h2 style={{
            fontSize: '1.8rem',
            fontWeight: '700',
            margin: 0,
            color: '#000'
          }}>
            Ready to experience modern transit?
          </h2>

          <p style={{
            fontSize: '1rem',
            color: '#666',
            margin: 0,
            lineHeight: '1.6'
          }}>
            Start your journey with Pettah Transit Hub today
          </p>

          <Link href="/booking">
            <button style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              background: '#FAD5A5',
              color: '#000',
              border: 'none',
              borderRadius: '50px',
              padding: '10px 32px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: '0 4px 12px rgba(235, 191, 65, 0.2)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#E0B277';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(235, 191, 65, 0.3)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#FAD5A5';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(235, 191, 65, 0.2)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}>
              Book Your Seat Now
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}

// Service Card Component
function ServiceCard({
  icon,
  title,
  description,
  buttonText
}: {
  icon: string;
  title: string;
  description: string;
  buttonText: string;
}) {
  return (
    <div
      style={{
        border: '1px solid #E5E7EB',
        borderRadius: '14px',
        padding: '28px',
        background: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        transition: 'all 0.3s ease',
        boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.boxShadow = '0 12px 32px rgba(0,0,0,0.1)';
        el.style.transform = 'translateY(-4px)';
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.03)';
        el.style.transform = 'translateY(0)';
      }}
    >
      <span style={{ fontSize: '2.4rem', display: 'block' }}>{icon}</span>

      <h3 style={{
        fontSize: '1.25rem',
        fontWeight: '700',
        margin: 0,
        color: '#000'
      }}>
        {title}
      </h3>

      <p style={{
        fontSize: '0.95rem',
        color: '#555',
        lineHeight: '1.6',
        margin: '8px 0 0 0',
        flex: 1
      }}>
        {description}
      </p>

      <Link href="#schedule" style={{ textDecoration: 'none' }}>
        <button
          style={{
            marginTop: '8px',
            padding: '10px 20px',
            background: '#F0F0F0',
            border: '1px solid #E5E7EB',
            borderRadius: '8px',
            fontSize: '0.9rem',
            fontWeight: '600',
            color: '#000',
            cursor: 'pointer',
            transition: 'all 0.2s',
            width: '100%',
            textAlign: 'center'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#E0B277';
            e.currentTarget.style.borderColor = '#FAD5A5';
            e.currentTarget.style.color = '#fff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#F0F0F0';
            e.currentTarget.style.borderColor = '#E5E7EB';
            e.currentTarget.style.color = '#000';
          }}
        >
          {buttonText}
        </button>
      </Link>
    </div>
  );
}

// Feature Item Component
function FeatureItem({ icon, label }: { icon: string; label: string }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
        padding: '24px',
        background: '#FFFFFF',
        borderRadius: '12px',
        border: '1px solid #E5E7EB',
        transition: 'all 0.2s'
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.boxShadow = '0 8px 20px rgba(0,0,0,0.06)';
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.boxShadow = 'none';
      }}
    >
      <span style={{ fontSize: '2rem', display: 'block' }}>{icon}</span>
      <p style={{
        fontSize: '0.95rem',
        fontWeight: '600',
        color: '#333',
        margin: 0,
        textAlign: 'center'
      }}>
        {label}
      </p>
    </div>
  );
}
