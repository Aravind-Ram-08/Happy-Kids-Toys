'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import ProductCard from '@/components/ui/ProductCard';
import products from '@/data/products.json';
import { Product } from '@/types';

const categories = [
  { name: 'Educational Toys', icon: '📚', color: '#4ECDC4', bg: '#e0faf8' },
  { name: 'Musical Toys', icon: '🎵', color: '#8b5cf6', bg: '#f3e8ff' },
  { name: 'Remote Control Toys', icon: '🎮', color: '#FF6B6B', bg: '#fff0f0' },
  { name: 'Baby Toys', icon: '🍼', color: '#f59e0b', bg: '#fef9c3' },
  { name: 'Outdoor Toys', icon: '⚽', color: '#22c55e', bg: '#dcfce7' },
];

const reviews = [
  { name: 'Priya Sharma', rating: 5, text: 'My daughter loves the learning laptop! Great quality and fast delivery. Highly recommend Happy Kids Toys!', avatar: '👩', location: 'Mumbai' },
  { name: 'Rahul Mehta', rating: 5, text: 'Ordered the RC Monster Truck for my son. He is absolutely thrilled! Excellent product at this price.', avatar: '👨', location: 'Delhi' },
  { name: 'Anitha Krishnan', rating: 4, text: 'The baby sensory mat is super soft and my baby loves it. Delivery was quick. Will order again!', avatar: '👩‍🦱', location: 'Chennai' },
  { name: 'Suresh Patel', rating: 5, text: 'Bought the STEM blocks for my kids. They spend hours building things! Best educational toy purchase.', avatar: '👨‍🦲', location: 'Ahmedabad' },
];

function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { bg: 'linear-gradient(135deg, #FF6B6B 0%, #ff8c42 50%, #FFD93D 100%)', emoji: '🧸', title: 'Best Toys for Kids', subtitle: 'Fast Delivery Across India', cta: 'Shop Now' },
    { bg: 'linear-gradient(135deg, #4ECDC4 0%, #06b6d4 50%, #8b5cf6 100%)', emoji: '🎮', title: 'Remote Control Toys', subtitle: 'Up to 40% OFF this week!', cta: 'Explore RC Toys' },
    { bg: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #FF6B6B 100%)', emoji: '📚', title: 'Educational Toys', subtitle: 'Learning made fun & exciting', cta: 'View Educational' },
  ];

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide(p => (p + 1) % slides.length), 4000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[currentSlide];

  return (
    <section style={{
      background: slide.bg,
      minHeight: '360px',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden',
      transition: 'background 0.8s ease',
    }}>
      {/* Decorative circles */}
      {['rgba(255,255,255,0.08)', 'rgba(255,255,255,0.06)', 'rgba(255,255,255,0.04)'].map((bg, i) => (
        <div key={i} style={{
          position: 'absolute', borderRadius: '50%', background: bg,
          width: `${280 + i * 120}px`, height: `${280 + i * 120}px`,
          top: `${-60 - i * 30}px`, right: `${-60 - i * 30}px`,
        }} />
      ))}

      <div style={{ maxWidth: '1280px', width: '100%', padding: '40px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '32px', position: 'relative' }}>
        <div>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 700, fontSize: '14px', marginBottom: '8px', letterSpacing: '1px' }}>
            ✨ WELCOME TO HAPPY KIDS TOYS
          </p>
          <h1 style={{
            fontFamily: "'Baloo 2', sans-serif",
            fontSize: 'clamp(28px, 5vw, 52px)', fontWeight: 900,
            color: 'white', lineHeight: 1.15, marginBottom: '12px',
            textShadow: '0 2px 20px rgba(0,0,0,0.15)',
          }}>{slide.title}</h1>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '18px', fontWeight: 600, marginBottom: '28px' }}>
            🚀 {slide.subtitle}
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link href="/shop" style={{ textDecoration: 'none' }}>
              <button style={{
                background: 'white', color: '#FF6B6B', border: 'none', borderRadius: '50px',
                padding: '14px 32px', fontSize: '16px', fontWeight: 800, cursor: 'pointer',
                boxShadow: '0 8px 25px rgba(0,0,0,0.15)', transition: 'all 0.3s',
                fontFamily: "'Nunito', sans-serif",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 12px 30px rgba(0,0,0,0.2)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'none'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)'; }}
              >🛍️ {slide.cta}</button>
            </Link>
            <Link href="/offers" style={{ textDecoration: 'none' }}>
              <button style={{
                background: 'rgba(255,255,255,0.2)', color: 'white', border: '2px solid rgba(255,255,255,0.5)',
                borderRadius: '50px', padding: '14px 28px', fontSize: '16px', fontWeight: 800,
                cursor: 'pointer', fontFamily: "'Nunito', sans-serif", transition: 'all 0.3s',
                backdropFilter: 'blur(8px)',
              }}>🎉 View Offers</button>
            </Link>
          </div>
        </div>
        <div style={{ fontSize: 'clamp(80px, 12vw, 140px)', animation: 'float 3s ease-in-out infinite', flexShrink: 0, display: 'none' }} className="hero-emoji">
          {slide.emoji}
        </div>
      </div>

      {/* Slide indicators */}
      <div style={{ position: 'absolute', bottom: '16px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '8px' }}>
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrentSlide(i)} style={{
            width: i === currentSlide ? '24px' : '8px', height: '8px',
            borderRadius: '50px', background: i === currentSlide ? 'white' : 'rgba(255,255,255,0.5)',
            border: 'none', cursor: 'pointer', transition: 'all 0.3s',
          }} />
        ))}
      </div>

      <style jsx>{`
        @media (min-width: 640px) { .hero-emoji { display: block !important; } }
      `}</style>
    </section>
  );
}

