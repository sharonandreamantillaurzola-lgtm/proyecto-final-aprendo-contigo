import { useState } from 'react';
import { apiClient } from '../api/client.js';

const INITIAL_VALUES = {
  guardian: '',
  email: '',
  phone: '',
  student: '',
  age: '',
  grade: '',
  modality: '',
  area: '',
  message: '',
};

export function useContactForm() {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [success, setSuccess] = useState(false);

  const setField = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const errs = {};

    if (!values.guardian.trim()) errs.guardian = 'El nombre es obligatorio';
    if (!values.email.trim()) errs.email = 'Este campo es obligatorio';
    if (!/^[0-9]{10}$/.test(values.phone)) errs.phone = 'Debe tener exactamente 10 números';

    const age = Number(values.age);
    if (!Number.isInteger(age) || age < 3 || age > 18) errs.age = 'Ingrese una edad válida';

    if (!values.grade.trim()) errs.grade = 'Este campo es obligatorio';
    if (!values.modality) errs.modality = 'Este campo es obligatorio';
    if (!values.area.trim()) errs.area = 'Este campo es obligatorio';
    if (!values.message.trim()) errs.message = 'Este campo es obligatorio';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const submit = async () => {
    if (!validate()) return false;

    setSubmitting(true);
    setSubmitError(null);
    try {
      await apiClient.post('/contactos', {
        nombre: values.guardian.trim(),
        correo: values.email.trim(),
        telefono: values.phone.trim(),
        edad: Number(values.age),
        servicioInteresado: `${values.student.trim()} - ${values.grade.trim()} - ${values.modality} - ${values.area.trim()}`,
        mensaje: values.message.trim(),
      });
      setSuccess(true);
      setValues(INITIAL_VALUES);
      setErrors({});
      return true;
    } catch (error) {
      setSubmitError(error.message);
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  return { values, errors, submitting, submitError, success, setField, submit };
}
