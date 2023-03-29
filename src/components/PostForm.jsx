import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined'
import { doesExist } from '../helpers/commonFunctions'
import { createPost } from '../actions/posts'
function PostForm() {
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
		dispatch(createPost(formFields, auth.token))
		setFormFields({
			content: '',
		})
	}

	return (
		<div className='postform-widget widget-wrapper'>
			<section className='post-form__section1'>
				<img className='user__img' src={doesExist(avatar)} alt='user_img' />
				<textarea
					className='input post-form__input'
					type='text'
					placeholder={`What's on your mind...`}
					rows='1'
					name='content'
					value={formFields.content}
					onChange={handleChange}
				/>
			</section>
			<hr style={{ width: '100%' }} />
			<section className='post-form__section2'>
				<div className='post-form__addimage'>
					<AddPhotoAlternateOutlinedIcon />
					<p>Image</p>
				</div>
				<button
					onClick={handleClick}
					disabled={formFields.content.length === 0}
					className='post-btn'
				>
					POST
				</button>
			</section>
		</div>
	)
}

export default PostForm
