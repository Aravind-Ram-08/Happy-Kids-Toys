import React from 'react';

type BadgeColor = 'red' | 'green' | 'yellow' | 'teal' | 'purple' | 'orange' | 'blue';

interface BadgeProps {
    children: React.ReactNode;
    color?: BadgeColor;
    size?: 'sm' | 'md';
    style?: React.CSSProperties;
}

const COLOR_MAP: Record<BadgeColor, { background: string; color: string }> = {
    red: { background: '#FF6B6B', color: 'white' },
    green: { background: '#22c55e', color: 'white' },
    yellow: { background: '#FFD93D', color: '#1a1a2e' },
    teal: { background: '#4ECDC4', color: 'white' },
    purple: { background: '#8b5cf6', color: 'white' },
    orange: { background: '#ff8c42', color: 'white' },
    blue: { background: '#3b82f6', color: 'white' },
};

export default function Badge({ children, color = 'red', size = 'md', style }: BadgeProps) {
    const colors = COLOR_MAP[color];

    return (
        <span
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '3px',
                padding: size === 'sm' ? '2px 8px' : '3px 10px',
                borderRadius: '50px',
                fontSize: size === 'sm' ? '10px' : '11px',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                ...colors,
                ...style,
            }}
        >
            {children}
        </span>
    );
}

// Predefined badge for product badges
export function ProductBadge({ badge, style }: { badge: string; style?: React.CSSProperties }) {
    const colorMap: Record<string, BadgeColor> = {
        'Best Seller': 'red',
        'Hot Selling': 'orange',
        'Trending': 'purple',
        'New Arrival': 'teal',
    };
    return <Badge color={colorMap[badge] || 'red'} style={style}>{badge}</Badge>;
}
