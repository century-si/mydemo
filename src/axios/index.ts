import axios from 'axios'
import {token} from '@/core'
import {errorNotification} from '@/utils/Notification'
import {useStorage} from '@vueuse/core'
import { ElMessage } from 'element-plus'
import router from '@/router'

const _axios = axios.create({
	baseURL: '/api',

})

_axios.interceptors.request.use((config) => {
	if (token.value) {
		config.headers = {
			Authorization: token.value
		}
	}
	return config
}, error => {
	return Promise.reject(error)
})


_axios.interceptors.response.use((resp) => {
	if (resp.data.code !== 0) {
		errorNotification(resp.data.message)
		if (resp.data.code === 401) {
			token.value = null
			router.push('/auth')
		}
		return Promise.reject(resp.data)
	}
	ElMessage({
		message: resp.data.message,
		grouping: true,
		type: 'success',
	})
	console.log(resp)
	return resp.data
},(error) => {
	errorNotification(error.response.data.message || '请求失败')
	return Promise.reject(error)
})

export default _axios;