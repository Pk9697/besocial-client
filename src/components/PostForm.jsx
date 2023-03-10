import React from 'react'
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
function PostForm() {
  return (
    <div className='post-form'>
        <section className='post-form__section1'>
            <img className='post__user__img' src="/assets/p1.jpeg" alt="user_img" />
            <input className='input post-form__input' type="text" placeholder={`What's on your mind...`}/>
        </section>
        <hr style={{width:"100%"}}/>
        <section className='post-form__section2'>
            <div className='post-form__addimage'>
              <AddPhotoAlternateOutlinedIcon/>
              <p>Image</p>
            </div>
            <button className='post-btn'>
                POST
            </button>
        </section>
    </div>
  )
}

export default PostForm