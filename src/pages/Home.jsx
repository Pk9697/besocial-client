import React from 'react'
import Navbar from '../components/Navbar'
import PostForm from '../components/PostForm'
import PostsList from '../components/PostsList'

function Home() {
  return (
    <div>
        <Navbar/>
        <PostForm/>
        <PostsList/>
    </div>
  )
}

export default Home