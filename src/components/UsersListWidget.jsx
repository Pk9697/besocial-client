import React, { useEffect } from 'react'
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined'
import { useSelector, useDispatch } from 'react-redux'
import {Link} from 'react-router-dom'
import { fetchAllUsers } from '../actions/users'
import { doesExist } from '../helpers/commonFunctions'
function UsersListWidget() {
	const dispatch = useDispatch()
	const users = useSelector((state) => state.users)
	const auth = useSelector((state) => state.auth)
	useEffect(() => {
		dispatch(fetchAllUsers(auth.token))
	}, [])

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
					<div className='user__icon icon'>
						<PersonAddAlt1OutlinedIcon />
					</div>
				</div>
			))}
		</div>
	)
}

export default UsersListWidget
