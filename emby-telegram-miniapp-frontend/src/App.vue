<template>
  <div class="app-container">
    <div class="navigation" v-if="showNav">
      <router-link to="/" class="nav-link">首页</router-link>
      <!-- <router-link to="/similar" class="nav-link">类似布局</router-link> -->
      <router-link to="/profile" class="nav-link">个人</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script setup>
// 这是根组件，显示当前路由视图
import { ref } from 'vue';

const showNav = ref(true);
</script>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #192841;
  color: #fff;
}

.app-container {
  width: 100%;
  min-height: 100vh;
}

.navigation {
  display: flex;
  justify-content: center;
  padding: 10px 0;
  background: rgba(0, 0, 0, 0.2);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-link {
  padding: 8px 16px;
  margin: 0 5px;
  color: white;
  text-decoration: none;
  border-radius: 20px;
  transition: all 0.3s ease;
}

.nav-link:hover, .nav-link.router-link-active {
  background: rgba(74, 144, 226, 0.5);
}
</style>