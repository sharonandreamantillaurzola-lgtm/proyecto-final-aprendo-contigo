export default function ClasesIndividuales({ products }) {
  return (
    <div id="productos-dinamicos" className="contenedor-tarjetas">
      {products.map((product) => (
        <article className="tarjeta" key={product._id}>
          <h3>{product.nombre}</h3>
          <h4>${Number(product.precio || 0).toLocaleString('es-CO')}</h4>
          <p>{product.descripcion || 'Servicio de refuerzo académico personalizado.'}</p>
          {product.categoria ? <strong>{product.categoria}</strong> : null}
        </article>
      ))}
    </div>
  );
}
