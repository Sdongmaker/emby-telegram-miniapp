<template>
  <div
    class="card"
    :style="{ backgroundColor: color }"
    @click="navigate"
  >
    <div class="card-content">
      <!-- 左侧图标 -->
      <div class="card-icon-wrapper">
        <el-icon class="card-icon"><component :is="getIconComponent()" /></el-icon>
      </div>
      
      <!-- 中间内容 -->
      <div class="card-text-wrapper">
        <div class="card-title">{{ title }}</div>
        <div v-if="value" class="card-value">{{ value }} <span v-if="bottomLeftText" class="card-bottom-text">{{ bottomLeftText }}</span></div>
      </div>
      
      <!-- 右侧箭头 -->
      <el-icon class="arrow-icon"><ArrowRight /></el-icon>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Location, User, Platform, DataAnalysis, Search, ArrowRight, Edit } from '@element-plus/icons-vue';

const props = defineProps({
  title: String,           // 标题
  value: String,           // 主要数值（可选）
  color: String,           // 背景颜色
  icon: String,            // 图标名称
  link: String,            // 跳转链接（可选）
  bottomLeftText: String,  // 底部左侧文本（例如"灵石"）
});

const router = useRouter();

// 导航到目标页面
const navigate = () => {
  if (props.link) {
    router.push(props.link);
  }
};

// 根据icon属性获取对应的图标组件
const getIconComponent = () => {
  switch (props.icon) {
    case 'location':
      return Location;
    case 'user':
      return User;
    case 'server':
      return Platform;
    case 'database':
      return DataAnalysis;
    case 'search':
      return Search;
    case 'edit':
      return Edit;
    default:
      return Location;
  }
};
</script>

<style scoped>
.card {
  position: relative;
  border-radius: 15px;
  display: flex;
  align-items: center;
  color: black;
  min-height: 80px;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
  margin-bottom: 10px;
  padding: 15px;
  user-select: none;
}

.card:active {
  transform: scale(0.98);
  opacity: 0.9;
}

.card-content {
  flex: 1;
  display: flex;
  align-items: center;
}

.card-icon-wrapper {
  margin-right: 15px;
}

.card-icon {
  width: 40px;
  height: 40px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.card-icon i, .card-icon .el-icon {
  font-size: 20px;
  color: rgba(255, 255, 255, 0.9);
}

.card-text-wrapper {
  flex: 1;
}

.card-title {
  margin: 0;
  font-size: 18px;
  font-weight: 500;
}

.card-value {
  margin: 5px 0 0;
  font-size: 28px;
  font-weight: bold;
  display: flex;
  align-items: baseline;
}

.card-bottom-text {
  font-size: 14px;
  margin-left: 5px;
  opacity: 0.7;
  font-weight: normal;
}

.arrow-icon {
  margin-left: 10px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.arrow-icon .el-icon {
  font-size: 20px;
  opacity: 0.7;
}

/* 卡片底部动作链接 */
.bottom-action {
  position: absolute;
  bottom: 10px;
  left: 55px;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  opacity: 0.8;
  transition: all 0.3s ease;
}

.bottom-action:hover {
  opacity: 1;
}

.bottom-action .el-icon {
  font-size: 14px;
}

/* 不同颜色的卡片 */
.green {
  background-color: #a4dd00;
}

.purple {
  background-color: #c490e4;
}

.pink {
  background-color: #ffb6c1;
}

.cyan {
  background-color: #8ee5ee;
}

.yellow {
  background-color: #f8e45c;
}
</style>
