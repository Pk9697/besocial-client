import React, { useState } from 'react'
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined'
import { useDispatch, useSelector } from 'react-redux'
import { doesExist } from '../helpers/commonFunctions'
import { createComment } from '../actions/posts'
function CommentForm(props) {
	const dispatch = useDispatch()
	const [formFields, setFormFields] = useState({
		content: '',
	})
	const auth = useSelector((state) => state.auth)
	const { user, isLoggedIn } = auth
	if (!isLoggedIn) {
		return
	}
	const { avatar } = user

	function handleChange(e) {
		const { name, value } = e.target
		setFormFields((prev) => ({
			...prev,
			[name]: value,
		}))
	}

	function handleClick(e) {
		e.preventDefault()
		//dispatch an action
		dispatch(createComment({...formFields,postId:props.postId}, auth.token))
		setFormFields({
			content: '',
		})
	}

	return (
		<div className='comment-form mb-1'>
			<img
				src={doesExist(avatar)}
				className='user__img comment-form__img'
				alt='user_pic'
			/>
			<textarea
				className='input post-form__input'
				type='text'
				placeholder={`Write a comment here...`}
				rows='1'
				name='content'
				value={formFields.content}
				onChange={handleChange}
			/>
			<button
				className='user__icon icon ml-auto comment-btn'
				onClick={handleClick}
				disabled={formFields.content.length === 0}
			>
				<AddCommentOutlinedIcon />
			</button>
		</div>
	)
}

export default CommentForm
