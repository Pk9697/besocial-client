import React from 'react'
import { useSelector } from 'react-redux'
import FriendsList from '../components/FriendsList'
import PostForm from '../components/PostForm'
import PostsList from '../components/PostsList'
import UserWidget from '../components/UserWidget'
import UsersListWidget from '../components/UsersListWidget'

function Home() {
	const auth = useSelector((state) => state.auth)
	const { isLoggedIn } = auth
	return (
		<div>
			<div className={!isLoggedIn ? 'grid-notloggedin' : 'grid'}>
				{isLoggedIn && (
					<>
						<UserWidget />
						<FriendsList />
						<UsersListWidget />
					</>
				)}
				<section className='flex-col grid__section'>
					{isLoggedIn && <PostForm />}
					<PostsList />
				</section>
			</div>
		</div>
	)
}

export default Home
