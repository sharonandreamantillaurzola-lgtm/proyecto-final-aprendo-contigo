export default function Nosotros() {
  return (
    <section id="nosotros">
      <h2>¿Quiénes somos?</h2>

      <div className="contenido-nosotros">
        <div className="texto-nosotros">
          <p>
            En <strong>Aprendo Contigo</strong> somos un proyecto educativo enfocado en
            el acompañamiento académico personalizado para estudiantes desde preescolar
            hasta octavo grado.
          </p>
          <p>
            Cada estudiante aprende de una manera diferente, por eso enseñamos con
            paciencia, claridad y adaptándonos a su ritmo de aprendizaje.
          </p>
          <p>
            Brindamos refuerzos académicos presenciales en Barranquilla y clases
            virtuales, combinando cercanía, seguimiento y estrategias educativas.
          </p>
        </div>

        <div className="imagen-nosotros">
          <img src="/imagenes/nosotros.png" alt="Niños aprendiendo con Aprendo Contigo" />
        </div>
      </div>

      <h3>¿Quién es Sharon Mantilla?</h3>

      <div className="foto-sharon">
        <img src="/imagenes/sharon.jpg" alt="Sharon Mantilla" />
        <p>
          Sharon Mantilla es la fundadora y tutora de Aprendo Contigo. Es Normalista
          Superior con profundización pedagógica y estudiante de Ingeniería en Ciencia
          de Datos.
        </p>
        <p>
          Ha acompañado procesos académicos en instituciones públicas y privadas,
          adaptando sus métodos a diferentes necesidades de aprendizaje.
        </p>
        <p>
          Su metodología se basa en comprensión, paciencia, cercanía y seguimiento
          constante.
        </p>
      </div>

      <div className="video-nosotros">
        <iframe
          src="https://www.youtube.com/embed/9YUPpHXzSPg"
          title="Presentación Aprendo Contigo"
          allowFullScreen
        />
      </div>

      <h3>Nuestra misión</h3>
      <p className="caja-info">
        Acompañar a cada estudiante mediante refuerzos académicos personalizados,
        fortaleciendo habilidades y confianza en su proceso educativo.
      </p>

      <h3>Nuestra visión</h3>
      <p className="caja-info">
        Ser un referente en acompañamiento académico personalizado en Colombia,
        transformando el aprendizaje en un proceso humano y adaptado.
      </p>

      <h3>Nuestros valores</h3>
      <ul className="valores">
        <li>Aprendizaje con comprensión real</li>
        <li>Paciencia en cada proceso</li>
        <li>Acompañamiento cercano</li>
        <li>Respeto por el ritmo del estudiante</li>
        <li>Compromiso académico</li>
        <li>Innovación educativa</li>
      </ul>
    </section>
  );
}
