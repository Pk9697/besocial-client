import React, { useEffect, useState } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { doesExist } from '../helpers/commonFunctions'
import { fetchUserProfile } from '../actions/profile'
import Alert from '../components/Alert'
import { addFriend, clearFriendState } from '../actions/friends'

function Profile() {
	const dispatch = useDispatch()
	const { userId } = useParams()
	const auth = useSelector((state) => state.auth)
	if (userId === auth.user._id) {
		console.log('Navigate to settings')
		return <Navigate to='/settings' />
	}
	const profile = useSelector((state) => state.profile)
	const { user, inProgress, error } = profile
	const { name, email, avatar } = user
	const friends = useSelector((state) => state.friends)
	const { friendsArr, error: friendErr, success } = friends

	useEffect(() => {
		if (userId) {
			//dispatch an action
			dispatch(fetchUserProfile(userId, auth.token))
		}

		return () => {
			dispatch(clearFriendState())
		}
	}, [])

	function isFriend() {
		return Boolean(
			friendsArr && friendsArr.find((friend) => friend.to_user._id === userId)
		)
	}

	return (
		<div className='widget-wrapper mw-700 login-wrapper mt-1'>
			{inProgress ? (
				<h3 style={{ textAlign: 'center' }}>Loading!</h3>
			) : error ? (
				<Alert msg={error} error={true} />
			) : (
				<>
					<img
						src={doesExist(avatar)}
						className='user__img user__img--large'
						alt='user_img'
					/>
					<h5>Name: {name}</h5>
					<h5>Email: {email} </h5>
					{isFriend() ? (
						<button className='login__input login__btn settings__btn'>
							Remove Friend
						</button>
					) : (
						<button
							className='login__input login__btn settings__btn'
							onClick={() => dispatch(addFriend(userId, auth.token))}
						>
							Add Friend
						</button>
					)}
					{friendErr && <Alert msg={friendErr} error={true} />}
					{success && <Alert msg='Friend Added' error={false} />}
				</>
			)}
		</div>
	)
}

export default Profile
