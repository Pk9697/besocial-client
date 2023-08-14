import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { doesExist } from '../helpers/commonFunctions'
import { createPost } from '../actions/posts'
function PostForm() {
	const dispatch = useDispatch()
	const [postImg, setPostImg] = useState(null)

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

	function handleImage(e) {
		setPostImg(e.target.files[0])
		e.target.value=null
	}

	function handleSubmit(e) {
		e.preventDefault()
		const formData = new FormData()
		formData.append('content', formFields.content)
		if (postImg) {
			formData.append('postImg', postImg)
		}
		dispatch(createPost(formData, auth.token))
		setFormFields({
			content: '',
		})
		setPostImg(null)
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
			<form
				onSubmit={handleSubmit}
				className='post-form__section2'
				encType='multipart/form-data'
			>
				<label htmlFor='avatar' className='post-form__addimage'>
					<AddPhotoAlternateOutlinedIcon />
					<p>{postImg ? postImg.name : 'Choose Image'}</p>
				</label>
				{postImg && 
					<div className='user__icon icon ml-1' onClick={()=>setPostImg(null)}>
						<ClearOutlinedIcon fontSize='small'/>
					</div>
				}
				<input id='avatar' name='avatar' type='file' onChange={handleImage} />
				<button
					type='submit'
					disabled={formFields.content.length === 0 && !postImg}
					className='post-btn'
				>
					POST
				</button>
			</form>
		</div>
	)
}

export default PostForm
