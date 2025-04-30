import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton } from '@mui/material';
import { AddOutlined } from '@mui/icons-material';
import { JournalLayout } from '../layout/JournalLayout';
import { NoteView, NothingSelectedView } from '../views';
import { startNewNote } from '../../store/journal/thunks';

export const JournalPage = () => {

  const dispatch = useDispatch();
  const { isSaving, active } = useSelector(state => state.journal);


  const onClickNewNote = () => {
    dispatch(startNewNote());

  }
  return (
    <>
      <JournalLayout>
        {/* Mostrar vista según si hay nota activa o no */}
        {active ? <NoteView /> : <NothingSelectedView />}
      </JournalLayout>

      <IconButton
        onClick={onClickNewNote}
        disabled={isSaving}
        size='large'
        sx={{
          color: 'white',
          backgroundColor: isSaving ? 'grey.500' : 'error.main',
          '&:hover': {
            backgroundColor: isSaving ? 'grey.500' : 'error.dark',
            opacity: isSaving ? 1 : 0.9
          },
          position: 'fixed',
          right: 50,
          bottom: 50,
          zIndex: 999,
          cursor: isSaving ? 'not-allowed' : 'pointer',
          transition: 'background-color 0.3s ease',
        }}
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>
    </>
  );
};