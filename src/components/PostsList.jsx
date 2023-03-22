import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {Link} from 'react-router-dom'
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined'
import { fetchPosts } from '../actions/posts'
function PostsList() {
	const posts = useSelector((state) => state.posts)
	const dispatch = useDispatch()
	// console.log(posts);

	useEffect(() => {
		dispatch(fetchPosts())
	}, [])

	return (
		<div className='postslist-widget posts-container flex-col'>
			{posts.map((post) => (
				<div key={post._id} className='widget-wrapper'>
					<div className='user'>
						<Link to={`/profile/${post.user._id}`} className='user'>
							<img
								className='user__img'
								src={`http://localhost:4001${post.user.avatar}`}
								alt='user_pic'
							/>
							<h5 className='user__name'>{post.user.name}</h5>
						</Link>
						<div className='user__icon icon'>
							<PersonAddAlt1OutlinedIcon fontSize='small' />
						</div>
					</div>
					<p className='post__content'>{post.content}</p>
					<div className='post__interactions'>
						<div className='post__likes'>
							<div className='icon'>
								<FavoriteBorderOutlinedIcon />
							</div>
							<p>{post.likes.length}</p>
						</div>
						<div className='post__comments'>
							<div className='icon'>
								<ChatBubbleOutlineOutlinedIcon />
							</div>
							<p>{post.comments.length}</p>
						</div>
					</div>
				</div>
			))}
		</div>
	)
}

export default PostsList
