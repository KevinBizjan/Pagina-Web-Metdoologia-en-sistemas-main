import React from 'react';
import DashboardLayout from '../components/DashboardLayout';

const PadreDashboard = () => {
    const hijos = [
        { nombre: 'Pepe Alumno', grado: '4° Grado B', asistencia: '95%', cuota: 'Al día' }
    ];

    const avisos = [
        { fecha: '10/05', titulo: 'Reunión de Padres', desc: 'Próximo jueves 18:00hs en el salón de actos.' },
        { fecha: '08/05', titulo: 'Feria del Libro', desc: 'Invitamos a las familias a participar de la feria anual.' }
    ];

    return (
        <DashboardLayout title="Panel para Padres">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                {/* Información del Alumno */}
                <div style={cardStyle}>
                    <h3 style={cardTitleStyle}>👨‍👩‍👧 Seguimiento del Alumno</h3>
                    {hijos.map((h, i) => (
                        <div key={i} style={{ marginTop: '20px', padding: '16px', background: '#f8fafc', borderRadius: '12px' }}>
                            <p style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--blue)' }}>{h.nombre}</p>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-sm)' }}>{h.grado}</p>
                            
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '16px' }}>
                                <div style={infoBox}>
                                    <span style={labelStyle}>Asistencia</span>
                                    <span style={{ ...valueStyle, color: 'var(--green)' }}>{h.asistencia}</span>
                                </div>
                                <div style={infoBox}>
                                    <span style={labelStyle}>Estado Cuota</span>
                                    <span style={{ ...valueStyle, color: 'var(--blue)' }}>{h.cuota}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                    <button className="btn btn-violet" style={{ width: '100%', marginTop: '16px', fontSize: '0.85rem' }}>Ver Reporte Completo</button>
                </div>

                {/* Avisos Institucionales */}
                <div style={cardStyle}>
                    <h3 style={cardTitleStyle}>🔔 Avisos y Citaciones</h3>
                    <div style={{ marginTop: '16px' }}>
                        {avisos.map((a, i) => (
                            <div key={i} style={avisoStyle}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <p style={{ fontWeight: 800, fontSize: '0.95rem' }}>{a.titulo}</p>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-sm)' }}>{a.fecha}</span>
                                </div>
                                <p style={{ fontSize: '0.85rem', marginTop: '4px', color: 'var(--text-sm)' }}>{a.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Calendario de Pagos / Comedor */}
                <div style={cardStyle}>
                    <h3 style={cardTitleStyle}>💳 Gestión Administrativa</h3>
                    <div style={{ marginTop: '20px' }}>
                        <div style={{ padding: '12px', border: '1px dashed #cbd5e1', borderRadius: '8px', marginBottom: '10px' }}>
                            <p style={{ fontSize: '0.85rem', fontWeight: 700 }}>Próximo Vencimiento: 10/06</p>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-sm)' }}>Cuota Junio 2026</p>
                        </div>
                        <button className="btn btn-green" style={{ width: '100%', fontSize: '0.85rem' }}>Pagar Cuota Online</button>
                        <button className="btn" style={{ width: '100%', marginTop: '10px', border: '1px solid #e2e8f0', fontSize: '0.85rem' }}>Menú del Comedor</button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

const cardStyle = { background: 'var(--white)', padding: '24px', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-sm)' };
const cardTitleStyle = { fontSize: '1.1rem', color: 'var(--blue)', borderBottom: '2px solid #f1f5f9', paddingBottom: '12px' };
const infoBox = { display: 'flex', flexDirection: 'column', background: 'white', padding: '8px', borderRadius: '8px', border: '1px solid #e2e8f0' };
const labelStyle = { fontSize: '0.7rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 800 };
const valueStyle = { fontSize: '1rem', fontWeight: 800 };
const avisoStyle = { padding: '12px', borderLeft: '4px solid var(--orange)', background: '#fff7ed', marginBottom: '12px', borderRadius: '0 8px 8px 0' };

export default PadreDashboard;
