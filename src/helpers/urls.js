export const API_ROOT=`http://localhost:4001/api/v1`
export const BASE_ROOT=`http://localhost:4001`
export const APIUrls={
    login:()=>`${API_ROOT}/users/login`,
    register:()=>`${API_ROOT}/users/register`,
    fetchPosts:()=>`${API_ROOT}/posts`
}