import React from 'react'
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined'
function CommentForm() {
	return (
		<div className='comment-form mb-1'>
			<img
				src='/assets/p1.jpeg'
				className='user__img comment-form__img'
				alt='user_pic'
			/>
			<textarea
				className='input post-form__input'
				type='text'
				placeholder={`Write a comment here...`}
				rows='1'
				name='content'
			/>
			<div className='user__icon icon ml-auto'>
				<AddCommentOutlinedIcon />
			</div>
		</div>
	)
}

export default CommentForm
