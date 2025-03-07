<template>
  <div class="layout-container">
    <div class="content">
      <!-- 顶部标题区域 -->
      <div class="header-area">
        <div class="app-title">起点站</div>
      </div>
      
      <div class="grid">
        <!-- 左侧 - 签到卡片 -->
        <div class="card large-card" style="background-color: #5499e3;">
          <div class="card-header">
            <div class="icon-wrapper">
              <el-icon><Location /></el-icon>
            </div>
            <div class="arrow-right">
              <el-icon><ArrowRight /></el-icon>
            </div>
          </div>
          <div class="card-body">
            <div class="card-title">账户余额</div>
            <div class="card-value">68</div>
            <div class="card-subtitle">积分</div>
          </div>
          <div class="card-action" @click="handleAction('password')">
            <span>修改密码</span>
            <el-icon><ArrowRight /></el-icon>
          </div>
        </div>
        
        <!-- 右侧 - 状态卡片 -->
        <div class="status-cards">
          <div class="card status-card" style="background-color: #dcb0ff;">
            <div class="card-content">
              <div class="icon-wrapper">
                <el-icon><User /></el-icon>
              </div>
              <div class="text-wrapper">
                <div class="title">账户状态</div>
                <div class="status">可用</div>
              </div>
              <div class="status-icon">
                <el-icon><User /></el-icon>
              </div>
            </div>
          </div>
          
          <div class="card status-card" style="background-color: #ffb6c1;">
            <div class="card-content">
              <div class="icon-wrapper">
                <el-icon><Platform /></el-icon>
              </div>
              <div class="text-wrapper">
                <div class="title">Emby状态</div>
                <div class="status">可用</div>
              </div>
              <div class="status-icon">
                <el-icon><Platform /></el-icon>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 底部卡片 -->
      <div class="bottom-cards">
        <div class="card action-card" style="background-color: #80deea;">
          <div class="card-content">
            <div class="icon-wrapper">
              <el-icon><DataAnalysis /></el-icon>
            </div>
            <div class="text-wrapper">
              <div class="title">探针</div>
            </div>
            <div class="arrow-icon">
              <el-icon><ArrowRight /></el-icon>
            </div>
          </div>
        </div>
        
        <div class="card action-card" style="background-color: #fff59d;">
          <div class="card-content">
            <div class="icon-wrapper">
              <el-icon><Search /></el-icon>
            </div>
            <div class="text-wrapper">
              <div class="title">求片</div>
            </div>
            <div class="arrow-icon">
              <el-icon><ArrowRight /></el-icon>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 底部按钮 -->
      <div class="bottom-action">
        <button class="close-button">
          关闭面板
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Location, User, Platform, DataAnalysis, Search, ArrowRight, Lock } from '@element-plus/icons-vue';

// 处理点击操作
const handleAction = (type) => {
  console.log(`执行${type}操作`);
  // 在这里可以添加实际的操作逻辑
};
</script>

<style scoped>
.layout-container {
  background: #192841;
  color: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-image: linear-gradient(to bottom, rgba(25, 40, 65, 0.9), rgba(18, 30, 50, 0.95));
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}

.content {
  padding: 15px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.header-area {
  display: flex;
  justify-content: center;
  margin: 15px 0 25px;
}

.app-title {
  font-size: 28px;
  font-weight: bold;
  background: linear-gradient(to right, #ffffff, #a8d0ff);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-fill-color: transparent;
  text-shadow: 0 2px 10px rgba(255, 255, 255, 0.1);
  letter-spacing: 1px;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 12px;
}

.card {
  border-radius:.30px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.large-card {
  height: 140px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  position: relative;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.icon-wrapper {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-wrapper .el-icon {
  font-size: 20px;
  color: rgba(0, 0, 0, 0.7);
}

.arrow-right .el-icon {
  font-size: 20px;
  color: rgba(0, 0, 0, 0.7);
}

.card-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.card-title {
  font-size: 20px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.8);
}

.card-value {
  font-size: 48px;
  font-weight: 700;
  line-height: 1;
  margin-top: 5px;
  color: rgba(0, 0, 0, 0.8);
}

.card-subtitle {
  font-size: 16px;
  color: rgba(0, 0, 0, 0.8);
  margin-top: 2px;
}

.card-action {
  position: absolute;
  bottom: 15px;
  left: 15px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.card-action span {
  font-size: 14px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.8);
}

.card-action .el-icon {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.8);
}

.card-action:hover {
  background: rgba(0, 0, 0, 0.15);
}

.status-cards {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.status-card {
  height: 64px;
  padding: 0 15px;
}

.status-card .card-content {
  height: 100%;
  display: flex;
  align-items: center;
}

.status-card .text-wrapper {
  margin-left: 15px;
  flex: 1;
}

.status-card .title {
  font-size: 16px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.8);
}

.status-card .status {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.7);
  margin-top: 2px;
}

.status-card .status-icon {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.status-card .status-icon .el-icon {
  font-size: 18px;
  color: rgba(0, 0, 0, 0.7);
}

.bottom-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 10px;
}

.action-card {
  height: 70px;
  padding: 0 15px;
}

.action-card .card-content {
  height: 100%;
  display: flex;
  align-items: center;
}

.action-card .text-wrapper {
  margin-left: 15px;
  flex: 1;
}

.action-card .title {
  font-size: 20px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.8);
}

.action-card .arrow-icon .el-icon {
  font-size: 22px;
  color: rgba(0, 0, 0, 0.7);
}

.bottom-action {
  margin-top: auto;
}

.close-button {
  width: 100%;
  padding: 14px;
  border: none;
  border-radius: 30px;
  font-size: 16px;
  font-weight: 500;
  background: #c0ff41;
  color: rgba(0, 0, 0, 0.8);
  cursor: pointer;
  transition: all 0.3s ease;
}

.close-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(74, 144, 226, 0.4);
}

.close-button:active {
  transform: translateY(1px);
  box-shadow: 0 2px 10px rgba(74, 144, 226, 0.2);
}
</style> 