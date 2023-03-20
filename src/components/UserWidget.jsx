import React from 'react'
import { useSelector } from 'react-redux'
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined'
import { BASE_ROOT } from '../helpers/urls'
import { Link } from 'react-router-dom'
function UserWidget() {
	const auth = useSelector((state) => state.auth)
	const { user, isLoggedIn } = auth
	if (!isLoggedIn) {
		return
	}
	const { avatar, friends, name } = user
	const friendsCount = friends.length
	return (
		<div className='user-widget widget-wrapper'>
			<section className='user'>
				<img
					className='user__img'
					src={`${BASE_ROOT}${avatar}`}
					alt='user_pic'
				/>
				<div>
					<h5 className='user__name'>{name}</h5>
					<p>
						{friendsCount} friend{friendsCount > 1 ? 's' : ''}
					</p>
				</div>
				<Link to='/settings' className='user__icon icon'>
					<ManageAccountsOutlinedIcon />
				</Link>
			</section>
		</div>
	)
}

export default UserWidget
