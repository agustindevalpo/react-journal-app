import { loginWithEmailPassword, logoutFirebase, registerUser, singInWithGoogle } from "../../firebase/providers";
import { checkingCredentials, login, logout } from "./authSlice";

export const checkingAutentication = () => {

    return async (dispatch) => {

        dispatch(checkingCredentials());

    }

}

export const startGoogleSigIn = () => {
    return async (dispatch) => {

        dispatch(checkingCredentials());

        const result = await singInWithGoogle();
        if (!result.ok) return dispatch(logout(result.errorMessage));

        dispatch(login(result));
    }
}

export const startCreateRegisterUser = ({ email, password, displayName }) => {

    return async (dispatch) => {
        dispatch(checkingCredentials());

        try {

            const { ok, uid, photoUrl, errorMessage } = await registerUser({ email, password, displayName });

            if (!ok) {
                let customErrorMessage = errorMessage;
                if (result.errorMessage.includes('auth/email-already-in-use')) {
                    customErrorMessage = 'El correo ya está registrado';
                }

                return dispatch(logout({ errorMessage: customErrorMessage }));
            }

            dispatch(login({
                uid,
                displayName,
                email,
                photoUrl,
                errorMessage
            }));
        } catch (error) {
            dispatch(logout({ errorMessage: 'Error desconocido al registrar usuario' }));
        }

    }

}

export const startLoginWithEmailPassword = ({ email, password }) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
        
        try {
            const result = await loginWithEmailPassword({ email, password });
            console.log('Resultado de login:', result);
            
            // Si el login fue exitoso
            if (result.ok) {
                dispatch(login({
                    uid: result.uid,
                    displayName: result.displayName,
                    email: result.email,
                    photoUrl: result.photoUrl
                }));
                return;
            }
            
            // Si hay error de Firebase
            let customErrorMessage = result.errorMessage || 'Error al iniciar sesión';
            
            // Mapeo de errores específicos
            const errorMapping = {
                'auth/user-not-found': 'Usuario no encontrado',
                'auth/wrong-password': 'Contraseña incorrecta',
                'auth/too-many-requests': 'Demasiados intentos. Cuenta temporalmente bloqueada',
                'auth/invalid-credential': 'Credenciales incorrectas',
                'auth/invalid-email': 'Correo electrónico no válido'
            };
            
            // Buscar el mensaje personalizado
            for (const [errorCode, message] of Object.entries(errorMapping)) {
                if (result.errorMessage.includes(errorCode)) {
                    customErrorMessage = message;
                    break;
                }
            }
            
            dispatch(logout({ errorMessage: customErrorMessage }));
            
        } catch (error) {
            console.error('Error inesperado:', error);
            dispatch(logout({ errorMessage: 'Error inesperado al iniciar sesión' }));
        }
    }
}

export const startLogOut = () => {
    return async( dispatch ) =>{
       await logoutFirebase();

       dispatch( logout({ errorMessage: null }) );
    }
}