const BENEFICIOS = [
  {
    titulo: '👩‍🏫 Atención personalizada',
    texto: 'Cada estudiante recibe un acompañamiento adaptado a su ritmo de aprendizaje.',
  },
  {
    titulo: '💻 Modalidad presencial y virtual',
    texto: 'Ofrecemos clases presenciales en Barranquilla y también sesiones virtuales para estudiantes de cualquier lugar.',
  },
  {
    titulo: '📊 Seguimiento del progreso',
    texto: 'Realizamos un acompañamiento continuo para identificar avances y fortalecer las áreas que necesitan mayor apoyo.',
  },
];

export default function Beneficios() {
  return (
    <section id="beneficios">
      <h2>¿Por qué elegir Aprendo Contigo?</h2>

      {BENEFICIOS.map((beneficio) => (
        <article key={beneficio.titulo}>
          <h3>{beneficio.titulo}</h3>
          <p>{beneficio.texto}</p>
        </article>
      ))}
    </section>
  );
}
