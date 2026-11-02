export default function Hero() {
  return (
    <section id="hero">
      <div className="hero-contenido">
        <span className="bienvenida">✨ Educación personalizada</span>

        <h2>Impulsamos el aprendizaje de cada estudiante</h2>

        <p>
          En <strong>Aprendo Contigo</strong> ofrecemos{' '}
          <strong>refuerzos académicos personalizados</strong>, presenciales en
          Barranquilla y virtuales, adaptándonos al ritmo de aprendizaje de cada
          estudiante.
        </p>

        <div className="botones-hero">
          <a href="#contacto">
            <button>Agenda tu primera clase</button>
          </a>
          <a href="#catalogo">
            <button>Conoce nuestros planes</button>
          </a>
        </div>
      </div>

      <div className="hero-imagen">
        <img src="/imagenes/imagen4.jpg" alt="Ilustración de aprendizaje personalizado" />
      </div>
    </section>
  );
}
