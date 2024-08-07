export const API_ROOT = import.meta.env.VITE_API_ROOT
export const BASE_ROOT = import.meta.env.VITE_BASE_ROOT
export const CHAT_SERVER = import.meta.env.VITE_CHAT_SERVER

export const APIUrls = {
	login: () => `${API_ROOT}/users/login`,
	register: () => `${API_ROOT}/users/register`,
	fetchAllPosts: () => `${API_ROOT}/posts`,
	fetchAllUsers: () => `${API_ROOT}/users/`,
	editProfile: () => `${API_ROOT}/users/edit`,
	fetchUserProfile: (userId) => `${API_ROOT}/users/profile/${userId}`,
	fetchUserFriends: (userId) =>
		`${API_ROOT}/friendship/fetch_user_friends/${userId}`,
	addFriend: (userId) =>
		`${API_ROOT}/friendship/create_friendship?user_id=${userId}`,
	removeFriend: (userId) =>
		`${API_ROOT}/friendship/remove_friendship?user_id=${userId}`,
	authenticateUser: () => `${API_ROOT}/users/authenticate-user`,
	createPost: () => `${API_ROOT}/posts/create`,
	createComment: () => `${API_ROOT}/comments/create`,
	toggleLike: (id, type) => `${API_ROOT}/likes/toggle/?id=${id}&type=${type}`,
	deletePost: (postId) => `${API_ROOT}/posts/delete/${postId}`,
	deleteComment: (commentId, postUserId) =>
		`${API_ROOT}/comments/delete/?commentId=${commentId}&postUserId=${postUserId}`,
	searchUser: (searchText) =>
		`${API_ROOT}/users/search?searchText=${searchText}`,
	fetchUserPosts: (userId) => `${API_ROOT}/posts/${userId}`,
	fetchChatRoomChats: (chatRoom) => `${API_ROOT}/chats/?chatRoom=${chatRoom}`,
	createChat: () => `${API_ROOT}/chats/create`,
}
