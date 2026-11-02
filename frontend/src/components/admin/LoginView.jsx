import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth.js';
import { Link } from 'react-router-dom';

export default function LoginView() {
  const { login, register } = useAuth();

  const [view, setView] = useState('login');
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    nombre: '', email: '', password: '', confirm: '',
  });
  const [loginMessage, setLoginMessage] = useState('');
  const [registerMessage, setRegisterMessage] = useState('');
  const [registerOk, setRegisterOk] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setLoginMessage('');
    try {
      await login(loginData.email, loginData.password);
    } catch (error) {
      setLoginMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    setRegisterMessage('');
    setRegisterOk(false);

    if (registerData.password !== registerData.confirm) {
      setRegisterMessage('Las contraseñas no coinciden');
      return;
    }

    setLoading(true);
    try {
      await register(
        registerData.nombre.trim(),
        registerData.email.trim(),
        registerData.password,
      );
      setRegisterData({ nombre: '', email: '', password: '', confirm: '' });
      setRegisterOk(true);
      setRegisterMessage('Cuenta creada. Ya puedes iniciar sesión.');
      setView('login');
      setLoginMessage('Cuenta creada correctamente.');
    } catch (error) {
      setRegisterMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const description = view === 'login'
    ? 'Ingresa con una cuenta que tenga rol de administrador.'
    : 'Crea una cuenta para solicitar acceso a la plataforma.';

  return (
    <section id="login-view" className="auth-card">
      <img src="/imagenes/logo.png" alt="Logo de Aprendo Contigo" className="brand-mark" />
      <p className="eyebrow">Zona privada</p>
      <h1>Panel administrativo</h1>
      <p id="auth-description">{description}</p>

      <div className="auth-switch" role="tablist" aria-label="Acceso y registro">
        <button
          type="button"
          className={`auth-tab${view === 'login' ? ' active' : ''}`}
          data-auth-view="login"
          onClick={() => setView('login')}
        >
          Ingresar
        </button>
        <button
          type="button"
          className={`auth-tab${view === 'register' ? ' active' : ''}`}
          data-auth-view="register"
          onClick={() => setView('register')}
        >
          Registrarse
        </button>
      </div>

      {view === 'login' ? (
        <form id="login-form" data-auth-panel="login" autoComplete="off" onSubmit={handleLogin}>
          <label>
            Correo
            <input
              type="email"
              name="loginEmail"
              required
              autoComplete="off"
              value={loginData.email}
              onChange={(event) => setLoginData((prev) => ({ ...prev, email: event.target.value }))}
            />
          </label>
          <label>
            Contraseña
            <input
              type="password"
              name="loginPassword"
              required
              autoComplete="off"
              value={loginData.password}
              onChange={(event) => setLoginData((prev) => ({ ...prev, password: event.target.value }))}
            />
          </label>
          <button type="submit" disabled={loading}>Ingresar</button>
          <p id="login-message" className="message" role="alert">{loginMessage}</p>
        </form>
      ) : (
        <form id="register-form" data-auth-panel="register" autoComplete="off" onSubmit={handleRegister}>
          <label>
            Nombre
            <input
              type="text"
              name="registerName"
              required
              minLength="1"
              autoComplete="off"
              value={registerData.nombre}
              onChange={(event) => setRegisterData((prev) => ({ ...prev, nombre: event.target.value }))}
            />
          </label>
          <label>
            Correo
            <input
              type="email"
              name="registerEmail"
              required
              autoComplete="off"
              value={registerData.email}
              onChange={(event) => setRegisterData((prev) => ({ ...prev, email: event.target.value }))}
            />
          </label>
          <label>
            Contraseña
            <input
              type="password"
              name="registerPassword"
              required
              minLength="8"
              autoComplete="new-password"
              value={registerData.password}
              onChange={(event) => setRegisterData((prev) => ({ ...prev, password: event.target.value }))}
            />
          </label>
          <label>
            Confirmar contraseña
            <input
              type="password"
              name="confirmPassword"
              required
              minLength="8"
              autoComplete="new-password"
              value={registerData.confirm}
              onChange={(event) => setRegisterData((prev) => ({ ...prev, confirm: event.target.value }))}
            />
          </label>
          <button type="submit" disabled={loading}>Crear cuenta</button>
          <p
            id="register-message"
            className="message"
            role="alert"
            style={registerOk ? { color: 'green' } : undefined}
          >
            {registerMessage}
          </p>
        </form>
      )}

      <Link to="/" className="back-link">Volver a al inicio</Link>
    </section>
  );
}
