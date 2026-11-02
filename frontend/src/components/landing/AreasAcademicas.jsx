const AREAS = [
  {
    titulo: '➗ Matemáticas',
    texto: 'Desarrollamos el razonamiento lógico y la resolución de problemas mediante explicaciones claras, ejercicios prácticos y estrategias adaptadas al nivel escolar del estudiante.',
  },
  {
    titulo: '📖 Lengua Castellana',
    texto: 'Fortalecemos la comprensión lectora, la ortografía, la gramática, la escritura y la expresión oral para mejorar las habilidades comunicativas del estudiante.',
  },
  {
    titulo: '🌐 Inglés',
    texto: 'Reforzamos vocabulario, gramática, pronunciación y comprensión del idioma mediante actividades dinámicas que facilitan un aprendizaje significativo.',
  },
  {
    titulo: '🔬 Ciencias Naturales',
    texto: 'Explicamos los fenómenos naturales de forma sencilla e interactiva, promoviendo la observación, la curiosidad y la comprensión de los contenidos escolares.',
  },
  {
    titulo: '🌍 Ciencias Sociales',
    texto: 'Fortalecemos los conocimientos de historia, geografía, cultura y ciudadanía, favoreciendo el análisis y la comprensión del entorno social.',
  },
  {
    titulo: '📝 Refuerzo Escolar y Acompañamiento en Tareas',
    texto: 'Brindamos apoyo personalizado en tareas, preparación para evaluaciones y refuerzo de los temas que requieren mayor práctica, fomentando la autonomía y la confianza del estudiante.',
  },
];

export default function AreasAcademicas() {
  return (
    <section id="areas-academicas">
      <h2>📚 Áreas Académicas</h2>

      <p>
        En <strong>Aprendo Contigo</strong> brindamos acompañamiento académico
        personalizado para estudiantes desde preescolar hasta octavo grado. Cada clase
        se adapta al ritmo, las necesidades y los objetivos de aprendizaje de cada
        estudiante, fortaleciendo sus conocimientos de manera clara, dinámica y cercana.
      </p>

      <div className="imagen-areas">
        <img
          src="/imagenes/imagen5.jpg"
          alt="Ilustración de estudiantes aprendiendo diferentes áreas académicas"
        />
      </div>

      <div className="contenedor-areas">
        {AREAS.map((area) => (
          <article key={area.titulo}>
            <h3>{area.titulo}</h3>
            <p>{area.texto}</p>
          </article>
        ))}
      </div>

      <p className="contacto-areas">
        <a href="#contacto">
          Si deseas conocer más sobre cualquiera de nuestras áreas académicas o recibir
          asesoría personalizada, puedes comunicarte con nosotros. Estaremos encantados
          de ayudarte.
        </a>
      </p>
    </section>
  );
}
