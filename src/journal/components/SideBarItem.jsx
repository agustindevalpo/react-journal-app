import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { TurnedInNot } from '@mui/icons-material';
import { Divider, ListItem, ListItemButton, ListItemIcon, ListItemText, Box } from '@mui/material';
import { startSetActiveNote } from '../../store/journal/thunks';

export const SideBarItem = ({ note }) => {
    // 1. Todos los hooks primero
    const dispatch = useDispatch();
    const newTitle = useMemo(() => {
        return note?.title && note.title.length > 17 
                ? note.title.substring(0, 17) + '...'
                : note?.title || '';
    }, [note?.title]);

    // 2. Validación después de los hooks
    if (!note?.title) return null;

    const onNoteClick = () => {
       dispatch(startSetActiveNote(note));    
    };
    
    return (
        <React.Fragment>
            <ListItem disablePadding>
                <ListItemButton 
                    onClick={onNoteClick} 
                    sx={{
                        transition: 'all 0.2s ease',
                        '&:hover': {
                            backgroundColor: 'action.hover',
                            '& .MuiListItemText-secondary': {
                                color: 'text.primary'
                            }
                        }
                    }}>
                    <ListItemIcon>
                        <TurnedInNot />
                    </ListItemIcon>
                    <Box sx={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                        <ListItemText
                            primary={newTitle}
                            primaryTypographyProps={{ noWrap: true }}
                        />
                        <ListItemText
                            secondary={note.body}
                            secondaryTypographyProps={{
                                noWrap: true,
                                sx: { fontSize: '0.75rem' }
                            }}
                        />
                    </Box>
                </ListItemButton>
            </ListItem>
            <Divider variant="inset" component="div" />
        </React.Fragment>
    );
};