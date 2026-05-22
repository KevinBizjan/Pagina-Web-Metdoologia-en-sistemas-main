import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';

const DocenteDashboard = () => {
    const [alumnos, setAlumnos] = useState([
        { id: 1, nombre: 'Pepe Alumno', nota: '8', asistencia: 'Presente' },
        { id: 2, nombre: 'María Estudiante', nota: '9', asistencia: 'Presente' },
        { id: 3, nombre: 'Lucas Aprendiz', nota: '7', asistencia: 'Presente' }
    ]);

    const handleNotaChange = (id, nuevaNota) => {
        const val = parseInt(nuevaNota);
        if (nuevaNota !== '' && (val < 1 || val > 10)) {
            alert('La calificación debe estar entre 1 y 10');
            return;
        }
        setAlumnos(alumnos.map(a => a.id === id ? { ...a, nota: nuevaNota } : a));
    };

    const handleAsistenciaChange = (id, nuevoEstado) => {
        setAlumnos(alumnos.map(a => a.id === id ? { ...a, asistencia: nuevoEstado } : a));
    };

    return (
        <DashboardLayout title="Panel Docente">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
                {/* Asistencia Diaria */}
                <div className="dashboard-card" style={cardStyle}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #f1f5f9', paddingBottom: '12px' }}>
                        <h3 style={{ fontSize: '1.1rem', color: 'var(--blue)', fontWeight: 800 }}>📋 Toma de Asistencia</h3>
                        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-sm)' }}>Hoy: {new Date().toLocaleDateString()}</span>
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ textAlign: 'left', fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase' }}>
                                    <th style={{ padding: '10px 0' }}>Alumno</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {alumnos.map((a) => (
                                    <tr key={a.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                        <td style={{ padding: '12px 0', fontWeight: 700, fontSize: '0.9rem' }}>{a.nombre}</td>
                                        <td>
                                            <select 
                                                value={a.asistencia} 
                                                onChange={(e) => handleAsistenciaChange(a.id, e.target.value)}
                                                style={{ padding: '6px', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '0.85rem' }}
                                            >
                                                <option value="Presente">Presente</option>
                                                <option value="Ausente">Ausente</option>
                                                <option value="Tarde">Tarde</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button className="btn btn-green" style={{ width: '100%', marginTop: '20px', fontSize: '0.85rem' }}>Guardar Asistencia del Día</button>
                    </div>
                </div>

                {/* Carga de Notas */}
                <div className="dashboard-card" style={cardStyle}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #f1f5f9', paddingBottom: '12px' }}>
                        <h3 style={{ fontSize: '1.1rem', color: 'var(--blue)', fontWeight: 800 }}>📝 Calificaciones</h3>
                        <span style={{ fontSize: '0.75rem', background: '#dcfce7', color: '#166534', padding: '4px 10px', borderRadius: '50px', fontWeight: 800 }}>4° Año - Div. A</span>
                    </div>
                    
                    <div style={{ marginTop: '20px' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ textAlign: 'left', fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase' }}>
                                    <th style={{ padding: '10px 0' }}>Estudiante</th>
                                    <th>Nota</th>
                                    <th style={{ textAlign: 'right' }}>Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {alumnos.map((a) => (
                                    <tr key={a.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                        <td style={{ padding: '14px 0', fontWeight: 700, fontSize: '0.9rem' }}>{a.nombre}</td>
                                        <td>
                                            <input 
                                                type="number" 
                                                min="1" max="10"
                                                value={a.nota} 
                                                onChange={(e) => handleNotaChange(a.id, e.target.value)}
                                                style={{ width: '50px', padding: '6px', borderRadius: '6px', border: '1px solid #e2e8f0', textAlign: 'center', fontWeight: 700 }}
                                            />
                                        </td>
                                        <td style={{ textAlign: 'right' }}>
                                            <button style={{ background: 'none', border: 'none', color: 'var(--blue)', fontSize: '0.75rem', fontWeight: 800, cursor: 'pointer' }}>Guardar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button className="btn btn-hero-orange" style={{ width: '100%', marginTop: '20px', fontSize: '0.85rem' }}>Finalizar Carga Trimestral</button>
                    </div>
                </div>

                {/* Agenda y Tareas */}
                <div className="dashboard-card" style={cardStyle}>
                    <h3 style={cardTitleStyle}>🗓️ Mi Agenda</h3>
                    <div style={{ marginTop: '16px' }}>
                        <div style={itemTarea}>
                            <div style={dotStyle}></div>
                            <div style={{ flex: 1 }}>
                                <p style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--text)' }}>Examen de Historia</p>
                                <p style={{ fontSize: '0.75rem', color: 'var(--text-sm)' }}>Viernes 15 - 08:30hs | Aula 12</p>
                            </div>
                            <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--orange)' }}>PRÓXIMO</span>
                        </div>
                        <div style={itemTarea}>
                            <div style={{ ...dotStyle, background: 'var(--orange)' }}></div>
                            <div style={{ flex: 1 }}>
                                <p style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--text)' }}>Entrega de Planificaciones</p>
                                <p style={{ fontSize: '0.75rem', color: 'var(--text-sm)' }}>Lunes 18 - Todo el día</p>
                            </div>
                        </div>
                        <div style={itemTarea}>
                            <div style={{ ...dotStyle, background: 'var(--violet)' }}></div>
                            <div style={{ flex: 1 }}>
                                <p style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--text)' }}>Capacitación Docente</p>
                                <p style={{ fontSize: '0.75rem', color: 'var(--text-sm)' }}>Miércoles 20 - 14:00hs (Virtual)</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Comunicados a Alumnos */}
                <div className="dashboard-card" style={{ ...cardStyle, gridColumn: '1 / -2' }}>
                    <h3 style={cardTitleStyle}>📣 Comunicado Institucional</h3>
                    <div style={{ marginTop: '16px', display: 'flex', gap: '16px', flexDirection: 'column' }}>
                        <textarea 
                            placeholder="Escribe el mensaje para tus alumnos o colegas..."
                            style={{ width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', resize: 'none', height: '100px', fontFamily: 'inherit', outline: 'none' }}
                        ></textarea>
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <button className="btn btn-violet" style={{ padding: '12px 28px' }}>Publicar Aviso →</button>
                        </div>
                    </div>
                </div>

                {/* Servicios Extra (Comedor / Enfermería) */}
                <div className="dashboard-card" style={cardStyle}>
                    <h3 style={cardTitleStyle}>🏥 Servicios Especiales</h3>
                    <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <button className="btn" style={{ background: '#fef2f2', color: '#991b1b', border: '1px solid #fee2e2', fontSize: '0.85rem' }}>
                            🚑 Reportar Incidencia Médica
                        </button>
                        <button className="btn" style={{ background: '#f0fdf4', color: '#166534', border: '1px solid #dcfce7', fontSize: '0.85rem' }}>
                            🍎 Asistencia Comedor
                        </button>
                        <button className="btn" style={{ background: '#eff6ff', color: '#1e40af', border: '1px solid #dbeafe', fontSize: '0.85rem' }}>
                            🧪 Reservar Laboratorio
                        </button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

const cardStyle = { background: 'var(--white)', padding: '24px', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-sm)' };
const cardTitleStyle = { fontSize: '1.1rem', color: 'var(--blue)', borderBottom: '2px solid #f1f5f9', paddingBottom: '12px' };
const itemTarea = { display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px', padding: '8px', borderRadius: '8px', transition: 'background 0.2s' };
const dotStyle = { width: '10px', height: '10px', borderRadius: '50%', background: 'var(--green)' };

export default DocenteDashboard;
