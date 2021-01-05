import axios from 'axios';
import * as actionTypes from './actionsTypes';

export const authStart = ()=>{
    return{
        type:actionTypes.AUTH_START
    }
}

export const authSuccess = (token, userId)=>{
    return{
        type:actionTypes.AUTH_SUCCESS,
        idToken:token,
        userId:userId
    }
}

export const authFail = (error)=>{
    return{
        type:actionTypes.AUTH_FAIL,
        error:error
    }
}

export const logout = () =>{
    return{
        type:actionTypes.AUTH_LOGOUT,
    }
}

// ASYNC CODE ACTIONS
export const checkAuthTimeout =(expirationTime)=>{
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());            
        }, expirationTime * 1000); // *1000 to turn my seconds in milliseconds

    }
}

export const auth = (email, password, isSignup)=>{
    return dispatch=> {
        dispatch(authStart());
        const authData = {
            email:email,
            password:password,
            returnSecureToken:true
        }
        console.log(authData);
        let url= 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC1tP6nVnk_dn2XtoKFczcbnp40Y6HFJhQ';
        if(!isSignup){
            url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC1tP6nVnk_dn2XtoKFczcbnp40Y6HFJhQ';

        }
        axios.post(url,authData)
        .then(response=>{
            console.log(response)
            dispatch(authSuccess(response.data.idToken, response.data.localId))
            dispatch(checkAuthTimeout(response.data.expiresIn));
        })
        .catch(err=>{
            console.log(err.response);
            dispatch(authFail(err.response.data.error));
        })
    }
}

export const setAuthRedirectPath =(path)=>{
    return{
        type:actionTypes.SET_AUTH_REDIRECT_PATH,
        path:path
    }
}