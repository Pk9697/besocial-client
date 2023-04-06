import React from 'react'
import Post from './Post'

function PostsList(props) {
	const { posts, ...rest } = props

	return (
		<div className='postslist-widget posts-container flex-col'>
			{posts.map((post) => (
				<Post key={post._id} post={post} {...rest} />
			))}
		</div>
	)
}

export default PostsList