function CategoriesSection() {
  return (
    <section style={{ padding: '48px 16px', maxWidth: '1280px', margin: '0 auto' }}>
      <div className="section-header">
        <div>
          <h2 style={{ fontFamily: "'Baloo 2', sans-serif", fontSize: '28px', fontWeight: 800, color: '#1a1a2e' }}>
            🎯 Shop by Category
          </h2>
          <p style={{ color: '#6b7280', fontSize: '14px', marginTop: '4px' }}>Find the perfect toy for every child</p>
        </div>
        <Link href="/categories" style={{ textDecoration: 'none', color: '#FF6B6B', fontWeight: 700, fontSize: '14px' }}>View All →</Link>
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
        gap: '16px',
      }}>
        {categories.map((cat, i) => (
          <Link key={cat.name} href={`/categories?cat=${encodeURIComponent(cat.name)}`} style={{ textDecoration: 'none' }}>
            <div className="card-hover" style={{
              background: cat.bg, borderRadius: '20px', padding: '24px 16px',
              textAlign: 'center', cursor: 'pointer',
              border: `2px solid ${cat.color}22`,
              animationDelay: `${i * 100}ms`,
            }}>
              <div style={{ fontSize: '40px', marginBottom: '12px' }}>{cat.icon}</div>
              <div style={{ fontSize: '13px', fontWeight: 800, color: cat.color, lineHeight: 1.3 }}>{cat.name}</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function TrendingSection() {
  const trending = (products as Product[]).filter(p => p.trending);
  return (
    <section style={{ padding: '0 0 48px', background: 'white' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '48px 16px 0' }}>
        <div className="section-header">
          <div>
            <h2 style={{ fontFamily: "'Baloo 2', sans-serif", fontSize: '28px', fontWeight: 800, color: '#1a1a2e' }}>
              🔥 Trending Toys
            </h2>
            <p style={{ color: '#6b7280', fontSize: '14px', marginTop: '4px' }}>Most popular picks this week</p>
          </div>
          <Link href="/shop?sort=popular" style={{ textDecoration: 'none', color: '#FF6B6B', fontWeight: 700, fontSize: '14px' }}>See All →</Link>
        </div>
      </div>
      <div style={{ paddingLeft: '16px', paddingRight: '16px' }}>
        <div className="horizontal-scroll" style={{ maxWidth: '1280px', margin: '0 auto' }}>
          {trending.map(product => (
            <div key={product.id} style={{ minWidth: '200px', maxWidth: '220px', flexShrink: 0 }}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BestSellersSection() {
  const bestSellers = (products as Product[]).filter(p => p.badge === 'Best Seller');
  return (
    <section style={{ padding: '48px 16px', maxWidth: '1280px', margin: '0 auto' }}>
      <div className="section-header">
        <div>
          <h2 style={{ fontFamily: "'Baloo 2', sans-serif", fontSize: '28px', fontWeight: 800, color: '#1a1a2e' }}>
            ⭐ Best Sellers
          </h2>
          <p style={{ color: '#6b7280', fontSize: '14px', marginTop: '4px' }}>Top rated by parents & kids</p>
        </div>
        <Link href="/shop?badge=Best+Seller" style={{ textDecoration: 'none', color: '#FF6B6B', fontWeight: 700, fontSize: '14px' }}>View All →</Link>
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '20px',
      }}>
        {bestSellers.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

function FestivalOffersBanner() {
  const [timeLeft, setTimeLeft] = useState({ h: 11, m: 59, s: 59 });
  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(prev => {
      let { h, m, s } = prev;
      s--; if (s < 0) { s = 59; m--; } if (m < 0) { m = 59; h--; }
      if (h < 0) { h = 23; } return { h, m, s };
    }), 1000);
    return () => clearInterval(timer);
  }, []);
  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <section style={{ padding: '0 16px 48px', maxWidth: '1280px', margin: '0 auto' }}>
      <div style={{
        background: 'linear-gradient(135deg, #FF6B6B 0%, #ff8c42 30%, #FFD93D 70%, #4ECDC4 100%)',
        borderRadius: '24px', padding: '40px 32px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: '24px', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '200px', height: '200px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }} />
        <div style={{ position: 'relative' }}>
          <div style={{ background: 'white', color: '#FF6B6B', borderRadius: '50px', display: 'inline-block', padding: '4px 16px', fontSize: '13px', fontWeight: 800, marginBottom: '12px' }}>
            🎊 FESTIVAL SALE
          </div>
          <h2 style={{ fontFamily: "'Baloo 2', sans-serif", fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 900, color: 'white', lineHeight: 1.2, marginBottom: '8px' }}>
            Upto 50% OFF on All Toys!
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '16px', fontWeight: 600, marginBottom: '24px' }}>
            Limited time offer | Fast Delivery Across India
          </p>
          <Link href="/offers" style={{ textDecoration: 'none' }}>
            <button style={{
              background: 'white', color: '#FF6B6B', border: 'none', borderRadius: '50px',
              padding: '14px 32px', fontSize: '16px', fontWeight: 800, cursor: 'pointer',
              fontFamily: "'Nunito', sans-serif", boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
              transition: 'transform 0.3s',
            }}>🛍️ Shop Offers</button>
          </Link>
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontWeight: 700, fontSize: '14px', marginBottom: '12px' }}>⏰ OFFER ENDS IN</p>
          <div style={{ display: 'flex', gap: '8px' }}>
            {[['h', timeLeft.h], ['m', timeLeft.m], ['s', timeLeft.s]].map(([label, val]) => (
              <div key={String(label)} style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)', borderRadius: '16px', padding: '12px 16px', textAlign: 'center', minWidth: '64px' }}>
                <div style={{ fontSize: '32px', fontWeight: 900, color: 'white', fontFamily: "'Baloo 2', sans-serif", lineHeight: 1 }}>{pad(Number(val))}</div>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.8)', fontWeight: 700, textTransform: 'uppercase' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function VideoSection() {
  const videos = [
    { id: 1, title: 'RC Monster Truck Action!', views: '1.2M', emoji: '🎮', color: '#FF6B6B' },
    { id: 2, title: 'Piano Keyboard Fun 🎵', views: '890K', emoji: '🎹', color: '#8b5cf6' },
    { id: 3, title: 'STEM Blocks Challenge', views: '675K', emoji: '🏗️', color: '#4ECDC4' },
    { id: 4, title: 'Baby Sensory Mat Play', views: '445K', emoji: '🍼', color: '#f59e0b' },
  ];

  return (
    <section style={{ padding: '48px 16px', background: '#1a1a2e', marginBottom: '0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 style={{ fontFamily: "'Baloo 2', sans-serif", fontSize: '28px', fontWeight: 800, color: 'white', marginBottom: '8px' }}>
            🎬 Viral Toy Videos
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>Watch kids go crazy with our toys!</p>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '16px',
        }}>
          {videos.map(v => (
            <div key={v.id} style={{
              background: `linear-gradient(135deg, ${v.color}33 0%, ${v.color}11 100%)`,
              border: `2px solid ${v.color}44`,
              borderRadius: '20px',
              aspectRatio: '9/16',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', transition: 'all 0.3s',
              position: 'relative', overflow: 'hidden',
              maxHeight: '280px',
            }}>
              <div style={{ fontSize: '56px', marginBottom: '16px' }}>{v.emoji}</div>
              <div style={{
                position: 'absolute', width: '56px', height: '56px',
                background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)',
                borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '24px', cursor: 'pointer',
              }}>▶</div>
              <div style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px' }}>
                <div style={{ color: 'white', fontWeight: 800, fontSize: '13px', marginBottom: '4px' }}>{v.title}</div>
                <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px' }}>👁 {v.views} views</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewsSection() {
  return (
    <section style={{ padding: '48px 16px', maxWidth: '1280px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h2 style={{ fontFamily: "'Baloo 2', sans-serif", fontSize: '28px', fontWeight: 800, color: '#1a1a2e', marginBottom: '8px' }}>
          💬 What Parents Say
        </h2>
        <p style={{ color: '#6b7280', fontSize: '14px' }}>Join 10,000+ happy families across India</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '12px' }}>
          {[1, 2, 3, 4, 5].map(i => <span key={i} style={{ fontSize: '24px', color: '#FFD93D' }}>★</span>)}
          <span style={{ fontWeight: 800, color: '#1a1a2e', fontSize: '20px' }}>4.9</span>
          <span style={{ color: '#6b7280' }}>(10,000+ reviews)</span>
        </div>
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: '20px',
      }}>
        {reviews.map((r, i) => (
          <div key={i} style={{
            background: 'white', borderRadius: '20px', padding: '24px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
            transition: 'transform 0.3s, box-shadow 0.3s',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ width: '48px', height: '48px', background: 'linear-gradient(135deg, #FF6B6B, #ff8c42)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>{r.avatar}</div>
              <div>
                <div style={{ fontWeight: 800, color: '#1a1a2e' }}>{r.name}</div>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>📍 {r.location}</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '2px', marginBottom: '12px' }}>
              {[1, 2, 3, 4, 5].map(s => <span key={s} style={{ color: s <= r.rating ? '#FFD93D' : '#d1d5db', fontSize: '16px' }}>★</span>)}
            </div>
            <p style={{ color: '#374151', fontSize: '14px', lineHeight: 1.6, fontStyle: 'italic' }}>"{r.text}"</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function InstagramSection() {
  const photos = [
    'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=300&q=80',
    'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=300&q=80',
    'https://images.unsplash.com/photo-1512733596533-7b00d187b4b9?w=300&q=80',
    'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=300&q=80',
    'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=300&q=80',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=80',
  ];
  return (
    <section style={{ padding: '48px 16px', background: 'white' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontFamily: "'Baloo 2', sans-serif", fontSize: '28px', fontWeight: 800, color: '#1a1a2e', marginBottom: '8px' }}>
            📸 Instagram Feed
          </h2>
          <p style={{ color: '#6b7280', fontSize: '14px' }}>Follow us @happykidstoys for daily toy inspiration</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', maxWidth: '720px', margin: '0 auto' }}>
          {photos.map((src, i) => (
            <a key={i} href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{
              aspectRatio: '1', display: 'block', overflow: 'hidden',
              borderRadius: '12px', position: 'relative',
            }}>
              <img src={src} alt="Instagram photo" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s', display: 'block' }}
                onMouseEnter={e => (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.08)'}
                onMouseLeave={e => (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.3s', color: 'white', fontSize: '24px' }} className="insta-overlay">📷</div>
            </a>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <button style={{
              background: 'linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
              color: 'white', border: 'none', borderRadius: '50px',
              padding: '12px 32px', fontSize: '15px', fontWeight: 800,
              cursor: 'pointer', fontFamily: "'Nunito', sans-serif",
            }}>📷 Follow @happykidstoys</button>
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const [email, setEmail] = useState('');
  return (
    <footer style={{ background: '#1a1a2e', color: 'white', padding: '48px 16px 80px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '40px', marginBottom: '40px' }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{ width: '44px', height: '44px', background: 'linear-gradient(135deg, #FF6B6B, #ff8c42)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>🧸</div>
              <div>
                <div style={{ fontFamily: "'Baloo 2', sans-serif", fontSize: '20px', fontWeight: 800, color: '#FF6B6B' }}>Happy Kids</div>
                <div style={{ fontSize: '10px', color: '#4ECDC4', fontWeight: 700, letterSpacing: '1px' }}>TOYS</div>
              </div>
            </div>
            <p style={{ color: '#9ca3af', fontSize: '14px', lineHeight: 1.7 }}>Bringing joy to children across India with safe, educational, and fun toys.</p>
            <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
              {['📘', '📷', '🐦', '▶️'].map((icon, i) => (
                <div key={i} style={{ width: '36px', height: '36px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', cursor: 'pointer', transition: 'background 0.2s' }}>{icon}</div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#FFD93D', marginBottom: '16px' }}>Quick Links</h3>
            {['Home', 'Shop', 'Categories', 'Offers', 'About Us', 'Contact'].map(link => (
              <Link key={link} href={`/${link.toLowerCase().replace(' ', '-')}`} style={{ display: 'block', color: '#9ca3af', textDecoration: 'none', marginBottom: '10px', fontSize: '14px', fontWeight: 600, transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = '#FF6B6B'}
                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = '#9ca3af'}
              >→ {link}</Link>
            ))}
          </div>

          {/* Categories */}
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#FFD93D', marginBottom: '16px' }}>Categories</h3>
            {categories.map(c => (
              <Link key={c.name} href={`/categories?cat=${encodeURIComponent(c.name)}`} style={{ display: 'block', color: '#9ca3af', textDecoration: 'none', marginBottom: '10px', fontSize: '14px', fontWeight: 600, transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = '#4ECDC4'}
                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = '#9ca3af'}
              >{c.icon} {c.name}</Link>
            ))}
          </div>

          {/* Contact + Newsletter */}
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#FFD93D', marginBottom: '16px' }}>Contact & Newsletter</h3>
            <div style={{ color: '#9ca3af', fontSize: '14px', lineHeight: 2 }}>
              <div>📞 +91 98765 43210</div>
              <div>✉️ hello@happykidstoys.in</div>
              <div>📍 Mumbai, India</div>
              <div>⏰ 9 AM - 7 PM (Mon-Sat)</div>
            </div>
            <div style={{ marginTop: '20px' }}>
              <p style={{ color: '#d1d5db', fontSize: '13px', fontWeight: 700, marginBottom: '10px' }}>Subscribe for exclusive deals!</p>
              <form onSubmit={e => { e.preventDefault(); setEmail(''); }} style={{ display: 'flex', gap: '8px' }}>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com"
                  style={{ flex: 1, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '10px', padding: '10px 14px', color: 'white', fontFamily: "'Nunito', sans-serif", fontSize: '13px', outline: 'none' }} />
                <button type="submit" style={{ background: '#FF6B6B', border: 'none', borderRadius: '10px', padding: '10px 14px', color: 'white', cursor: 'pointer', fontWeight: 700, fontSize: '13px', fontFamily: "'Nunito', sans-serif" }}>Go!</button>
              </form>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <p style={{ color: '#6b7280', fontSize: '13px' }}>© 2026 Happy Kids Toys. All rights reserved. Made with ❤️ in India</p>
          <div style={{ display: 'flex', gap: '16px' }}>
            {['Privacy Policy', 'Terms', 'Shipping Policy'].map(t => (
              <a key={t} href="#" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '12px', fontWeight: 600 }}>{t}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <CategoriesSection />
      <TrendingSection />
      <BestSellersSection />
      <FestivalOffersBanner />
      <VideoSection />
      <ReviewsSection />
      <InstagramSection />
      <Footer />
    </>
  );
}
