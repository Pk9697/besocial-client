import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchPosts } from '../actions/posts'
import Post from './Post'

function PostsList() {
	const dispatch = useDispatch()
	const posts = useSelector((state) => state.posts)

	useEffect(() => {
		dispatch(fetchPosts())
	}, [])

	return (
		<div className='postslist-widget posts-container flex-col'>
			{posts.map((post) => (
				<Post key={post._id} post={post} dispatch={dispatch} />
			))}
		</div>
	)
}

export default PostsList
