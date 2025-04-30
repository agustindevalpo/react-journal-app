import { useEffect, useCallback, useReducer, useMemo } from 'react';
import { formReducer } from '../helpers';

export const useForm = (initialForm = {}, formValidations = {}) => {
  const [state, dispatch] = useReducer(formReducer, {
    form: { ...initialForm },
    validations: {}
  });

  const { form, validations } = state;

  // Solo actualiza el estado inicial si cambia profundamente
  useEffect(() => {
    if (JSON.stringify(initialForm) !== JSON.stringify(form)) {
      dispatch({ type: 'SET_FORM', payload: { ...initialForm } });
    }
  }, [initialForm]);

  // Validación optimizada
  useEffect(() => {
    if (Object.keys(formValidations).length > 0) {
      validateForm();
    }
  }, [form]);

  const onInputChange = useCallback(({ target }) => {
    dispatch({ 
      type: 'UPDATE_FIELD', 
      payload: { name: target.name, value: target.value } 
    });
  }, []);

  const onResetForm = useCallback(() => {
    dispatch({ type: 'RESET_FORM', payload: { ...initialForm } });
  }, [initialForm]);

  const validateForm = useCallback(() => {
    const newValidations = {};
    for (const field in formValidations) {
      const [validationFn, errorMessage = 'Este campo es obligatorio'] = formValidations[field];
      newValidations[`${field}Valid`] = validationFn(form[field]) ? null : errorMessage;
    }
    dispatch({ type: 'SET_VALIDATIONS', payload: newValidations });
  }, [form, formValidations]);

  const isFormValid = useMemo(() => {
    return Object.values(validations).every(value => value === null);
  }, [validations]);

  return {
    ...form,
    formState: form,
    onInputChange,
    onResetForm,
    ...validations,
    isFormValid
  };
};