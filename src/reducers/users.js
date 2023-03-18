import {  LOG_OUT, UPDATE_ALL_USERS } from "../actions/actionTypes"

export const usersReducer=(state=[],action)=>{
    switch(action.type){
        case UPDATE_ALL_USERS: {
          return action.payload
        }
        case LOG_OUT:{
            return []
        }
        default: return state
      }
}