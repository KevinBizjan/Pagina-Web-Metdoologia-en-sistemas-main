import React, { useState } from 'react';

const Preinscripcion = () => {
    const [formData, setFormData] = useState({
        alumno_nombre: '',
        alumno_dni: '',
        alumno_edad: '',
        nivel: '',
        turno: '',
        tutor_nombre: '',
        tutor_telefono: '',
        tutor_email: '',
        observaciones: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validaciones extra
        const dniRegex = /^\d+$/;
        if (!dniRegex.test(formData.alumno_dni)) {
            setMessage({ type: 'error', text: 'El DNI debe ser estrictamente numérico (sin puntos ni letras).' });
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.tutor_email)) {
            setMessage({ type: 'error', text: 'El correo electrónico no tiene un formato válido.' });
            return;
        }

        if (formData.alumno_edad < 3 || formData.alumno_edad > 18) {
            setMessage({ type: 'error', text: 'La edad del alumno debe estar entre 3 y 18 años.' });
            return;
        }

        if (formData.tutor_telefono.length < 10) {
            setMessage({ type: 'error', text: 'El teléfono debe tener al menos 10 dígitos (incluyendo código de área).' });
            return;
        }

        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const response = await fetch('http://localhost:3000/api/preinscripciones', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                setMessage({ type: 'success', text: '¡Preinscripción enviada con éxito! Nos contactaremos pronto.' });
                setFormData({
                    alumno_nombre: '',
                    alumno_dni: '',
                    alumno_edad: '',
                    nivel: '',
                    turno: '',
                    tutor_nombre: '',
                    tutor_telefono: '',
                    tutor_email: '',
                    observaciones: ''
                });
            } else {
                setMessage({ type: 'error', text: data.message || 'Ocurrió un error al enviar el formulario.' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Error de conexión con el servidor.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="section" id="preinscripcion" style={{ background: 'var(--bg)' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <h2 className="section-title fade-in">Preinscripción 2027</h2>
                    <p className="section-sub fade-in" style={{ margin: '0 auto' }}>Completá el siguiente formulario para iniciar el proceso de admisión. Las vacantes se asignan por orden de llegada y disponibilidad por nivel.</p>
                </div>

                <div className="fade-in" style={{
                    background: 'var(--white)',
                    padding: '40px',
                    borderRadius: 'var(--radius)',
                    boxShadow: 'var(--shadow-sm)',
                    maxWidth: '800px',
                    margin: '0 auto'
                }}>
                    {message.text && (
                        <div style={{
                            padding: '16px',
                            borderRadius: '8px',
                            marginBottom: '24px',
                            textAlign: 'center',
                            fontWeight: '700',
                            backgroundColor: message.type === 'success' ? '#dcfce7' : '#fee2e2',
                            color: message.type === 'success' ? '#166534' : '#991b1b',
                            border: `1px solid ${message.type === 'success' ? '#bbf7d0' : '#fecaca'}`
                        }}>
                            {message.text}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                            {/* Datos del Alumno */}
                            <div>
                                <h3 style={{ color: 'var(--blue)', marginBottom: '16px', fontSize: '1.1rem', borderBottom: '2px solid #f1f5f9', paddingBottom: '8px' }}>Datos del Alumno</h3>
                                <div style={{ marginBottom: '16px' }}>
                                    <label style={{ display: 'block', marginBottom: '6px', fontWeight: '700', fontSize: '0.85rem' }}>Nombre Completo</label>
                                    <input type="text" name="alumno_nombre" value={formData.alumno_nombre} onChange={handleChange} required style={inputStyle} placeholder="Nombre y Apellido" />
                                </div>
                                <div style={{ marginBottom: '16px' }}>
                                    <label style={{ display: 'block', marginBottom: '6px', fontWeight: '700', fontSize: '0.85rem' }}>DNI (Sin puntos ni letras)</label>
                                    <input type="text" name="alumno_dni" value={formData.alumno_dni} onChange={handleChange} required style={inputStyle} placeholder="Solo números" />
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                    <div style={{ marginBottom: '16px' }}>
                                        <label style={{ display: 'block', marginBottom: '6px', fontWeight: '700', fontSize: '0.85rem' }}>Edad</label>
                                        <input type="number" name="alumno_edad" value={formData.alumno_edad} onChange={handleChange} required style={inputStyle} placeholder="Ej: 6" />
                                    </div>
                                    <div style={{ marginBottom: '16px' }}>
                                        <label style={{ display: 'block', marginBottom: '6px', fontWeight: '700', fontSize: '0.85rem' }}>Nivel</label>
                                        <select name="nivel" value={formData.nivel} onChange={handleChange} required style={inputStyle}>
                                            <option value="">Elegir...</option>
                                            <option value="Inicial">Inicial</option>
                                            <option value="Primario">Primario</option>
                                            <option value="Secundario">Secundario</option>
                                        </select>
                                    </div>
                                </div>
                                <div style={{ marginBottom: '16px' }}>
                                    <label style={{ display: 'block', marginBottom: '6px', fontWeight: '700', fontSize: '0.85rem' }}>Turno Preferente</label>
                                    <select name="turno" value={formData.turno} onChange={handleChange} required style={inputStyle}>
                                        <option value="">Seleccionar turno</option>
                                        <option value="Mañana">Mañana</option>
                                        <option value="Tarde">Tarde</option>
                                        <option value="Jornada Extendida">Jornada Extendida</option>
                                    </select>
                                </div>
                            </div>

                            {/* Datos del Tutor */}
                            <div>
                                <h3 style={{ color: 'var(--green)', marginBottom: '16px', fontSize: '1.1rem', borderBottom: '2px solid #f1f5f9', paddingBottom: '8px' }}>Datos del Responsable</h3>
                                <div style={{ marginBottom: '16px' }}>
                                    <label style={{ display: 'block', marginBottom: '6px', fontWeight: '700', fontSize: '0.85rem' }}>Nombre del Tutor</label>
                                    <input type="text" name="tutor_nombre" value={formData.tutor_nombre} onChange={handleChange} required style={inputStyle} placeholder="Nombre y Apellido" />
                                </div>
                                <div style={{ marginBottom: '16px' }}>
                                    <label style={{ display: 'block', marginBottom: '6px', fontWeight: '700', fontSize: '0.85rem' }}>Teléfono de Contacto</label>
                                    <input type="tel" name="tutor_telefono" value={formData.tutor_telefono} onChange={handleChange} required style={inputStyle} placeholder="Ej: 3624123456" />
                                </div>
                                <div style={{ marginBottom: '16px' }}>
                                    <label style={{ display: 'block', marginBottom: '6px', fontWeight: '700', fontSize: '0.85rem' }}>Correo Electrónico</label>
                                    <input type="email" name="tutor_email" value={formData.tutor_email} onChange={handleChange} required style={inputStyle} placeholder="ejemplo@correo.com" />
                                </div>
                                <div style={{ marginBottom: '16px' }}>
                                    <label style={{ display: 'block', marginBottom: '6px', fontWeight: '700', fontSize: '0.85rem' }}>Observaciones (Opcional)</label>
                                    <textarea name="observaciones" value={formData.observaciones} onChange={handleChange} style={{ ...inputStyle, height: '100px', resize: 'none' }} placeholder="Alguna información relevante..."></textarea>
                                </div>
                            </div>
                        </div>

                        <div style={{ marginTop: '32px', textAlign: 'center' }}>
                            <button type="submit" className="btn btn-hero btn-hero-orange" disabled={loading} style={{ width: '100%', maxWidth: '400px', justifyContent: 'center', gap: '10px' }}>
                                {loading ? (
                                    <>
                                        <div className="loader"></div>
                                        <span>Enviando...</span>
                                    </>
                                ) : 'Enviar Preinscripción'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'border-color 0.2s',
    fontFamily: 'inherit'
};

export default Preinscripcion;
