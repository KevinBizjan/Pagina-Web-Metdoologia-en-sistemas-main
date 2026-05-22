import React from 'react';

const Idiomas = () => {
  return (
    <section className="section" id="idiomas" style={{ background: 'var(--white)' }}>
      <div className="container">
        <h2 className="section-title fade-in">Departamento de Idiomas</h2>
        <p className="section-sub fade-in">
          Formamos ciudadanos del mundo con un sólido dominio de lenguas extranjeras desde los primeros años.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3,1fr)',
            gap: '24px',
            marginTop: '40px',
          }}
        >
          <div className="serv-card fade-in" style={{ borderTopColor: '#012169' }}>
            <div className="serv-icon">
              <img
                src="https://flagcdn.com/w80/gb.png"
                alt="Bandera Reino Unido"
                style={{ width: '50px', height: '35px', objectFit: 'cover', borderRadius: '6px' }}
              />
            </div>
            <h3>Inglés</h3>
            <p>Programa intensivo desde Nivel Inicial. Preparación para exámenes.</p>
          </div>

          <div
            className="serv-card fade-in"
            style={{ borderTopColor: '#009c3b', transitionDelay: '.1s' }}
          >
            <div className="serv-icon">
              <img
                src="https://flagcdn.com/w80/br.png"
                alt="Bandera Brasil"
                style={{ width: '50px', height: '35px', objectFit: 'cover', borderRadius: '6px' }}
              />
            </div>
            <h3>Portugués</h3>
            <p>
              Dado el contexto regional, el portugués es clave para la integración con
              el Mercosur y las oportunidades laborales.
            </p>
          </div>

          <div
            className="serv-card fade-in"
            style={{ borderTopColor: '#002395', transitionDelay: '.2s' }}
          >
            <div className="serv-icon">
              <img
                src="https://flagcdn.com/w80/fr.png"
                alt="Bandera Francia"
                style={{ width: '50px', height: '35px', objectFit: 'cover', borderRadius: '6px' }}
              />
            </div>
            <h3>Francés</h3>
            <p>
              Formación en idioma francés con enfoque cultural y literario.
              Preparación para exámenes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Idiomas;