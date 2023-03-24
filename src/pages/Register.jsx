import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrorState, register } from '../actions/auth'
import Alert from '../components/Alert'
function Register() {
	const [formFields, setFormFields] = useState({
		name: '',
		email: '',
		password: '',
		confirm_password: '',
	})
	const dispatch = useDispatch()
	const auth = useSelector((state) => state.auth)
	const { name, email, password, confirm_password } = formFields

	useEffect(() => {
		return () => {
			dispatch(clearErrorState())
		}
	}, [])

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
		dispatch(register(formFields))
		setFormFields({
			name: '',
			email: '',
			password: '',
			confirm_password: '',
		})
	}

	return (
		<div className='login'>
			<form
				onSubmit={handleSubmit}
				className='widget-wrapper mw-700 login-wrapper'
			>
				<input
					onChange={handleChange}
					name='name'
					value={name}
					className='login__input'
					type='text'
					placeholder='Name'
					required
				/>
				<input
					onChange={handleChange}
					name='email'
					value={email}
					className='login__input'
					type='email'
					placeholder='Email'
					required
				/>
				<input
					onChange={handleChange}
					name='password'
					value={password}
					className='login__input'
					type='password'
					placeholder='Password'
					required
				/>
				<input
					onChange={handleChange}
					name='confirm_password'
					value={confirm_password}
					className='login__input'
					type='password'
					placeholder='Confirm Password'
					required
				/>
				<button type='submit' className='login__input login__btn'>
					REGISTER
				</button>
			</form>
			{auth.error && <Alert msg={auth.error} error={true} />}
		</div>
	)
}

export default Register
