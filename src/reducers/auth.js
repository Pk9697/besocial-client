import { LOGIN_ERROR, LOGIN_START, LOGIN_SUCCESS } from "../actions/actionTypes"

const initialState={
    user:{},
    token:null,
    error:null,
    isLoggedIn:false,
    inProgress:false
}
export const authReducer=(state=initialState,action)=>{
    switch(action.type){
        case LOGIN_START:{
            return {
                ...state,
                inProgress:true,
                user:{},
                token:null,
                isLoggedIn:false,
                error:null
            }
        }
        case LOGIN_SUCCESS:{
            return {
                ...state,
                user:action.payload.user,
                token:action.payload.token,
                isLoggedIn:true,
                inProgress:false,
                error:null
            }
        }
        case LOGIN_ERROR:{
            return {
                ...state,
                error:action.payload,
                user:{},
                token:null,
                inProgress:false,
                isLoggedIn:false
            }
        }
        default:return state
    }
}