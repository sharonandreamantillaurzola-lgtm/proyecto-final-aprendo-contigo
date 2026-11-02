export default function Promociones({ promotions, loading, error }) {
  return (
    <div id="promociones-dinamicas" className="promociones">
      <h2>📢 Promociones</h2>
      <div className="promociones-lista">
        {loading ? (
          <p>Cargando promociones...</p>
        ) : error ? (
          <p>No fue posible cargar las promociones.</p>
        ) : promotions.length > 0 ? (
          promotions.map((promotion) => (
            <article className="promocion-item" key={promotion._id}>
              <div className="promocion-cabecera">
                <span className="promocion-etiqueta">Oferta especial</span>
                <span className="promocion-icono" aria-hidden="true">✦</span>
              </div>
              <h3>{promotion.nombre}</h3>
              <p>{promotion.descripcion}</p>
              {promotion.precio ? (
                <div className="promocion-precio">
                  <span>Desde</span>
                  <strong>${Number(promotion.precio).toLocaleString('es-CO')}</strong>
                </div>
              ) : null}
            </article>
          ))
        ) : (
          <p>Próximamente publicaremos nuevas promociones.</p>
        )}
      </div>
    </div>
  );
}
