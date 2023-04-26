import React, { useState } from 'react'
import { doesExist } from '../helpers/commonFunctions'
import SendOutlinedIcon from '@mui/icons-material/SendOutlined'
import CloseFullscreenOutlinedIcon from '@mui/icons-material/CloseFullscreenOutlined'
import OpenInFullOutlinedIcon from '@mui/icons-material/OpenInFullOutlined'
function ChatBox() {
	const [isMinimized, setIsMinimized] = useState(false)
	return (
		<div
			className={`widget-wrapper chat-box ${
				isMinimized && 'chat-box--minimized'
			} `}
		>
			<div className='chat-box__header'>
				<h4>Group Chat</h4>
				{!isMinimized ? (
					<button
						className='user__icon icon ml-auto comment-btn'
						onClick={() => setIsMinimized(true)}
					>
						<CloseFullscreenOutlinedIcon />
					</button>
				) : (
					<button
						className='user__icon icon ml-auto comment-btn'
						onClick={() => setIsMinimized(false)}
					>
						<OpenInFullOutlinedIcon />
					</button>
				)}
			</div>
			{!isMinimized && (
				<>
					<div className='chat-box__body'>
						<div className='other-msg'>
							<p>Other message</p>
							<div className='msg-details'>
								<h5 className='user__name'>Bill Gates</h5>
								<p className='time'>a minute ago</p>
							</div>
						</div>
						<div className='self-msg'>
							<p>Self message</p>
							<div className='msg-details'>
								<h5 className='user__name'>You</h5>
								<p className='time'>a minute ago</p>
							</div>
						</div>
						<div className='other-msg'>
							<p>Other message</p>
							<div className='msg-details'>
								<h5 className='user__name'>Bill Gates</h5>
								<p className='time'>a minute ago</p>
							</div>
						</div>
						<div className='other-msg'>
							<p>Other msg</p>
							<div className='msg-details'>
								<h5 className='user__name'>Bill Gates</h5>
								<p className='time'>a minute ago</p>
							</div>
						</div>
					</div>
					<div className='chat-box__input comment-form'>
						<img
							src={doesExist('')}
							className='user__img comment-form__img'
							alt='user_pic'
						/>
						<textarea
							className='input post-form__input'
							type='text'
							placeholder={`Send msg...`}
							rows='1'
							name='content'
							// value={formFields.content}
							// onChange={handleChange}
						/>
						<button
							className='user__icon icon ml-auto comment-btn'
							// onClick={handleClick}
							// disabled={formFields.content.length === 0}
						>
							<SendOutlinedIcon />
						</button>
					</div>
				</>
			)}
		</div>
	)
}

export default ChatBox
