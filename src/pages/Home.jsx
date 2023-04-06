import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FriendsList from '../components/FriendsList'
import PostForm from '../components/PostForm'
import PostsList from '../components/PostsList'
import UserWidget from '../components/UserWidget'
import UsersListWidget from '../components/UsersListWidget'
import { clearPostsState, fetchAllPosts } from '../actions/posts'
import { clearFriendState, fetchUserFriends } from '../actions/friends'
import { fetchAllUsers } from '../actions/users'

function Home() {
	const dispatch = useDispatch()
	const {
		auth,
		friends: { friendsArr },
		posts,
	} = useSelector((state) => state)
	const { isLoggedIn, token, user } = auth

	useEffect(() => {
		dispatch(fetchAllPosts())
		if (isLoggedIn) {
			dispatch(fetchUserFriends(user._id, token))
			dispatch(fetchAllUsers(token))
		}
		return () => {
			dispatch(clearPostsState())
			dispatch(clearFriendState())
		}
	}, [isLoggedIn])

	return (
		<div>
			<div className={!isLoggedIn ? 'grid-notloggedin' : 'grid'}>
				{isLoggedIn && (
					<>
						<UserWidget user={auth.user} />
						<FriendsList
							friendsArr={friendsArr}
							isLoggedIn={isLoggedIn}
							token={token}
						/>
						<UsersListWidget />
					</>
				)}
				<section className='flex-col grid__section'>
					{isLoggedIn && <PostForm />}
					<PostsList
						posts={posts}
						friendsArr={friendsArr}
						dispatch={dispatch}
					/>
				</section>
			</div>
		</div>
	)
}

export default Home
