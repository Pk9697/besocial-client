import React, { useEffect} from 'react'
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined'
import PersonRemoveOutlinedIcon from '@mui/icons-material/PersonRemoveOutlined'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchAllUsers } from '../actions/users'
import { doesExist } from '../helpers/commonFunctions'
import { addFriend, removeFriend } from '../actions/friends'
function UsersListWidget() {
	const dispatch = useDispatch()
	const users = useSelector((state) => state.users)
	const auth = useSelector((state) => state.auth)
	const friends = useSelector((state) => state.friends)
	const { friendsArr } = friends
	useEffect(() => {
		dispatch(fetchAllUsers(auth.token))
	}, [])

	function isFriend(userId) {
		return Boolean(friendsArr.find((friend) => friend.to_user._id === userId))
	}

	function isLoggedInUser(userId) {
		return userId === auth.user._id
	}

	return (
		<div className='userslist-widget widget-wrapper'>
			<h4>All Users List</h4>
			{users.map((user) => (
				<div key={user._id} className='user'>
					<Link to={`/profile/${user._id}`} className='user'>
						<img
							src={doesExist(user.avatar)}
							className='user__img'
							alt='friend_pic'
						/>
						<h5 className='user__name'>{user.name}</h5>
					</Link>
					{!isLoggedInUser(user._id) ? (
						isFriend(user._id) ? (
							<div
								className='user__icon icon ml-auto'
								onClick={() => dispatch(removeFriend(user._id, auth.token))}
							>
								<PersonRemoveOutlinedIcon fontSize='small' />
							</div>
						) : (
							<div
								className='user__icon icon ml-auto'
								onClick={() => dispatch(addFriend(user._id, auth.token))}
							>
								<PersonAddAlt1OutlinedIcon fontSize='small' />
							</div>
						)
					) : (
						<></>
					)}
				</div>
			))}
		</div>
	)
}

export default UsersListWidget
