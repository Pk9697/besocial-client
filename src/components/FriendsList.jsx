import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PersonRemoveOutlinedIcon from '@mui/icons-material/PersonRemoveOutlined'
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined'

import { Link } from 'react-router-dom'
import { doesExist } from '../helpers/commonFunctions'
import { addFriend, removeFriend } from '../actions/friends'
function FriendsList(props) {
	const dispatch = useDispatch()
	const { auth } = useSelector((state) => state)
	const {
		user: { friends: loggedInUserFriends },
	} = auth
	const { friendsArr, isLoggedIn, token } = props

	if (!isLoggedIn) {
		return
	}

	function isFriend(userId) {
		return Boolean(
			loggedInUserFriends.some((friend) => friend.to_user._id === userId)
		)
	}

	function isLoggedInUser(userId) {
		return userId === auth.user._id
	}

	return (
		<div className='friendslist-widget widget-wrapper'>
			<h4>Friends List</h4>
			{friendsArr.length > 0 ? (
				friendsArr.map((friend) => (
					<div key={friend._id} className='user'>
						<Link to={`/profile/${friend.to_user._id}`} className='user'>
							<img
								src={doesExist(friend.to_user.avatar)}
								className='user__img'
								alt='friend_pic'
							/>
							<h5 className='user__name'>{friend.to_user.name}</h5>
						</Link>
						{!isLoggedInUser(friend.to_user._id) ? (
							isFriend(friend.to_user._id) ? (
								<div
									className='user__icon icon ml-auto'
									onClick={() =>
										dispatch(
											removeFriend(friend.to_user._id, token, props.isProfile)
										)
									}
								>
									<PersonRemoveOutlinedIcon fontSize='small' />
								</div>
							) : (
								<div
									className='user__icon icon ml-auto'
									onClick={() =>
										dispatch(
											addFriend(friend.to_user._id, token, props.isProfile)
										)
									}
								>
									<PersonAddAlt1OutlinedIcon fontSize='small' />
								</div>
							)
						) : (
							<></>
						)}
					</div>
				))
			) : (
				<h5 className='user__name'>No friends</h5>
			)}
		</div>
	)
}

export default FriendsList
