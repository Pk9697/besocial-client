import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import FavoriteIcon from '@mui/icons-material/Favorite'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'

import { doesExist, notify } from '../helpers/commonFunctions'
import { deleteComment, toggleLike } from '../actions/posts'

function Comment(props) {
	const dispatch = useDispatch()
	const auth = useSelector((state) => state.auth)
	const { isLoggedIn } = auth
	const { comment, postId, postUserId } = props

	function isCommentAlreadyLiked() {
		return Boolean(
			comment.likes.find((like) => like.user._id === auth.user._id)
		)
	}

	function isLoggedInUser(userId) {
		return userId === auth.user._id
	}

	function isLoggedInUserPost() {
		return postUserId === auth.user._id
	}

	function handleCommentLike() {
		if (isLoggedIn) {
			dispatch(
				toggleLike({
					postId,
					commentId: comment._id,
					type: 'Comment',
					bearer: auth.token,
				})
			)
		} else {
			notify({ type: 'error', msg: 'Please Log In to Like' })
		}
	}

	return (
		<div className='user'>
			<img
				className='user__img comment__img'
				src={doesExist(comment.user.avatar)}
				alt='user_pic'
			/>
			<div className='comment__content'>
				<h6 className='user__name'>{comment.user.name}</h6>
				<p className='post__content'>{comment.content}</p>
			</div>
			<div className='post__likes gap-1by10 ml-auto'>
				{isLoggedIn &&
					(isLoggedInUserPost() || isLoggedInUser(comment.user._id)) && (
						<div
							className='user__icon icon ml-auto'
							onClick={() =>
								dispatch(
									deleteComment(postId, comment._id, postUserId, auth.token)
								)
							}
						>
							<DeleteForeverOutlinedIcon fontSize='small' />
						</div>
					)}
				{isCommentAlreadyLiked() ? (
					<div className='icon' onClick={handleCommentLike}>
						<FavoriteIcon color='error' fontSize='small' />
					</div>
				) : (
					<div className='icon' onClick={handleCommentLike}>
						<FavoriteBorderOutlinedIcon fontSize='small' />
					</div>
				)}
				<p>{comment.likes.length}</p>
			</div>
		</div>
	)
}

export default Comment
