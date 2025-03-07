<template>
  <div class="navbar">
    <div class="left-section">
      <button class="close-btn">
        <el-icon><Back /></el-icon>
        <span>关闭</span>
      </button>
    </div>
    <div class="center-section">
      <h2 class="app-title">起点站</h2>
      <p class="subtitle">小程序</p>
    </div>
    <div class="right-section">
      <el-dropdown trigger="click">
        <el-button class="menu-btn" type="text">
          <el-icon><More /></el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <el-icon><Refresh /></el-icon>刷新
            </el-dropdown-item>
            <el-dropdown-item>
              <el-icon><Setting /></el-icon>设置
            </el-dropdown-item>
            <el-dropdown-item>
              <el-icon><QuestionFilled /></el-icon>帮助
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { Back, More, Refresh, Setting, QuestionFilled } from '@element-plus/icons-vue';
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 12px;
  background: linear-gradient(to right, #121212, #1e1e1e);
  color: white;
  position: relative;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.center-section {
  text-align: center;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.app-title {
  margin: 0;
  font-size: 1.3rem;
  background: linear-gradient(to right, #fff, #bbb);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-fill-color: transparent;
  font-weight: 600;
}

.subtitle {
  font-size: 0.7rem;
  margin: 3px 0 0;
  color: #cccccc;
  opacity: 0.8;
}

.close-btn {
  border: none;
  background: none;
  color: white;
  cursor: pointer;
  padding: 5px 8px;
  font-size: 15px;
  display: flex;
  align-items: center;
  gap: 5px;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.menu-btn {
  font-size: 20px;
  color: white;
  padding: 5px;
  border-radius: 50%;
  height: 32px;
  width: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.menu-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

/* 下拉菜单样式 */
:deep(.el-dropdown-menu) {
  background: #232323;
  border: none;
  padding: 5px 0;
}

:deep(.el-dropdown-menu__item) {
  color: white;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 20px;
}

:deep(.el-dropdown-menu__item:hover) {
  background: #333;
}

:deep(.el-dropdown-menu__item .el-icon) {
  color: #c8ff00;
}
</style>