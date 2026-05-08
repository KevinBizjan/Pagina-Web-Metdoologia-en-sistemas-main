import React from 'react';
import DashboardLayout from '../components/DashboardLayout';

const AlumnoDashboard = () => {
    const materias = [
        { nombre: 'Matemáticas', docente: 'Prof. Gómez', nota: '9' },
        { nombre: 'Lengua y Literatura', docente: 'Prof. Rodríguez', nota: '8' },
        { nombre: 'Ciencias Naturales', docente: 'Prof. Martínez', nota: '10' },
        { nombre: 'Historia', docente: 'Prof. López', nota: '7' }
    ];

    const horarios = [
        { dia: 'Lunes', materia: 'Matemáticas', hora: '08:00 - 09:30' },
        { dia: 'Martes', materia: 'Lengua', hora: '10:00 - 11:30' },
        { dia: 'Miércoles', materia: 'Ciencias', hora: '08:00 - 09:30' }
    ];

    return (
        <DashboardLayout title="Panel del Alumno">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                {/* Mis Materias y Notas */}
                <div style={cardStyle}>
                    <h3 style={cardTitleStyle}>📚 Mis Materias</h3>
                    <div style={{ marginTop: '16px' }}>
                        {materias.map((m, i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: i < materias.length -1 ? '1px solid #f1f5f9' : 'none' }}>
                                <div>
                                    <p style={{ fontWeight: 700, fontSize: '0.95rem' }}>{m.nombre}</p>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--text-sm)' }}>{m.docente}</p>
                                </div>
                                <span style={{ 
                                    background: 'var(--blue)', color: 'white', padding: '4px 10px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 800, alignSelf: 'center'
                                }}>{m.nota}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Horarios */}
                <div style={cardStyle}>
                    <h3 style={cardTitleStyle}>⏰ Horarios de Clase</h3>
                    <div style={{ marginTop: '16px' }}>
                        {horarios.map((h, i) => (
                            <div key={i} style={{ padding: '12px 0', borderBottom: i < horarios.length -1 ? '1px solid #f1f5f9' : 'none' }}>
                                <p style={{ fontWeight: 700, fontSize: '0.95rem' }}>{h.dia}</p>
                                <p style={{ fontSize: '0.85rem', color: 'var(--blue)' }}>{h.materia} <span style={{ color: 'var(--text-sm)' }}>({h.hora})</span></p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Comunicados */}
                <div style={{ ...cardStyle, gridColumn: '1 / -1' }}>
                    <h3 style={cardTitleStyle}>📢 Comunicados Recientes</h3>
                    <div style={{ marginTop: '16px' }}>
                        <div style={comunicadoStyle}>
                            <p style={{ fontWeight: 800, color: 'var(--orange)' }}>Importante: Entrega de Proyectos</p>
                            <p style={{ fontSize: '0.9rem', marginTop: '4px' }}>Recuerden que la fecha límite para la entrega del proyecto de ciencias es el próximo viernes 15 de mayo.</p>
                            <span style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginTop: '8px' }}>Hace 2 horas</span>
                        </div>
                        <div style={comunicadoStyle}>
                            <p style={{ fontWeight: 800, color: 'var(--green)' }}>Taller de Robótica</p>
                            <p style={{ fontSize: '0.9rem', marginTop: '4px' }}>Se abren las inscripciones para el nuevo taller de robótica avanzado. Cupos limitados.</p>
                            <span style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginTop: '8px' }}>Ayer</span>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

const cardStyle = {
    background: 'var(--white)',
    padding: '24px',
    borderRadius: 'var(--radius)',
    boxShadow: 'var(--shadow-sm)'
};

const cardTitleStyle = {
    fontSize: '1.1rem',
    color: 'var(--blue)',
    borderBottom: '2px solid #f1f5f9',
    paddingBottom: '12px'
};

const comunicadoStyle = {
    padding: '16px',
    background: '#f8fafc',
    borderRadius: '12px',
    marginBottom: '12px'
};

export default AlumnoDashboard;
