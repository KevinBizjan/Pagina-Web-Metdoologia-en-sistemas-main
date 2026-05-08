import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const [preinscripciones, setPreinscripciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const { logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        fetchPreinscripciones();
    }, []);

    const fetchPreinscripciones = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('https://pagina-web-metdoologia-en-sistemas-main.onrender.com/api/preinscripciones', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (response.ok) {
                setPreinscripciones(data);
            }
        } catch (error) {
            console.error('Error fetching preinscripciones:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id, nuevoEstado) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`https://pagina-web-metdoologia-en-sistemas-main.onrender.com/api/preinscripciones/${id}/status`, {
                method: 'PATCH',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                },
                body: JSON.stringify({ estado: nuevoEstado })
            });
            if (response.ok) {
                fetchPreinscripciones();
            }
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'Nunito, sans-serif' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h1 style={{ fontFamily: 'Playfair Display, serif', color: 'var(--blue)' }}>Panel de Administración</h1>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={() => navigate('/')} className="btn" style={{ background: '#e2e8f0' }}>Inicio</button>
                    <button onClick={logout} className="btn btn-violet">Cerrar Sesión</button>
                </div>
            </div>

            <h2 style={{ marginBottom: '20px', fontSize: '1.2rem' }}>Listado de Preinscripciones</h2>

            {loading ? (
                <p>Cargando preinscripciones...</p>
            ) : (
                <div style={{ overflowX: 'auto', background: 'white', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                                <th style={thStyle}>Fecha</th>
                                <th style={thStyle}>Alumno</th>
                                <th style={thStyle}>Nivel/Turno</th>
                                <th style={thStyle}>Tutor/Contacto</th>
                                <th style={thStyle}>Estado</th>
                                <th style={thStyle}>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {preinscripciones.map((p) => (
                                <tr key={p.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                    <td style={tdStyle}>{new Date(p.fecha).toLocaleDateString()}</td>
                                    <td style={tdStyle}>
                                        <strong>{p.alumno_nombre}</strong><br />
                                        <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{p.alumno_edad} años</span>
                                    </td>
                                    <td style={tdStyle}>
                                        {p.nivel}<br />
                                        <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{p.turno}</span>
                                    </td>
                                    <td style={tdStyle}>
                                        {p.tutor_nombre}<br />
                                        <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{p.tutor_telefono} | {p.tutor_email}</span>
                                    </td>
                                    <td style={tdStyle}>
                                        <span style={{
                                            padding: '4px 8px',
                                            borderRadius: '20px',
                                            fontSize: '0.75rem',
                                            fontWeight: '700',
                                            textTransform: 'uppercase',
                                            backgroundColor: getStatusColor(p.estado).bg,
                                            color: getStatusColor(p.estado).text
                                        }}>
                                            {p.estado}
                                        </span>
                                    </td>
                                    <td style={tdStyle}>
                                        <select 
                                            value={p.estado} 
                                            onChange={(e) => updateStatus(p.id, e.target.value)}
                                            style={{ padding: '4px', borderRadius: '4px', fontSize: '0.8rem' }}
                                        >
                                            <option value="pendiente">Pendiente</option>
                                            <option value="contactado">Contactado</option>
                                            <option value="entrevista">Entrevista</option>
                                            <option value="inscripto">Inscripto</option>
                                            <option value="rechazado">Rechazado</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

const thStyle = { padding: '16px', fontSize: '0.9rem', color: '#475569' };
const tdStyle = { padding: '16px', fontSize: '0.9rem' };

const getStatusColor = (status) => {
    switch (status) {
        case 'pendiente': return { bg: '#fef3c7', text: '#92400e' };
        case 'contactado': return { bg: '#dcfce7', text: '#166534' };
        case 'entrevista': return { bg: '#dbeafe', text: '#1e40af' };
        case 'inscripto': return { bg: '#f0f9ff', text: '#0369a1' };
        case 'rechazado': return { bg: '#fee2e2', text: '#991b1b' };
        default: return { bg: '#f1f5f9', text: '#475569' };
    }
};

export default AdminDashboard;
