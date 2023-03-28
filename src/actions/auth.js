import { notify } from '../helpers/commonFunctions'
import { APIUrls } from '../helpers/urls'
import {
	AUTHENTICATE_USER_START,
	AUTHENTICATE_USER_SUCCESS,
	CLEAR_ERROR_STATE,
	EDIT_USER_FAILED,
	EDIT_USER_SUCCESSFUL,
	LOGIN_ERROR,
	LOGIN_START,
	LOGIN_SUCCESS,
	LOG_OUT,
	REGISTER_ERROR,
	REGISTER_START,
	REGISTER_SUCCESS,
} from './actionTypes'

/* LOGIN action creaters */

export function loginStart() {
	return {
		type: LOGIN_START,
	}
}

export function loginSuccess(data) {
	return {
		type: LOGIN_SUCCESS,
		payload: data,
	}
}

export function loginError(data) {
	return {
		type: LOGIN_ERROR,
		payload: data,
	}
}
export function logOut() {
	if (localStorage.getItem('token')) {
		localStorage.removeItem('token')
	}
	return {
		type: LOG_OUT,
	}
}

export function login(formFields) {
	return (dispatch) => {
		dispatch(loginStart())
		const url = APIUrls.login()
		fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formFields),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.success) {
					//for persisting user when auth is lost when reloading
					localStorage.setItem('token', data.data.token)
					// console.log(localStorage.getItem('token'))
					dispatch(loginSuccess(data.data))
					notify({ type: 'success', msg: 'Logged In!' })
				} else {
					dispatch(loginError(data.message))
					notify({ type: 'error', msg: data.message })
				}
			})
	}
}

/* AUTHENTICATE user */

export function authenticateUserStart() {
	return {
		type: AUTHENTICATE_USER_START,
	}
}
export function authenticateUserSuccess(data) {
	localStorage.setItem('token', data.token)
	return {
		type: AUTHENTICATE_USER_SUCCESS,
		payload: data,
	}
}
export function authenticateUserError(errMsg) {
	return logOut()
}
export function authenticateUser({ user, token }) {
	return (dispatch) => {
		dispatch(authenticateUserStart())
		const url = APIUrls.authenticateUser()
		fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.success) {
					// localStorage.setItem('token', token)
					dispatch(authenticateUserSuccess({ user, token }))
				} else {
					dispatch(authenticateUserError(data.message))
				}
			})
	}
}

/* REGISTER action creaters */

export function registerStart() {
	return {
		type: REGISTER_START,
	}
}

export function registerSuccess(data) {
	return {
		type: REGISTER_SUCCESS,
		payload: data,
	}
}

export function registerError(data) {
	return {
		type: REGISTER_ERROR,
		payload: data,
	}
}

export function register(formFields) {
	return (dispatch) => {
		dispatch(registerStart())
		const url = APIUrls.register()
		fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formFields),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.success) {
					localStorage.setItem('token', data.data.token)
					dispatch(registerSuccess(data.data))
					notify({ type: 'success', msg: 'Registered!' })
				} else {
					dispatch(registerError(data.message))
					notify({ type: 'error', msg: data.message })
				}
			})
	}
}

export function clearErrorState() {
	return {
		type: CLEAR_ERROR_STATE,
	}
}

export function editUserSuccessful(data) {
	return {
		type: EDIT_USER_SUCCESSFUL,
		payload: data,
	}
}
export function editUserFailed(errMsg) {
	return {
		type: EDIT_USER_FAILED,
		payload: errMsg,
	}
}

export function editUser(formFields, bearer, formData) {
	return (dispatch) => {
		const url = APIUrls.editProfile()
		fetch(url, {
			method: 'POST',
			headers: {
				// 'Content-Type': 'application/json',
				// 'Content-Type': 'application/x-www-form-urlencoded',
				Authorization: `Bearer ${bearer}`,
			},
			// body: JSON.stringify(formFields),
			body: formData,
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data)
				if (data.success) {
					localStorage.setItem('token', data.data.token)
					dispatch(editUserSuccessful(data.data))
					notify({ type: 'success', msg: 'Updated Successfully!' })
				} else {
					dispatch(editUserFailed(data.message))
					notify({ type: 'error', msg: data.message })
				}
			})
	}
}
