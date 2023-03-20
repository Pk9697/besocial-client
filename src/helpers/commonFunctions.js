import { BASE_ROOT } from './urls'

export function doesExist(imgavatar) {
	const avatar = imgavatar
		? BASE_ROOT + imgavatar
		: '/assets/person-outlined2.png'
	return avatar
}
