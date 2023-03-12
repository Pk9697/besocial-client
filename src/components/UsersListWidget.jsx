import React from 'react'
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';

function UsersListWidget() {
  return (
    <div className='userslist-widget widget-wrapper'>
      <h4>All Users List</h4>
      <div className='user'>
        <img src="/assets/p2.jpeg" className='user__img' alt="friend_pic" />
        <h4 className='user__name'>Fname Lname</h4>
        <div className='user__icon icon'><PersonAddAlt1OutlinedIcon/></div>
      </div>
      <div className='user'>
        <img src="/assets/p3.jpeg" className='user__img' alt="friend_pic" />
        <h4 className='user__name'>Fname Lname</h4>
        <div className='user__icon icon'><PersonAddAlt1OutlinedIcon/></div>
      </div>
    </div>
  )
}

export default UsersListWidget