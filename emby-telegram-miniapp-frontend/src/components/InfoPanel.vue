<template>
  <div class="info-panel">
    <!-- 账户信息部分 -->
    <div class="panel-header">
      <h3>账户信息</h3>
      <el-button type="text" class="toggle-btn" @click="toggleMainInfo">
        <el-icon><View v-if="mainInfoVisible" /><Hide v-else /></el-icon>
      </el-button>
    </div>
    
    <div class="account-info" v-if="mainInfoVisible">
      <div class="info-row">
        <div class="icon-circle">
          <el-icon><User /></el-icon>
        </div>
        <div class="account-item">
          <span class="label">用户名：</span>
          <span class="value">**********</span>
        </div>
      </div>
      <div class="info-row">
        <div class="icon-circle">
          <el-icon><Lock /></el-icon>
        </div>
        <div class="account-item">
          <span class="label">账户密码：</span>
          <span class="value">**********</span>
        </div>
      </div>
    </div>
    
    <!-- 子账户管理部分 -->
    <div class="panel-header sub-accounts-header">
      <h3>子账户管理</h3>
      <el-button type="text" class="toggle-btn" @click="toggleSubAccounts">
        <el-icon><View v-if="subAccountsVisible" /><Hide v-else /></el-icon>
      </el-button>
    </div>
    
    <div class="sub-accounts-container" v-if="subAccountsVisible">
      <!-- 子账户列表 -->
      <transition-group name="list" tag="div" class="accounts-list">
        <div class="sub-account-item" v-for="(account, index) in subAccounts" :key="index">
          <div class="account-details">
            <div class="account-avatar">
              <div class="avatar-circle" :style="{ backgroundColor: getAvatarColor(account.username) }">
                {{ account.username.charAt(0).toUpperCase() }}
              </div>
            </div>
            <div class="account-info-col">
              <div class="account-name">
                {{ account.username }}
              </div>
              <div class="account-expiry" :class="{'expiry-warning': isExpiryWarning(account.expireDate)}">
                到期时间：{{ account.expireDate }}
              </div>
            </div>
            <div class="account-badge" :class="{'badge-active': account.status === '可用', 'badge-inactive': account.status !== '可用'}">
              {{ account.status }}
            </div>
          </div>
          <div class="account-actions">
            <el-tooltip content="续费" placement="top" :hide-after="1000">
              <el-button type="success" circle @click="openRenewDialog(index)">
                <el-icon><Timer /></el-icon>
              </el-button>
            </el-tooltip>
            <el-tooltip content="修改密码" placement="top" :hide-after="1000">
              <el-button type="primary" circle @click="editPassword(index)">
                <el-icon><EditPen /></el-icon>
              </el-button>
            </el-tooltip>
            <el-tooltip content="删除账户" placement="top" :hide-after="1000">
              <el-button type="danger" circle @click="confirmDelete(index)">
                <el-icon><Delete /></el-icon>
              </el-button>
            </el-tooltip>
          </div>
        </div>
      </transition-group>
      
      <!-- 添加新子账户按钮 -->
      <el-button class="add-account-btn" type="success" @click="showAddDialog = true">
        <el-icon><Plus /></el-icon> 添加子账户
      </el-button>
    </div>
    
    <!-- 添加子账户弹窗 -->
    <el-dialog 
      v-model="showAddDialog" 
      title="添加子账户" 
      width="90%" 
      center
      destroy-on-close
      class="custom-dialog"
    >
      <el-form :model="newAccount" label-width="80px" :rules="accountRules" ref="addFormRef">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="newAccount.username" placeholder="输入用户名">
            <template #prefix>
              <el-icon><User /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="newAccount.password" type="password" placeholder="输入密码" show-password>
            <template #prefix>
              <el-icon><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="套餐类型" prop="planType">
          <el-select v-model="newAccount.planType" placeholder="选择套餐类型" style="width: 100%;" @change="updateExpireDate">
            <el-option
              v-for="item in planOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
              <div class="plan-option">
                <span>{{ item.label }}</span>
                <span class="plan-price">¥{{ item.price }}</span>
              </div>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="到期时间">
          <el-date-picker 
            v-model="newAccount.expireDate" 
            type="date" 
            placeholder="选择到期时间" 
            style="width: 100%;"
            value-format="YYYY-MM-DD"
            :disabled="true"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="showAddDialog = false">取消</el-button>
          <el-button type="primary" @click="addAccount">确认</el-button>
        </div>
      </template>
    </el-dialog>
    
    <!-- 续费弹窗 -->
    <el-dialog
      v-model="showRenewDialog"
      title="账户续费"
      width="90%"
      center
      destroy-on-close
      class="custom-dialog"
    >
      <div class="edit-user-info">
        <div class="avatar-large" :style="{ backgroundColor: currentEditAccount.avatarColor || '#4CAF50' }">
          {{ currentEditAccount.username ? currentEditAccount.username.charAt(0).toUpperCase() : '' }}
        </div>
        <div class="edit-username">{{ currentEditAccount.username }}</div>
        <div class="account-expiry">
          当前到期时间：{{ currentEditAccount.expireDate }}
        </div>
      </div>
      
      <div class="renew-options">
        <h4 class="renew-title">选择续费套餐</h4>
        <div class="plan-options">
          <div 
            v-for="plan in planOptions" 
            :key="plan.value"
            class="plan-option-card"
            :class="{ active: selectedPlan === plan.value }"
            @click="selectedPlan = plan.value"
          >
            <div class="plan-title">{{ plan.label }}</div>
            <div class="plan-duration">{{ plan.duration }}</div>
            <div class="plan-price-tag">¥ {{ plan.price }}</div>
            <div class="plan-discount" v-if="plan.discount">{{ plan.discount }}</div>
          </div>
        </div>
        
        <div class="payment-summary">
          <div class="summary-item">
            <span>续费套餐</span>
            <span>{{ getSelectedPlanName() }}</span>
          </div>
          <div class="summary-item">
            <span>续费价格</span>
            <span class="price">¥{{ getSelectedPlanPrice() }}</span>
          </div>
          <div class="summary-item">
            <span>新到期时间</span>
            <span class="new-expiry">{{ calculateNewExpiry() }}</span>
          </div>
        </div>
      </div>
      
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="showRenewDialog = false">取消</el-button>
          <el-button type="primary" @click="renewAccount">确认续费</el-button>
        </div>
      </template>
    </el-dialog>
    
    <!-- 修改密码弹窗 -->
    <el-dialog 
      v-model="showPasswordDialog" 
      title="修改密码" 
      width="90%" 
      center
      destroy-on-close
      class="custom-dialog"
    >
      <div class="edit-user-info">
        <div class="avatar-large" :style="{ backgroundColor: getAvatarColor(currentEditAccount.username) }">
          {{ currentEditAccount.username ? currentEditAccount.username.charAt(0).toUpperCase() : '' }}
        </div>
        <div class="edit-username">{{ currentEditAccount.username }}</div>
      </div>
      
      <el-form :model="passwordForm" label-width="80px" :rules="passwordRules" ref="pwdFormRef">
        <el-form-item label="新密码" prop="password">
          <el-input v-model="passwordForm.password" type="password" placeholder="输入新密码" show-password>
            <template #prefix>
              <el-icon><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input v-model="passwordForm.confirmPassword" type="password" placeholder="确认新密码" show-password>
            <template #prefix>
              <el-icon><Key /></el-icon>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="showPasswordDialog = false">取消</el-button>
          <el-button type="primary" @click="updatePassword">确认</el-button>
        </div>
      </template>
    </el-dialog>
    
    <!-- 删除确认弹窗 -->
    <el-dialog 
      v-model="showDeleteDialog" 
      title="确认删除" 
      width="90%"
      center
      class="custom-dialog delete-dialog"
    >
      <div class="delete-confirmation">
        <el-icon class="delete-icon"><WarningFilled /></el-icon>
        <p>确定要删除子账户 <span class="highlight-text">{{ currentEditAccount.username }}</span> 吗？</p>
        <p class="warning-text">此操作不可恢复！</p>
      </div>
      
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="showDeleteDialog = false">取消</el-button>
          <el-button type="danger" @click="deleteAccount">确认删除</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { View, Hide, User, Lock, EditPen, Delete, Plus, Key, WarningFilled, Timer } from '@element-plus/icons-vue';

