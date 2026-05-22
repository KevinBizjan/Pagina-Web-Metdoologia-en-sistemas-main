import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../components/DashboardLayout';

const AdminDashboard = () => {
    const [preinscripciones, setPreinscripciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const { logout } = useAuth();

    useEffect(() => {
        fetchPreinscripciones();
    }, []);

    const fetchPreinscripciones = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3000/api/preinscripciones', {
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
            const response = await fetch(`http://localhost:3000/api/preinscripciones/${id}/status`, {
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
        <DashboardLayout title="Panel de Administración">
            {/* Estadísticas Rápidas */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '32px' }}>
                <div className="dashboard-card" style={{ ...cardStyle, borderLeft: '4px solid var(--blue)' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-sm)', textTransform: 'uppercase' }}>Total Preinscripciones</span>
                    <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--blue)', marginTop: '8px' }}>{preinscripciones.length}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--green)', marginTop: '4px', fontWeight: 700 }}>↑ 12% este mes</div>
                </div>
                <div className="dashboard-card" style={{ ...cardStyle, borderLeft: '4px solid var(--orange)' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-sm)', textTransform: 'uppercase' }}>Pendientes</span>
                    <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--orange)', marginTop: '8px' }}>
                        {preinscripciones.filter(p => p.estado === 'pendiente').length}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-sm)', marginTop: '4px' }}>Requieren atención inmediata</div>
                </div>
                <div className="dashboard-card" style={{ ...cardStyle, borderLeft: '4px solid var(--green)' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-sm)', textTransform: 'uppercase' }}>Inscriptos</span>
                    <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--green)', marginTop: '8px' }}>
                        {preinscripciones.filter(p => p.estado === 'inscripto').length}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-sm)', marginTop: '4px' }}>Ciclo Lectivo 2027</div>
                </div>
            </div>

            <div style={{ background: 'var(--white)', padding: '24px', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <h2 style={{ fontSize: '1.25rem', color: 'var(--blue)', fontWeight: 800 }}>Gestión de Preinscripciones</h2>
                    <button onClick={fetchPreinscripciones} className="btn btn-hero-outline" style={{ fontSize: '0.85rem', padding: '8px 16px' }}>🔄 Actualizar</button>
                </div>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '40px' }}>
                        <div className="loader" style={{ margin: '0 auto 16px' }}></div>
                        <p style={{ color: 'var(--text-sm)' }}>Cargando registros...</p>
                    </div>
                ) : (
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid #f1f5f9' }}>
                                    <th style={thStyle}>Fecha</th>
                                    <th style={thStyle}>Alumno/Edad</th>
                                    <th style={thStyle}>Nivel/Turno</th>
                                    <th style={thStyle}>Responsable/Contacto</th>
                                    <th style={thStyle}>Estado</th>
                                    <th style={thStyle}>Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {preinscripciones.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" style={{ textAlign: 'center', padding: '32px', color: 'var(--text-sm)' }}>No hay preinscripciones registradas.</td>
                                    </tr>
                                ) : (
                                    preinscripciones.map((p) => (
                                        <tr key={p.id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.2s' }}>
                                            <td style={tdStyle}>{new Date(p.fecha).toLocaleDateString()}</td>
                                            <td style={tdStyle}>
                                                <div style={{ fontWeight: 700, color: 'var(--blue)' }}>{p.alumno_nombre}</div>
                                                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{p.alumno_edad} años</div>
                                            </td>
                                            <td style={tdStyle}>
                                                <div>{p.nivel}</div>
                                                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{p.turno}</div>
                                            </td>
                                            <td style={tdStyle}>
                                                <div style={{ fontWeight: 600 }}>{p.tutor_nombre}</div>
                                                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{p.tutor_telefono}</div>
                                                <div style={{ fontSize: '0.8rem', color: 'var(--blue)' }}>{p.tutor_email}</div>
                                            </td>
                                            <td style={tdStyle}>
                                                <span style={{
                                                    padding: '6px 12px',
                                                    borderRadius: '20px',
                                                    fontSize: '0.7rem',
                                                    fontWeight: '800',
                                                    textTransform: 'uppercase',
                                                    backgroundColor: getStatusColor(p.estado).bg,
                                                    color: getStatusColor(p.estado).text,
                                                    display: 'inline-block'
                                                }}>
                                                    {p.estado}
                                                </span>
                                            </td>
                                            <td style={tdStyle}>
                                                <select 
                                                    value={p.estado} 
                                                    onChange={(e) => updateStatus(p.id, e.target.value)}
                                                    style={{ 
                                                        padding: '6px 10px', 
                                                        borderRadius: '6px', 
                                                        fontSize: '0.8rem', 
                                                        border: '1px solid #e2e8f0',
                                                        outline: 'none',
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    <option value="pendiente">Pendiente</option>
                                                    <option value="contactado">Contactado</option>
                                                    <option value="entrevista">Entrevista</option>
                                                    <option value="inscripto">Inscripto</option>
                                                    <option value="rechazado">Rechazado</option>
                                                </select>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

const thStyle = { padding: '16px', fontSize: '0.85rem', color: '#64748b', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' };
const tdStyle = { padding: '16px', fontSize: '0.9rem', verticalAlign: 'top' };

const getStatusColor = (status) => {
    switch (status) {
        case 'pendiente': return { bg: '#fffbeb', text: '#92400e' };
        case 'contactado': return { bg: '#f0fdf4', text: '#166534' };
        case 'entrevista': return { bg: '#eff6ff', text: '#1e40af' };
        case 'inscripto': return { bg: '#f0f9ff', text: '#0369a1' };
        case 'rechazado': return { bg: '#fef2f2', text: '#991b1b' };
        default: return { bg: '#f8fafc', text: '#475569' };
    }
};

export default AdminDashboard;
