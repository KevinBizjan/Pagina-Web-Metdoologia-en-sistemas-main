import React from 'react';

const QuickAccess = () => {
  return (
    <div className="quick-access">
      <div className="quick-grid">
        <div className="quick-card fade-in">
          <div className="quick-icon qi-green">📝</div>
          <div>
            <h3>Admisión Online</h3>
            <p>Completá el formulario de preinscripción</p>
          </div>
        </div>
        <div className="quick-card fade-in" style={{ transitionDelay: '.1s' }}>
          <div className="quick-icon qi-blue">🏫</div>
          <div>
            <h3>Gestión Institucional</h3>
            <p>Portal para docentes y administración</p>
          </div>
        </div>
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
