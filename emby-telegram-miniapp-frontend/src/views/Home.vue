<template>
    <div class="home">
      <NavBar />
      <div class="content">
        <div class="grid">
          <Card title="签到" value="68 积分" color="green" icon="location" />
          <StatusCard title="账户状态" status="可用" color="purple" icon="user" />
          <StatusCard title="Emby状态" status="可用" color="pink" icon="server" />
          <Card title="探针" color="cyan" icon="database" />
          <Card title="求片" color="yellow" icon="search" />
        </div>
        <InfoPanel />
        <ConnectionInfo />
      </div>
      <button class="close-btn">关闭面板</button>
    </div>
  </template>
  
  <script setup>
  import NavBar from '@/components/NavBar.vue';
  import Card from '@/components/Card.vue';
  import StatusCard from '@/components/StatusCard.vue';
  import InfoPanel from '@/components/InfoPanel.vue';
  import ConnectionInfo from '@/components/ConnectionInfo.vue';
  import Profile from './Profile.vue';
  </script>
  
  <style scoped>
  .home {
    background: #121212;
    color: white;
    min-height: 100vh;
    padding: 10px;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
  .close-btn {
    width: 100%;
    padding: 10px;
    background: limegreen;
    border-radius: 8px;
  }
  </style>
  