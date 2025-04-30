import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../store/auth";
import { FirebaseAuth } from "../firebase/config";
import { startLoadingNotes } from "../store/journal/thunks";

export const useCheckAuth = () => {

    const { status } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        // Desuscribirse de cambios anteriores al montar nuevamente
        const unsubscribe = onAuthStateChanged(FirebaseAuth, async (user) => {
            if (!user) return dispatch(logout());

            const { uid, email, displayName, photoURL } = user;
            dispatch(login({ 
                uid, 
                email, 
                displayName, 
                photoUrl: photoURL 
            }));
            dispatch( startLoadingNotes() );
        });

        // Limpieza al desmontar
        return () => unsubscribe();
    }, [dispatch]); // Añadí dispatch como dependencia

    return {
        status
    }
}