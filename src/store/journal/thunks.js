import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FireBaseDB } from "../../firebase/config";
import { addNewEmptyNote, setActiveNote, savingNewNote, setNotes, setSaving, updateNote, deleteNoteById } from "./journalSlice";
import { fileUpload, loadNotes } from "../../helpers";
import { deleteImageFromCloudinary, extractPublicId } from "../../helpers/deleteImageCloudinary";

export const startNewNote = () => {
  return async (dispatch, getState) => {

    dispatch(savingNewNote());

    const { uid } = getState().auth;
    console.log('New Note');

    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime(),
    }

    try {
      const newDoc = doc(collection(FireBaseDB, `${uid}/journal/notes`));
      const setDocResp = await setDoc(newDoc, newNote);

      newNote.id = newDoc.id;

      dispatch(addNewEmptyNote(newNote));
      dispatch(setActiveNote(newNote));

    } catch (error) {
      console.error('Error creando nueva nota', error);
    }

  };
}

export const startLoadingNotes = () => {
  return async (dispatch, getState) => {

    const { uid } = getState().auth;
    if (!uid) throw new Error('El UID del usuario no existe');

    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));
  }
}

export const startSetActiveNote = (note) => {
  return async (dispatch, getState) => {
    const completeNote = {
      ...note,
      date: note.date || new Date().getTime(),
      imageUrls: note.imageUrls || []
    };

    dispatch(setActiveNote(completeNote));

    localStorage.setItem('activeNote', JSON.stringify(completeNote));

  };
}

export const startSaveNote = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving());

    const { uid } = getState().auth;
    const { active: note } = getState().journal;

    if (!note || !note.id) {
      console.error('No hay nota activa para guardar');
      return;
    }

    dispatch(setSaving(true));

    const noteToFireStore = {
      ...note,
      imageUrls: note.imageUrls || []
    };

    console.log('URLs de imágenes:', note?.imageUrls);

    delete noteToFireStore.id;

    try {
      const docRef = doc(FireBaseDB, `${uid}/journal/notes/${note.id}`);
      await setDoc(docRef, noteToFireStore, { merge: true });

      dispatch(updateNote({...note, ...noteToFireStore}));

      return true;
  

    } catch (error) {
      console.error('Error al guardar la nota:', error);
      dispatch(setSaving(false)); // Asegurar reset en error
      throw error;
      //dispatch(setSavingError('Error al guardar la nota')); // Opcional: manejo de errores
    } finally {
      dispatch(setSaving(false));
    }
  };
};

export const startUploadingFiles = (files) => {
  return async (dispatch, getState) => {
    const { active: note } = getState().journal;

    if (!note || !note.id) {
      throw new Error('No hay nota activa para asociar imágenes');
    }

    const filesArray = Array.from(files instanceof FileList ? files : [files]);

    dispatch(setSaving());

    try {
      // 1. Subir archivos
      const uploadPromises = filesArray.map(file => {
        if (!file.type.startsWith('image/')) {
          throw new Error(`El archivo ${file.name} no es una imagen válida`);
        }
        return fileUpload(file);
      });

      const newImageUrls = await Promise.all(uploadPromises);

      // 2. Actualizar estado local inmediatamente
      const updatedNote = {
        ...note,
        imageUrls: [...(note.imageUrls || []), ...newImageUrls]
      };

      dispatch(updateNote(updatedNote));

      // 3. Persistir en Firestore
      const { uid } = getState().auth;
      const noteToSave = { ...updatedNote };
      delete noteToSave.id;

      const docRef = doc(FireBaseDB, `${uid}/journal/notes/${note.id}`);
      await setDoc(docRef, noteToSave, { merge: true });

      return newImageUrls;

    } catch (error) {
      console.error('Error al subir archivos:', error);
      dispatch(setSaving(false)); // Asegurar reset en error
      throw error;
    } finally {
      dispatch(setSaving(false));
    }
  };
};


export const startDeletingNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const { active: note } = getState().journal;

    if (!note || !note.id) {
      Swal.fire('Error', 'No hay nota seleccionada para borrar', 'error');
      return;
    }

    try {
      dispatch(setSaving());

      // 1. Opcional: Borrar imágenes de Cloudinary
      if (note.imageUrls?.length > 0) {
        await Promise.all(
          note.imageUrls.map(url => {
            const publicId = extractPublicId(url); // Necesitarás implementar esta función
            return deleteImageFromCloudinary(publicId); // Función que veremos después
          })
        );
      }

      // 2. Borrar de Firestore
      const docRef = doc(FireBaseDB, `${uid}/journal/notes/${note.id}`);
      await deleteDoc(docRef);

      // 3. Actualizar estado local
      dispatch(deleteNoteById(note.id));
      dispatch(setSaving(false));

    } catch (error) {
      console.error('Error al borrar nota:', error);
    }
  };
};