import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth.js';
import ResourceView from './ResourceView.jsx';

const RESOURCES = {
  products: {
    label: 'Servicios',
    endpoint: '/products',
    fields: [
      ['nombre', 'Nombre', 'text', true],
      ['categoria', 'Categoría', 'text', true],
      ['precio', 'Precio', 'number'],
      ['descripcion', 'Descripción', 'textarea', true],
      ['cantidadClases', 'Cantidad de clases', 'number'],
      ['clasesVirtuales', 'Clases virtuales', 'number'],
      ['clasesPresenciales', 'Clases presenciales', 'number'],
    ],
  },
  promotions: {
    label: 'Promociones',
    endpoint: '/promotions',
    fields: [
      ['nombre', 'Nombre', 'text', true],
      ['descripcion', 'Descripción', 'textarea', true],
      ['precio', 'Precio', 'number'],
      ['precioAnterior', 'Precio anterior', 'number'],
      ['fechaInicio', 'Fecha inicial', 'date'],
      ['fechaFin', 'Fecha final', 'date'],
      ['activa', 'Activa', 'checkbox'],
    ],
  },
  recognitions: {
    label: 'Reconocimientos',
    endpoint: '/recognitions',
    fields: [
      ['nombre', 'Nombre', 'text', true],
      ['descripcion', 'Descripción', 'textarea', true],
      ['clasesRequeridas', 'Clases requeridas', 'number'],
      ['beneficio', 'Beneficio', 'text', true],
      ['precioPresencial', 'Precio presencial', 'number'],
      ['precioVirtual', 'Precio virtual', 'number'],
      ['condiciones', 'Condiciones', 'textarea'],
      ['activo', 'Activo', 'checkbox'],
    ],
  },
  users: {
    label: 'Usuarios',
    endpoint: '/users',
    fields: [],
  },
};

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [activeResource, setActiveResource] = useState('products');

  return (
    <section id="dashboard-view" className="dashboard">
      <header className="dashboard-header">
        <div>
          <p className="eyebrow">Aprendo Contigo</p>
          <h1>Panel administrativo</h1>
          <p id="admin-identity">Sesión activa: {user?.id}</p>
        </div>
        <button id="logout-button" className="button-secondary" onClick={logout}>
          Cerrar sesión
        </button>
      </header>

      <nav id="resource-tabs" className="tabs" aria-label="Secciones administrativas">
        {Object.entries(RESOURCES).map(([key, resource]) => (
          <button
            key={key}
            type="button"
            className={`tab${key === activeResource ? ' active' : ''}`}
            data-resource={key}
            onClick={() => setActiveResource(key)}
          >
            {resource.label}
          </button>
        ))}
      </nav>

      <ResourceView resource={RESOURCES[activeResource]} />
    </section>
  );
}
