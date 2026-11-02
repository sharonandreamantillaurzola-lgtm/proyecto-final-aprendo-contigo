import { useState } from 'react';
import { Link } from 'react-router-dom';

const NAV_LINKS = [
  ['#hero', 'Inicio'],
  ['#beneficios', 'Beneficios'],
  ['#nosotros', 'Nosotros'],
  ['#areas-academicas', 'Áreas Académicas'],
  ['#catalogo', 'Planes y Tarifas'],
  ['#testimonios', 'Testimonios'],
  ['#asistente-ia', 'Asistente IA'],
  ['#contacto', 'Contacto'],
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header>
      <div className="logo">
        <img src="/imagenes/logo.png" alt="Logo de Aprendo Contigo" />
        <h1>Aprendo Contigo</h1>
      </div>

      <button
        className="menu-hamburguesa"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Abrir menú"
      >
        ☰
      </button>

      <nav>
        <ul className={`menu${open ? ' activo' : ''}`}>
          {NAV_LINKS.map(([href, label]) => (
            <li key={href}>
              <a href={href} onClick={() => setOpen(false)}>{label}</a>
            </li>
          ))}
          <li>
            <Link to="/admin" onClick={() => setOpen(false)}>Iniciar sesión</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
