import { IconButton } from '@mui/material';
import { JournalLayout } from '../layout/JournalLayout';
import { NoteView, NothingSelectedView } from '../views';
import { AddOutlined } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { startNewNote } from '../../store/journal/thunks';

export const JournalPage = () => {

  const dispatch = useDispatch();

  const onClickNewNote = () =>{ 
      dispatch( startNewNote() );

  }
  return (
    <>
      <JournalLayout>
        <NothingSelectedView />
        {/* <NoteView /> */}
      </JournalLayout>

      <IconButton
      onClick={ onClickNewNote }
        size='large'
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          '&:hover': { 
            backgroundColor: 'error.main', 
            opacity: 0.9 
          },
          position: 'fixed', // Corregido: como string
          right: 50,
          bottom: 50,
          zIndex: 999 // Asegura que esté por encima de otros elementos
        }}
      >
        <AddOutlined sx={{ fontSize: 30 }} />    
      </IconButton>
    </>
  );
};