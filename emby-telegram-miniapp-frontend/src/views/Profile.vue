<template>
    <div class="profile">
      <NavBar />
      <div class="content">
        <h2>个人中心</h2>
        <div class="card">
          <i class="icon-user"></i>
          <p>用户名: ********</p>
        </div>
        <div class="card">
          <i class="icon-lock"></i>
          <p>账户密码: ********</p>
        </div>
        <div class="card">
          <i class="icon-clock"></i>
          <p>剩余可用时间: 30 天</p>
        </div>
        <button class="logout-btn">退出登录</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import NavBar from '@/components/NavBar.vue';
  </script>
  
  <style scoped>
  .profile {
    background: #121212;
    color: white;
    min-height: 100vh;
  }
  .content {
    padding: 20px;
  }
  .card {
    background: #1a1a1a;
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .logout-btn {
    width: 100%;
    padding: 10px;
    background: red;
    border-radius: 8px;
    margin-top: 10px;
  }
  </style>
  