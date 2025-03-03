<template>
  <div
    class="card"
    :class="{ selected: isSelected }"
    :style="{ backgroundColor: color }"
    @click="toggleSelect"
  >
    <!-- 左上角图标 -->
    <div class="icon-wrapper">
      <i :class="icon"></i>
    </div>

    <!-- 右上角跳转 -->
    <router-link v-if="topRightLink" :to="topRightLink" class="top-right">
      {{ topRightText }}
      <i class="icon-arrow"></i>
    </router-link>

    <!-- 主要内容 -->
    <div class="content">
      <h3>{{ title }}</h3>
      <p v-if="value">{{ value }}</p>
    </div>

    <!-- 左下角操作按钮 -->
    <router-link v-if="bottomLeftLink" :to="bottomLeftLink" class="bottom-left">
      {{ bottomLeftText }}
      <i class="icon-arrow"></i>
    </router-link>
  </div>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  title: String,           // 标题
  value: String,           // 主要数值（可选）
  color: String,           // 背景颜色
  icon: String,            // 左上角图标
  topRightText: String,    // 右上角文字
  topRightLink: String,    // 右上角跳转链接
  bottomLeftText: String,  // 左下角文字
  bottomLeftLink: String,  // 左下角跳转链接
});

// 控制选中状态
const isSelected = ref(false);

const toggleSelect = () => {
  isSelected.value = !isSelected.value;
};
</script>

<style scoped>
.card {
  position: relative;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: black;
  min-width: 150px;
  min-height: 150px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1); /* 加一个默认的阴影 */
}

/* 悬停时放大 & 增加阴影 */
.card:hover {
  transform: scale(1.05);
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
}

/* 选中状态 */
.selected {
  border: 3px solid #007bff;
  background-color: #d0e7ff !important;
  transform: scale(1.08);
}

/* 左上角图标 */
.icon-wrapper {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 36px;
  height: 36px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  transition: all 0.3s ease;
}

/* 悬浮图标效果 */
.icon-wrapper:hover {
  background: rgba(0, 0, 0, 0.2);
  transform: scale(1.1);
}

/* 右上角跳转 */
.top-right {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 14px;
  text-decoration: none;
  color: #007bff;
  font-weight: 500;
  transition: color 0.3s ease;
}

.top-right:hover {
  color: #0056b3;
}

/* 左下角按钮 */
.bottom-left {
  position: absolute;
  bottom: 10px;
  left: 10px;
  font-size: 14px;
  text-decoration: none;
  color: #007bff;
  font-weight: 500;
  transition: color 0.3s ease;
}

.bottom-left:hover {
  color: #0056b3;
}

/* 箭头图标 */
.icon-arrow {
  margin-left: 5px;
  font-size: 12px;
}
</style>
