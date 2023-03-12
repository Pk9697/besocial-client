import React from 'react'
import FriendsList from '../components/FriendsList'
import Navbar from '../components/Navbar'
import PostForm from '../components/PostForm'
import PostsList from '../components/PostsList'
import UserWidget from '../components/UserWidget'
import UsersListWidget from '../components/UsersListWidget'

function Home() {
  return (
    <div>
        <Navbar/>
        <div className='grid'>
            <UserWidget/>
            <FriendsList/>
            <UsersListWidget/>
          <section className='flex-col grid__section'>
            <PostForm/>
            <PostsList/>
          </section>
        </div>
    </div>
  )
}

export default Home