import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';

const DocenteDashboard = () => {
    const [alumnos, setAlumnos] = useState([
        { id: 1, nombre: 'Pepe Alumno', nota: '8' },
        { id: 2, nombre: 'María Estudiante', nota: '9' },
        { id: 3, nombre: 'Lucas Aprendiz', nota: '7' }
    ]);

    const handleNotaChange = (id, nuevaNota) => {
        setAlumnos(alumnos.map(a => a.id === id ? { ...a, nota: nuevaNota } : a));
    };

    return (
        <DashboardLayout title="Panel Docente">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
                {/* Carga de Notas */}
                <div style={cardStyle}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #f1f5f9', paddingBottom: '12px' }}>
                        <h3 style={{ fontSize: '1.1rem', color: 'var(--blue)' }}>📝 Gestión de Calificaciones</h3>
                        <span style={{ fontSize: '0.8rem', background: '#dcfce7', color: '#166534', padding: '4px 8px', borderRadius: '4px', fontWeight: 700 }}>4° Año - Div. A</span>
                    </div>
                    
                    <div style={{ marginTop: '20px' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ textAlign: 'left', fontSize: '0.85rem', color: '#64748b' }}>
                                    <th style={{ padding: '10px 0' }}>Alumno</th>
                                    <th>Nota 1° Trim.</th>
                                    <th>Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {alumnos.map((a) => (
                                    <tr key={a.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                        <td style={{ padding: '12px 0', fontWeight: 700, fontSize: '0.9rem' }}>{a.nombre}</td>
                                        <td>
                                            <input 
                                                type="number" 
                                                value={a.nota} 
                                                onChange={(e) => handleNotaChange(a.id, e.target.value)}
                                                style={{ width: '60px', padding: '6px', borderRadius: '4px', border: '1px solid #e2e8f0' }}
                                            />
                                        </td>
                                        <td>
                                            <button style={{ background: 'none', border: 'none', color: 'var(--blue)', fontSize: '0.8rem', fontWeight: 800, cursor: 'pointer' }}>Guardar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button className="btn btn-hero-orange" style={{ width: '100%', marginTop: '20px', fontSize: '0.85rem', padding: '10px' }}>Finalizar Carga del Trimestre</button>
                    </div>
                </div>

                {/* Agenda y Tareas */}
                <div style={cardStyle}>
                    <h3 style={cardTitleStyle}>🗓️ Agenda de Clases</h3>
                    <div style={{ marginTop: '16px' }}>
                        <div style={itemTarea}>
                            <div style={dotStyle}></div>
                            <div>
                                <p style={{ fontWeight: 800, fontSize: '0.9rem' }}>Examen de Historia</p>
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-sm)' }}>Viernes 15 - 08:30hs</p>
                            </div>
                        </div>
                        <div style={itemTarea}>
                            <div style={{ ...dotStyle, background: 'var(--orange)' }}></div>
                            <div>
                                <p style={{ fontWeight: 800, fontSize: '0.9rem' }}>Entrega de Planificaciones</p>
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-sm)' }}>Lunes 18 - Todo el día</p>
                            </div>
                        </div>
                        <div style={itemTarea}>
                            <div style={{ ...dotStyle, background: 'var(--violet)' }}></div>
                            <div>
                                <p style={{ fontWeight: 800, fontSize: '0.9rem' }}>Capacitación Docente</p>
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-sm)' }}>Miércoles 20 - 14:00hs (Zoom)</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Comunicados a Alumnos */}
                <div style={{ ...cardStyle, gridColumn: '1 / -1' }}>
                    <h3 style={cardTitleStyle}>📣 Enviar Comunicado a Curso</h3>
                    <div style={{ marginTop: '16px', display: 'flex', gap: '16px' }}>
                        <textarea 
                            placeholder="Escribe el mensaje para tus alumnos..."
                            style={{ flex: 1, padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', resize: 'none', height: '80px', fontFamily: 'inherit' }}
                        ></textarea>
                        <button className="btn btn-violet" style={{ alignSelf: 'center', padding: '14px 24px' }}>Publicar Aviso</button>
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
