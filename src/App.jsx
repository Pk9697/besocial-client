import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts } from './actions/posts';
function App() {

  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  // console.log(posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return <div>App</div>;
}

export default App;
