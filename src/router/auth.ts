import {token} from '@/core'
import {infoNotification} from "@/utils/Notification";
import router from "@/router";

export const deleteToken = () => {
	token.value = null
	router.push('/auth')
	infoNotification("已退出登录并删除用户登录状态")
}