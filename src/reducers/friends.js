import { FETCH_USER_FRIENDS_ERROR, FETCH_USER_FRIENDS_SUCCESS } from "../actions/actionTypes";
const initialState={
    friendsArr:[],
    error:null
}
export const friendsReducer=(state=[],action)=>{
    switch(action.type){
        case FETCH_USER_FRIENDS_SUCCESS:{
            return {
                ...state,
                friendsArr:[...action.payload],
                error:null
            }
        }
        case FETCH_USER_FRIENDS_ERROR:{
            return {
                ...state,
                friendsArr:[],
                error:action.payload
            }
        }  
        
        default: return state
    }
}