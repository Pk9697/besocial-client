import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined'
import PersonRemoveOutlinedIcon from '@mui/icons-material/PersonRemoveOutlined'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined'
import { addFriend, removeFriend } from '../actions/friends'
import CommentsList from './CommentsList'
import { toggleLike } from '../actions/posts'
import { notify } from '../helpers/commonFunctions'

function Post(props) {
	const auth = useSelector((state) => state.auth)
	const friends = useSelector((state) => state.friends)
	const { isLoggedIn } = auth
	const { friendsArr } = friends
	const { post, dispatch } = props

	function isFriend(userId) {
		return Boolean(friendsArr.find((friend) => friend.to_user._id === userId))
	}

	function isLoggedInUser(userId) {
		return userId === auth.user._id
	}

	function isPostAlreadyLiked() {
		return Boolean(post.likes.find((like) => like.user._id === auth.user._id))
	}

	function handlePostLike() {
		if (isLoggedIn) {
			dispatch(
				toggleLike({
					postId: post._id,
					commentId: null,
					type: 'Post',
					bearer: auth.token,
				})
			)
		} else {
			notify({ type: 'error', msg: 'Please Log In to Like' })
		}
	}
	return (
		<div className='widget-wrapper'>
			<div className='user'>
				<Link to={`/profile/${post.user._id}`} className='user'>
					<img
						className='user__img'
						src={`http://localhost:4001${post.user.avatar}`}
						alt='user_pic'
					/>
					<h5 className='user__name'>{post.user.name}</h5>
				</Link>

				{isLoggedIn && !isLoggedInUser(post.user._id) ? (
					isFriend(post.user._id) ? (
						<div
							className='user__icon icon ml-auto'
							onClick={() => dispatch(removeFriend(post.user._id, auth.token))}
						>
							<PersonRemoveOutlinedIcon fontSize='small' />
						</div>
					) : (
						<div
							className='user__icon icon ml-auto'
							onClick={() => dispatch(addFriend(post.user._id, auth.token))}
						>
							<PersonAddAlt1OutlinedIcon fontSize='small' />
						</div>
					)
				) : (
					<></>
				)}
			</div>
			<p className='post__content'>{post.content}</p>
			<div className='post__interactions'>
				<div className='post__likes'>
					{isPostAlreadyLiked() ? (
						<div className='icon' onClick={handlePostLike}>
							<FavoriteIcon color='error' />
						</div>
					) : (
						<div className='icon' onClick={handlePostLike}>
							<FavoriteBorderOutlinedIcon />
						</div>
					)}
					<p>{post.likes.length}</p>
				</div>
				<div className='post__comments'>
					<div className='icon'>
						<ChatBubbleOutlineOutlinedIcon />
					</div>
					<p>{post.comments.length}</p>
				</div>
			</div>
			{(post.comments.length > 0 || isLoggedIn) && (
				<hr style={{ width: '100%' }} />
			)}

			<CommentsList comments={post.comments} postId={post._id} />
		</div>
	)
}

export default Post
