'use client';
import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'whatsapp';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    fullWidth?: boolean;
    loading?: boolean;
    icon?: React.ReactNode;
    children: React.ReactNode;
}

const VARIANTS: Record<ButtonVariant, React.CSSProperties> = {
    primary: {
        background: 'linear-gradient(135deg, #FF6B6B 0%, #ff8c42 100%)',
        color: 'white',
        border: 'none',
        boxShadow: '0 4px 15px rgba(255,107,107,0.35)',
    },
    secondary: {
        background: 'linear-gradient(135deg, #4ECDC4 0%, #06b6d4 100%)',
        color: 'white',
        border: 'none',
        boxShadow: '0 4px 15px rgba(78,205,196,0.35)',
    },
    outline: {
        background: 'transparent',
        color: '#FF6B6B',
        border: '2px solid #FF6B6B',
        boxShadow: 'none',
    },
    ghost: {
        background: '#f3f4f6',
        color: '#374151',
        border: 'none',
        boxShadow: 'none',
    },
    danger: {
        background: 'linear-gradient(135deg, #ef4444, #dc2626)',
        color: 'white',
        border: 'none',
        boxShadow: '0 4px 15px rgba(239,68,68,0.3)',
    },
    whatsapp: {
        background: 'linear-gradient(135deg, #25d366 0%, #128C7E 100%)',
        color: 'white',
        border: 'none',
        boxShadow: '0 4px 15px rgba(37,211,102,0.35)',
    },
};

const SIZES: Record<ButtonSize, React.CSSProperties> = {
    sm: { padding: '8px 18px', fontSize: '13px' },
    md: { padding: '12px 24px', fontSize: '15px' },
    lg: { padding: '16px 32px', fontSize: '17px' },
};

export default function Button({
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    loading = false,
    icon,
    children,
    disabled,
    style,
    ...props
}: ButtonProps) {
    const [hovered, setHovered] = React.useState(false);

    return (
        <button
            {...props}
            disabled={disabled || loading}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 700,
                borderRadius: '50px',
                cursor: disabled || loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                width: fullWidth ? '100%' : 'auto',
                opacity: disabled || loading ? 0.7 : 1,
                transform: hovered && !disabled && !loading ? 'translateY(-2px)' : 'none',
                ...VARIANTS[variant],
                ...SIZES[size],
                ...style,
            }}
        >
            {loading ? (
                <span style={{ display: 'inline-block', animation: 'spin-slow 1s linear infinite' }}>⟳</span>
            ) : icon}
            {children}
        </button>
    );
}
