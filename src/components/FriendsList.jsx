import React from 'react'
import { useSelector } from 'react-redux'
import PersonRemoveOutlinedIcon from '@mui/icons-material/PersonRemoveOutlined'
import { doesExist } from '../helpers/commonFunctions'
function FriendsList() {
	const auth = useSelector((state) => state.auth)
	const { user, isLoggedIn } = auth
	if (!isLoggedIn) {
		return
	}

	const { friends } = user
	return (
		<div className='friendslist-widget widget-wrapper'>
			<h4>Friends List</h4>
			{friends.map((friend) => (
				<div key={friend._id} className='user'>
					<img
						src={doesExist(friend.to_user.avatar)}
						className='user__img'
						alt='friend_pic'
					/>
					<h5 className='user__name'>{friend.to_user.name}</h5>
					<div className='user__icon icon'>
						<PersonRemoveOutlinedIcon />
					</div>
				</div>
			))}
		</div>
	)
}

export default FriendsList
