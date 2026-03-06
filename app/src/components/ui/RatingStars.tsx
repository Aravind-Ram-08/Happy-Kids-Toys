import React from 'react';

interface RatingStarsProps {
    rating: number;
    reviews?: number;
    size?: 'sm' | 'md' | 'lg';
    showText?: boolean;
    style?: React.CSSProperties;
}

export default function RatingStars({ rating, reviews, size = 'md', showText = true, style }: RatingStarsProps) {
    const fontSize = size === 'sm' ? '12px' : size === 'lg' ? '22px' : '15px';
    const textSize = size === 'sm' ? '11px' : size === 'lg' ? '16px' : '13px';

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', ...style }}>
            {[1, 2, 3, 4, 5].map(i => (
                <span
                    key={i}
                    style={{
                        fontSize,
                        color: i <= Math.round(rating) ? '#FFD93D' : '#d1d5db',
                        lineHeight: 1,
                    }}
                >
                    ★
                </span>
            ))}
            {showText && (
                <span style={{ fontSize: textSize, color: '#6b7280', marginLeft: '2px', fontWeight: 600 }}>
                    {rating}
                    {reviews !== undefined && ` (${reviews.toLocaleString()})`}
                </span>
            )}
        </div>
    );
}
