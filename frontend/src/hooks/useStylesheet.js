import { useEffect } from 'react';

// Inyecta una hoja de estilos en <head> mientras el componente está montado
// y la elimina al desmontar. Sirve para aislar los CSS de la landing y del
// admin (ambos tienen selectores globales que chocarían si se cargaran juntos).
export function useStylesheet(href) {
  useEffect(() => {
    if (!href) return undefined;

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, [href]);
}
