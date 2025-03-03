<!-- <template>
  <div>
    <h1>欢迎使用Emby用户管理MiniApp</h1>
    <p>Telegram WebApp状态：{{ telegramStatus }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const telegramStatus = ref('未初始化');

onMounted(() => {
  if (window.Telegram && window.Telegram.WebApp) {
    window.Telegram.WebApp.ready();
    telegramStatus.value = 'Telegram WebApp 已准备就绪';
  } else {
    telegramStatus.value = 'Telegram WebApp 未加载成功';
  }
});
</script> -->


<template>
  <router-view></router-view>
</template>
<script>
import { ElButton } from 'element-plus'
export default {
  components: { ElButton },
}
</script>