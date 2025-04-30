
import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [],
        active: null
    },
    reducers: {

        savingNewNote: (state) => {
            state.isSaving = true;
        },

        addNewEmptyNote: (state, action) => {
            state.notes.push(action.payload);
            state.isSaving = false;
        },
        setActiveNote: (state, action) => {
            state.active = {
                id: action.payload.id,
                title: action.payload.title,
                body: action.payload.body,
                date: action.payload.date || new Date().getTime(), 
                imageUrls: action.payload.imageUrls || [],
            };
            state.messageSaved = '';

        },
        setNotes: (state, action) => {
            state.notes = action.payload;
        },

        setSaving: (state, action) => {
            state.isSaving = action.payload !== undefined ? action.payload : true;
            state.messageSaved = '';
        },
        updateNote: (state, action) => {
            state.isSaving = false;
            
            // Actualizar en el array de notas
            state.notes = state.notes.map(note => 
                note.id === action.payload.id ? action.payload : note
            );
            
            // Actualizar nota activa si es la misma
            if (state.active?.id === action.payload.id) {
                state.active = {
                    ...action.payload,
                    imageUrls: action.payload.imageUrls || []
                };
            }
            
            state.messageSaved = `${action.payload.title || 'Nota'} actualizada correctamente`;
        },

        clearNotesLogout : ( state ) =>{

            state.isSaving = false; ;
            state.messageSaved = '';
            state.notes = [];
            state.active = null;

        },
        deleteNoteById: (state, action) => {
            state.notes = state.notes.filter(note => note.id !== action.payload);
            // Solo limpia active si estamos borrando la nota activa
            if (state.active?.id === action.payload) {
                 state.active = null;
            }
            state.messageSaved = 'Nota eliminada correctamente';
          },
    }
});

// Action creators are generated for each case reducer function
export const {
    savingNewNote,
    addNewEmptyNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
    deleteNoteById,
    clearNotesLogout,
} = journalSlice.actions;

export default journalSlice.reducer;