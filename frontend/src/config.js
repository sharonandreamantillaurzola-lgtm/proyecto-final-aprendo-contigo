// ============================================================
//  Configuración central del frontend
//  Estos valores son públicos (se ven en el navegador), así que
//  no hace falta guardarlos como secrets en GitHub.
// ============================================================

// URL del backend desplegado (Render, Railway, etc.). Debe terminar en /api.
const PRODUCTION_API_URL = 'https://aprendocontigobackenddd.vercel.app/api';

// En desarrollo se usa el proxy de Vite (/api -> localhost:3000).
export const API_URL = import.meta.env.DEV ? '/api' : PRODUCTION_API_URL;

// Endpoint de Formspree del formulario de contacto.
export const FORMSPREE_URL = 'https://formspree.io/f/mgojjywg';

// Ruta a un archivo de /public respetando la base del sitio
// (en GitHub Pages la página vive en /proyecto-final-aprendo-contigo/).
export const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
