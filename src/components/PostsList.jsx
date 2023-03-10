import React,{useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import { fetchPosts } from '../actions/posts';
function PostsList() {
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  // console.log(posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <div className="posts-container">
        {posts.map(post=>(
            <div key={post._id} className='post'>
                <div className='post__user'>
                    <img className='post__user__img' src={`http://localhost:4001${post.user.avatar}`} alt='user_pic'/>
                    <h4 className='post__user__name'>{post.user.name}</h4>
                    <div className='post__user__icon icon'><PersonAddAlt1OutlinedIcon fontSize='small'/></div>
                </div>
                <p className='post__content'>{post.content}</p>
                <div className='post__interactions'>
                    <div className='post__likes'>
                        <div className="icon">
                            <FavoriteBorderOutlinedIcon/>
                        </div>
                        <p>{post.likes.length}</p>
                    </div>
                    <div className='post__comments'>
                        <div className="icon">
                            <ChatBubbleOutlineOutlinedIcon/>
                        </div>
                        <p>{post.comments.length}</p>
                    </div>
                </div>
            </div>
        ))}
    </div>
  )
}

export default PostsList;
