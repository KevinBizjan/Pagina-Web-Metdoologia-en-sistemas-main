/**
 * Utilidades de validación centralizadas para el frontend.
 * Evita la duplicación de expresiones regulares y lógica de validación de formularios.
 */

export const NOMBRE_REGEX = /^[\p{L}\s'’.-]+$/u;
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const DNI_REGEX = /^\d+$/;

/**
 * Valida si un texto es un nombre válido (letras, espacios, acentos, guion/apóstrofo).
 * @param {string} texto 
 * @returns {boolean}
 */
export const esNombreValido = (texto) => {
    return NOMBRE_REGEX.test(String(texto || '').trim());
};

/**
 * Valida el formato de un correo electrónico.
 * @param {string} email 
 * @returns {boolean}
 */
export const esEmailValido = (email) => {
    return EMAIL_REGEX.test(String(email || '').trim());
};

/**
 * Valida si un DNI contiene únicamente dígitos.
 * @param {string|number} dni 
 * @returns {boolean}
 */
export const esDniValido = (dni) => {
    return DNI_REGEX.test(String(dni || '').trim());
};

/**
 * Valida la complejidad de la contraseña ingresada.
 * @param {string} password 
 * @returns {string} Mensaje de error o cadena vacía si es válida.
 */
export const validarPassword = (password) => {
    if (!password || password.length < 8) return 'La contraseña debe tener al menos 8 caracteres.';
    if (!/[A-Z]/.test(password)) return 'La contraseña debe incluir al menos una mayúscula.';
    if (!/[0-9]/.test(password)) return 'La contraseña debe incluir al menos un número.';
    if (!/[^A-Za-z0-9]/.test(password)) return 'La contraseña debe incluir al menos un carácter especial (ej: ! @ # $).';
    return '';
};
