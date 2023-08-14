import { BASE_ROOT } from './urls'
import { toast } from 'react-toastify'

const SERVER_PORT = import.meta.env.VITE_SERVER_PORT || 4001

export function doesExist(imgavatar) {
	const avatar = imgavatar
		? BASE_ROOT + ':' + SERVER_PORT + imgavatar
		: '/assets/person-outlined2.png'
	return avatar
}

export function postImgSrc(postImg) {
	return BASE_ROOT + ':' + SERVER_PORT + postImg
}

export function notify({ type, msg = 'Default' }) {
	if (type === 'success') {
		return toast.success(msg, {
			autoClose: 1500,
		})
	}

	if (type === 'error') {
		return toast.error(msg, {
			autoClose: 1500,
		})
	}

	return toast(msg, {
		autoClose: 1500,
	})
}
