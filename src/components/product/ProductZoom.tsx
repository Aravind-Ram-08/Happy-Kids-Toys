'use client';
import { useState } from 'react';

interface ProductZoomProps {
    src: string;
    alt: string;
}

export default function ProductZoom({ src, alt }: ProductZoomProps) {
    const [isZoomed, setIsZoomed] = useState(false);
    const [pos, setPos] = useState({ x: 50, y: 50 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setPos({
            x: ((e.clientX - rect.left) / rect.width) * 100,
            y: ((e.clientY - rect.top) / rect.height) * 100,
        });
    };

    return (
        <div style={{ position: 'relative' }}>
            <div
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
                onMouseMove={handleMouseMove}
                style={{
                    borderRadius: '20px', overflow: 'hidden',
                    cursor: 'crosshair', aspectRatio: '1',
                    background: '#f9fafb',
                }}
            >
                <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            {/* Zoom lens preview */}
            {isZoomed && (
                <div style={{
                    position: 'absolute', top: 0, left: 'calc(100% + 16px)',
                    width: '320px', height: '320px', borderRadius: '20px',
                    overflow: 'hidden', border: '2px solid #f0f0f0',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
                    background: '#f9fafb', zIndex: 50,
                    display: 'block',
                }}>
                    <img src={src} alt={alt} style={{
                        width: '250%', height: '250%', objectFit: 'cover',
                        transform: `translate(-${pos.x}%, -${pos.y}%)`,
                        transformOrigin: '0 0',
                        position: 'absolute',
                        left: `${pos.x}%`, top: `${pos.y}%`,
                    }} />
                </div>
            )}
        </div>
    );
}
