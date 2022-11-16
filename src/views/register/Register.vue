<template>
	<el-row class="login-container">
		<el-col :lg="16" :md="12" class="left">
			<div>欢迎光临</div>
			<div>京口瓜洲一水间，钟山只隔数重山。<br>春风又绿江南岸，明月何时照我还。</div>
		</el-col>
		<el-col :lg="8" :md="12" class="right">
			<h2 class="title">注册账号</h2>
			<div>
				<span class="line"></span>
				<span>输入用户名和密码注册</span>
				<span class="line"></span>
			</div>
			<el-form :model="ruleForm" :rules="rules" ref="ruleFormRef" class="w-[250px]" @keyup.enter.native="onSubmit"
			         status-icon>
				<el-form-item prop="username">
					<el-input v-model="ruleForm.username" placeholder="请输入用户名" autofocus autocomplete="off">
						<template #prefix>
							<el-icon>
								<User/>
							</el-icon>
						</template>
					</el-input>
				</el-form-item>
				<el-form-item prop="password">
					<el-input v-model="ruleForm.password" type="password" placeholder="请输入密码" show-password
					          autocomplete="off">
						<template #prefix>
							<el-icon>
								<Key/>
							</el-icon>
						</template>
					</el-input>
				</el-form-item>
				<el-form-item prop="confirmPassword">
					<el-input v-model="ruleForm.confirmPassword" type="password" placeholder="请再次输入密码" show-password
					          autocomplete="off">
						<template #prefix>
							<el-icon>
								<Key/>
							</el-icon>
						</template>
					</el-input>
				</el-form-item>
				<el-form-item>
					<el-button class="w-[250px]" color="#6366f1" type="primary" @click="onSubmit" :loading="loading">注 册
					</el-button>
				</el-form-item>
			</el-form>
			<router-link to="/auth">已有账号? 去登录</router-link>
		</el-col>
	</el-row>
</template>

<script setup lang="ts">
import {reactive, ref} from 'vue'
import {login, register, validateUsername as axiosValidateUsername} from '@/api/auth'
import {useRouter} from 'vue-router';
import {token} from '@/core'
import {successNotification} from "@/utils/Notification";
import type {FormInstance,FormRules} from 'element-plus'


const router = useRouter()
const ruleFormRef = ref<FormInstance>()
const loading = ref(false)

const ruleForm = reactive({
	username: "",
	password: "",
	confirmPassword: ""
})

const validateUsername = (rule: any, value: string, cb: any) => {
	axiosValidateUsername(value).then(res => {
		if (!res) {
			cb(new Error('用户已被注册,请重新输入用户名!'))
		} else {
			cb()
		}
	})
}

const validatePass = (rule: any, value: string, cb: any) => {
	if (value === '') {
		cb(new Error('请再次输入密码!'))
	} else if (value != ruleForm.password) {
		cb(new Error('两次密码不一致!'))
	} else {
		cb()
	}
}


const onSubmit = () => {
	ruleFormRef.value?.validate((valid: boolean) => {
		if (valid) {
			loading.value = true
			register(ruleForm.username, ruleForm.password).then(res => {
				console.log(res);
				successNotification('注册成功! 自动登录中...')
				login(ruleForm.username, ruleForm.password).then(res => {
					token.value = res.data.token
					successNotification("登录成功!")
					//跳转到首页
					router.push('/')
				})
			}).catch((error) => {
				console.log(`注册错误信息为: ${error.message}`)
			}).finally(() => {
				loading.value = false
			})
		}
	})
}


const rules = reactive<FormRules>({
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
		},
		{
			validator: validateUsername,
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
	],
	confirmPassword: [
		{
			validator: validatePass,
			trigger: 'change'
		},
	]
})

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



