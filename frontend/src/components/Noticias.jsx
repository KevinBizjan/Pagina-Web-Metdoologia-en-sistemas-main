import React from 'react';

const Noticias = () => {
  return (
    <section className="section noticias" id="noticias">
      <div className="container">
        <h2 className="section-title fade-in">Últimas Noticias</h2>
        <p className="section-sub fade-in">Enterate de todo lo que pasa en nuestra institución.</p>

        <div className="noticias-grid">
          <div className="noticia-card fade-in">
            <div className="noticia-card-img">
              <img src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&q=80" alt="Inscripciones 2027" />
              <div className="noticia-date">15<span>FEB</span></div>
            </div>
            <div className="noticia-card-body">
              <h3>Inicio de Inscripciones 2027</h3>
              <p>Comenzaron las preinscripciones para el ciclo lectivo 2027. Las vacantes son limitadas en cada nivel. ¡No dejes pasar esta oportunidad!</p>
              <a href="#" className="noticia-link">Leer más →</a>
            </div>
          </div>
          <div className="noticia-card fade-in" style={{ transitionDelay: '.1s' }}>
            <div className="noticia-card-img">
              <img src="https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=600&q=80" alt="Nueva pileta" />
              <div className="noticia-date">11<span>FEB</span></div>
            </div>
            <div className="noticia-card-body">
              <h3>Nueva Pileta Inaugurada</h3>
              <p>Inauguramos las nuevas instalaciones de natación con tecnología de primer nivel. Clases disponibles para todos los niveles educativos.</p>
              <a href="#" className="noticia-link">Leer más →</a>
            </div>
          </div>
          <div className="noticia-card fade-in" style={{ transitionDelay: '.2s' }}>
            <div className="noticia-card-img">
              <img src="https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=600&q=80" alt="Torneo de Ajedrez" />
              <div className="noticia-date">5<span>FEB</span></div>
            </div>
            <div className="noticia-card-body">
              <h3>Torneo de Ajedrez 2026</h3>
              <p>Gran participación estudiantil en el torneo interinstitucional de ajedrez. Nuestros alumnos se destacaron en todas las categorías.</p>
              <a href="#" className="noticia-link">Leer más →</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Noticias;
