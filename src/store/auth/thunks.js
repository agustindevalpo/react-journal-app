import { singInWithGoogle } from "../../firebase/providers";
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
        if( !result.ok ) return dispatch( logout( result.errorMessage ) );

        dispatch( login( result ));
    }
}