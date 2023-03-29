import React from 'react'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import { doesExist } from '../helpers/commonFunctions'

function Comment(props) {
    const {comment}=props
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
				<div className='icon'>
					<FavoriteBorderOutlinedIcon fontSize='small' />
				</div>
				<p>0</p>
			</div>
		</div>
	)
}

export default Comment
