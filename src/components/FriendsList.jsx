import React from 'react'
import PersonRemoveOutlinedIcon from '@mui/icons-material/PersonRemoveOutlined';
function FriendsList() {
  return (
    <div className='friendslist-widget widget-wrapper'>
      <h4>Friends List</h4>
      <div className='user'>
        <img src="/assets/p2.jpeg" className='user__img' alt="friend_pic" />
        <h4 className='user__name'>Fname Lname</h4>
        <div className='user__icon icon'><PersonRemoveOutlinedIcon/></div>
      </div>
      <div className='user'>
        <img src="/assets/p3.jpeg" className='user__img' alt="friend_pic" />
        <h4 className='user__name'>Fname Lname</h4>
        <div className='user__icon icon'><PersonRemoveOutlinedIcon/></div>
      </div>
    </div>
  )
}

export default FriendsList