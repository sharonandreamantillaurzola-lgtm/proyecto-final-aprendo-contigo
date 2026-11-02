import { useState } from 'react';

export default function RecordForm({ fields, initialValues, submitLabel, error, onSubmit, onCancel }) {
  const [values, setValues] = useState(() => {
    const initial = {};
    fields.forEach(([name, , type]) => {
      if (type === 'checkbox') {
        initial[name] = initialValues?.[name] !== false;
      } else {
        initial[name] = initialValues?.[name] ?? '';
      }
    });
    return initial;
  });

  const handleChange = (name, type, rawValue) => {
    let value = rawValue;
    if (type === 'number') value = rawValue === '' ? '' : Number(rawValue);
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(values);
  };

  return (
    <form id="record-form" className="record-form" onSubmit={handleSubmit}>
      {fields.map(([name, label, type, required]) => {
        if (type === 'textarea') {
          return (
            <label key={name}>
              {label}
              <textarea
                name={name}
                required={required}
                value={values[name]}
                onChange={(event) => handleChange(name, type, event.target.value)}
              />
            </label>
          );
        }

        if (type === 'checkbox') {
          return (
            <label key={name} className="check-field">
              <input
                type="checkbox"
                name={name}
                checked={values[name]}
                onChange={(event) => handleChange(name, type, event.target.checked)}
              />{' '}
              {label}
            </label>
          );
        }

        return (
          <label key={name}>
            {label}
            <input
              type={type}
              name={name}
              required={required}
              value={values[name]}
              onChange={(event) => handleChange(name, type, event.target.value)}
            />
          </label>
        );
      })}

      <div className="form-actions">
        <button type="submit">{submitLabel}</button>
        <button type="button" id="cancel-edit" className="button-secondary" onClick={onCancel}>
          Cancelar
        </button>
      </div>

      {error && <p id="form-message" className="message">{error}</p>}
    </form>
  );
}
