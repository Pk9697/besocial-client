import React, { useState, useEffect } from 'react'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined'
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logOut } from '../actions/auth'
import { doesExist, notify } from '../helpers/commonFunctions'
import { clearSearchState, searchUser } from '../actions/search'
function Navbar() {
	const dispatch = useDispatch()
	const [isMenuClicked, setIsMenuClicked] = useState(false)
	const [searchText, setSearchText] = useState('')
	const auth = useSelector((state) => state.auth)
	const search = useSelector((state) => state.search)

	useEffect(() => {
		if (searchText) {
			dispatch(searchUser(searchText, token))
		} else {
			dispatch(clearSearchState())
		}

		return () => {
			dispatch(clearSearchState())
		}
	}, [searchText])

	function handleLogOut() {
		dispatch(logOut())
		notify({ type: 'success', msg: 'Logged Out!' })
	}

	function handleSearch(e) {
		setSearchText(e.target.value)
	}
	const { user, isLoggedIn, token } = auth
	return (
		<div className='navbar'>
			<div className='navbar__section' id='navbar__section1'>
				<Link className='link' to='/'>
					<h3 className='navbar__header'>BeSocial</h3>
				</Link>

				{isLoggedIn && (
					<div id='search__input'>
						<input
							className='navbar__input input'
							type='text'
							placeholder='Search...'
							value={searchText}
							onChange={handleSearch}
						/>
						<div className='icon navbar__search-icon'>
							<SearchOutlinedIcon />
						</div>
					</div>
				)}

				{searchText.length > 0 && (
					<div className='search-list'>
						{search.inProgress ? (
							<div className='search-list__items'>
								<h5>Loading!</h5>
							</div>
						) : search.users && search.users.length > 0 ? (
							<>
								{search.users.map((user) => (
									<div key={user._id} className='search-list__items'>
										<Link
											to={`/profile/${user._id}`}
											className='user'
											onClick={() => setSearchText('')}
										>
											<img
												src={doesExist(user.avatar)}
												alt='user_pic'
												className='user__img user__img--small'
											/>
											<h5 className='user__name'>{user.name}</h5>
										</Link>
									</div>
								))}
							</>
						) : (
							<div className='search-list__items'>
								<h5>No User found</h5>
							</div>
						)}
					</div>
				)}
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
