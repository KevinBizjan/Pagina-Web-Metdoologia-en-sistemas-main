import { useEffect } from 'react';

const Toast = ({ message, type = 'success', onClose, duration = 3500 }) => {
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                if (onClose) onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [message, duration, onClose]);

    if (!message) return null;

    const isSuccess = type === 'success';
    const isError = type === 'error';
    const isWarning = type === 'warning';

    const bg = isSuccess ? '#166534' : isError ? '#991b1b' : isWarning ? '#854d0e' : '#1e40af';
    const icon = isSuccess ? '✅' : isError ? '❌' : isWarning ? '⚠️' : 'ℹ️';

    return (
        <div style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '14px 20px',
            borderRadius: '12px',
            background: bg,
            color: '#ffffff',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.25), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
            fontSize: '0.9rem',
            fontWeight: 700,
            animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            maxWidth: '450px'
        }}>
            <span style={{ fontSize: '1.2rem' }}>{icon}</span>
            <span style={{ flex: 1, lineHeight: 1.4 }}>{message}</span>
            <button
                onClick={onClose}
                style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#ffffff',
                    fontSize: '1.1rem',
                    cursor: 'pointer',
                    opacity: 0.8,
                    padding: '0 4px',
                    lineHeight: 1
                }}
            >
                ✕
            </button>
        </div>
    );
};

export default Toast;
