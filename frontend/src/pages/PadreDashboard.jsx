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
            {/* Resumen Rápido */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '32px' }}>
                <div className="dashboard-card" style={{ ...cardStyle, textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>📚</div>
                    <span style={labelStyle}>Promedio Gral</span>
                    <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--blue)' }}>8.5</div>
                </div>
                <div className="dashboard-card" style={{ ...cardStyle, textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>✅</div>
                    <span style={labelStyle}>Asistencia</span>
                    <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--green)' }}>95%</div>
                </div>
                <div className="dashboard-card" style={{ ...cardStyle, textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>💰</div>
                    <span style={labelStyle}>Estado Cuota</span>
                    <div style={{ fontSize: '1.1rem', fontWeight: 900, color: 'var(--blue)', marginTop: '8px' }}>AL DÍA</div>
                </div>
                <div className="dashboard-card" style={{ ...cardStyle, textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>📅</div>
                    <span style={labelStyle}>Faltas</span>
                    <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--orange)' }}>2</div>
                </div>
            </div>

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
                <div className="dashboard-card" style={cardStyle}>
                    <h3 style={cardTitleStyle}>💳 Estado de Cuenta</h3>
                    <div style={{ marginTop: '20px' }}>
                        <div style={{ 
                            padding: '20px', background: '#f0f9ff', borderRadius: '12px', border: '1px solid #bae6fd',
                            textAlign: 'center', marginBottom: '20px'
                        }}>
                            <span style={labelStyle}>Saldo Pendiente Total</span>
                            <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--blue)', marginTop: '4px' }}>$0.00</div>
                            <p style={{ fontSize: '0.75rem', color: '#0369a1', marginTop: '8px', fontWeight: 700 }}>✅ Cuenta al día</p>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
                                <span>Matrícula 2027</span>
                                <span style={{ fontWeight: 800, color: 'var(--green)' }}>PAGADO</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
                                <span>Seguro Escolar</span>
                                <span style={{ fontWeight: 800, color: 'var(--green)' }}>PAGADO</span>
                            </div>
                        </div>

                        <button className="btn btn-hero-outline" style={{ width: '100%', marginTop: '20px', fontSize: '0.8rem' }}>📥 Descargar Historial (PDF)</button>
                    </div>
                </div>

                {/* Comedor y Otros */}
                <div className="dashboard-card" style={cardStyle}>
                    <h3 style={cardTitleStyle}>🍎 Servicios Extra</h3>
                    <div style={{ marginTop: '20px' }}>
                        <div style={infoBox}>
                            <span style={labelStyle}>Comedor Escolar</span>
                            <span style={{ ...valueStyle, color: 'var(--blue)' }}>Activo (Menú General)</span>
                        </div>
                        <button className="btn btn-green" style={{ width: '100%', marginTop: '16px', fontSize: '0.85rem' }}>Ver Menú Semanal</button>
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
