import { checkingCredentials } from "./authSlice";

export const checkingAutentication = () =>{

    return async( dispatch ) =>{

        dispatch( checkingCredentials ) ;

    }

}

export const startGoogleSigIn = () =>{
    return async( dispatch )=>{
         dispatch( checkingAutentication );
    }
}