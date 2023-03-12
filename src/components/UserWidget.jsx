import React from 'react'
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
function UserWidget() {
  return (
    <div className='user-widget widget-wrapper'>
        <section className='user'>
            <img className='user__img' src="/assets/p1.jpeg" alt="user_pic" />
            <div>
              <h4 className='user__name'>Fname Lname</h4>
              <p>2 friends</p>
            </div>
            <div className='user__icon icon'>
              <ManageAccountsOutlinedIcon/>
            </div>
        </section>
    </div>
  )
}

export default UserWidget