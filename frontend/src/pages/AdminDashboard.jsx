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

    const [editingAlumno, setEditingAlumno] = useState(null);
    const [personal, setPersonal] = useState([]);
    const [niveles, setNiveles] = useState([]);

    const [rutasTransporte, setRutasTransporte] = useState([]);
    const [instalaciones, setInstalaciones] = useState([]);
    const [cuotasConfig, setCuotasConfig] = useState([]);

    useEffect(() => {
        if (activeTab === 'preinscripciones') fetchPreinscripciones();
        if (activeTab === 'alumnos') { fetchAlumnos(); fetchCursosYAulas(); }
        if (activeTab === 'cursos') { fetchCursosYAulas(); fetchNiveles(); }
        if (activeTab === 'personal') fetchPersonal();
        if (activeTab === 'finanzas') { fetchFinanzas(); fetchNiveles(); }
        if (activeTab === 'servicios') fetchServicios();
    }, [activeTab]);

    const fetchFinanzas = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3000/api/financiero/cuotas-config', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (response.ok) setCuotasConfig(data);
        } catch (error) { console.error(error); }
    };

    const fetchServicios = async () => {
        try {
            const token = localStorage.getItem('token');
            const [resTrans, resInst] = await Promise.all([
                fetch('http://localhost:3000/api/servicios/transporte/rutas', { headers: { 'Authorization': `Bearer ${token}` } }),
                fetch('http://localhost:3000/api/servicios/instalaciones', { headers: { 'Authorization': `Bearer ${token}` } })
            ]);
            if (resTrans.ok) setRutasTransporte(await resTrans.json());
            if (resInst.ok) setInstalaciones(await resInst.json());
        } catch (error) { console.error(error); }
    };

    const deleteCurso = async (id) => {
        if (!window.confirm('¿Eliminar curso?')) return;
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/api/academico/cursos/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) fetchCursosYAulas();
        } catch (error) { console.error(error); }
    };

    const deleteAula = async (id) => {
        if (!window.confirm('¿Eliminar aula?')) return;
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/api/academico/aulas/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) fetchCursosYAulas();
        } catch (error) { console.error(error); }
    };

    const fetchNiveles = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3000/api/academico/niveles', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (response.ok) setNiveles(data);
        } catch (error) { console.error(error); }
    };

    const fetchPersonal = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3000/api/financiero/personal', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (response.ok) setPersonal(data);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const [searchTermAlumno, setSearchTermAlumno] = useState('');
    const [searchTermPersonal, setSearchTermPersonal] = useState('');

    const deletePersonal = async (id) => {
        if (!window.confirm('¿Está seguro de eliminar a este miembro del personal?')) return;
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/api/financiero/personal/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) fetchPersonal();
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const [showPersonalForm, setShowPersonalForm] = useState(false);
    const [showCursoForm, setShowCursoForm] = useState(false);
    const [showAulaForm, setShowAulaForm] = useState(false);

    const handlePersonalSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const personalData = {
            nombre: form.nombre.value,
            apellido: form.apellido.value,
            dni: form.dni.value,
            tipo: form.tipo.value,
            email: form.email.value
        };

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3000/api/financiero/personal', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                },
                body: JSON.stringify(personalData)
            });
            if (response.ok) {
                setShowPersonalForm(false);
                fetchPersonal();
            } else {
                const errorData = await response.json();
                alert(errorData.message || 'Error al registrar personal');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error de conexión al registrar personal');
        }
    };

    const handleCursoSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const cursoData = {
            nivel_id: form.nivel_id.value,
            division: form.division.value,
            cupo: form.cupo.value
        };

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3000/api/academico/cursos', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                },
                body: JSON.stringify(cursoData)
            });
            if (response.ok) {
                setShowCursoForm(false);
                fetchCursosYAulas();
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleAulaSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const aulaData = {
            nombre: form.nombre.value,
            capacidad: form.capacidad.value
        };

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3000/api/academico/aulas', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                },
                body: JSON.stringify(aulaData)
            });
            if (response.ok) {
                setShowAulaForm(false);
                fetchCursosYAulas();
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleAlumnoSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const alumnoData = {
            nombre: form.nombre.value,
            apellido: form.apellido.value,
            dni: form.dni.value,
            fecha_nacimiento: form.fecha_nacimiento.value,
            curso_id: form.curso_id?.value || null
        };

        try {
            const token = localStorage.getItem('token');
            const url = editingAlumno 
                ? `http://localhost:3000/api/academico/alumnos/${editingAlumno.id}`
                : 'http://localhost:3000/api/academico/alumnos';
            
            const response = await fetch(url, {
                method: editingAlumno ? 'PUT' : 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                },
                body: JSON.stringify(alumnoData)
            });
            if (response.ok) {
                setShowAlumnoForm(false);
                setEditingAlumno(null);
                fetchAlumnos();
            } else {
                const data = await response.json();
                alert(data.message || 'Error al procesar alumno');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const deleteAlumno = async (id) => {
        if (!window.confirm('¿Está seguro de eliminar este legajo?')) return;
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/api/academico/alumnos/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) fetchAlumnos();
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

    const filteredAlumnos = alumnos.filter(a => 
        a.nombre.toLowerCase().includes(searchTermAlumno.toLowerCase()) || 
        a.apellido.toLowerCase().includes(searchTermAlumno.toLowerCase()) ||
        a.dni.includes(searchTermAlumno)
    );

    const filteredPersonal = personal.filter(p => 
        p.nombre.toLowerCase().includes(searchTermPersonal.toLowerCase()) || 
        p.apellido.toLowerCase().includes(searchTermPersonal.toLowerCase()) ||
        p.dni.includes(searchTermPersonal)
    );

    const handleCuotaSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const cuotaData = {
            nivel_id: form.nivel_id.value,
            monto: form.monto.value,
            mes: new Date().getMonth() + 1,
            anio: new Date().getFullYear(),
            vencimiento: form.vencimiento.value
        };

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3000/api/financiero/cuotas-config', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                },
                body: JSON.stringify(cuotaData)
            });
            if (response.ok) fetchFinanzas();
        } catch (error) { console.error(error); }
    };

    const handleRutaSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const rutaData = {
            nombre: form.nombre.value,
            chofer: form.chofer.value,
            capacidad: form.capacidad.value
        };

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3000/api/servicios/transporte/rutas', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                },
                body: JSON.stringify(rutaData)
            });
            if (response.ok) fetchServicios();
        } catch (error) { console.error(error); }
    };

    const deleteRuta = async (id) => {
        if (!window.confirm('¿Eliminar ruta?')) return;
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/api/servicios/transporte/rutas/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) fetchServicios();
        } catch (error) { console.error(error); }
    };

    const deleteCuota = async (id) => {
        if (!window.confirm('¿Eliminar esta configuración de cuota?')) return;
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/api/financiero/cuotas-config/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) fetchFinanzas();
        } catch (error) { console.error(error); }
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
                        <div style={{ display: 'flex', gap: '12px', flex: 1, maxWidth: '400px', marginLeft: '24px' }}>
                            <input 
                                type="text" 
                                placeholder="🔍 Buscar por nombre o DNI..." 
                                style={{ ...inputStyle, padding: '8px 16px' }}
                                value={searchTermAlumno}
                                onChange={(e) => setSearchTermAlumno(e.target.value)}
                            />
                        </div>
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
                            <input type="text" placeholder="Nombre" required style={inputStyle} name="nombre" defaultValue={editingAlumno?.nombre || ''} />
                            <input type="text" placeholder="Apellido" required style={inputStyle} name="apellido" defaultValue={editingAlumno?.apellido || ''} />
                            <input type="text" placeholder="DNI" required style={inputStyle} name="dni" defaultValue={editingAlumno?.dni || ''} />
                            <input type="date" required style={inputStyle} name="fecha_nacimiento" defaultValue={editingAlumno?.fecha_nacimiento || ''} />
                            <select style={inputStyle} name="curso_id" defaultValue={editingAlumno?.curso_id || ''}>
                                <option value="">Asignar Curso (Opcional)</option>
                                {cursos.map(c => (
                                    <option key={c.id} value={c.id}>{c.nivel_nombre} - {c.division}</option>
                                ))}
                            </select>
                            <button type="submit" className="btn btn-violet" style={{ height: '45px' }}>
                                {editingAlumno ? 'Guardar Cambios' : 'Registrar Legajo'}
                            </button>
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
                                    {filteredAlumnos.length === 0 ? (
                                        <tr><td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>No se encontraron alumnos.</td></tr>
                                    ) : (
                                        filteredAlumnos.map((a) => (
                                            <tr key={a.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                                <td style={tdStyle}>#{a.id}</td>
                                                <td style={tdStyle}><strong>{a.apellido}, {a.nombre}</strong></td>
                                                <td style={tdStyle}>{a.dni}</td>
                                                <td style={tdStyle}>{a.nivel_nombre || 'Sin asignar'} {a.division || ''}</td>
                                                <td style={tdStyle}>
                                                    <button 
                                                        onClick={() => {
                                                            setEditingAlumno(a);
                                                            setShowAlumnoForm(true);
                                                        }}
                                                        style={{ background: 'none', border: 'none', color: 'var(--blue)', fontWeight: 700, cursor: 'pointer', marginRight: '10px' }}
                                                    >
                                                        Editar
                                                    </button>
                                                    <button 
                                                        onClick={() => deleteAlumno(a.id)}
                                                        style={{ background: 'none', border: 'none', color: '#dc2626', fontWeight: 700, cursor: 'pointer' }}
                                                    >
                                                        Baja
                                                    </button>
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
                            <button onClick={() => setShowCursoForm(!showCursoForm)} className="btn btn-green" style={{ fontSize: '0.85rem' }}>
                                {showCursoForm ? '✕ Cancelar' : '+ Nuevo Curso'}
                            </button>
                        </div>
                        {showCursoForm && (
                            <form onSubmit={handleCursoSubmit} style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <select name="nivel_id" required style={inputStyle}>
                                    <option value="">Seleccionar Nivel</option>
                                    {niveles.map(n => <option key={n.id} value={n.id}>{n.nombre}</option>)}
                                </select>
                                <input type="text" name="division" placeholder="División (Ej: A, B, 1°)" required style={inputStyle} />
                                <input type="number" name="cupo" placeholder="Cupo Máximo" required style={inputStyle} />
                                <button type="submit" className="btn btn-violet">Crear Curso</button>
                            </form>
                        )}
                        {loading ? <p>Cargando...</p> : (
                            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                <thead>
                                    <tr style={{ borderBottom: '2px solid #f1f5f9' }}>
                                        <th style={thStyle}>Nivel</th>
                                        <th style={thStyle}>División</th>
                                        <th style={thStyle}>Cupo</th>
                                        <th style={thStyle}>Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cursos.length === 0 ? (
                                        <tr><td colSpan="4" style={{ textAlign: 'center', padding: '10px' }}>No hay cursos registrados.</td></tr>
                                    ) : (
                                        cursos.map(c => (
                                            <tr key={c.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                                <td style={tdStyle}>{c.nivel_nombre}</td>
                                                <td style={tdStyle}><strong>{c.division}</strong></td>
                                                <td style={tdStyle}>{c.cupo} alumnos</td>
                                                <td style={tdStyle}>
                                                    <button onClick={() => deleteCurso(c.id)} style={{ background: 'none', border: 'none', color: '#dc2626', fontWeight: 700, cursor: 'pointer' }}>Eliminar</button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>

                    <div style={{ background: 'var(--white)', padding: '24px', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-sm)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                            <h2 style={{ fontSize: '1.25rem', color: 'var(--blue)', fontWeight: 800 }}>Aulas</h2>
                            <button onClick={() => setShowAulaForm(!showAulaForm)} className="btn btn-green" style={{ fontSize: '0.85rem' }}>
                                {showAulaForm ? '✕ Cancelar' : '+ Nueva Aula'}
                            </button>
                        </div>
                        {showAulaForm && (
                            <form onSubmit={handleAulaSubmit} style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <input type="text" name="nombre" placeholder="Nombre del Aula" required style={inputStyle} />
                                <input type="number" name="capacidad" placeholder="Capacidad" required style={inputStyle} />
                                <button type="submit" className="btn btn-violet">Crear Aula</button>
                            </form>
                        )}
                        {loading ? <p>Cargando...</p> : (
                            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                <thead>
                                    <tr style={{ borderBottom: '2px solid #f1f5f9' }}>
                                        <th style={thStyle}>Nombre</th>
                                        <th style={thStyle}>Capacidad</th>
                                        <th style={thStyle}>Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {aulas.map(a => (
                                        <tr key={a.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                            <td style={tdStyle}>{a.nombre}</td>
                                            <td style={tdStyle}>{a.capacidad} pers.</td>
                                            <td style={tdStyle}>
                                                <button onClick={() => deleteAula(a.id)} style={{ background: 'none', border: 'none', color: '#dc2626', fontWeight: 700, cursor: 'pointer' }}>Eliminar</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            )}

            {activeTab === 'personal' && (
                <div style={{ background: 'var(--white)', padding: '24px', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-sm)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                        <h2 style={{ fontSize: '1.25rem', color: 'var(--blue)', fontWeight: 800 }}>Personal de la Institución</h2>
                        <div style={{ display: 'flex', gap: '12px', flex: 1, maxWidth: '400px', marginLeft: '24px' }}>
                            <input 
                                type="text" 
                                placeholder="🔍 Buscar personal..." 
                                style={{ ...inputStyle, padding: '8px 16px' }}
                                value={searchTermPersonal}
                                onChange={(e) => setSearchTermPersonal(e.target.value)}
                            />
                        </div>
                        <button onClick={() => setShowPersonalForm(!showPersonalForm)} className="btn btn-green" style={{ fontSize: '0.85rem' }}>
                            {showPersonalForm ? '✕ Cancelar' : '+ Nuevo Personal'}
                        </button>
                    </div>

                    {showPersonalForm && (
                        <form onSubmit={handlePersonalSubmit} style={{ 
                            background: '#f8fafc', padding: '20px', borderRadius: '12px', marginBottom: '24px',
                            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px'
                        }}>
                            <input type="text" name="nombre" placeholder="Nombre" required style={inputStyle} />
                            <input type="text" name="apellido" placeholder="Apellido" required style={inputStyle} />
                            <input type="text" name="dni" placeholder="DNI" required style={inputStyle} />
                            <input type="email" name="email" placeholder="Email" required style={inputStyle} />
                            <select name="tipo" required style={inputStyle}>
                                <option value="docente">Docente</option>
                                <option value="administrativo">Administrativo</option>
                                <option value="maestranza">Maestranza</option>
                            </select>
                            <button type="submit" className="btn btn-violet">Registrar Personal</button>
                        </form>
                    )}
                    {loading ? <p>Cargando personal...</p> : (
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                <thead>
                                    <tr style={{ borderBottom: '2px solid #f1f5f9' }}>
                                        <th style={thStyle}>Nombre</th>
                                        <th style={thStyle}>DNI</th>
                                        <th style={thStyle}>Tipo</th>
                                        <th style={thStyle}>Email</th>
                                        <th style={thStyle}>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {personal.length === 0 ? (
                                        <tr><td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>No hay personal registrado.</td></tr>
                                    ) : (
                                        filteredPersonal.map((p) => (
                                            <tr key={p.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                                <td style={tdStyle}><strong>{p.apellido}, {p.nombre}</strong></td>
                                                <td style={tdStyle}>{p.dni}</td>
                                                <td style={tdStyle}><span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--blue)' }}>{p.tipo.toUpperCase()}</span></td>
                                                <td style={tdStyle}>{p.email}</td>
                                                <td style={tdStyle}>
                                                    <button 
                                                        onClick={() => deletePersonal(p.id)}
                                                        style={{ background: 'none', border: 'none', color: '#dc2626', fontWeight: 700, cursor: 'pointer' }}
                                                    >
                                                        Baja
                                                    </button>
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

            {activeTab === 'finanzas' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                    <div style={{ background: 'var(--white)', padding: '24px', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-sm)' }}>
                        <h2 style={{ fontSize: '1.25rem', color: 'var(--blue)', fontWeight: 800, marginBottom: '24px' }}>Establecer Cuotas</h2>
                        <form onSubmit={handleCuotaSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div>
                                <label style={labelStyle}>Nivel</label>
                                <select name="nivel_id" required style={inputStyle}>
                                    <option value="">Seleccionar Nivel</option>
                                    {niveles.map(n => <option key={n.id} value={n.id}>{n.nombre}</option>)}
                                </select>
                            </div>
                            <div>
                                <label style={labelStyle}>Monto Mensual ($)</label>
                                <input type="number" name="monto" step="0.01" placeholder="Ej: 45000.00" required style={inputStyle} />
                            </div>
                            <div>
                                <label style={labelStyle}>Vencimiento</label>
                                <input type="date" name="vencimiento" required style={inputStyle} />
                            </div>
                            <button type="submit" className="btn btn-hero-orange" style={{ padding: '14px' }}>Guardar Configuración</button>
                        </form>
                    </div>

                    <div style={{ background: 'var(--white)', padding: '24px', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-sm)' }}>
                        <h2 style={{ fontSize: '1.25rem', color: 'var(--blue)', fontWeight: 800, marginBottom: '24px' }}>Cuotas Configuradas</h2>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid #f1f5f9' }}>
                                    <th style={thStyle}>Nivel</th>
                                    <th style={thStyle}>Monto</th>
                                    <th style={thStyle}>Mes/Año</th>
                                    <th style={thStyle}>Acción</th>
                                </tr>
                            </thead>
                                <tbody>
                                    {cuotasConfig.length === 0 ? (
                                        <tr><td colSpan="4" style={{ textAlign: 'center', padding: '20px' }}>No hay cuotas configuradas.</td></tr>
                                    ) : (
                                        cuotasConfig.map(c => (
                                            <tr key={c.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                                <td style={tdStyle}>{c.nivel_nombre}</td>
                                                <td style={tdStyle}><strong>${c.monto}</strong></td>
                                                <td style={tdStyle}>{c.mes}/{c.anio}</td>
                                                <td style={tdStyle}>
                                                    <button onClick={() => deleteCuota(c.id)} style={{ background: 'none', border: 'none', color: '#dc2626', fontWeight: 700, cursor: 'pointer' }}>Eliminar</button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === 'servicios' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                    <div style={{ background: 'var(--white)', padding: '24px', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-sm)' }}>
                        <h2 style={{ fontSize: '1.25rem', color: 'var(--blue)', fontWeight: 800, marginBottom: '24px' }}>Rutas de Transporte</h2>
                        <form onSubmit={handleRutaSubmit} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                            <input type="text" name="nombre" placeholder="Nombre Ruta" required style={inputStyle} />
                            <input type="text" name="chofer" placeholder="Chofer" required style={inputStyle} />
                            <input type="number" name="capacidad" placeholder="Cap." required style={{ ...inputStyle, width: '80px' }} />
                            <button type="submit" className="btn btn-green">+</button>
                        </form>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid #f1f5f9' }}>
                                    <th style={thStyle}>Ruta</th>
                                    <th style={thStyle}>Chofer</th>
                                    <th style={thStyle}>Cap.</th>
                                    <th style={thStyle}>Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rutasTransporte.length === 0 ? (
                                    <tr><td colSpan="4" style={{ textAlign: 'center', padding: '10px' }}>No hay rutas.</td></tr>
                                ) : (
                                    rutasTransporte.map(r => (
                                        <tr key={r.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                            <td style={tdStyle}>{r.nombre}</td>
                                            <td style={tdStyle}>{r.chofer}</td>
                                            <td style={tdStyle}>{r.capacidad}</td>
                                            <td style={tdStyle}>
                                                <button onClick={() => deleteRuta(r.id)} style={{ background: 'none', border: 'none', color: '#dc2626', fontWeight: 700, cursor: 'pointer' }}>Eliminar</button>
                                            </td>
                                        </tr>
                                    ))
                                )}
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
                            <button type="button" className="btn btn-violet" style={{ padding: '14px' }}>Verificar y Reservar</button>
                        </form>
                    </div>
                </div>
            )}

            {activeTab === 'reportes' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                    <div style={{ background: 'var(--white)', padding: '24px', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-sm)' }}>
                        <h2 style={{ fontSize: '1.1rem', color: 'var(--blue)', fontWeight: 800, marginBottom: '20px' }}>📈 Rendimiento Académico</h2>
                        <div style={{ height: '200px', background: '#f8fafc', borderRadius: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '20px' }}>
                            <div style={{ marginBottom: '10px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '5px' }}>
                                    <span>Nivel Primario</span>
                                    <span>8.2</span>
                                </div>
                                <div style={{ height: '8px', background: '#e2e8f0', borderRadius: '4px' }}>
                                    <div style={{ width: '82%', height: '100%', background: 'var(--blue)', borderRadius: '4px' }}></div>
                                </div>
                            </div>
                            <div style={{ marginBottom: '10px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '5px' }}>
                                    <span>Nivel Secundario</span>
                                    <span>7.5</span>
                                </div>
                                <div style={{ height: '8px', background: '#e2e8f0', borderRadius: '4px' }}>
                                    <div style={{ width: '75%', height: '100%', background: 'var(--orange)', borderRadius: '4px' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ background: 'var(--white)', padding: '24px', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-sm)' }}>
                        <h2 style={{ fontSize: '1.1rem', color: 'var(--blue)', fontWeight: 800, marginBottom: '20px' }}>📊 Situación Financiera</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>Recaudación Mes Actual</span>
                                <span style={{ fontWeight: 800, color: 'var(--green)' }}>$2.450.000</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>Morosidad Estimada</span>
                                <span style={{ fontWeight: 800, color: 'var(--orange)' }}>$320.500</span>
                            </div>
                            <div style={{ height: '10px', background: '#f1f5f9', borderRadius: '10px', marginTop: '10px', overflow: 'hidden' }}>
                                <div style={{ width: '85%', height: '100%', background: 'var(--green)' }}></div>
                            </div>
                            <p style={{ fontSize: '0.7rem', color: '#64748b', textAlign: 'right' }}>85% de efectividad de cobro</p>
                        </div>
                    </div>
                    <div style={{ background: 'var(--white)', padding: '24px', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-sm)' }}>
                        <h2 style={{ fontSize: '1.1rem', color: 'var(--blue)', fontWeight: 800, marginBottom: '20px' }}>📋 Listados Disponibles</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <button className="btn btn-hero-outline" style={{ fontSize: '0.85rem', textAlign: 'left' }}>📄 Listado de Deudores</button>
                            <button className="btn btn-hero-outline" style={{ fontSize: '0.85rem', textAlign: 'left' }}>📄 Planillas de Asistencia</button>
                            <button className="btn btn-hero-outline" style={{ fontSize: '0.85rem', textAlign: 'left' }}>📄 Legajos de Alumnos</button>
                            <button className="btn btn-hero-outline" style={{ fontSize: '0.85rem', textAlign: 'left' }}>📄 Nómina de Personal</button>
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
