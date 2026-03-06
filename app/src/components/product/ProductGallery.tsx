'use client';
import { useState } from 'react';

interface ProductGalleryProps {
    images: string[];
    mainImage: string;
    productName: string;
}

export default function ProductGallery({ images, mainImage, productName }: ProductGalleryProps) {
    const [selectedIdx, setSelectedIdx] = useState(0);
    const [zoomed, setZoomed] = useState(false);
    const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });

    const allImages = images.length > 0 ? images : [mainImage];
    const currentImage = allImages[selectedIdx] || mainImage;

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!zoomed) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setZoomPos({ x, y });
    };

    return (
        <div>
            {/* Main image */}
            <div
                onClick={() => setZoomed(!zoomed)}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setZoomed(false)}
                style={{
                    borderRadius: '24px', overflow: 'hidden',
                    aspectRatio: '1', background: '#f9fafb',
                    cursor: zoomed ? 'zoom-out' : 'zoom-in',
                    position: 'relative', marginBottom: '16px',
                }}
            >
                <img
                    src={currentImage}
                    alt={productName}
                    style={{
                        width: '100%', height: '100%', objectFit: 'cover',
                        transition: zoomed ? 'none' : 'transform 0.3s',
                        transform: zoomed ? `scale(2.5)` : 'scale(1)',
                        transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                    }}
                />
                {!zoomed && (
                    <div style={{
                        position: 'absolute', bottom: '16px', right: '16px',
                        background: 'rgba(0,0,0,0.5)', color: 'white',
                        borderRadius: '50px', padding: '8px 16px',
                        fontSize: '12px', fontWeight: 700,
                        backdropFilter: 'blur(4px)',
                    }}>🔍 Click to zoom</div>
                )}
            </div>

            {/* Thumbnails */}
            {allImages.length > 1 && (
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    {allImages.map((img, i) => (
                        <div key={i} onClick={() => setSelectedIdx(i)} style={{
                            width: '72px', height: '72px', borderRadius: '14px', overflow: 'hidden',
                            cursor: 'pointer',
                            border: `3px solid ${selectedIdx === i ? '#FF6B6B' : 'transparent'}`,
                            transition: 'all 0.2s', background: '#f9fafb',
                            opacity: selectedIdx === i ? 1 : 0.7,
                        }}>
                            <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
