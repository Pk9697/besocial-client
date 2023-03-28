import React, { useState } from 'react'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined'
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logOut } from '../actions/auth'
import { notify } from '../helpers/commonFunctions'
function Navbar() {
	const [isMenuClicked, setIsMenuClicked] = useState(false)
	const dispatch = useDispatch()
	const auth = useSelector((state) => state.auth)
	const { user, isLoggedIn } = auth
	function handleLogOut() {
		dispatch(logOut())
		notify({ type: 'success', msg: 'Logged Out!' })
	}

	return (
		<div className='navbar'>
			<div className='navbar__section' id='navbar__section1'>
				<Link className='link' to='/'>
					<h3 className='navbar__header'>BeSocial</h3>
				</Link>
				<input
					className='navbar__input input'
					type='text'
					placeholder='Search...'
				/>
				<div className='icon navbar__search-icon'>
					<SearchOutlinedIcon />
				</div>
			</div>
			<div className='navbar__section' id='navbar__section2'>
				<div
					className='navbar__menu'
					onClick={() => setIsMenuClicked((prev) => !prev)}
				>
					{/* {auth.isLoggedIn?<p>{auth.user.name}</p>:''} */}
					<p>{isLoggedIn ? user.name : 'Welcome'}</p>
				</div>
				<div className='icon expand-icon'>
					{isMenuClicked ? (
						<ExpandLessOutlinedIcon />
					) : (
						<ExpandMoreOutlinedIcon />
					)}
				</div>
				<div
					className='icon menu-icon'
					onClick={() => setIsMenuClicked((prev) => !prev)}
				>
					<MenuOutlinedIcon />
				</div>
				{isMenuClicked && (
					<div
						className='navbar__items-container'
						onClick={() => setIsMenuClicked(false)}
					>
						{isLoggedIn ? (
							<>
								<p className='navbar__items item1'>{user.name}</p>
								<p className='navbar__items' onClick={handleLogOut}>
									Log Out
								</p>
							</>
						) : (
							<>
								<Link className='link' to='/login'>
									<p className='navbar__items'>Log In</p>
								</Link>
								<Link className='link' to='/register'>
									<p className='navbar__items'>Register</p>
								</Link>
							</>
						)}
					</div>
				)}
			</div>
		</div>
	)
}

export default Navbar
