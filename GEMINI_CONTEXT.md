# Proyecto - Educar para Transformar

## Descripción General
Este proyecto consiste en una página web institucional para un centro educativo llamado “Educar para Transformar”.

Actualmente el proyecto está desarrollado principalmente en un único archivo HTML con estilos y scripts simples.

La web ya posee:
- Landing page
- Navbar funcional
- Secciones institucionales
- Diseño visual definido
- Navegación interna entre secciones

El objetivo es evolucionar esta web hacia un sistema institucional modular con autenticación y paneles para distintos tipos de usuarios.

---

# Tecnologías del Proyecto

| Área | Tecnología |
|---|---|
| Frontend | HTML5, CSS3, JavaScript, React |
| Backend | Node.js + Express |
| Base de Datos | SQLite |
| Control de Versiones | Git / GitHub |

---

# Estado Actual

## Ya Implementado
- Inicio
- Nosotros
- Niveles Educativos
- Servicios
- Actividades
- Idiomas
- Contacto
- Diseño responsive básico
- Navegación entre secciones

## Falta Implementar
- Acceso Padres
- Acceso Alumnos
- Acceso Docentes
- Preinscripción online
- Backend
- Base de datos
- Autenticación
- Dashboards

---

# Objetivo Técnico

Convertir la landing actual en una plataforma educativa modular y escalable.

---

# Funcionalidades Prioritarias

## 1. Sistema de Autenticación
Roles:
- admin
- docente
- alumno
- padre

Funciones:
- login
- logout
- sesión persistente

Tecnologías sugeridas:
- JWT
- bcrypt

---

## 2. Preinscripción
Formulario responsive con:
- datos del alumno
- datos del tutor
- nivel educativo
- turno
- contacto

Persistencia:
- SQLite

---

## 3. Dashboard Alumno
- materias
- horarios
- comunicados
- notas mock

---

## 4. Dashboard Padres
- información del alumno
- comunicados
- asistencia mock
- cuotas mock

---

## 5. Dashboard Docentes
- cursos
- alumnos
- carga de notas mock

---

# Funcionalidades NO Prioritarias

Por cuestiones de tiempo NO implementar todavía:
- pagos reales
- chat en tiempo real
- transporte
- comedor
- enfermería
- reportes avanzados
- notificaciones reales

---

# Requerimientos Técnicos

## Importante
Antes de modificar:
- analizar estructura actual
- reutilizar estilos existentes
- evitar romper diseño actual
- evitar duplicar código
- modularizar correctamente
- mantener responsive

---

# Objetivo de Refactorización

Separar correctamente:
- componentes
- estilos
- scripts
- assets
- páginas
- backend

---

# Prioridades de Desarrollo

1. Analizar estructura actual
2. Modularizar frontend
3. Implementar backend
4. Implementar autenticación
5. Crear dashboards
6. Crear preinscripción
7. Conectar SQLite

---

# Instrucciones para Gemini

NO generar archivos innecesarios.

NO romper el diseño actual.

NO reescribir toda la web desde cero.

Primero analizar el proyecto completo y luego proponer una arquitectura ordenada antes de implementar cambios.