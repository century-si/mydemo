<script setup>
import Sidebar from "./components/Sidebar/index.vue";
import Header from "./components/Header/index.vue"
import AppMain from "./components/AppMain.vue";
</script>

<template>
  <el-container>
    <el-aside>
      <Sidebar />
    </el-aside>
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-main>
        <AppMain />
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
.el-container {
  height: 100%;
}

.el-aside {
  height: 100%;
  width: auto;
}

.el-header {
  padding: 0;
  height: 90px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.el-main {
  margin: 0;
  padding: 10px;
}
</style>
