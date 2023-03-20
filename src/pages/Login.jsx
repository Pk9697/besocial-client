import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import { clearErrorState, login } from '../actions/auth'
import Alert from '../components/Alert'
function Login() {
	const [formFields, setFormFields] = useState({
		email: '',
		password: '',
	})
	const [isAlertClosed, setIsAlertClosed] = useState(false)
	const dispatch = useDispatch()
	const auth = useSelector((state) => state.auth)
	const location = useLocation()
	console.log(location)

	useEffect(() => {
		return () => {
			dispatch(clearErrorState())
		}
	}, [])

	if (auth.isLoggedIn) {
		if (location.state) {
			return <Navigate to={location.state.data} />
		}
		return <Navigate to='/' />
	}

	function handleChange(e) {
		const { name, value } = e.target
		setFormFields((prev) => {
			return {
				...prev,
				[name]: value,
			}
		})
	}

	function handleSubmit(e) {
		e.preventDefault()
		dispatch(login(formFields))
		setFormFields(() => {
			return {
				email: '',
				password: '',
			}
		})
		setIsAlertClosed(false)
	}
	return (
		<div className='login'>
			<form
				onSubmit={handleSubmit}
				className='widget-wrapper mw-700 login-wrapper'
			>
				<input
					name='email'
					value={formFields.email}
					onChange={handleChange}
					className='login__input'
					type='email'
					placeholder='Email'
					required
				/>
				<input
					name='password'
					value={formFields.password}
					onChange={handleChange}
					className='login__input'
					type='password'
					placeholder='Password'
					required
				/>
				<button
					disabled={auth.inProgress}
					type='submit'
					className='login__input login__btn'
				>
					{auth.inProgress ? 'LOGGING IN' : 'LOG IN'}
				</button>
			</form>
			{auth.error && !isAlertClosed && (
				<Alert error={auth.error} setIsAlertClosed={setIsAlertClosed} />
			)}
		</div>
	)
}

export default Login
