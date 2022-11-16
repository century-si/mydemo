<script></script>
<template>
  <div class="header">
    <el-row class="row" :gutter="10">
      <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
        <div class="grid-content ep-bg-purple" />
      </el-col>
      <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
        <div class="grid-content ep-bg-purple-light" />
      </el-col>
      <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
        <div class="grid-content ep-bg-purple" />
      </el-col>
      <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
        <div class="grid-content ep-bg-purple-light" />
      </el-col>
    </el-row>
  </div>
</template>
<style lang="less" scoped>
.header {
  height: 100%;
  background: rgb(74, 242, 239);
}
.row {
  height: 100%;
  align-items: center;
}
.grid-content {
  background: #fff;
  border-radius: 4px;
  min-height: 36px;
}
</style>