// 套餐选项
const planOptions = [
  { value: 'month', label: '月卡', price: 20, duration: '1个月', discount: '' },
  { value: 'quarter', label: '季卡', price: 50, duration: '3个月', discount: '比月卡节省 ¥10' },
  { value: 'year', label: '年卡', price: 180, duration: '12个月', discount: '比月卡节省 ¥60' },
  { value: 'lifetime', label: '白名单', price: 365, duration: '永久有效', discount: '一次付费，永久使用' }
];

// 表单验证规则
const accountRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
  ],
  planType: [
    { required: true, message: '请选择套餐类型', trigger: 'change' }
  ]
};

const passwordRules = {
  password: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认新密码', trigger: 'blur' },
    { 
      validator: (rule, value, callback) => {
        if (value !== passwordForm.value.password) {
          callback(new Error('两次密码输入不一致'));
        } else {
          callback();
        }
      }, 
      trigger: 'blur'
    }
  ]
};

// 表单引用
const addFormRef = ref(null);
const pwdFormRef = ref(null);

// 可见性控制
const mainInfoVisible = ref(true);
const subAccountsVisible = ref(true);

const toggleMainInfo = () => {
  mainInfoVisible.value = !mainInfoVisible.value;
};

const toggleSubAccounts = () => {
  subAccountsVisible.value = !subAccountsVisible.value;
};

