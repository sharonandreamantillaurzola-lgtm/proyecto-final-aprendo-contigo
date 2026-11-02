import { Link } from 'react-router-dom';

export default function LoginCta() {
  return (
    <section id="login">
      <h2>🔐 Iniciar sesión</h2>
      <p>
        El acceso administrativo está reservado para usuarios con permisos de
        administrador.
      </p>
      <Link to="/admin">
        <button type="button">Ir al panel administrativo</button>
      </Link>
    </section>
  );
}
