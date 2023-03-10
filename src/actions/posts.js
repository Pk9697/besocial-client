import { UPDATE_POSTS,FETCH_POSTS_ERROR } from './actionTypes';

export const fetchPosts = () => {
  return (dispatch) => {
    const url = 'http://localhost:4001/api/v1/posts';
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        if(data.success){
            dispatch(updatePosts(data.data.posts))
        }else{
            dispatch({
                type:FETCH_POSTS_ERROR
            })
        }
    });
    
  };
};

export const updatePosts = (posts) => {
  return {
    type: UPDATE_POSTS,
    payload: posts,
  };
};
