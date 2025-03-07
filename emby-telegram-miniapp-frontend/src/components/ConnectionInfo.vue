<template>
  <div class="connection-info">
    <div class="panel-header">
      <h3>连接信息</h3>
      <el-button type="text" class="toggle-btn">
        <i class="el-icon-view"></i>
      </el-button>
    </div>
    
    <div class="connection-details">
      <div class="info-row">
        <i class="el-icon-cloudy"></i>
        <div class="connection-item">
          <span class="label">连接地址：</span>
          <span class="value">********************</span>
        </div>
      </div>
      <div class="info-row">
        <i class="el-icon-connection"></i>
        <div class="connection-item">
          <span class="label">连接端口：</span>
          <span class="value">***</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const visible = ref(true);

const toggleVisibility = () => {
  visible.value = !visible.value;
};
</script>

<style scoped>
.connection-info {
  background: #1a1a1a;
  padding: 15px;
  border-radius: 15px;
  color: white;
  margin-top: 15px;
  margin-bottom: 15px;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.panel-header h3 {
  margin: 0;
  font-weight: 500;
}

.toggle-btn {
  color: white;
  font-size: 18px;
}

.connection-details {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.info-row {
  display: flex;
  align-items: center;
}

.info-row i {
  font-size: 24px;
  margin-right: 15px;
  background: #333;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.connection-item {
  display: flex;
  flex-direction: column;
}

.label {
  color: #999;
  font-size: 14px;
}

.value {
  font-size: 16px;
  font-weight: 500;
}
</style>
  