'use client';
export default function AboutPage() {
    const milestones = [
        { year: '2018', title: 'Founded', desc: 'Happy Kids Toys was born with a dream to bring joy to every child in India.' },
        { year: '2020', title: '10,000+ Customers', desc: 'Reached our first major milestone with happy families across 100+ cities.' },
        { year: '2022', title: 'Best Toy Store Award', desc: 'Recognized as one of the best online toy stores in India.' },
        { year: '2024', title: 'Pan-India Delivery', desc: 'Now delivering to all 28 states and 8 UTs across India.' },
    ];

    const team = [
        { name: 'Rajesh Kumar', role: 'Founder & CEO', emoji: '👨‍💼', bio: 'Passionate about education and play, started HKT to make quality toys accessible to all.' },
        { name: 'Meena Rajesh', role: 'Head of Curation', emoji: '👩‍🎨', bio: 'Child development expert who personally tests every toy for safety and fun factor.' },
        { name: 'Arjun Patel', role: 'Customer Success', emoji: '👨‍💻', bio: 'Ensures every order lands with a smile. The backbone of our WhatsApp support.' },
    ];

    return (
        <div>
            {/* Hero */}
            <div style={{ background: 'linear-gradient(135deg, #FF6B6B 0%, #ff8c42 50%, #FFD93D 100%)', padding: '64px 16px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-around', opacity: 0.08, fontSize: '80px', pointerEvents: 'none' }}>
                    {'🧸🎮📚🎵⚽🍼🎨🚀'.split('').map((e, i) => <span key={i}>{e}</span>)}
                </div>
                <div style={{ position: 'relative' }}>
                    <h1 style={{ fontFamily: "'Baloo 2', sans-serif", fontSize: 'clamp(32px, 6vw, 64px)', fontWeight: 900, color: 'white', marginBottom: '16px', lineHeight: 1.1 }}>
                        Making Kids Happy<br />Since 2018 🧸
                    </h1>
                    <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '18px', fontWeight: 600, maxWidth: '600px', margin: '0 auto' }}>
                        India's most trusted online toy store — bringing smiles to millions of children across the country.
                    </p>
                </div>
            </div>

            <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '48px 16px' }}>
                {/* Mission */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px', marginBottom: '64px', alignItems: 'center' }}>
                    <div>
                        <div style={{ display: 'inline-block', background: '#fff0f0', color: '#FF6B6B', borderRadius: '50px', padding: '8px 20px', fontSize: '14px', fontWeight: 800, marginBottom: '16px' }}>
                            🎯 OUR MISSION
                        </div>
                        <h2 style={{ fontFamily: "'Baloo 2', sans-serif", fontSize: '36px', fontWeight: 900, color: '#1a1a2e', lineHeight: 1.2, marginBottom: '20px' }}>
                            Every Child Deserves to Play & Learn
                        </h2>
                        <p style={{ color: '#374151', lineHeight: 1.8, fontSize: '16px', marginBottom: '16px' }}>
                            At Happy Kids Toys, we believe that play is the foundation of childhood development. Every toy we carry is carefully selected by child development experts to ensure it's not just fun — but also educational, safe, and long-lasting.
                        </p>
                        <p style={{ color: '#374151', lineHeight: 1.8, fontSize: '16px' }}>
                            Our mission is simple: to make premium, educational, and safe toys accessible and affordable for every family in India — no matter where they live.
                        </p>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        {[
                            { icon: '🏆', value: '10K+', label: 'Happy Families' },
                            { icon: '🚀', value: '500+', label: 'Products & Counting' },
                            { icon: '📍', value: '28', label: 'States Covered' },
                            { icon: '⭐', value: '4.9', label: 'Average Rating' },
                        ].map(stat => (
                            <div key={stat.label} style={{ background: 'white', borderRadius: '20px', padding: '24px', textAlign: 'center', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
                                <div style={{ fontSize: '36px', marginBottom: '8px' }}>{stat.icon}</div>
                                <div style={{ fontFamily: "'Baloo 2', sans-serif", fontSize: '28px', fontWeight: 900, color: '#FF6B6B' }}>{stat.value}</div>
                                <div style={{ fontSize: '13px', color: '#6b7280', fontWeight: 700 }}>{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Values */}
                <div style={{ marginBottom: '64px' }}>
                    <h2 style={{ fontFamily: "'Baloo 2', sans-serif", fontSize: '32px', fontWeight: 800, color: '#1a1a2e', textAlign: 'center', marginBottom: '32px' }}>
                        💡 Our Values
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
                        {[
                            { icon: '🔒', title: 'Safety First', desc: 'Every toy is tested for safety standards and is BPA-free, non-toxic, and child-safe.', color: '#4ECDC4' },
                            { icon: '📚', title: 'Educational Value', desc: 'We prioritize toys that stimulate learning, creativity, and cognitive development.', color: '#FF6B6B' },
                            { icon: '💚', title: 'Eco-Friendly', desc: 'Committed to sustainable packaging and environmentally responsible products.', color: '#22c55e' },
                            { icon: '🤝', title: 'Customer Love', desc: 'We go above and beyond — quick WhatsApp support, easy returns, fast delivery.', color: '#8b5cf6' },
                        ].map(v => (
                            <div key={v.title} style={{ background: 'white', borderRadius: '20px', padding: '28px 24px', boxShadow: '0 4px 16px rgba(0,0,0,0.06)', transition: 'transform 0.3s', cursor: 'default', borderTop: `4px solid ${v.color}` }}
                                onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => e.currentTarget.style.transform = 'translateY(-6px)'}
                                onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => e.currentTarget.style.transform = 'none'}
                            >
                                <div style={{ fontSize: '40px', marginBottom: '16px' }}>{v.icon}</div>
                                <h3 style={{ fontWeight: 800, color: '#1a1a2e', marginBottom: '12px', fontSize: '17px' }}>{v.title}</h3>
                                <p style={{ color: '#6b7280', fontSize: '14px', lineHeight: 1.7 }}>{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Timeline */}
                <div style={{ marginBottom: '64px' }}>
                    <h2 style={{ fontFamily: "'Baloo 2', sans-serif", fontSize: '32px', fontWeight: 800, color: '#1a1a2e', textAlign: 'center', marginBottom: '40px' }}>📅 Our Journey</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0', maxWidth: '600px', margin: '0 auto' }}>
                        {milestones.map((m, i) => (
                            <div key={m.year} style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <div style={{ width: '48px', height: '48px', background: 'linear-gradient(135deg, #FF6B6B, #ff8c42)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 900, fontSize: '13px', flexShrink: 0 }}>{m.year}</div>
                                    {i < milestones.length - 1 && <div style={{ width: '2px', height: '40px', background: '#e5e7eb', margin: '4px 0' }} />}
                                </div>
                                <div style={{ paddingBottom: '24px' }}>
                                    <div style={{ fontWeight: 800, color: '#1a1a2e', fontSize: '17px', marginBottom: '4px' }}>{m.title}</div>
                                    <div style={{ color: '#6b7280', fontSize: '14px', lineHeight: 1.6 }}>{m.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Team */}
                <div>
                    <h2 style={{ fontFamily: "'Baloo 2', sans-serif", fontSize: '32px', fontWeight: 800, color: '#1a1a2e', textAlign: 'center', marginBottom: '32px' }}>👨‍👩‍👧 Meet the Team</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '24px' }}>
                        {team.map(member => (
                            <div key={member.name} style={{ background: 'white', borderRadius: '24px', padding: '32px 24px', textAlign: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.07)', transition: 'transform 0.3s' }}
                                onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => e.currentTarget.style.transform = 'translateY(-6px)'}
                                onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => e.currentTarget.style.transform = 'none'}
                            >
                                <div style={{ width: '80px', height: '80px', background: 'linear-gradient(135deg, #FF6B6B, #ff8c42)', borderRadius: '50%', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px' }}>{member.emoji}</div>
                                <h3 style={{ fontWeight: 800, color: '#1a1a2e', fontSize: '18px', marginBottom: '4px' }}>{member.name}</h3>
                                <div style={{ color: '#FF6B6B', fontWeight: 700, fontSize: '13px', marginBottom: '12px' }}>{member.role}</div>
                                <p style={{ color: '#6b7280', fontSize: '14px', lineHeight: 1.6 }}>{member.bio}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
