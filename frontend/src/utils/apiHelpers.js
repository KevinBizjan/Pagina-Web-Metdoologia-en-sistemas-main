/**
 * Utilidades para el manejo de respuestas y errores en peticiones API.
 */

/**
 * Extrae el mensaje de error de una respuesta fallida o retorna el mensaje por defecto.
 * @param {Response} response 
 * @param {string} mensajePorDefecto 
 * @returns {Promise<string>}
 */
export const extraerMensajeError = async (response, mensajePorDefecto = 'Ha ocurrido un error inesperado') => {
    try {
        const datos = await response.json();
        return datos.message || mensajePorDefecto;
    } catch {
        return mensajePorDefecto;
    }
};
