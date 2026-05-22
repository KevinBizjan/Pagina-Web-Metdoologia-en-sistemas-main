import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../components/DashboardLayout';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('preinscripciones');
    const [preinscripciones, setPreinscripciones] = useState([]);
    const [alumnos, setAlumnos] = useState([]);
    const [cursos, setCursos] = useState([]);
    const [aulas, setAulas] = useState([]);
    const [showAlumnoForm, setShowAlumnoForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const { logout } = useAuth();

    useEffect(() => {
        if (activeTab === 'preinscripciones') fetchPreinscripciones();
        if (activeTab === 'alumnos') fetchAlumnos();
        if (activeTab === 'cursos') fetchCursosYAulas();
    }, [activeTab]);

    const handleAlumnoSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const nuevoAlumno = {
            nombre: form.nombre.value,
            apellido: form.apellido.value,
            dni: form.dni.value,
            fecha_nacimiento: form.fecha_nacimiento.value
        };

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3000/api/academico/alumnos', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                },
                body: JSON.stringify(nuevoAlumno)
            });
            if (response.ok) {
                setShowAlumnoForm(false);
                fetchAlumnos();
            } else {
                const data = await response.json();
                alert(data.message || 'Error al registrar alumno');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const fetchCursosYAulas = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const [resCursos, resAulas] = await Promise.all([
                fetch('http://localhost:3000/api/academico/cursos', { headers: { 'Authorization': `Bearer ${token}` } }),
                fetch('http://localhost:3000/api/academico/aulas', { headers: { 'Authorization': `Bearer ${token}` } })
            ]);
            const [dataCursos, dataAulas] = await Promise.all([resCursos.json(), resAulas.json()]);
            setCursos(dataCursos);
            setAulas(dataAulas);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchPreinscripciones = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3000/api/preinscripciones', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (response.ok) setPreinscripciones(data);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchAlumnos = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3000/api/academico/alumnos', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (response.ok) setAlumnos(data);
        } catch (error) {
            console.error('Error:', error);
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
            if (response.ok) fetchPreinscripciones();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <DashboardLayout title="Panel de Administración">
            {/* Tabs de Navegación */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
                <button 
                    onClick={() => setActiveTab('preinscripciones')} 
                    className={`btn ${activeTab === 'preinscripciones' ? 'btn-violet' : 'btn-hero-outline'}`}
                    style={{ fontSize: '0.8rem', color: activeTab === 'preinscripciones' ? 'white' : 'var(--blue)' }}
                >
                    📋 Preinscripciones
                </button>
                <button 
                    onClick={() => setActiveTab('alumnos')} 
                    className={`btn ${activeTab === 'alumnos' ? 'btn-violet' : 'btn-hero-outline'}`}
                    style={{ fontSize: '0.8rem', color: activeTab === 'alumnos' ? 'white' : 'var(--blue)' }}
                >
                    🎒 Legajos Alumnos
                </button>
                <button 
                    onClick={() => setActiveTab('cursos')} 
                    className={`btn ${activeTab === 'cursos' ? 'btn-violet' : 'btn-hero-outline'}`}
                    style={{ fontSize: '0.8rem', color: activeTab === 'cursos' ? 'white' : 'var(--blue)' }}
                >
                    🏫 Cursos y Aulas
                </button>
                <button 
                    onClick={() => setActiveTab('personal')} 
                    className={`btn ${activeTab === 'personal' ? 'btn-violet' : 'btn-hero-outline'}`}
                    style={{ fontSize: '0.8rem', color: activeTab === 'personal' ? 'white' : 'var(--blue)' }}
                >
                    👨‍🏫 Personal y Docentes
                </button>
                <button 
                    onClick={() => setActiveTab('finanzas')} 
                    className={`btn ${activeTab === 'finanzas' ? 'btn-violet' : 'btn-hero-outline'}`}
                    style={{ fontSize: '0.8rem', color: activeTab === 'finanzas' ? 'white' : 'var(--blue)' }}
                >
                    💰 Finanzas y Pagos
                </button>
                <button 
                    onClick={() => setActiveTab('servicios')} 
                    className={`btn ${activeTab === 'servicios' ? 'btn-violet' : 'btn-hero-outline'}`}
                    style={{ fontSize: '0.8rem', color: activeTab === 'servicios' ? 'white' : 'var(--blue)' }}
                >
                    🔧 Servicios
                </button>
                <button 
                    onClick={() => setActiveTab('reportes')} 
                    className={`btn ${activeTab === 'reportes' ? 'btn-violet' : 'btn-hero-outline'}`}
                    style={{ fontSize: '0.8rem', color: activeTab === 'reportes' ? 'white' : 'var(--blue)' }}
                >
                    📊 Reportes
                </button>
            </div>

            {activeTab === 'preinscripciones' && (
                <>
                    {/* Estadísticas Rápidas */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '32px' }}>
                        <div className="dashboard-card" style={{ ...cardStyle, borderLeft: '4px solid var(--blue)' }}>
                            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-sm)', textTransform: 'uppercase' }}>Total Preinscripciones</span>
                            <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--blue)', marginTop: '8px' }}>{preinscripciones.length}</div>
                        </div>
                        <div className="dashboard-card" style={{ ...cardStyle, borderLeft: '4px solid var(--orange)' }}>
                            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-sm)', textTransform: 'uppercase' }}>Pendientes</span>
                            <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--orange)', marginTop: '8px' }}>
                                {preinscripciones.filter(p => p.estado === 'pendiente').length}
                            </div>
                        </div>
                    </div>

                    <div style={{ background: 'var(--white)', padding: '24px', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-sm)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                            <h2 style={{ fontSize: '1.25rem', color: 'var(--blue)', fontWeight: 800 }}>Solicitudes de Admisión</h2>
                            <button onClick={fetchPreinscripciones} className="btn btn-hero-outline" style={{ fontSize: '0.85rem', padding: '8px 16px' }}>🔄 Actualizar</button>
                        </div>

                        {loading ? <p>Cargando...</p> : (
                            <div style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                    <thead>
                                        <tr style={{ borderBottom: '2px solid #f1f5f9' }}>
                                            <th style={thStyle}>Fecha</th>
                                            <th style={thStyle}>Alumno/DNI</th>
                                            <th style={thStyle}>Nivel/Turno</th>
                                            <th style={thStyle}>Estado</th>
                                            <th style={thStyle}>Acción</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {preinscripciones.map((p) => (
                                            <tr key={p.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                                <td style={tdStyle}>{new Date(p.fecha).toLocaleDateString()}</td>
                                                <td style={tdStyle}>
                                                    <div style={{ fontWeight: 700 }}>{p.alumno_nombre}</div>
                                                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>DNI: {p.alumno_dni}</div>
                                                </td>
                                                <td style={tdStyle}>{p.nivel} - {p.turno}</td>
                                                <td style={tdStyle}>
                                                    <span style={{
                                                        padding: '4px 10px', borderRadius: '20px', fontSize: '0.7rem', fontWeight: '800',
                                                        backgroundColor: getStatusColor(p.estado).bg, color: getStatusColor(p.estado).text
                                                    }}>{p.estado}</span>
                                                </td>
                                                <td style={tdStyle}>
                                                    <select value={p.estado} onChange={(e) => updateStatus(p.id, e.target.value)} style={{ padding: '4px', borderRadius: '4px' }}>
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
                </>
            )}

            {activeTab === 'alumnos' && (
                <div style={{ background: 'var(--white)', padding: '24px', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-sm)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                        <h2 style={{ fontSize: '1.25rem', color: 'var(--blue)', fontWeight: 800 }}>Gestión de Legajos</h2>
                        <button 
                            onClick={() => setShowAlumnoForm(!showAlumnoForm)} 
                            className="btn btn-green" style={{ fontSize: '0.85rem' }}
                        >
                            {showAlumnoForm ? '✕ Cancelar' : '+ Nuevo Alumno'}
                        </button>
                    </div>

                    {showAlumnoForm && (
                        <form onSubmit={handleAlumnoSubmit} style={{ 
                            background: '#f8fafc', padding: '20px', borderRadius: '12px', marginBottom: '24px',
                            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px'
                        }}>
                            <input type="text" placeholder="Nombre" required style={inputStyle} name="nombre" />
                            <input type="text" placeholder="Apellido" required style={inputStyle} name="apellido" />
                            <input type="text" placeholder="DNI" required style={inputStyle} name="dni" />
                            <input type="date" required style={inputStyle} name="fecha_nacimiento" />
                            <button type="submit" className="btn btn-violet" style={{ height: '45px' }}>Registrar Legajo</button>
                        </form>
                    )}

                    {loading ? <p>Cargando legajos...</p> : (
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                <thead>
                                    <tr style={{ borderBottom: '2px solid #f1f5f9' }}>
                                        <th style={thStyle}>Legajo</th>
                                        <th style={thStyle}>Nombre y Apellido</th>
                                        <th style={thStyle}>DNI</th>
                                        <th style={thStyle}>Curso</th>
                                        <th style={thStyle}>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {alumnos.length === 0 ? (
                                        <tr><td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>No hay alumnos registrados.</td></tr>
                                    ) : (
                                        alumnos.map((a) => (
                                            <tr key={a.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                                <td style={tdStyle}>#{a.id}</td>
                                                <td style={tdStyle}><strong>{a.apellido}, {a.nombre}</strong></td>
                                                <td style={tdStyle}>{a.dni}</td>
                                                <td style={tdStyle}>{a.nivel_nombre || 'Sin asignar'} {a.division || ''}</td>
                                                <td style={tdStyle}>
                                                    <button style={{ background: 'none', border: 'none', color: 'var(--blue)', fontWeight: 700, cursor: 'pointer', marginRight: '10px' }}>Editar</button>
                                                    <button style={{ background: 'none', border: 'none', color: '#dc2626', fontWeight: 700, cursor: 'pointer' }}>Baja</button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'cursos' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                    <div style={{ background: 'var(--white)', padding: '24px', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-sm)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                            <h2 style={{ fontSize: '1.25rem', color: 'var(--blue)', fontWeight: 800 }}>Cursos</h2>
                            <button className="btn btn-green" style={{ fontSize: '0.85rem' }}>+ Nuevo Curso</button>
                        </div>
                        {loading ? <p>Cargando...</p> : (
                            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                <thead>
                                    <tr style={{ borderBottom: '2px solid #f1f5f9' }}>
                                        <th style={thStyle}>Nivel</th>
                                        <th style={thStyle}>División</th>
                                        <th style={thStyle}>Cupo</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cursos.map(c => (
                                        <tr key={c.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                            <td style={tdStyle}>{c.nivel_nombre}</td>
                                            <td style={tdStyle}><strong>{c.division}</strong></td>
                                            <td style={tdStyle}>{c.cupo} alumnos</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>

                    <div style={{ background: 'var(--white)', padding: '24px', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-sm)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                            <h2 style={{ fontSize: '1.25rem', color: 'var(--blue)', fontWeight: 800 }}>Aulas</h2>
                            <button className="btn btn-green" style={{ fontSize: '0.85rem' }}>+ Nueva Aula</button>
                        </div>
                        {loading ? <p>Cargando...</p> : (
                            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                <thead>
                                    <tr style={{ borderBottom: '2px solid #f1f5f9' }}>
                                        <th style={thStyle}>Nombre</th>
                                        <th style={thStyle}>Capacidad</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {aulas.map(a => (
                                        <tr key={a.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                            <td style={tdStyle}>{a.nombre}</td>
                                            <td style={tdStyle}>{a.capacidad} pers.</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            )}

            {activeTab === 'finanzas' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                    <div style={{ background: 'var(--white)', padding: '24px', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-sm)' }}>
                        <h2 style={{ fontSize: '1.25rem', color: 'var(--blue)', fontWeight: 800, marginBottom: '24px' }}>Configuración de Cuotas</h2>
                        <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div>
                                <label style={labelStyle}>Nivel</label>
                                <select style={inputStyle}>
                                    <option value="1">Nivel Inicial</option>
                                    <option value="2">Nivel Primario</option>
                                    <option value="3">Nivel Secundario</option>
                                </select>
                            </div>
                            <div>
                                <label style={labelStyle}>Monto Mensual ($)</label>
                                <input type="number" step="0.01" placeholder="Ej: 45000.00" style={inputStyle} />
                            </div>
                            <button className="btn btn-hero-orange" style={{ padding: '14px' }}>Establecer Cuota</button>
                        </form>
                    </div>

                    <div style={{ background: 'var(--white)', padding: '24px', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-sm)' }}>
                        <h2 style={{ fontSize: '1.25rem', color: 'var(--blue)', fontWeight: 800, marginBottom: '24px' }}>Registrar Pago</h2>
                        <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div>
                                <label style={labelStyle}>Alumno (Legajo o DNI)</label>
                                <input type="text" placeholder="Buscar alumno..." style={inputStyle} />
                            </div>
                            <div>
                                <label style={labelStyle}>Monto Recibido ($)</label>
                                <input type="number" step="0.01" style={inputStyle} />
                            </div>
                            <div>
                                <label style={labelStyle}>Método de Pago</label>
                                <select style={inputStyle}>
                                    <option value="Efectivo">Efectivo</option>
                                    <option value="Transferencia">Transferencia</option>
                                    <option value="Tarjeta">Tarjeta de Crédito/Débito</option>
                                </select>
                            </div>
                            <button className="btn btn-green" style={{ padding: '14px' }}>Confirmar Pago y Generar Recibo</button>
                        </form>
                    </div>
                </div>
            )}

            {activeTab === 'servicios' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                    <div style={{ background: 'var(--white)', padding: '24px', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-sm)' }}>
                        <h2 style={{ fontSize: '1.25rem', color: 'var(--blue)', fontWeight: 800, marginBottom: '24px' }}>Rutas de Transporte</h2>
                        <button className="btn btn-green" style={{ marginBottom: '16px', fontSize: '0.85rem' }}>+ Nueva Ruta</button>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid #f1f5f9' }}>
                                    <th style={thStyle}>Ruta</th>
                                    <th style={thStyle}>Chofer</th>
                                    <th style={thStyle}>Cap.</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                                    <td style={tdStyle}>Ruta Norte</td>
                                    <td style={tdStyle}>Gómez, R.</td>
                                    <td style={tdStyle}>15/20</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div style={{ background: 'var(--white)', padding: '24px', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-sm)' }}>
                        <h2 style={{ fontSize: '1.25rem', color: 'var(--blue)', fontWeight: 800, marginBottom: '24px' }}>Reserva de Instalaciones</h2>
                        <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div>
                                <label style={labelStyle}>Instalación</label>
                                <select style={inputStyle}>
                                    <option value="1">Gimnasio Cubierto</option>
                                    <option value="2">Pileta Climatizada</option>
                                    <option value="3">Laboratorio de Informática</option>
                                </select>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                <div>
                                    <label style={labelStyle}>Fecha</label>
                                    <input type="date" style={inputStyle} />
                                </div>
                                <div>
                                    <label style={labelStyle}>Hora</label>
                                    <input type="time" style={inputStyle} />
                                </div>
                            </div>
                            <button className="btn btn-violet" style={{ padding: '14px' }}>Verificar y Reservar</button>
                        </form>
                    </div>
                </div>
            )}

            {activeTab === 'reportes' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                    <div style={{ background: 'var(--white)', padding: '24px', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-sm)' }}>
                        <h2 style={{ fontSize: '1.1rem', color: 'var(--blue)', fontWeight: 800, marginBottom: '20px' }}>📈 Rendimiento Académico</h2>
                        <div style={{ height: '200px', background: '#f8fafc', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
                            [Gráfico de Promedios por Nivel]
                        </div>
                    </div>
                    <div style={{ background: 'var(--white)', padding: '24px', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-sm)' }}>
                        <h2 style={{ fontSize: '1.1rem', color: 'var(--blue)', fontWeight: 800, marginBottom: '20px' }}>📊 Situación Financiera</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>Recaudación Mensual</span>
                                <span style={{ fontWeight: 800, color: 'var(--green)' }}>$2.450.000</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>Morosidad Total</span>
                                <span style={{ fontWeight: 800, color: 'var(--orange)' }}>$320.500</span>
                            </div>
                        </div>
                    </div>
                    <div style={{ background: 'var(--white)', padding: '24px', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-sm)' }}>
                        <h2 style={{ fontSize: '1.1rem', color: 'var(--blue)', fontWeight: 800, marginBottom: '20px' }}>📋 Reportes para Descargar</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <button className="btn btn-hero-outline" style={{ fontSize: '0.85rem' }}>📄 Listado de Deudores (PDF)</button>
                            <button className="btn btn-hero-outline" style={{ fontSize: '0.85rem' }}>📄 Planillas de Asistencia (PDF)</button>
                            <button className="btn btn-hero-outline" style={{ fontSize: '0.85rem' }}>📄 Legajos Completos (Excel)</button>
                        </div>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
};

const labelStyle = { display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '6px' };

const inputStyle = {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    fontSize: '0.9rem',
    outline: 'none',
    width: '100%'
};

const cardStyle = { background: 'var(--white)', padding: '24px', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-sm)' };
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
