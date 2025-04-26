import { FirebaseAuth } from "./config";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth'

const googleProvider = new GoogleAuthProvider();

export const singInWithGoogle = async () => {

    try {

        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        //const credentials = GoogleAuthProvider.credentialFromResult( result );
        //console.log({credentials});
        const { displayName, email, photoUrl, uid } = result.user

        return {
            ok: true,
            displayName,
            email,
            photoUrl,
            uid
        }


    } catch (error) {

        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error de autenticación:", errorCode, errorMessage);
        return {
            ok: false,
            errorMessage

        }

    }

}

export const registerUser = async ({ email, password, displayName }) => {

    try {

        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, photoURL } = resp.user;
        await updateProfile(FirebaseAuth.currentUser, { displayName });

        return {
            ok: true,
            photoUrl: photoURL || null,
            uid,
            email,
            displayName
        }


    } catch (error) {

        console.log('Firebase error:', error.code, error.message);

        // Manejo específico de errores
        let errorMessage;
        switch (error.code) {
            case 'auth/email-already-in-use':
                errorMessage = 'El correo ya está registrado';
                break;
            case 'auth/weak-password':
                errorMessage = 'La contraseña es demasiado débil';
                break;
            case 'auth/invalid-email':
                errorMessage = 'El correo no es válido';
                break;
            default:
                errorMessage = error.message;
        }

        return {
            ok: false,
            errorMessage
        };
    }

}

export const loginWithEmailPassword = async ({ email, password }) => {
    try {
        const userCredential = await signInWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, displayName, photoURL, email: userEmail } = userCredential.user;
        
        return {
            ok: true,
            uid,
            displayName,
            email: userEmail,
            photoUrl: photoURL
        };
    } catch (error) {
        console.error('Error de Firebase:', error.code, error.message);
        return {
            ok: false,
            errorMessage: error.message, // Asegúrate de enviar el mensaje de error
            errorCode: error.code // También envía el código para mejor manejo
        };
    }
};

export const logoutFirebase = async()=> {

    return await FirebaseAuth.signOut();
}