import { useState, useEffect, useMemo } from 'react';

export const useForm = (initialForm = {}, formValidations = {}) => {
  const [formState, setFormState] = useState(initialForm);
  const [formValidationState, setFormValidationState] = useState({}); // Cambiado el nombre

  useEffect(() => {
    createValidators();
  }, [formState]);

//   const isFormValid = useMemo( () => {
     
//    for( const formaValue of Object.keys( formValidationState)){
//     if( formValidationState[formaValue] !== null ) return false;
//    }

//     return true;
//   },[formState]);

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

  const onResetForm = () => {
    setFormState(initialForm);
  };

  const createValidators = () => {
    const formCheckedValues = {};
    
    for (const formField of Object.keys(formValidations)) {
      const [fn, errorMessage = 'Este campo es requerido'] = formValidations[formField];
      formCheckedValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage;
    }

    setFormValidationState(formCheckedValues);
  };

  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,
    ...formValidationState, // Usar el estado renombrado
    isFormValid: Object.values(formValidationState).every(error => error === null)
  };
};