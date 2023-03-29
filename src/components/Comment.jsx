import React from 'react'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'

function Comment() {
	return (
		<div className='user'>
			<img
				className='user__img comment__img'
				src='/assets/p1.jpeg'
				alt='user_pic'
			/>
			<div className='comment__content'>
				<h6 className='user__name'>Full name</h6>
				<p className='post__content'>Comment 1</p>
			</div>
			<div className='post__likes gap-1by10 ml-auto'>
				<div className='icon'>
					<FavoriteBorderOutlinedIcon fontSize='small' />
				</div>
				<p>0</p>
			</div>
		</div>
	)
}

export default Comment
