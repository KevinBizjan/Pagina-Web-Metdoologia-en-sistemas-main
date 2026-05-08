import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const DashboardLayout = ({ title, children }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg)', fontFamily: 'Nunito, sans-serif' }}>
            {/* Header del Dashboard */}
            <header style={{ 
                background: 'var(--white)', 
                padding: '16px 24px', 
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'sticky',
                top: 0,
                zIndex: 100
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div className="logo-icon" style={{ width: '40px', height: '40px', fontSize: '1.2rem' }}>🎓</div>
                    <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.4rem', color: 'var(--blue)', margin: 0 }}>{title}</h1>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-sm)' }}>Hola, {user?.nombre}</span>
                    <button onClick={() => navigate('/')} className="btn" style={{ background: '#f1f5f9', fontSize: '0.8rem', padding: '8px 14px' }}>Inicio</button>
                    <button onClick={handleLogout} className="btn btn-violet" style={{ fontSize: '0.8rem', padding: '8px 14px' }}>Salir</button>
                </div>
            </header>

            {/* Contenido Principal */}
            <main style={{ padding: '32px 24px', maxWidth: '1200px', margin: '0 auto' }}>
                {children}
            </main>
        </div>
    );
};

export default DashboardLayout;
