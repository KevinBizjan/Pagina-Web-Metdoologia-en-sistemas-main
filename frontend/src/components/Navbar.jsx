import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id], div[id="inscripciones"]');
      let current = '';
      sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 120) {
          current = sec.id;
        }
      });
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="topbar">
      <div className="topbar-inner">
        {/* Logo */}
        <a href="#" className="logo">
          <div className="logo-icon">
            <img src="/img/logo.png" alt="Logo" />
          </div>
          <div className="logo-text">
            <span>EDUCAR</span>
            <span>Para Transformar</span>
          </div>
        </a>

        {/* Nav Desktop */}
        <nav>
          <a href="#" className={activeSection === '' ? 'active' : ''}>Inicio</a>
          <a href="#institucion" className={activeSection === 'institucion' ? 'active' : ''}>Nosotros</a>
          <a href="#niveles" className={activeSection === 'niveles' ? 'active' : ''}>Niveles Educativos</a>
          <a href="#servicios" className={activeSection === 'servicios' ? 'active' : ''}>Servicios</a>
          <a href="#noticias" className={activeSection === 'noticias' ? 'active' : ''}>Actividades</a>
          <a href="#idiomas" className={activeSection === 'idiomas' ? 'active' : ''}>Idiomas</a>
          <a href="#contacto" className={activeSection === 'contacto' ? 'active' : ''}>Contacto</a>
        </nav>

        {/* Buttons */}
        <div className="topbar-btns">
          {!user ? (
            <>
              <Link to="/login" className="btn btn-green">👨‍👩‍👧 Acceso Padres</Link>
              <Link to="/login" className="btn btn-violet">🎒 Acceso Alumnos</Link>
            </>
          ) : (
            <>
              <span style={{ fontWeight: 800, color: 'var(--blue)', fontSize: '0.85rem' }}>Hola, {user.nombre}</span>
              <Link to={`/${user.rol}`} className="btn btn-violet" style={{ fontSize: '0.75rem', padding: '6px 12px' }}>Panel</Link>
              <button onClick={handleLogout} className="btn" style={{ background: '#f1f5f9', color: 'var(--text)', fontSize: '0.75rem', padding: '6px 12px' }}>Salir</button>
            </>
          )}
          <div className="hamburger" id="menuBtn" onClick={toggleMenu}>
            <span></span><span></span><span></span>
          </div>
        </div>
      </div>
      {/* Mobile Nav */}
      <nav className={`mobile-nav ${isOpen ? 'open' : ''}`} id="mobileNav">
        <a href="#" onClick={() => setIsOpen(false)}>Inicio</a>
        <a href="#institucion" onClick={() => setIsOpen(false)}>Nosotros</a>
        <a href="#niveles" onClick={() => setIsOpen(false)}>Niveles Educativos</a>
        <a href="#servicios" onClick={() => setIsOpen(false)}>Servicios</a>
        <a href="#noticias" onClick={() => setIsOpen(false)}>Actividades</a>
        <a href="#idiomas" onClick={() => setIsOpen(false)}>Idiomas</a>
        <a href="#contacto" onClick={() => setIsOpen(false)}>Contacto</a>
        {user && <a href="#" onClick={handleLogout}>Cerrar Sesión</a>}
      </nav>
    </header>
  );
};

export default Navbar;
