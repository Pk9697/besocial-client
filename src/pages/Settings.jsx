import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { clearErrorState, editUser } from '../actions/auth'
import Alert from '../components/Alert'
import { doesExist } from '../helpers/commonFunctions'
function Settings() {
	const dispatch = useDispatch()
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
	const [avatar, setAvatar] = useState(null)
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
		setFormFields((prev) => {
			return {
				...prev,
				[name]: value,
			}
		})
	}

	function handleSubmit(e) {
		e.preventDefault()
		const formData = new FormData()
		formData.append('email', formFields.email)
		formData.append('name', formFields.name)
		formData.append('password', formFields.password)
		formData.append('confirmPassword', formFields.confirmPassword)
		formData.append('userId', user._id)
		if (avatar) {
			formData.append('avatar', avatar)
		}
		dispatch(
			editUser({ ...formFields, userId: user._id }, auth.token, formData)
		)
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
		setAvatar(null)
	}
	function handleImage(e) {
		setAvatar(e.target.files[0])
	}
	function handleBack(e){
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
		setAvatar(null)
	}
	return (
		<div className='login'>
			<form
				onSubmit={handleSubmit}
				className='widget-wrapper mw-700 login-wrapper'
				encType='multipart/form-data'
			>
				<img
					src={doesExist(user.avatar)}
					className='user__img user__img--large'
					alt='user_img'
				/>
				{!inEditMode ? (
					<>
						<h5>Update Picture:</h5>
						<h5>Name: {name}</h5>
						<h5>Email: {email}</h5>
						<h5>Password: {password}</h5>
					</>
				) : (
					<>
						
						<label htmlFor='avatar' className='login__input input-file-label'>
							{avatar?avatar.name:'Choose File'}
						</label>
						{/* <input id='file-upload' type='file' /> */}
						<input
							id='avatar'
							name='avatar'
							type='file'
							onChange={handleImage}
						/>
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
							onClick={handleBack}
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
				<Alert
					msg={auth.error}
					error={true}
					setIsAlertClosed={setIsAlertClosed}
				/>
			)}
			{auth.error == false && !isAlertClosed && (
				<Alert
					msg='Successfully Updated Profile'
					error={false}
					setIsAlertClosed={setIsAlertClosed}
				/>
			)}
		</div>
	)
}

export default Settings
