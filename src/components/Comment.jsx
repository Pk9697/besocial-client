import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import FavoriteIcon from '@mui/icons-material/Favorite'

import { doesExist, notify } from '../helpers/commonFunctions'
import { toggleLike } from '../actions/posts'

function Comment(props) {
	const dispatch = useDispatch()
	const auth = useSelector((state) => state.auth)
	const { isLoggedIn } = auth
	const { comment } = props

	function isCommentAlreadyLiked() {
		return Boolean(
			comment.likes.find((like) => like.user._id === auth.user._id)
		)
	}

	function handleCommentLike() {
		if (isLoggedIn) {
			dispatch(
				toggleLike({
					postId: props.postId,
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
