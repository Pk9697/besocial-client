import React from 'react'
import {useSelector} from 'react-redux'
import PersonRemoveOutlinedIcon from '@mui/icons-material/PersonRemoveOutlined';
import { BASE_ROOT } from '../helpers/urls';
function FriendsList() {
  const auth=useSelector(state=>state.auth)
  const {user,isLoggedIn}=auth
  if(!isLoggedIn) {
    return
  }
  const {friends}=user
  return (
    <div className='friendslist-widget widget-wrapper'>
      <h4>Friends List</h4>
      {friends.map(friend=>(
        <div className='user'>
          <img src={`${BASE_ROOT}${friend.to_user.avatar}`} className='user__img' alt="friend_pic" />
          <h4 className='user__name'>{friend.to_user.name}</h4>
          <div className='user__icon icon'><PersonRemoveOutlinedIcon/></div>
        </div>
      ))}
      {/* <div className='user'>
        <img src="/assets/p2.jpeg" className='user__img' alt="friend_pic" />
        <h4 className='user__name'>Fname Lname</h4>
        <div className='user__icon icon'><PersonRemoveOutlinedIcon/></div>
      </div>
      <div className='user'>
        <img src="/assets/p3.jpeg" className='user__img' alt="friend_pic" />
        <h4 className='user__name'>Fname Lname</h4>
        <div className='user__icon icon'><PersonRemoveOutlinedIcon/></div>
      </div> */}
    </div>
  )
}

export default FriendsList