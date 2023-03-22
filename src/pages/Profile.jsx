import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { doesExist } from '../helpers/commonFunctions'
import { APIUrls } from '../helpers/urls'

function Profile() {
	const { userId } = useParams()
	const [user, setUser] = useState(null)
	const auth = useSelector((state) => state.auth)
	function isFriend() {
		return Boolean(
			auth.user.friends.find((friend) => friend.to_user._id === userId)
		)
	}
	function getUser() {
		const url = APIUrls.fetchUserProfile(userId)
		fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${auth.token}`,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.success) {
					setUser(data.data.user)
				}
			})
	}
	useEffect(() => {
		getUser()
	}, [])

	if (!user) return

	const { name, email, avatar } = user
	return (
		<div className='widget-wrapper mw-700 login-wrapper mt-1'>
			<img
				src={doesExist(avatar)}
				className='user__img user__img--large'
				alt='user_img'
			/>
			<h5>Name: {name}</h5>
			<h5>Email: {email} </h5>
			{isFriend()}
			<button className='login__input login__btn settings__btn'>
				{isFriend() ? 'RemoveFriend' : 'Add Friend'}
			</button>
		</div>
	)
}

export default Profile
