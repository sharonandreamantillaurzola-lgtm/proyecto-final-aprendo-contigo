import { useProducts } from '../../hooks/useProducts.js';
import { usePromotions } from '../../hooks/usePromotions.js';
import { useServicePlanner } from '../../hooks/useServicePlanner.js';
import ClasesIndividuales from './ClasesIndividuales.jsx';
import Promociones from './Promociones.jsx';
import PlanPersonalizado from './PlanPersonalizado.jsx';

const PAQUETES = [
  {
    titulo: '🌱 Arranque Brillante',
    clases: '5 clases',
    precioNormal: '$96.000',
    precioFinal: '$90.000',
    items: ['3 clases virtuales', '2 clases presenciales'],
    descripcion: 'Ideal para iniciar refuerzo y construir una base sólida de aprendizaje.',
  },
  {
    titulo: '🚀 Progreso Activo',
    clases: '8 clases',
    precioNormal: '$150.000',
    precioFinal: '$140.000',
    items: ['5 clases virtuales', '3 clases presenciales'],
    descripcion: 'Más práctica, constancia y refuerzo continuo.',
  },
  {
    titulo: '⭐ Rendimiento Total',
    clases: '15 clases',
    precioNormal: '$270.000',
    precioFinal: '$250.000',
    items: ['10 clases virtuales', '5 clases presenciales'],
    descripcion: 'Acompañamiento completo, avance acelerado y constante.',
  },
  {
    titulo: '💻 Conexión Digital',
    clases: '5 clases virtuales',
    precioNormal: '$75.000',
    precioFinal: '$50.000',
    items: ['1 hora de clase', '15 minutos adicionales gratis si lo requiere', 'Material básico incluido'],
    descripcion: 'Ideal para refuerzo desde casa, económico y bien estructurado.',
  },
  {
    titulo: '📚 Aprendizaje Cercano',
    clases: '5 clases presenciales',
    precioNormal: '$150.000',
    precioFinal: '$140.000',
    items: ['Transporte incluido', '1 hora de clase por sesión', '15 minutos adicionales gratis por clase si lo requiere'],
    descripcion: 'Mayor acompañamiento directo y explicación personalizada.',
  },
];

const RUTA_BRILLANTE_ITEMS = [
  'Concentración',
  'Retención de información',
  'Comportamiento',
  'Desempeño general',
  'Avances y oportunidades de mejora',
];

export default function Catalogo() {
  const { products } = useProducts();
  const { promotions, loading: loadingPromotions, error: promotionsError } = usePromotions();
  const planner = useServicePlanner();

  return (
    <section id="catalogo">
      <div className="titulo-catalogo">
        <h2>📚 Catálogo de Servicios</h2>
        <p>Aprendo Contigo</p>
      </div>

      <div className="informacion-importante">
        <h2>Información importante</h2>
        <p>
          Los valores publicados a continuación corresponden a precios base de
          referencia. Estos pueden ajustarse según el plan académico del estudiante, el
          nivel de refuerzo requerido, refuerzo bilingüe, el énfasis en inglés, el
          calendario académico y el tipo de acompañamiento acordado.
        </p>
      </div>

      <div className="seccion">
        <h2>💻 Clases individuales</h2>
        <ClasesIndividuales products={products} />
      </div>

      <div className="seccion paquetes">
        <h2>📦 Paquetes de aprendizaje</h2>
        {PAQUETES.map((paquete) => (
          <article className="paquete" key={paquete.titulo}>
            <h3>{paquete.titulo}</h3>
            <h4>{paquete.clases}</h4>
            <p>Precio normal: {paquete.precioNormal}</p>
            <strong>Precio final: {paquete.precioFinal}</strong>
            <ul>
              {paquete.items.map((item) => (
                <li key={item}>✔ {item}</li>
              ))}
            </ul>
            <p>{paquete.descripcion}</p>
          </article>
        ))}
      </div>

      <div className="servicio-adicional">
        <h2>⭐ Servicios adicionales</h2>
        <article className="ruta-brillante">
          <h3>📊 Ruta Brillante de Aprendizaje</h3>
          <p>
            Servicio diseñado para implementar planes claros y estructurados para
            obtener mejores resultados en el proceso de aprendizaje.
          </p>
          <p>
            Mediante herramientas como Excel se realiza seguimiento del progreso del
            estudiante teniendo en cuenta:
          </p>
          <ul>
            {RUTA_BRILLANTE_ITEMS.map((item) => (
              <li key={item}>✔ {item}</li>
            ))}
          </ul>
          <h4>Tarifas</h4>
          <p>Seguimiento mensual: $15.000</p>
          <p>Paquete de 5 a 8 clases: $5.000</p>
          <p>Paquete de 15 clases: $8.000</p>
        </article>
      </div>

      <div className="reconocimiento">
        <h2>🎁 Reconocimientos para nuestros estudiantes</h2>
        <h3>Bono al esfuerzo del mes</h3>
        <p>
          Como sabemos que te has esforzado mucho en tu progreso de aprendizaje,
          queremos reconocerte y motivarte a seguir avanzando.
        </p>
        <p>
          Al completar cuatro clases particulares, no necesariamente consecutivas, en
          la quinta clase recibirás un detalle especial:
        </p>
        <ul>
          <li>🎓 Diploma de progreso</li>
          <li>💙 Clase presencial: $30.000 → $25.000</li>
          <li>💻 Clase virtual: $15.000 → $12.000</li>
        </ul>
        <p>
          Para planes diarios o clases consecutivas, este reconocimiento será realizado
          únicamente en ocasiones especiales.
        </p>
      </div>

      <Promociones
        promotions={promotions}
        loading={loadingPromotions}
        error={promotionsError}
      />

      <PlanPersonalizado products={products} planner={planner} />
    </section>
  );
}
