import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import SendOutlinedIcon from '@mui/icons-material/SendOutlined'
import CloseFullscreenOutlinedIcon from '@mui/icons-material/CloseFullscreenOutlined'
import OpenInFullOutlinedIcon from '@mui/icons-material/OpenInFullOutlined'
import { doesExist } from '../helpers/commonFunctions'
import { APIUrls, CHAT_SERVER } from '../helpers/urls'
function ChatBox({ user, bearer }) {
	const [isMinimized, setIsMinimized] = useState(false)
	const [messages, setMessages] = useState([])
	const [typedMessage, setTypedMessage] = useState('')
	const [socket, setSocket] = useState(null)

	useEffect(() => {
		const fetchChats = () => {
			const url = APIUrls.fetchChatRoomChats('codeial')
			fetch(url, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${bearer}`,
				},
			})
				.then((res) => res.json())
				.then((data) => {
					if (data.success) {
						const msgs = data.data.chats.map((chat) => ({
							msg: chat.content,
							name: chat.user.name,
							self: chat.user._id === user._id,
							createdAt: chat.createdAt,
						}))
						setMessages(msgs)
					}
				})
		}
		fetchChats()
	}, [])

	useEffect(() => {
		if (!socket) {
			setSocket(io(`${CHAT_SERVER}`))
		} else {
			setupConnections()
		}
	}, [socket])

	const setupConnections = () => {
		socket.on('connect', () => {
			console.log('connection established using sockets...!')
			socket.emit('join_room', {
				user,
				chatroom: 'codeial',
			})
			socket.on('user_joined', (data) => {
				console.log('a user joined...!', data)
			})
		})

		socket.on('receive_msg', (data) => {
			console.log('message recieved...!', data.msg)
			const msgObj = {
				msg: data.msg,
				name: data.user.name,
				createdAt: data.createdAt,
			}
			if (data.user._id === user._id) {
				msgObj.self = true
			}
			setMessages((prev) => [...prev, msgObj])
		})
	}

	const handleClick = (e) => {
		e.preventDefault()

		const url = APIUrls.createChat()
		const data = {
			content: typedMessage,
			chatRoom: 'codeial',
		}
		fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${bearer}`,
			},
			body: JSON.stringify(data),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data)

				if (data.success) {
					const { createdAt } = data.data.chat
					socket.emit('send_msg', {
						msg: typedMessage,
						user,
						chatroom: 'codeial',
						createdAt,
					})
				}
			})

		setTypedMessage('')
	}

	const formatDate = (date) => {
		const d = new Date(date)
		return `${d.getHours()}:${d.getMinutes()} ${d.getDate()}/${d.getMonth()}/${d.getFullYear()} `
	}

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
						{messages.map(({ msg, name, self, createdAt }, index) => (
							<div
								key={`msg-${index}`}
								className={self ? 'self-msg' : 'other-msg'}
							>
								<p>{msg}</p>
								<div className='msg-details'>
									<h5 className='user__name'>{name}</h5>
									<p className='time'>{formatDate(createdAt)}</p>
								</div>
							</div>
						))}
					</div>
					<div className='chat-box__input comment-form'>
						<img
							src={doesExist(user.avatar)}
							className='user__img comment-form__img'
							alt='user_pic'
						/>
						<textarea
							className='input post-form__input'
							type='text'
							placeholder={`Send msg...`}
							rows='1'
							name='content'
							value={typedMessage}
							onChange={(e) => setTypedMessage(e.target.value)}
						/>
						<button
							className='user__icon icon ml-auto comment-btn'
							onClick={handleClick}
							disabled={typedMessage.length === 0}
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
