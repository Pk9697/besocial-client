import React from 'react'
import { useSelector } from 'react-redux'
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined'
import { Link } from 'react-router-dom'
import { doesExist } from '../helpers/commonFunctions'
function UserWidget() {
	const auth = useSelector((state) => state.auth)
	const { user, isLoggedIn } = auth
	const friends = useSelector((state) => state.friends)
	const { friendsArr } = friends
	if (!isLoggedIn) {
		return
	}
	const { avatar, name } = user
	const friendsCount = friendsArr.length
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
				<Link to='/settings' className='user__icon icon ml-auto'>
					<ManageAccountsOutlinedIcon fontSize='small' />
				</Link>
			</section>
		</div>
	)
}

export default UserWidget
