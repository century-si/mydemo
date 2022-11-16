<template>
	<el-row class="login-container">
		<el-col :lg="16" :md="12" class="left">
			<div>欢迎光临</div>
			<div>京口瓜洲一水间，钟山只隔数重山。<br>春风又绿江南岸，明月何时照我还。</div>
		</el-col>
		<el-col :lg="8" :md="12" class="right">
			<h2 class="title">欢迎回来</h2>
			<div>
				<span class="line"></span>
				<span>输入用户名和密码登录</span>
				<span class="line"></span>
			</div>
			<el-form :model="user" :rules="rules" ref="formRef" class="w-[250px]" @keyup.enter.native="onSubmit">
				<el-form-item prop="username">
					<el-input v-model="user.username" placeholder="请输入用户名" autofocus>
						<template #prefix>
							<el-icon>
								<User/>
							</el-icon>
						</template>
					</el-input>
				</el-form-item>
				<el-form-item prop="password">
					<el-input v-model="user.password" type="password" placeholder="请输入密码" show-password>
						<template #prefix>
							<el-icon>
								<Key/>
							</el-icon>
						</template>
					</el-input>
				</el-form-item>
				<el-form-item>
					<el-button class="w-[250px]" color="#6366f1" type="primary" @click="onSubmit" :loading="loading">登 录
					</el-button>
				</el-form-item>
			</el-form>
			<router-link to="/register">没有账号? 去注册</router-link>
		</el-col>
	</el-row>
</template>

<script setup lang="ts">
import {reactive, ref} from 'vue'
import {login} from '@/api/auth'
import {useRouter} from 'vue-router';
import {token} from '@/core'
import {successNotification} from "@/utils/Notification";


const router = useRouter()


const user = reactive({
	username: "",
	password: ""
})

const rules = reactive({
	username: [
		{
			required: true,
			message: '用户名不能为空',
			trigger: 'blur'
		},
		{
			min: 2,
			max: 20,
			message: '用户名的长度必须是2到20个字符',
			trigger: 'blur'
		}
	],
	password: [
		{
			required: true,
			message: '密码不能为空',
			trigger: 'blur'
		},
		{
			min: 4,
			max: 30,
			message: '密码的长度必须是4到30个字符',
			trigger: 'blur'
		}
	]
})

const formRef = ref<any>(null)
const loading = ref(false)


const onSubmit = () => {
	formRef.value.validate((valid: boolean) => {
		if (valid) {
			loading.value = true
			login(user.username, user.password).then(res => {
				console.log(res);
				successNotification(res.message || '')
				//将token存在localStorage
				token.value = res.data.token
				console.log(`登录的令牌为: ${token.value}`);
				//跳转到首页
				router.push('/')
			}).catch((error) => {
				console.log(`登录错误信息为: ${error.message}`)
			}).finally(() => {
				loading.value = false
			})
		}
	})
}


</script>


<style scoped>
.login-container {
	@apply bg-indigo-500 min-h-screen;
}

.login-container .left, .login-container .right {
	@apply flex items-center justify-center flex-col;
}

.login-container .right {
	@apply bg-light-50;
}

.left > div:first-child {
	@apply font-bold text-5xl text-light-50 mb-4;
}

.left > div:last-child {
	@apply text-gray-200;
}

.right .title {
	@apply font-bold text-3xl text-gray-800;
}

.right > div {
	@apply flex items-center justify-center my-5 text-gray-300 space-x-2;
}

.right .line {
	@apply h-[1px] w-16 bg-gray-200;
}
</style>



