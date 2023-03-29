import React from 'react'
import Comment from './Comment'
import CommentForm from './CommentForm'

function CommentsList(props) {
	const {comments,postId}=props
	return (
		<div className='flex-col gap-1'>
			<CommentForm postId={postId}/>
			{comments.map(comment=>(
				<Comment key={comment._id} comment={comment}/>
			))}
		</div>
	)
}

export default CommentsList
