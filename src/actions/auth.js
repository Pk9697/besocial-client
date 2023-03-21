import { APIUrls } from '../helpers/urls'
import {
	AUTHENTICATE_USER,
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
				console.log(data)
				if (data.success) {
					//for persisting user when auth is lost when reloading
					localStorage.setItem('token', data.data.token)
					// console.log(localStorage.getItem('token'))
					dispatch(loginSuccess(data.data))
				} else {
					dispatch(loginError(data.message))
				}
			})
	}
}

/* AUTHENTICATE user */

export function authenticateUser(data) {
	return {
		type: AUTHENTICATE_USER,
		payload: data,
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
				// console.log(data)
				if (data.success) {
					dispatch(registerSuccess(data.data))
				} else {
					dispatch(registerError(data.message))
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
		payload:errMsg
	}
}

export function editUser(formFields,bearer,formData) {
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
				} else {
					dispatch(editUserFailed(data.message))
				}
			})
	}
}
