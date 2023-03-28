import { BASE_ROOT } from './urls'
import { toast } from 'react-toastify'

export function doesExist(imgavatar) {
	const avatar = imgavatar
		? BASE_ROOT + imgavatar
		: '/assets/person-outlined2.png'
	return avatar
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
