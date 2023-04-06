import React from 'react'
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined'
import { Link } from 'react-router-dom'
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined'
import PersonRemoveOutlinedIcon from '@mui/icons-material/PersonRemoveOutlined'
import { doesExist } from '../helpers/commonFunctions'
function UserWidget(props) {
	if (!props.user) {
		return
	}
	const { avatar, name, friends } = props.user
	const friendsCount = friends ? friends.length : 0

	return (
		<div className='user-widget widget-wrapper'>
			<section className='user'>
				<img className='user__img' src={doesExist(avatar)} alt='user_pic' />
				<div>
					<h5 className='user__name'>{name}</h5>
					<p>
						{friendsCount} friend{friendsCount > 1 ? 's' : ''}
					</p>
				</div>
				{!props.isProfile || props.isLoggedInUser() ? (
					<Link to='/settings' className='user__icon icon ml-auto'>
						<ManageAccountsOutlinedIcon fontSize='small' />
					</Link>
				) : props.isFriend() ? (
					<div
						className='user__icon icon ml-auto'
						onClick={() => props.handleRemoveFriend()}
					>
						<PersonRemoveOutlinedIcon fontSize='small' />
					</div>
				) : (
					<div
						className='user__icon icon ml-auto'
						onClick={() => props.handleAddFriend()}
					>
						<PersonAddAlt1OutlinedIcon fontSize='small' />
					</div>
				)}
			</section>
		</div>
	)
}

export default UserWidget
