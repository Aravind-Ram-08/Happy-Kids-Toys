interface LoaderProps {
    text?: string;
    size?: 'sm' | 'md' | 'lg';
}

export default function Loader({ text = 'Loading...', size = 'md' }: LoaderProps) {
    const s = size === 'sm' ? 24 : size === 'lg' ? 48 : 36;
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', padding: '48px' }}>
            <div style={{
                width: `${s}px`, height: `${s}px`,
                border: '3px solid #f3f4f6',
                borderTop: '3px solid #FF6B6B',
                borderRadius: '50%',
                animation: 'spin-slow 0.8s linear infinite',
            }} />
            <p style={{ color: '#6b7280', fontWeight: 600, fontSize: size === 'sm' ? '13px' : '15px' }}>{text}</p>
        </div>
    );
}

export function SkeletonCard() {
    return (
        <div style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <div className="skeleton" style={{ aspectRatio: '1', width: '100%' }} />
            <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div className="skeleton" style={{ height: '12px', width: '40%' }} />
                <div className="skeleton" style={{ height: '14px', width: '80%' }} />
                <div className="skeleton" style={{ height: '12px', width: '60%' }} />
                <div className="skeleton" style={{ height: '32px', width: '100%', borderRadius: '50px' }} />
            </div>
        </div>
    );
}
