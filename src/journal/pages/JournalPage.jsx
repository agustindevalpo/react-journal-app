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
        {active ? <NoteView /> : <NothingSelectedView />}
      </JournalLayout>

      <IconButton
        onClick={onClickNewNote}
        disabled={isSaving}
        size='large'
        sx={{
          color: 'white',
          backgroundColor: isSaving ? 'grey.500' : (theme) => theme.palette.custom.orange,
          '&:hover': {
            backgroundColor: isSaving ? 'grey.500' : (theme) => theme.palette.custom.orangeHover,
            opacity: isSaving ? 1 : 0.9
          },
          position: 'fixed',
          right: 50,
          bottom: 50,
          width: 64,
          height: 64,
          zIndex: 999,
          cursor: isSaving ? 'not-allowed' : 'pointer',
          transition: 'all 0.3s ease',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
          '&:active': {
            transform: isSaving ? 'none' : 'scale(0.95)',
            backgroundColor: (theme) => theme.palette.custom.orangeActive
          }
        }}
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>
    </>
  );
};