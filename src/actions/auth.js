import { APIUrls } from "../helpers/urls";
import { LOGIN_ERROR, LOGIN_START, LOGIN_SUCCESS } from "./actionTypes";

export function startLogin(){
    return {
        type:LOGIN_START
    }
}

export function login(formFields){
    return (dispatch)=>{
        dispatch(startLogin())
        const url=APIUrls.login()
        fetch(url,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(formFields)
        })
        .then(res=>res.json())
        .then(data=>{
            // console.log(data)
            if(data.success){
                dispatch(loginSuccess(data.data))
            }else{
                dispatch(loginError(data.message))
            }
        })
    }
}

export function loginSuccess(data){
    return {
        type:LOGIN_SUCCESS,
        payload:data
    }
}

export function loginError(data){
    return {
        type:LOGIN_ERROR,
        payload:data
    }
}