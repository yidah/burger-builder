import axios from 'axios';
import * as actionTypes from './actionsTypes';

export const authStart = ()=>{
    return{
        type:actionTypes.AUTH_START
    }
}

export const authSuccess = (authData)=>{
    return{
        type:actionTypes.AUTH_SUCCESS,
        authData:authData
    }
}

export const authFail = (error)=>{
    return{
        type:actionTypes.AUTH_FAIL,
        error:error
    }
}

// handles async code
export const auth = (email, password, isSignup)=>{
    return dispatch=> {
        dispatch(authStart());
        const authData = {
            email:email,
            password:password,
            returnSecureToken:true
        }
        let url= 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC1tP6nVnk_dn2XtoKFczcbnp40Y6HFJhQ';
        if(!isSignup){
            url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC1tP6nVnk_dn2XtoKFczcbnp40Y6HFJhQ';

        }
        axios.post(url,authData)
        .then(response=>{
            console.log(response)
            dispatch(authSuccess(response.data))
        })
        .catch(err=>{
            console.log(err);
            dispatch(authFail(err));
        })
    }
}