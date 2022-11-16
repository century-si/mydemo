import {ElNotification} from "element-plus";

export const successNotification = (message: string,duration:number = 3000) => {
	ElNotification({
		message: message,
		type: 'success',
		duration: duration,
		// position: 'top-left'
	})
}

export const errorNotification = (message: string,duration:number = 3000) => {
	ElNotification({
		message: message,
		type: 'error',
		duration: duration,
		// position: 'top-left',
	})
}

export const warnNotification = (message: string,duration:number = 3000) => {
	ElNotification({
		message: message,
		type: 'warning',
		duration: duration,
		// position: 'top-left',
	})
}

export const infoNotification = (message: string,duration:number = 3000) => {
	ElNotification({
		message: message,
		type: 'info',
		duration: duration,
		// position: 'top-left',
	})
}