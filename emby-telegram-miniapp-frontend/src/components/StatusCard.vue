<template>
    <div class="status-card" :style="{ backgroundColor: color }">
      <div class="status-content">
        <i :class="icon"></i>
        <h3>{{ title }}</h3>
        <p>{{ status }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    title: String,
    status: String,
    color: String,
    icon: String,
  });
  </script>
  
  <style scoped>
  .status-card {
    padding: 15px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: black;
  }
  .status-content {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .status-content i {
    font-size: 24px;
  }
  </style>
  