<template>
  <div class="status-card" :style="{ backgroundColor: color }" @click="$emit('click')">
    <div class="status-card-content">
      <!-- 左侧图标 -->
      <div class="status-card-icon-wrapper">
        <el-icon class="status-card-icon"><component :is="getIconComponent()" /></el-icon>
      </div>
      
      <!-- 中间内容 -->
      <div class="status-card-text-wrapper">
        <div class="status-card-title">{{ title }}</div>
        <div class="status-card-value">{{ status }}</div>
      </div>
      
      <!-- 右侧图标 -->
      <div v-if="icon === 'wallet'">
        <el-icon class="arrow-icon"><ArrowRight /></el-icon>
      </div>
      <div v-else>
        <el-icon class="user-icon"><User /></el-icon>
      </div>
    </div>
  </div>
</template>

<script setup>
import { User, Platform, Promotion, Wallet, ArrowRight } from '@element-plus/icons-vue';

const props = defineProps({
  title: String,
  status: String,
  color: String,
  icon: String,
});

defineEmits(['click']);

// 根据icon属性获取对应的图标组件
const getIconComponent = () => {
  switch (props.icon) {
    case 'user':
      return User;
    case 'server':
      return Platform;
    case 'wallet':
      return Wallet;
    default:
      return Promotion;
  }
};
</script>

<style scoped>
.status-card {
  padding: 15px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  color: black;
  margin-bottom: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  user-select: none;
}

.status-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
}

.status-card:active {
  transform: scale(0.98);
}

.status-card-content {
  display: flex;
  align-items: center;
}

.status-card-icon-wrapper {
  margin-right: 15px;
}

.status-card-icon {
  width: 40px;
  height: 40px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.status-card-icon .el-icon {
  font-size: 20px;
  color: rgba(255, 255, 255, 0.9);
}

.status-card-text-wrapper {
  flex: 1;
}

.status-card-title {
  margin: 0;
  font-size: 16px;
  font-weight: 500;
}

.status-card-value {
  margin: 5px 0 0;
  font-size: 18px;
  font-weight: bold;
}

.arrow-icon {
  font-size: 20px;
  color: rgba(255, 255, 255, 0.9);
}

.user-icon {
  font-size: 20px;
  color: rgba(255, 255, 255, 0.9);
}
</style>
  