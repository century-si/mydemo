import {defineStore} from 'pinia'
import {ref} from "vue";

export const user = defineStore('useraaa', () => {
	const username = ref('花菜')
	const updateUsername = (useraaa:string) => {
		console.log(username)
		username.value = useraaa
	}
	function aaaaa() {
		username.value
	}
	return {username , updateUsername,aaaaa}
})