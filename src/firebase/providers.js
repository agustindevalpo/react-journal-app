import { FirebaseAuth } from "./config";
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

const googleProvider = new GoogleAuthProvider();

export const singInWithGoogle = async () => {

    try {

        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        //const credentials = GoogleAuthProvider.credentialFromResult( result );
        //console.log({credentials});
        const { displayNme, email, photoUrl, uid } = result.user

        return {
            ok: true,
            //User info
            displayNme,
            email,
            photoUrl,
            uid
        }


    } catch (error) {

        // Ocurrió un error
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error de autenticación:", errorCode, errorMessage);
        return {
            ok: false,
            errorMessage

        }

    }

}