// 子账户列表数据
const subAccounts = ref([
  { username: 'user1', password: 'password1', status: '可用', expireDate: '2024-12-31' },
  { username: 'user2', password: 'password2', status: '已过期', expireDate: '2024-05-20' },
  { username: 'user3', password: 'password3', status: '可用', expireDate: '2025-01-15' }
]);

// 检查到期时间是否即将到期（30天内）
const isExpiryWarning = (expiryDate) => {
  if (!expiryDate) return false;
  
  const today = new Date();
  const expiry = new Date(expiryDate);
  const diffTime = expiry - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays > 0 && diffDays <= 30;
};

// 根据用户名生成头像颜色
const getAvatarColor = (username) => {
  const colors = ['#FF5722', '#9C27B0', '#3F51B5', '#009688', '#4CAF50', '#FFC107', '#795548'];
  let hash = 0;
  
  for (let i = 0; i < username.length; i++) {
    hash = username.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  hash = Math.abs(hash);
  return colors[hash % colors.length];
};

// 添加子账户
const showAddDialog = ref(false);
const newAccount = ref({
  username: '',
  password: '',
  planType: 'month',
  expireDate: '',
});

// 更新到期时间
const updateExpireDate = () => {
  const today = new Date();
  
  switch (newAccount.value.planType) {
    case 'month':
      today.setMonth(today.getMonth() + 1);
      break;
    case 'quarter':
      today.setMonth(today.getMonth() + 3);
      break;
    case 'year':
      today.setFullYear(today.getFullYear() + 1);
      break;
    case 'lifetime':
      today.setFullYear(today.getFullYear() + 99);
      break;
  }
  
  newAccount.value.expireDate = today.toISOString().split('T')[0];
};

const addAccount = () => {
  if (addFormRef.value) {
    addFormRef.value.validate((valid) => {
      if (valid) {
        // 如果到期日期未设置，则设置为一个月后
        if (!newAccount.value.expireDate) {
          updateExpireDate();
        }
        
        subAccounts.value.push({
          username: newAccount.value.username,
          password: newAccount.value.password,
          status: '可用',
          expireDate: newAccount.value.expireDate
        });
        
        showAddDialog.value = false;
        newAccount.value = { username: '', password: '', planType: 'month', expireDate: '' };
      }
    });
  }
};

// 续费功能
const showRenewDialog = ref(false);
const currentEditIndex = ref(-1);
const currentEditAccount = ref({});
const selectedPlan = ref('month');

const openRenewDialog = (index) => {
  currentEditIndex.value = index;
  currentEditAccount.value = {
    ...subAccounts.value[index],
    avatarColor: getAvatarColor(subAccounts.value[index].username)
  };
  selectedPlan.value = 'month';
  showRenewDialog.value = true;
};

const getSelectedPlanName = () => {
  const plan = planOptions.find(p => p.value === selectedPlan.value);
  return plan ? plan.label : '';
};

const getSelectedPlanPrice = () => {
  const plan = planOptions.find(p => p.value === selectedPlan.value);
  return plan ? plan.price : 0;
};

const calculateNewExpiry = () => {
  if (!currentEditAccount.value.expireDate) return '';
  
  // 计算新的到期时间
  const currentExpiry = new Date(currentEditAccount.value.expireDate);
  const today = new Date();
  
  // 如果已过期，从今天开始计算
  const startDate = currentExpiry < today ? today : currentExpiry;
  
  const newDate = new Date(startDate);
  
  switch (selectedPlan.value) {
    case 'month':
      newDate.setMonth(newDate.getMonth() + 1);
      break;
    case 'quarter':
      newDate.setMonth(newDate.getMonth() + 3);
      break;
    case 'year':
      newDate.setFullYear(newDate.getFullYear() + 1);
      break;
    case 'lifetime':
      newDate.setFullYear(newDate.getFullYear() + 99);
      break;
  }
  
  return newDate.toISOString().split('T')[0];
};

const renewAccount = () => {
  const newExpiryDate = calculateNewExpiry();
  subAccounts.value[currentEditIndex.value].expireDate = newExpiryDate;
  
  // 如果状态是已过期，变更为可用
  if (subAccounts.value[currentEditIndex.value].status === '已过期') {
    subAccounts.value[currentEditIndex.value].status = '可用';
  }
  
  showRenewDialog.value = false;
};

// 修改密码
const showPasswordDialog = ref(false);
const passwordForm = ref({
  password: '',
  confirmPassword: ''
});

const editPassword = (index) => {
  currentEditIndex.value = index;
  currentEditAccount.value = {...subAccounts.value[index]};
  passwordForm.value = { password: '', confirmPassword: '' };
  showPasswordDialog.value = true;
};

const updatePassword = () => {
  if (pwdFormRef.value) {
    pwdFormRef.value.validate((valid) => {
      if (valid) {
        subAccounts.value[currentEditIndex.value].password = passwordForm.value.password;
        showPasswordDialog.value = false;
      }
    });
  }
};

// 删除账户
const showDeleteDialog = ref(false);

const confirmDelete = (index) => {
  currentEditIndex.value = index;
  currentEditAccount.value = {...subAccounts.value[index]};
  showDeleteDialog.value = true;
};

const deleteAccount = () => {
  subAccounts.value.splice(currentEditIndex.value, 1);
  showDeleteDialog.value = false;
};
</script>

<style scoped>
/* 基础样式 */
.info-panel {
  background: #1a1a1a;
  padding: 15px;
  border-radius: 15px;
  color: white;
  margin-top: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.sub-accounts-header {
  margin-top: 20px;
  border-top: 1px solid #333;
  padding-top: 15px;
}

.panel-header h3 {
  margin: 0;
  font-weight: 500;
  font-size: 18px;
  display: flex;
  align-items: center;
}

.toggle-btn {
  color: white;
  font-size: 18px;
}

/* 账户信息样式 */
.account-info, .sub-accounts-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.info-row {
  display: flex;
  align-items: center;
  background: #2a2a2a;
  padding: 12px;
  border-radius: a10px;
  transition: all 0.3s ease;
}

.info-row:hover {
  background: #333;
}

.icon-circle {
  width: 40px;
  height: 40px;
  background: rgba(196, 144, 228, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  color: #c490e4;
}

.account-item {
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

/* 子账户列表样式 */
.accounts-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.sub-account-item {
  background: linear-gradient(to right, #2a2a2a, #333);
  border-radius: 12px;
  padding: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.sub-account-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: #c490e4;
  opacity: 0.7;
}

.sub-account-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.account-details {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.account-avatar {
  margin-right: 15px;
}

.avatar-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 18px;
  color: white;
}

.account-info-col {
  flex: 1;
}

.account-name {
  font-weight: 500;
  font-size: 16px;
  margin-bottom: 5px;
}

.account-expiry {
  font-size: 12px;
  color: #999;
}

.expiry-warning {
  color: #ff9800;
}

.account-badge {
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 12px;
  margin-left: 10px;
  font-weight: 500;
}

.badge-active {
  background: rgba(76, 175, 80, 0.2);
  color: #4CAF50;
}

.badge-inactive {
  background: rgba(244, 67, 54, 0.2);
  color: #F44336;
}

.account-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

/* 添加按钮样式 */
.add-account-btn {
  margin-top: 15px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  border-radius: 12px;
  height: 45px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.add-account-btn:hover {
  transform: translateY(-2px);
}

/* 弹窗样式 */
:deep(.custom-dialog) {
  border-radius: 15px;
  overflow: hidden;
}

:deep(.custom-dialog .el-dialog__header) {
  text-align: center;
  background: #212121;
  padding: 15px;
  margin: 0;
}

:deep(.custom-dialog .el-dialog__title) {
  color: white;
  font-weight: 500;
}

:deep(.custom-dialog .el-dialog__body) {
  padding: 20px;
  background: #303030;
  color: white;
}

:deep(.custom-dialog .el-dialog__footer) {
  padding: 15px;
  background: #212121;
  border-top: 1px solid #424242;
}

:deep(.custom-dialog .el-form-item__label) {
  color: #ccc;
}

:deep(.custom-dialog .el-input__inner) {
  background: #424242;
  border: none;
  color: white;
}

:deep(.custom-dialog .el-input__prefix) {
  color: #c490e4;
}

/* 套餐选择样式 */
.plan-option {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.plan-price {
  font-weight: bold;
  color: #c8ff00;
}

/* 续费弹窗样式 */
.renew-title {
  margin: 15px 0 10px;
  font-size: 16px;
  color: #ccc;
}

.plan-options {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-bottom: 20px;
}

.plan-option-card {
  background: #383838;
  border-radius: 10px;
  padding: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  position: relative;
  overflow: hidden;
}

.plan-option-card.active {
  border-color: #c8ff00;
  background: #404040;
}

.plan-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 5px;
}

.plan-duration {
  font-size: 14px;
  color: #aaa;
  margin-bottom: 15px;
}

.plan-price-tag {
  font-size: 20px;
  font-weight: bold;
  color: #c8ff00;
}

.plan-discount {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(255, 152, 0, 0.2);
  color: #ff9800;
  font-size: 12px;
  padding: 3px 6px;
  border-radius: 10px;
}

.payment-summary {
  background: #242424;
  border-radius: 10px;
  padding: 15px;
  margin-top: 20px;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #333;
}

.summary-item:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.price {
  font-weight: bold;
  color: #c8ff00;
  font-size: 18px;
}

.new-expiry {
  font-weight: 500;
  color: #4CAF50;
}

/* 修改密码弹窗特殊样式 */
.edit-user-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.avatar-large {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  font-weight: bold;
  color: white;
  margin-bottom: 10px;
}

.edit-username {
  font-size: 18px;
  font-weight: 500;
  color: #c490e4;
}

/* 删除确认弹窗特殊样式 */
.delete-confirmation {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
}

.delete-icon {
  font-size: 60px;
  color: #F44336;
  margin-bottom: 20px;
}

.highlight-text {
  color: #e91e63;
  font-weight: bold;
}

.warning-text {
  color: #ff9800;
  margin-top: 10px;
  font-size: 14px;
}

/* 过渡动画 */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>