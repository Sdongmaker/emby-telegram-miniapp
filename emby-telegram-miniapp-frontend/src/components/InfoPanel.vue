<template>
  <div class="info-panel">
    <h3>子账户管理</h3>

    <!-- 子账户列表 -->
    <div class="sub-accounts">
      <div v-for="(account, index) in subAccounts" :key="index" class="account-card">
        <div class="account-info">
          <p><strong>用户名:</strong> {{ account.username }}</p>
          <p><strong>密码:</strong> {{ account.password }}</p>
          <p><strong>到期时间:</strong> {{ account.expiry }}</p>
          <p><strong>状态:</strong> <el-tag :type="account.status === '可用' ? 'success' : 'danger'">{{ account.status }}</el-tag></p>
        </div>
        <div class="account-actions">
          <el-button size="small" type="primary" @click="editAccount(account)">编辑</el-button>
          <el-button size="small" type="danger" @click="removeAccount(index)">删除</el-button>
        </div>
      </div>
    </div>

    <!-- 操作按钮 -->
    <div class="actions">
      <el-button type="primary" @click="renewAccounts">续费</el-button>
      <el-button type="success" @click="showAddDialog = true">新增子账户</el-button>
    </div>

    <!-- 添加子账户弹窗 -->
    <el-dialog title="添加子账户" v-model="showAddDialog">
      <el-form :model="newAccount" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="newAccount.username" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="newAccount.password" type="password" />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="newAccount.status">
            <el-option label="可用" value="可用"></el-option>
            <el-option label="禁用" value="禁用"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="到期时间">
          <el-date-picker v-model="newAccount.expiry" type="date" placeholder="选择日期" />
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="showAddDialog = false">取消</el-button>
        <el-button type="primary" @click="addNewAccount">添加</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 子账户列表
const subAccounts = ref([
  { username: 'user1', password: 'password1', expiry: '2025-12-31', status: '可用' },
  { username: 'user2', password: 'password2', expiry: '2025-06-30', status: '禁用' }
]);

// 控制弹窗
const showAddDialog = ref(false);

// 新增子账户对象
const newAccount = ref({
  username: '',
  password: '',
  status: '可用',
  expiry: ''
});

// 添加新账户
const addNewAccount = () => {
  if (!newAccount.value.username || !newAccount.value.password || !newAccount.value.expiry) return;
  subAccounts.value.push({ ...newAccount.value });
  showAddDialog.value = false;
  newAccount.value = { username: '', password: '', status: '可用', expiry: '' };
};

// 删除账户
const removeAccount = (index) => {
  subAccounts.value.splice(index, 1);
};

// 编辑账户（后续可扩展）
const editAccount = (account) => {
  console.log('编辑子账户:', account);
};

// 续费账户（后续可扩展）
const renewAccounts = () => {
  console.log('续费所有子账户');
};
</script>

<style scoped>
.info-panel {
  background: #1a1a1a;
  padding: 20px;
  border-radius: 8px;
  color: white;
  margin-top: 10px;
}

.sub-accounts {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.account-card {
  background: #2a2a2a;
  padding: 15px;
  border-radius: 8px;
  box-sizing: border-box;
}

.account-info p {
  margin: 5px 0;
}

.account-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.el-dialog .el-form-item {
  margin-bottom: 15px;
}
</style>