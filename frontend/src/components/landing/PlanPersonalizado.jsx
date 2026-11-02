import { useState } from 'react';

export default function PlanPersonalizado({ products, planner }) {
  const [selectedId, setSelectedId] = useState('');

  const handleAdd = () => {
    const service = products.find((product) => product._id === selectedId);
    if (!service || Number(service.precio || 0) <= 0) {
      alert('Selecciona un servicio');
      return;
    }
    planner.add(service);
  };

  return (
    <div className="selector-servicios">
      <h2>🛒 Crea tu plan personalizado</h2>
      <p>
        Selecciona los servicios que necesitas para crear un plan de aprendizaje
        personalizado.
      </p>

      <label htmlFor="servicio">Selecciona un servicio:</label>

      <select id="servicio" value={selectedId} onChange={(event) => setSelectedId(event.target.value)}>
        <option value="">-- Elige un servicio --</option>
        {products.map((service) => (
          <option key={service._id} value={service._id}>
            {service.nombre} - ${Number(service.precio || 0).toLocaleString('es-CO')}
          </option>
        ))}
      </select>

      <button id="agregarServicio" onClick={handleAdd}>
        ➕ Agregar servicio
      </button>

      <div className="servicios-elegidos">
        <h3>Servicios seleccionados:</h3>
        <ul id="listaServicios">
          {planner.selected.map((service, index) => (
            <li key={`${service._id}-${index}`}>{service.nombre}</li>
          ))}
        </ul>
      </div>

      <div className="total-servicios">
        <h3>Total del plan:</h3>
        <p id="precio">${planner.total.toLocaleString('es-CO')}</p>
      </div>
    </div>
  );
}
