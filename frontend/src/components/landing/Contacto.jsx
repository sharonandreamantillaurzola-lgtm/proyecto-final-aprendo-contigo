import { useContactForm } from '../../hooks/useContactForm.js';

function ErrorMessage({ text }) {
  if (!text) return null;
  return <small style={{ color: 'red' }}>{text}</small>;
}

export default function Contacto() {
  const { values, errors, submitting, submitError, success, setField, submit } = useContactForm();

  const handleSubmit = (event) => {
    event.preventDefault();
    submit();
  };

  const border = (field) => (errors[field] ? { border: '2px solid red' } : undefined);

  return (
    <section id="contacto">
      <div className="titulo-contacto">
        <h2>📩 Contáctanos</h2>
        <h3>¿Listo para fortalecer el aprendizaje?</h3>
        <p>
          En <strong>Aprendo Contigo</strong> acompañamos a cada estudiante con un
          proceso personalizado, dinámico y adaptado a sus necesidades, brindando apoyo
          académico para fortalecer sus habilidades y alcanzar mejores resultados.
        </p>
      </div>

      <div className="contenedor-contacto">
        <div className="informacion-contacto">
          <h3>📞 Hablemos</h3>
          <p>
            ¿Tienes dudas sobre nuestros servicios? Estamos disponibles para orientarte
            y encontrar la mejor opción según las necesidades del estudiante.
          </p>
          <a
            href="https://wa.me/573125730724?text=Hola,%20estoy%20interesado%20en%20los%20servicios%20de%20Aprendo%20contigo"
            target="_blank"
            rel="noreferrer"
          >
            📱 Escribir por WhatsApp
          </a>
          <p>📧 Correo electrónico:</p>
          <a href="mailto:aprendocontigo.ace@gmail.com">aprendocontigo.ace@gmail.com</a>
          <p>📚 Modalidades disponibles:</p>
          <ul>
            <li>Clases presenciales - Barranquilla</li>
            <li>Clases virtuales</li>
          </ul>
        </div>

        <div className="formulario-contacto">
          <h3>📝 Solicita información</h3>
          <form onSubmit={handleSubmit} noValidate>
            <label htmlFor="acudiente">Nombre del acudiente *</label>
            <input
              type="text"
              id="acudiente"
              name="acudiente"
              placeholder="Escribe tu nombre"
              required
              value={values.guardian}
              onChange={(event) => setField('guardian', event.target.value)}
              style={border('guardian')}
            />
            <ErrorMessage text={errors.guardian} />

            <label htmlFor="correo">Correo electrónico *</label>
            <input
              type="email"
              id="correo"
              name="correo"
              placeholder="correo@ejemplo.com"
              required
              value={values.email}
              onChange={(event) => setField('email', event.target.value)}
              style={border('email')}
            />
            <ErrorMessage text={errors.email} />

            <label htmlFor="telefono">Número telefónico *</label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              placeholder="Ejemplo: 3125730724"
              maxLength="10"
              minLength="10"
              required
              value={values.phone}
              onChange={(event) => setField('phone', event.target.value)}
              style={border('phone')}
            />
            <ErrorMessage text={errors.phone} />

            <label htmlFor="estudiante">Nombre del estudiante</label>
            <input
              type="text"
              id="estudiante"
              name="estudiante"
              placeholder="Escribe el nombre del estudiante"
              value={values.student}
              onChange={(event) => setField('student', event.target.value)}
            />

            <label htmlFor="edad">Edad del estudiante *</label>
            <input
              type="number"
              id="edad"
              name="edad"
              placeholder="Ejemplo: 10"
              required
              value={values.age}
              onChange={(event) => setField('age', event.target.value)}
              style={border('age')}
            />
            <ErrorMessage text={errors.age} />

            <label htmlFor="grado">Grado escolar *</label>
            <input
              type="text"
              id="grado"
              name="grado"
              placeholder="Ejemplo: 5° de primaria"
              required
              value={values.grade}
              onChange={(event) => setField('grade', event.target.value)}
              style={border('grade')}
            />
            <ErrorMessage text={errors.grade} />

            <label htmlFor="modalidad">Modalidad de interés *</label>
            <select
              id="modalidad"
              name="modalidad"
              required
              value={values.modality}
              onChange={(event) => setField('modality', event.target.value)}
              style={border('modality')}
            >
              <option value="">Selecciona una opción</option>
              <option value="presencial">Presencial</option>
              <option value="virtual">Virtual</option>
            </select>
            <ErrorMessage text={errors.modality} />

            <label htmlFor="area">Área de refuerzo *</label>
            <input
              type="text"
              id="area"
              name="area"
              placeholder="Ejemplo: Matemáticas, inglés, español..."
              required
              value={values.area}
              onChange={(event) => setField('area', event.target.value)}
              style={border('area')}
            />
            <ErrorMessage text={errors.area} />

            <label htmlFor="mensaje">Cuéntanos cómo podemos ayudarte *</label>
            <textarea
              id="mensaje"
              name="mensaje"
              placeholder="Escribe aquí la necesidad del estudiante"
              required
              value={values.message}
              onChange={(event) => setField('message', event.target.value)}
              style={border('message')}
            />
            <ErrorMessage text={errors.message} />

            <button type="submit" disabled={submitting}>
              {submitting ? 'Enviando...' : 'Enviar solicitud'}
            </button>

            {submitError && <small style={{ color: 'red' }}>{submitError}</small>}
            {success && <small style={{ color: 'green' }}>Solicitud enviada correctamente</small>}
          </form>
        </div>
      </div>
    </section>
  );
}
