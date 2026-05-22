import React from 'react';

const QuickAccess = () => {
  return (
    <div className="quick-access">
      <div className="quick-grid">
        <a href="#preinscripcion" className="quick-card fade-in" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="quick-icon qi-green">📝</div>
          <div>
            <h3>Admisión Online</h3>
            <p>Completá el formulario de preinscripción</p>
          </div>
        </a>
        <a href="/login?role=docente" className="quick-card fade-in" style={{ transitionDelay: '.1s', textDecoration: 'none', color: 'inherit' }}>
          <div className="quick-icon qi-blue">🏫</div>
          <div>
            <h3>Portal para docentes</h3>
            <p>Acceso exclusivo para el personal educativo</p>
          </div>
        </a>
        <div className="quick-card fade-in" style={{ transitionDelay: '.2s' }}>
          <div className="quick-icon qi-orange">💻</div>
          <div>
            <h3>Plataforma Educativa</h3>
            <p>Accedé a clases virtuales y recursos</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickAccess;
