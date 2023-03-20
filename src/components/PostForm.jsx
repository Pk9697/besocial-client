import React from 'react'
import { useSelector } from 'react-redux'
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined'
import { BASE_ROOT } from '../helpers/urls'
function PostForm() {
	const auth = useSelector((state) => state.auth)
	const { user, isLoggedIn } = auth
	if (!isLoggedIn) {
		return
	}
	const { avatar } = user

	return (
		<div className='postform-widget widget-wrapper'>
			<section className='post-form__section1'>
				<img
					className='user__img'
					src={`${BASE_ROOT}${avatar}`}
					alt='user_img'
				/>
				<input
					className='input post-form__input'
					type='text'
					placeholder={`What's on your mind...`}
				/>
			</section>
			<hr style={{ width: '100%' }} />
			<section className='post-form__section2'>
				<div className='post-form__addimage'>
					<AddPhotoAlternateOutlinedIcon />
					<p>Image</p>
				</div>
				<button className='post-btn'>POST</button>
			</section>
		</div>
	)
}

export default PostForm
