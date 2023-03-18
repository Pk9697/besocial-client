import React from 'react'
import {useSelector} from 'react-redux'
import PersonRemoveOutlinedIcon from '@mui/icons-material/PersonRemoveOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import { BASE_ROOT } from '../helpers/urls';
import { doesExist } from '../helpers/commonFunctions';
function FriendsList() {
  const auth=useSelector(state=>state.auth)
  const {user,isLoggedIn}=auth
  if(!isLoggedIn) {
    return
  }
  // ${BASE_ROOT}${friend.to_user.avatar}

  const {friends}=user

  // function doesExist(friend){
  //   const avatar=friend.to_user.avatar?BASE_ROOT+friend.to_user.avatar:'/assets/person-outlined2.png'
  //   return avatar
  // }

  return (
    <div className='friendslist-widget widget-wrapper'>
      <h4>Friends List</h4>
      {friends.map(friend=>(
        <div key={friend._id} className='user'>
          <img src={doesExist(friend.to_user.avatar)} className='user__img' alt="friend_pic" />
          <h4 className='user__name'>{friend.to_user.name}</h4>
          <div className='user__icon icon'><PersonRemoveOutlinedIcon/></div>
        </div>
      ))}
    </div>
  )
}

export default FriendsList