import React,{useEffect,useState} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import PersonRemoveOutlinedIcon from '@mui/icons-material/PersonRemoveOutlined'
import { Link } from 'react-router-dom'
import { doesExist } from '../helpers/commonFunctions'
import { fetchUserFriends } from '../actions/friends'
import Alert from './Alert'
function FriendsList() {
	const dispatch=useDispatch()
	const auth = useSelector((state) => state.auth)
	const friends = useSelector((state) => state.friends)
	const [isAlertClosed, setIsAlertClosed] = useState(false)
	const { friendsArr,error } = friends
	const { isLoggedIn } = auth
	useEffect(() => {
	  dispatch(fetchUserFriends(auth.token))
	}, [])
	
	if (!isLoggedIn) {
		return
	}
	return (
		<div className='friendslist-widget widget-wrapper'>
			<h4>Friends List</h4>
			{error ? !isAlertClosed && <Alert msg={error} error={true} setIsAlertClosed={setIsAlertClosed} />:
				<>
					{friendsArr ? (
						friendsArr.map((friend) => (
							<div key={friend._id} className='user'>
								<Link to={`/profile/${friend.to_user._id}`} className='user'>
									<img
										src={doesExist(friend.to_user.avatar)}
										className='user__img'
										alt='friend_pic'
									/>
									<h5 className='user__name'>{friend.to_user.name}</h5>
								</Link>
								<div className='user__icon icon'>
									<PersonRemoveOutlinedIcon />
								</div>
							</div>
						))
					) : (
						<h5 className='user__name'>No friends</h5>
					)}
				</>
			}
		</div>
	)
}

export default FriendsList
