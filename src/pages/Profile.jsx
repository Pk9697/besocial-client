import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { fetchUserProfile } from '../actions/profile'
import {
	addFriend,
	clearFriendState,
	fetchUserFriends,
	removeFriend,
} from '../actions/friends'
import UserWidget from '../components/UserWidget'
import FriendsList from '../components/FriendsList'
import PostsList from '../components/PostsList'
import { clearPostsState, fetchUserPosts } from '../actions/posts'

function Profile() {
	const dispatch = useDispatch()
	const { userId } = useParams()
	const {
		auth,
		profile: { user, inProgress },
		friends: { friendsArr },
		posts,
	} = useSelector((state) => state)

	useEffect(() => {
		if (userId) {
			dispatch(fetchUserProfile(userId, auth.token))
			dispatch(fetchUserPosts(userId, auth.token))
			dispatch(fetchUserFriends(userId, auth.token))
		}

		return () => {
			dispatch(clearFriendState())
			dispatch(clearPostsState())
		}
	}, [userId])

	console.log(friendsArr)
	function isFriend() {
		return Boolean(
			auth.user.friends.find((friend) => friend.to_user._id === userId)
		)
	}

	function handleAddFriend() {
		dispatch(addFriend(userId, auth.token, true))
	}
	function handleRemoveFriend() {
		dispatch(removeFriend(userId, auth.token, true))
	}

	function isLoggedInUser() {
		return userId === auth.user._id
	}

	return (
		<div>
			{inProgress ? (
				<h3 style={{ textAlign: 'center' }}>Loading!</h3>
			) : (
				<div className='grid-profile'>
					{auth.isLoggedIn && (
						<>
							<UserWidget
								user={user}
								isProfile
								isFriend={isFriend}
								handleAddFriend={handleAddFriend}
								handleRemoveFriend={handleRemoveFriend}
								isLoggedInUser={isLoggedInUser}
							/>
							<FriendsList
								friendsArr={friendsArr}
								isLoggedIn={auth.isLoggedIn}
								token={auth.token}
								isProfile={true}
							/>
							<section className='grid__section'>
								<PostsList
									posts={posts}
									friendsArr={friendsArr}
									dispatch={dispatch}
									isProfile={true}
								/>
							</section>
						</>
					)}
				</div>
			)}
		</div>
	)
}

export default Profile
