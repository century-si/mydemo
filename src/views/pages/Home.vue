<script setup>
import { token } from "@/core";
import { getUsers } from "@/api/auth";
import { ref } from "vue";
import { deleteToken } from "@/router/auth";
import { mainStore, useCounterStore } from "@/stores/counter";
import { user } from "@/stores/user";

const users = ref();
const store = mainStore();
const useCon = useCounterStore();
const useUser = user();

const getUser = async () => {
  const res = await getUsers();
  users.value = res.data;
};

function handleClick() {
  // store.$patch({
  // 	title: 'abc',
  // 	count: 1
  // })
  // useCon.increment()
  // useUser.updateUsername()
  useUser.aaaaa();
}
function handleClic() {
  // store.$patch({
  // 	title: 'abc',
  // 	count: 1
  // })
  // useCon.increment()
  // useUser.updateUsername()
  useUser.aaaaa();
}

function addadd() {
  useUser.aaaaa();
}
let flag = ref(true);
function hide() {
  flag.value = !flag.value;
  return flag;
}
</script>
<template>
  <div>
    <!--		<el-button @click="getToken">点击查看token</el-button>-->
    <span>这个是Token: </span><input v-model="token" />
  </div>
  <div>
    <el-button @click="deleteToken">退出登录</el-button>
  </div>

  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
    <el-breadcrumb-item>
      <a href="/">promotion management</a>
    </el-breadcrumb-item>
    <el-breadcrumb-item>promotion list</el-breadcrumb-item>
    <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
  </el-breadcrumb>
  <el-button @click="getUser">点击获取所有用户信息</el-button>
  <p>{{ users }}</p>
  <div>{{ store.count }}==={{ store.title }}</div>
  <div>{{ useCon.count }}</div>
  <el-button @click="handleClick">啊啊啊</el-button>
  <el-button @click="handleClic">啊啊啊</el-button>
  <div>{{ useCon.doubleCount }}</div>
  <el-button @click="useCon.count2"></el-button>
  <div>{{ useUser.username }}</div>
  <el-button @click="useUser.updateUsername('旗舰')">阿萨大大</el-button>
  <div v-show="flag">我是要隐藏的内容</div>
  <div>
    <el-button @click="hide">点击显示隐藏</el-button>
  </div>
</template>
<style lang="less" scoped></style>
