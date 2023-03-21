import React, { useState, useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { clearErrorState, editUser } from '../actions/auth'
import Alert from '../components/Alert'
function Settings() {
	const dispatch=useDispatch()
	const auth = useSelector((state) => state.auth)
	const { user, isLoggedIn } = auth
	const { name, email, password } = user
	const [isAlertClosed, setIsAlertClosed] = useState(false)
	const [formFields, setFormFields] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
	})
	const [inEditMode, setInEditMode] = useState(false)
	useEffect(() => {
		isLoggedIn &&
			setFormFields((state) => ({
				...state,
				name,
				email,
				password,
			}))
		return () => {
			dispatch(clearErrorState())
		}
	}, [])

	function handleChange(e) {
		const { name, value } = e.target
		// console.log(name,value)
		setFormFields((prev) => {
			return {
				...prev,
				[name]: value,
			}
		})
	}

	function handleSubmit(e) {
		e.preventDefault()
		// dispatch(login(formFields))
		dispatch(editUser({...formFields,userId:user._id},auth.token))
		setFormFields(() => {
			return {
				name: '',
				email: '',
				password: '',
				confirmPassword: '',
			}
		})
		setInEditMode(false)
		setIsAlertClosed(false)
	}
	// console.log(formFields)
	// console.log('inEditMode', inEditMode)
	return (
		<div className='login'>
			<form
				onSubmit={handleSubmit}
				className='widget-wrapper mw-700 login-wrapper'
			>
				<img
					src='/assets/p1.jpeg'
					className='user__img user__img--large'
					alt='user_img'
				/>
				<h5>Update Picture</h5>
				{!inEditMode ? (
					<>
						<h5>Name: {name}</h5>
						<h5>Email: {email}</h5>
						<h5>Password: {password}</h5>
					</>
				) : (
					<>
						<input
							name='name'
							value={formFields.name}
							onChange={handleChange}
							className='login__input'
							type='text'
							placeholder='Name'
							required
						/>
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
						<input
							name='confirmPassword'
							value={formFields.confirmPassword}
							onChange={handleChange}
							className='login__input'
							type='password'
							placeholder='Confirm Password'
							required
						/>
					</>
				)}

				{inEditMode ? (
					<div className='flex-row'>
						<button
							type='submit'
							className='login__input login__btn settings__btn'
						>
							Save
						</button>
						<button
							type='button'
							className='login__input login__btn settings__btn'
							onClick={() => setInEditMode(false)}
						>
							Go Back
						</button>
					</div>
				) : (
					<button
						type='button'
						className='login__input login__btn settings__btn'
						onClick={() => setInEditMode(true)}
					>
						Edit Profile
					</button>
				)}
			</form>
			{auth.error && !isAlertClosed && (
				<Alert msg={auth.error} error={true} setIsAlertClosed={setIsAlertClosed} />
			)}
			{auth.error==false && !isAlertClosed && (
				<Alert msg="Successfully Updated Profile" error={false} setIsAlertClosed={setIsAlertClosed} />
			)}

		</div>
	)
}

export default Settings
