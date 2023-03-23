import { combineReducers } from 'redux'
import { postsReducer } from './posts'
import { authReducer } from './auth'
import { usersReducer } from './users'
import { profileReducer } from './profile'

export default combineReducers({
	posts: postsReducer,
	auth: authReducer,
	users: usersReducer,
	profile: profileReducer,
})
