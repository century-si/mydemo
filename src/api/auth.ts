import axios from '@/axios'
import type {R} from '@/model/response'

export function login<T>(username: string, password: string): Promise<R<any>> {
	return axios.post('auth/login',
		{
			username: username,
			password: password
		},
		// {
		// 	headers: {
		// 		'Content-Type': 'application/x-www-form-urlencoded'
		// 	}
		// }
	)
}


export function getUsers<T>(): Promise<R<any>> {
	return axios.get('/user/getUsers')
}

export async function validateUsername(username: string): Promise<boolean> {
	const res = await axios.get('/auth/validateUsername',{params:
			{
				username: username
			}
	})
	return res.data === 0
}

export function register(username: string, password: string): Promise<R<any>> {
	return axios.post('auth/register',{
		username,
		password
	})
}