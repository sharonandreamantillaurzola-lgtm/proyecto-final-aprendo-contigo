import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth.js';
import { useCrud } from '../../hooks/useCrud.js';
import RecordForm from './RecordForm.jsx';

export default function ResourceView({ resource }) {
  const { token } = useAuth();
  const { records, loading, error, load, create, update, remove } = useCrud(resource.endpoint, token);

  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formError, setFormError] = useState(null);

  const isUsers = resource.fields.length === 0;
  const editingRecord = editingId ? records.find((record) => record._id === editingId) : null;

  useEffect(() => {
    load();
  }, [load]);

  const handleNew = () => {
    setEditingId(null);
    setFormError(null);
    setFormOpen(true);
  };

  const handleEdit = (record) => {
    setEditingId(record._id);
    setFormError(null);
    setFormOpen(true);
  };

  const handleCancel = () => setFormOpen(false);

  const handleSave = async (body) => {
    setFormError(null);
    try {
      if (editingId) {
        await update(editingId, body);
      } else {
        await create(body);
      }
      setFormOpen(false);
      setEditingId(null);
    } catch (err) {
      setFormError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar este registro?')) return;
    await remove(id);
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm('¿Eliminar este usuario?')) return;
    await remove(id);
  };

  if (loading && records.length === 0) {
    return <div className="loading">Cargando {resource.label.toLowerCase()}...</div>;
  }

  if (error) {
    return <p className="message error">{error}</p>;
  }

  return (
    <section id="resource-view" className="resource-view">
      {isUsers ? (
        <div className="resource-heading">
          <div>
            <p className="eyebrow">Control de acceso</p>
            <h2>Usuarios</h2>
          </div>
        </div>
      ) : (
        <div className="resource-heading">
          <div>
            <p className="eyebrow">Gestión</p>
            <h2>{resource.label}</h2>
          </div>
          <button id="new-record" onClick={handleNew}>Nuevo</button>
        </div>
      )}

      {!isUsers && formOpen && (
        <RecordForm
          key={editingId ?? 'new'}
          fields={resource.fields}
          initialValues={editingRecord}
          submitLabel={editingId ? 'Actualizar' : 'Guardar'}
          error={formError}
          onSubmit={handleSave}
          onCancel={handleCancel}
        />
      )}

      <div className="table-wrap">
        <table>
          <thead>
            {isUsers ? (
              <tr>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
            ) : (
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Acciones</th>
              </tr>
            )}
          </thead>
          <tbody>
            {records.map((record) =>
              isUsers ? (
                <tr key={record._id}>
                  <td>{record.nombre}</td>
                  <td>{record.email}</td>
                  <td><span className="role">{record.rol}</span></td>
                  <td>
                    <button
                      className="small-button danger delete-user"
                      onClick={() => handleDeleteUser(record._id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ) : (
                <tr key={record._id}>
                  <td>{record.nombre}</td>
                  <td>{record.descripcion || record.beneficio || ''}</td>
                  <td>
                    <button
                      className="small-button edit-record"
                      onClick={() => handleEdit(record)}
                    >
                      Editar
                    </button>
                    <button
                      className="small-button danger delete-record"
                      onClick={() => handleDelete(record._id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
