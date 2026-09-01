const QuickAccess = () => {
  return (
    <div className="quick-access">
      <div className="quick-grid">
        <a href="/login?role=padre" className="quick-card fade-in" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="quick-icon qi-green">👨‍👩‍👧</div>
          <div>
            <h3>Acceso Padres</h3>
            <p>Seguimiento académico, calificaciones y estado de cuotas</p>
          </div>
        </a>
        <a href="/login?role=alumno" className="quick-card fade-in" style={{ transitionDelay: '.1s', textDecoration: 'none', color: 'inherit' }}>
          <div className="quick-icon qi-blue">🎒</div>
          <div>
            <h3>Acceso Alumnos</h3>
            <p>Horarios de clases, materias e inscripción a actividades</p>
          </div>
        </a>
        <a href="/login?role=docente" className="quick-card fade-in" style={{ transitionDelay: '.2s', textDecoration: 'none', color: 'inherit' }}>
          <div className="quick-icon qi-orange">👨‍🏫</div>
          <div>
            <h3>Acceso Maestros</h3>
            <p>Toma de asistencia, carga de notas y comunicados</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default QuickAccess;

