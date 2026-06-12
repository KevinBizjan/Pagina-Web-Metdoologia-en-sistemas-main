import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const RegistroPage = () => {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmar, setConfirmar] = useState('');
    const [error, setError] = useState('');
    const [exito, setExito] = useState('');
    const [cargando, setCargando] = useState(false);
    const { registrar, user } = useAuth();
    const navigate = useNavigate();

    // Si ya hay sesión iniciada, no tiene sentido mostrar el registro.
    useEffect(() => {
        if (user) navigate('/padre');
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setExito('');

        // Validaciones en el navegador (avisos rápidos antes de llamar al servidor)
        const nombreLimpio = nombre.trim();
        const emailLimpio = email.trim().toLowerCase();

        if (!nombreLimpio || !emailLimpio || !password) {
            return setError('Completá todos los campos.');
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailLimpio)) {
            return setError('Ingresá un correo electrónico válido.');
        }
        if (password.length < 6) {
            return setError('La contraseña debe tener al menos 6 caracteres.');
        }
        if (password !== confirmar) {
            return setError('Las contraseñas no coinciden.');
        }

        setCargando(true);
        const result = await registrar(nombreLimpio, emailLimpio, password);
        setCargando(false);

        if (result.success) {
            setExito('¡Cuenta creada! Ya podés iniciar sesión. Redirigiendo...');
            setTimeout(() => navigate('/login?role=padre'), 1800);
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
            background: 'linear-gradient(135deg, #1a5fa8 0%, #7c3aed 100%)',
            padding: '24px',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Decoración de fondo */}
            <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: '40%', height: '40%', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }}></div>
            <div style={{ position: 'absolute', bottom: '-10%', right: '-5%', width: '30%', height: '30%', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }}></div>

            <div style={{
                background: 'var(--white)',
                padding: '40px',
                borderRadius: '24px',
                boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
                maxWidth: '450px',
                width: '100%',
                position: 'relative',
                zIndex: 1
            }}>
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <div style={{
                        width: '64px', height: '64px', background: 'var(--bg)', borderRadius: '16px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem',
                        margin: '0 auto 16px'
                    }}>👨‍👩‍👧</div>
                    <h2 style={{
                        fontFamily: 'Playfair Display, serif',
                        color: 'var(--blue)',
                        fontSize: '2.2rem',
                        marginBottom: '8px'
                    }}>
                        Crear Cuenta Familiar
                    </h2>
                    <p style={{ color: 'var(--text-sm)', fontWeight: 600 }}>
                        Registrate y luego vinculá el legajo de tu hijo/a
                    </p>
                </div>

                {error && (
                    <div style={{
                        background: '#fee2e2', color: '#dc2626', padding: '14px', borderRadius: '12px',
                        marginBottom: '24px', fontSize: '0.9rem', fontWeight: '700', textAlign: 'center', border: '1px solid #fecaca'
                    }}>
                        {error}
                    </div>
                )}
                {exito && (
                    <div style={{
                        background: '#dcfce7', color: '#16a34a', padding: '14px', borderRadius: '12px',
                        marginBottom: '24px', fontSize: '0.9rem', fontWeight: '700', textAlign: 'center', border: '1px solid #bbf7d0'
                    }}>
                        {exito}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={labelStyle}>Nombre y Apellido</label>
                        <input
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            style={inputStyle}
                            placeholder="Ej: María González"
                            required
                        />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={labelStyle}>Correo electrónico</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={inputStyle}
                            placeholder="tucorreo@ejemplo.com"
                            required
                        />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={labelStyle}>Contraseña</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={inputStyle}
                            placeholder="Mínimo 6 caracteres"
                            required
                        />
                    </div>
                    <div style={{ marginBottom: '32px' }}>
                        <label style={labelStyle}>Repetir contraseña</label>
                        <input
                            type="password"
                            value={confirmar}
                            onChange={(e) => setConfirmar(e.target.value)}
                            style={inputStyle}
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <button type="submit" disabled={cargando} className="btn btn-violet" style={{
                        width: '100%', justifyContent: 'center', padding: '16px', fontSize: '1.1rem',
                        boxShadow: '0 10px 20px rgba(124,58,237,0.3)', opacity: cargando ? 0.7 : 1
                    }}>
                        {cargando ? 'Creando cuenta...' : 'Crear Cuenta →'}
                    </button>
                </form>

                <div style={{ marginTop: '32px', textAlign: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '24px' }}>
                    <p style={{ color: 'var(--text-sm)', fontSize: '0.9rem', marginBottom: '8px' }}>¿Ya tenés cuenta?</p>
                    <a href="/login?role=padre" style={{ color: 'var(--blue)', fontWeight: '800', fontSize: '0.9rem' }}>
                        Iniciar sesión
                    </a>
                </div>

                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    <a href="/" style={{ color: 'var(--blue)', fontWeight: '800', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                        <span>←</span> Volver al inicio
                    </a>
                </div>
            </div>
        </div>
    );
};

const labelStyle = { display: 'block', marginBottom: '8px', fontWeight: '800', fontSize: '0.85rem', color: 'var(--text-sm)', textTransform: 'uppercase' };
const inputStyle = {
    width: '100%', padding: '14px 18px', borderRadius: '12px', border: '2px solid #f1f5f9',
    fontSize: '1rem', outline: 'none', transition: 'border-color 0.2s'
};

export default RegistroPage;
