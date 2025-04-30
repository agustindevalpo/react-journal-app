import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from './useForm';
import { setActiveNote } from '../store/journal/journalSlice';

export const useNoteForm = (initialForm = {}, formValidations = {}) => {
  const dispatch = useDispatch();
  const form = useForm(initialForm, formValidations);
  const initialLoad = useRef(true);

  useEffect(() => {
    // Evita el dispatch en el primer render
    if (initialLoad.current) {
      initialLoad.current = false;
      return;
    }
    
    // Solo actualiza si hay cambios reales
    dispatch(setActiveNote(form.formState));
  }, [form.formState, dispatch]);

  return form;
};