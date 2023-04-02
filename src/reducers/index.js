import { combineReducers } from 'redux'
import { postsReducer } from './posts'
import { authReducer } from './auth'
import { usersReducer } from './users'
import { profileReducer } from './profile'
import { friendsReducer } from './friends'
import { searchReducer } from './search'

export default combineReducers({
	posts: postsReducer,
	auth: authReducer,
	users: usersReducer,
	profile: profileReducer,
	friends: friendsReducer,
	search: searchReducer,
})
