import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const result = await login(username, password);
        if (result.success) {
            navigate('/');
        } else {
            setError(result.message);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(120deg, var(--blue) 0%, var(--violet) 100%)',
            padding: '24px'
        }}>
            <div style={{
                background: 'var(--white)',
                padding: '40px',
                borderRadius: 'var(--radius)',
                boxShadow: 'var(--shadow)',
                maxWidth: '400px',
                width: '100%'
            }}>
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <h2 style={{
                        fontFamily: 'Playfair Display, serif',
                        color: 'var(--blue)',
                        fontSize: '2rem'
                    }}>Bienvenido</h2>
                    <p style={{ color: 'var(--text-sm)', marginTop: '8px' }}>Ingresá a la plataforma institucional</p>
                </div>

                {error && (
                    <div style={{
                        background: '#fee2e2',
                        color: '#dc2626',
                        padding: '12px',
                        borderRadius: '8px',
                        marginBottom: '20px',
                        fontSize: '0.9rem',
                        fontWeight: '700',
                        textAlign: 'center'
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '700', fontSize: '0.9rem' }}>Usuario</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                borderRadius: '8px',
                                border: '1px solid #e2e8f0',
                                fontSize: '1rem'
                            }}
                            placeholder="Tu usuario"
                            required
                        />
                    </div>
                    <div style={{ marginBottom: '32px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '700', fontSize: '0.9rem' }}>Contraseña</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                borderRadius: '8px',
                                border: '1px solid #e2e8f0',
                                fontSize: '1rem'
                            }}
                            placeholder="********"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-violet" style={{ width: '100%', justifyContent: 'center', padding: '14px' }}>
                        Ingresar →
                    </button>
                </form>

                <div style={{ marginTop: '24px', textAlign: 'center' }}>
                    <a href="/" style={{ color: 'var(--blue)', fontWeight: '700', fontSize: '0.85rem' }}>← Volver al inicio</a>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
