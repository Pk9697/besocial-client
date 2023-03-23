import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { doesExist } from '../helpers/commonFunctions'
import { fetchUserProfile } from '../actions/profile'
import Alert from '../components/Alert'

function Profile() {
	const dispatch = useDispatch()
	const { userId } = useParams()
	const auth = useSelector((state) => state.auth)
	const profile = useSelector((state) => state.profile)
	const { user, inProgress, error } = profile
	const { name, email, avatar } = user
	const [isAlertClosed, setIsAlertClosed] = useState(false)

	useEffect(() => {
		if (userId) {
			//dispatch an action
			dispatch(fetchUserProfile(userId, auth.token))
		}
	}, [])

	function isFriend() {
		return Boolean(
			auth.user.friends.find((friend) => friend.to_user._id === userId)
		)
	}

	return (
		<div className='widget-wrapper mw-700 login-wrapper mt-1'>
			{inProgress ? (
				<h3 style={{ textAlign: 'center' }}>Loading!</h3>
			) : error ? (
				!isAlertClosed && (
					<Alert msg={error} error={true} setIsAlertClosed={setIsAlertClosed} />
				)
			) : (
				<>
					<img
						src={doesExist(avatar)}
						className='user__img user__img--large'
						alt='user_img'
					/>
					<h5>Name: {name}</h5>
					<h5>Email: {email} </h5>
					{isFriend()}
					<button className='login__input login__btn settings__btn'>
						{isFriend() ? 'Remove Friend' : 'Add Friend'}
					</button>
				</>
			)}
		</div>
	)
}

export default Profile
