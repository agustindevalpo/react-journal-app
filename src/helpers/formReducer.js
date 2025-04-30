
// --- Reducer ---
export const formReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FORM':
      return { ...state, form: action.payload };

    case 'UPDATE_FIELD':
      return { 
        ...state, 
        form: { 
          ...state.form, 
          [action.payload.name]: action.payload.value 
        } 
      };

    case 'RESET_FORM':
      return { ...state, form: action.payload };

    case 'SET_VALIDATIONS':
      return { ...state, validations: action.payload };

    default:
      return state;
  }
};