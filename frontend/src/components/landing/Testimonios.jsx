const TESTIMONIOS = [
  {
    imagen: '/imagenes/imagen1.jpg',
    texto: 'El acompañamiento recibido ha permitido fortalecer sus conocimientos, mejorar su confianza y avanzar en su proceso académico de manera positiva.',
    autor: '👩 Madre de estudiante de quinto grado',
  },
  {
    imagen: '/imagenes/imagen2.jpg',
    texto: 'Las clases han sido dinámicas, personalizadas y adaptadas a sus necesidades, logrando que disfrute más su proceso de aprendizaje.',
    autor: '👩 Madre de estudiante de segundo grado',
  },
  {
    imagen: '/imagenes/imagen3.jpg',
    texto: 'Gracias al apoyo y la orientación recibida, ha logrado reforzar sus habilidades y sentirse más seguro al desarrollar sus actividades escolares.',
    autor: '👩 Madre de estudiante de tercer grado',
  },
];

export default function Testimonios() {
  return (
    <section id="testimonios">
      <div className="titulo-testimonios">
        <h2>⭐ Testimonios</h2>
        <p>
          Conoce las experiencias de familias y estudiantes que han acompañado su
          proceso de aprendizaje junto a Aprendo Contigo.
        </p>
      </div>

      <div className="contenedor-testimonios">
        {TESTIMONIOS.map((testimonio) => (
          <article className="testimonio" key={testimonio.autor}>
            <img src={testimonio.imagen} alt="Testimonio" />
            <div className="contenido-testimonio">
              <p>"{testimonio.texto}"</p>
              <h4>{testimonio.autor}</h4>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
