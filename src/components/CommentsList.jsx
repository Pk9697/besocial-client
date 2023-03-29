import React from 'react'
import Comment from './Comment'
import CommentForm from './CommentForm'

function CommentsList() {
	return (
		<div className='flex-col gap-1'>
			<CommentForm />
			<Comment />
			<Comment />
		</div>
	)
}

export default CommentsList
