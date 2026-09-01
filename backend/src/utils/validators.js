/**
 * Utilidades de validación centralizadas para el backend.
 * Aplica el principio DRY evitando la dispersión de expresiones regulares y reglas de negocio.
 */

// Permite letras (con acentos/ñ), espacios y signos básicos de nombres (apóstrofo, punto, guion).
const NOMBRE_REGEX = /^[\p{L}\s'’.-]+$/u;

// Expresión regular para validación básica de formato de correo electrónico
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Expresión regular para validación de DNI numérico sin puntos ni caracteres especiales
const DNI_REGEX = /^\d+$/;

/**
 * Valida si un texto contiene únicamente caracteres permitidos para nombres o apellidos.
 * @param {string} texto 
 * @returns {boolean}
 */
const esNombreValido = (texto) => {
    if (!texto) return false;
    return NOMBRE_REGEX.test(String(texto).trim());
};

/**
 * Valida el formato de un correo electrónico.
 * @param {string} email 
 * @returns {boolean}
 */
const esEmailValido = (email) => {
    if (!email) return false;
    return EMAIL_REGEX.test(String(email).trim());
};

/**
 * Valida si un DNI es estrictamente numérico.
 * @param {string|number} dni 
 * @returns {boolean}
 */
const esDniValido = (dni) => {
    if (!dni) return false;
    return DNI_REGEX.test(String(dni).trim());
};

/**
 * Valida la complejidad de una contraseña al crear cuentas de usuario.
 * @param {string} password 
 * @returns {string} Mensaje de error o cadena vacía si es válida.
 */
const validarPassword = (password) => {
    if (!password || password.length < 8) return 'La contraseña debe tener al menos 8 caracteres.';
    if (!/[A-Z]/.test(password)) return 'La contraseña debe incluir al menos una mayúscula.';
    if (!/[0-9]/.test(password)) return 'La contraseña debe incluir al menos un número.';
    if (!/[^A-Za-z0-9]/.test(password)) return 'La contraseña debe incluir al menos un carácter especial (ej: ! @ # $).';
    return '';
};

/**
 * Valida si una edad numérica está dentro de un rango entero válido.
 * @param {number|string} edad 
 * @param {number} min 
 * @param {number} max 
 * @returns {boolean}
 */
const esEdadValida = (edad, min = 3, max = 18) => {
    const edadNum = Number(edad);
    return Number.isInteger(edadNum) && edadNum >= min && edadNum <= max;
};

module.exports = {
    NOMBRE_REGEX,
    EMAIL_REGEX,
    DNI_REGEX,
    esNombreValido,
    esEmailValido,
    esDniValido,
    validarPassword,
    esEdadValida
};
