<template>
  <div class="home">
    <NavBar />
    <div class="content">
      <!-- LOGO区域 -->
      <div class="logo-area">
        <div class="aurora-title">起点站</div>
      </div>
      
      <div class="grid">
        <!-- 左侧卡片区域 -->
        <div class="column">
          <!-- 签到卡片 -->
          <div class="card sign-in-card">
            <div class="card-header">
              <div class="icon-circle">
                <el-icon><Location /></el-icon>
              </div>
              <div class="arrow-icon">
                <el-icon><ArrowRight /></el-icon>
              </div>
            </div>
            <div class="card-body center-align">
              <div class="card-title">签到</div>
              <div class="large-value">68<span class="unit">灵石</span></div>
            </div>
          </div>

          <!-- 公益项目卡片 -->
          <div class="card charity-card" @click="goToCharity">
            <div class="card-header">
              <div class="icon-circle">
                <el-icon><Star /></el-icon>
              </div>
              <div class="arrow-icon">
                <el-icon><ArrowRight /></el-icon>
              </div>
            </div>
            <div class="card-body">
              <div class="charity-title">公益项目</div>
              <div class="charity-subtitle">参与公益，奉献爱心</div>
            </div>
          </div>
        </div>
        
        <!-- 右侧卡片区域 -->
        <div class="column">
          <!-- 账户余额卡片 -->
          <div class="card balance-card">
            <div class="card-header">
              <div class="card-title-area">
                <div class="card-title">账户余额</div>
                <div class="card-value">可用</div>
              </div>
              <div class="icon-circle large-circle">
                <el-icon><User /></el-icon>
              </div>
            </div>
            
            <div class="action-buttons">
              <div class="action-button" @click="openRechargeDialog">
                <el-icon><Plus /></el-icon>
                <span>余额充值</span>
              </div>
              <div class="action-button" @click="openPasswordDialog">
                <el-icon><Lock /></el-icon>
                <span>修改密码</span>
              </div>
            </div>
          </div>
          
          <!-- Emby状态卡片 -->
          <div class="card emby-card">
            <div class="card-header">
              <div class="card-title-area">
                <div class="card-title">Emby状态</div>
                <div class="card-value">可用</div>
              </div>
              <div class="icon-circle large-circle">
                <el-icon><Platform /></el-icon>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 第二行 - 小卡片 -->
      <div class="small-cards">
        <Card 
          title="探针" 
          color="#80deea"
          icon="database" 
        />
        <Card 
          title="求片" 
          color="#fff59d"
          icon="search" 
        />
      </div>
      
      <!-- 账户信息板块 -->
      <InfoPanel />
      
      <!-- 连接信息 -->
      <ConnectionInfo />
      
      <!-- 底部关闭按钮 -->
      <div class="bottom-actions">
        <button class="close-btn" @click="closeMiniApp">
          <span class="btn-text">关闭面板</span>
        </button>
      </div>
    </div>

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
        <div class="avatar-large" style="background-color: #a4dd00">
          <el-icon><Lock /></el-icon>
        </div>
        <div class="edit-username">主账户密码修改</div>
      </div>
      
      <el-form :model="passwordForm" label-width="80px" :rules="passwordRules" ref="pwdFormRef">
        <el-form-item label="原密码" prop="oldPassword">
          <el-input v-model="passwordForm.oldPassword" type="password" placeholder="输入原密码" show-password>
            <template #prefix>
              <el-icon><Key /></el-icon>
            </template>
          </el-input>
        </el-form-item>
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
    
    <!-- 余额充值弹窗 -->
    <el-dialog
      v-model="showRechargeDialog"
      title="账户充值"
      width="90%"
      center
      destroy-on-close
      class="custom-dialog recharge-dialog"
    >
      <div class="edit-user-info">
        <div class="avatar-large" style="background-color: #c490e4">
          <el-icon><Wallet /></el-icon>
        </div>
        <div class="current-balance">当前余额：<span class="balance-value">¥ 50.00</span></div>
      </div>
      
      <div class="recharge-options">
        <h4 class="recharge-title">选择充值金额</h4>
        <div class="recharge-amounts">
          <div 
            v-for="amount in rechargeAmounts" 
            :key="amount.value"
            class="amount-option"
            :class="{ active: selectedAmount === amount.value }"
            @click="selectedAmount = amount.value"
          >
            <div class="amount-value">¥ {{ amount.value }}</div>
            <div class="amount-bonus" v-if="amount.bonus">送 {{ amount.bonus }}</div>
          </div>
        </div>
        
        <h4 class="recharge-title">选择支付方式</h4>
        <div class="payment-methods">
          <div 
            v-for="method in paymentMethods" 
            :key="method.id"
            class="payment-method"
            :class="{ active: selectedPayment === method.id }"
            @click="selectedPayment = method.id"
          >
            <el-icon><component :is="method.icon" /></el-icon>
            <span>{{ method.name }}</span>
          </div>
        </div>
      </div>
      
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="showRechargeDialog = false">取消</el-button>
          <el-button type="primary" @click="processRecharge">确认充值</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import NavBar from '@/components/NavBar.vue';
import Card from '@/components/Card.vue';
import StatusCard from '@/components/StatusCard.vue';
import InfoPanel from '@/components/InfoPanel.vue';
import ConnectionInfo from '@/components/ConnectionInfo.vue';
import { useRouter } from 'vue-router';
import { EditPen, ArrowRight, Lock, Key, Wallet, Plus, CreditCard, Money, Star, Location, User, Platform } from '@element-plus/icons-vue';

const router = useRouter();

// 确保组件正确初始化
onMounted(() => {
  console.log('Home view mounted');
});

// 关闭迷你应用
const closeMiniApp = () => {
  if (window.Telegram && window.Telegram.WebApp) {
    window.Telegram.WebApp.close();
  }
};

// 修改密码功能
const showPasswordDialog = ref(false);
const pwdFormRef = ref(null);

const passwordForm = ref({
  oldPassword: '',
  password: '',
  confirmPassword: ''
});

const passwordRules = {
  oldPassword: [
    { required: true, message: '请输入原密码', trigger: 'blur' }
  ],
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

const openPasswordDialog = () => {
  showPasswordDialog.value = true;
  passwordForm.value = { oldPassword: '', password: '', confirmPassword: '' };
};

const updatePassword = () => {
  if (pwdFormRef.value) {
    pwdFormRef.value.validate((valid) => {
      if (valid) {
        // 实际项目中这里会调用API修改密码
        console.log('密码已修改');
        showPasswordDialog.value = false;
      }
    });
  }
};

// 充值功能
const showRechargeDialog = ref(false);
const selectedAmount = ref(50);
const selectedPayment = ref('alipay');

const rechargeAmounts = [
  { value: 10, bonus: '' },
  { value: 50, bonus: '' },
  { value: 100, bonus: '10元' },
  { value: 200, bonus: '30元' },
  { value: 500, bonus: '100元' },
  { value: 1000, bonus: '300元' }
];

const paymentMethods = [
  { id: 'alipay', name: '支付宝', icon: 'CreditCard' },
  { id: 'wechat', name: '微信支付', icon: 'Money' }
];

const openRechargeDialog = () => {
  showRechargeDialog.value = true;
  selectedAmount.value = 50;
  selectedPayment.value = 'alipay';
};

const processRecharge = () => {
  console.log(`充值金额: ${selectedAmount.value}元, 支付方式: ${selectedPayment.value}`);
  showRechargeDialog.value = false;
  // 实际项目中这里会调用支付API
};

// 跳转到公益项目页面
const goToCharity = () => {
  console.log('跳转到公益项目页面');
  // 实际项目中这里会跳转到对应页面
  // router.push('/charity');
};
</script>

<style scoped>
.home {
  background: #192841;
  color: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;
  background-image: linear-gradient(to bottom, rgba(25, 40, 65, 0.9), rgba(18, 30, 50, 0.95));
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}

.content {
  padding: 15px 0;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.logo-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 15px 0 25px;
}

.aurora-title {
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
  gap: 15px;
  margin: 0 15px;
  margin-bottom: 15px;
}

.column {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

/* 卡片通用样式 */
.card {
  border-radius: 20px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
}

.icon-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.large-circle {
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.2);
}

.icon-circle .el-icon {
  font-size: 22px;
  color: rgba(0, 0, 0, 0.7);
}

.arrow-icon {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.arrow-icon .el-icon {
  font-size: 22px;
  color: rgba(0, 0, 0, 0.6);
}

.card-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
}

.center-align {
  align-items: center;
  justify-content: center;
}

.card-title {
  font-size: 22px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.8);
}

.card-value {
  font-size: 18px;
  color: rgba(0, 0, 0, 0.6);
  margin-top: 4px;
}

.card-desc {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.6);
  margin-top: 5px;
}

/* 签到卡片 */
.sign-in-card {
  background-color: #b8e986;
  height: 160px;
}

.large-value {
  font-size: 48px;
  font-weight: 700;
  line-height: 1;
  margin-top: 10px;
  color: rgba(0, 0, 0, 0.8);
}

.unit {
  font-size: 16px;
  font-weight: normal;
  margin-left: 4px;
}

/* 公益项目卡片 */
.charity-card {
  background-color: #ffd54f;
  cursor: pointer;
  transition: all 0.3s ease;
  height: 100px;
}

.charity-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
}

.charity-card .card-body {
  margin-top: 0;
  justify-content: center;
}

.charity-title {
  font-size: 22px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.8);
}

.charity-subtitle {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.6);
  margin-top: 5px;
}

/* 账户余额卡片 */
.balance-card {
  background-color: #dcb0ff;
  height: 160px;
  position: relative;
}

.card-title-area {
  display: flex;
  flex-direction: column;
}

/* 按钮区域 */
.action-buttons {
  display: flex;
  position: absolute;
  bottom: 15px;
  left: 15px;
  right: 15px;
  gap: 10px;
}

.action-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 10px 12px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 1;
}

.action-button .el-icon {
  font-size: 16px;
  color: rgba(0, 0, 0, 0.8);
}

.action-button span {
  font-size: 14px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.8);
}

.action-button:hover {
  background: rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

/* Emby卡片 */
.emby-card {
  background-color: #ffb6c1;
  height: 100px;
}

/* 小卡片样式 */
.small-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin: 0 15px;
  margin-bottom: 15px;
}

.small-cards :deep(.card:first-child) {
  background: #80deea; /* 蓝绿色 */
}

.small-cards :deep(.card:last-child) {
  background: #fff59d; /* 黄色 */
}

.small-cards :deep(.card) {
  height: 70px;
  border-radius: 30px;
  display: flex;
  align-items: center;
}

.small-cards :deep(.card-content) {
  display: flex;
  align-items: center;
  width: 100%;
}

.small-cards :deep(.card-title) {
  font-size: 22px;
  font-weight: 600;
}

.small-cards :deep(.card-icon-wrapper) {
  width: 40px;
  height: 40px;
}

.small-cards :deep(.arrow-icon) {
  margin-left: auto;
}

/* 底部按钮 */
.bottom-actions {
  margin-top: auto;
  padding: 0 15px 10px;
}

.close-btn {
  width: 100%;
  padding: 14px;
  border: none;
  border-radius: 30px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  background: #c0ff41; /* 亮绿色 */
  color: rgba(0, 0, 0, 0.8);
  box-shadow: none;
  transition: all 0.3s ease;
}

.close-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(74, 144, 226, 0.4);
}

.close-btn:active {
  transform: translateY(1px);
  box-shadow: 0 2px 10px rgba(74, 144, 226, 0.2);
}

.btn-text {
  position: relative;
  z-index: 1;
  color: rgba(0, 0, 0, 0.8);
  font-weight: 500;
}

/* 弹窗样式 */
:deep(.custom-dialog) {
  border-radius: 15px;
  overflow: hidden;
}

:deep(.custom-dialog .el-dialog__header) {
  text-align: center;
  background: #1a2b45;
  padding: 15px;
  margin: 0;
}

:deep(.custom-dialog .el-dialog__title) {
  color: white;
  font-weight: 500;
}

:deep(.custom-dialog .el-dialog__body) {
  padding: 20px;
  background: #253854;
  color: white;
}

:deep(.custom-dialog .el-dialog__footer) {
  padding: 15px;
  background: #1a2b45;
  border-top: 1px solid #345280;
}

:deep(.custom-dialog .el-form-item__label) {
  color: #a8d0ff;
}

:deep(.custom-dialog .el-input__inner) {
  background: #345280;
  border: none;
  color: white;
}

:deep(.custom-dialog .el-input__prefix) {
  color: #4a90e2;
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
  color: white;
  margin-bottom: 10px;
  background-color: #4a90e2 !important;
}

.avatar-large .el-icon {
  font-size: 32px;
}

.edit-username, .current-balance {
  font-size: 18px;
  font-weight: 500;
  color: #a8d0ff;
}

.balance-value {
  font-size: 22px;
  font-weight: 600;
  color: #50b7f5;
}

/* 充值弹窗样式 */
.recharge-title {
  margin: 20px 0 10px;
  font-size: 16px;
  font-weight: 500;
  color: #a8d0ff;
}

.recharge-amounts {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 15px;
}

.amount-option {
  background: #345280;
  border-radius: 10px;
  padding: 12px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  border: 2px solid transparent;
}

.amount-option.active {
  border-color: #50b7f5;
  background: #3a5c90;
}

.amount-value {
  font-size: 18px;
  font-weight: 600;
}

.amount-bonus {
  font-size: 12px;
  color: #73b5fa;
  margin-top: 5px;
}

.payment-methods {
  display: flex;
  gap: 15px;
  margin-top: 15px;
}

.payment-method {
  background: #345280;
  border-radius: 10px;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.payment-method.active {
  border-color: #50b7f5;
  background: #3a5c90;
}

.payment-method .el-icon {
  font-size: 18px;
  color: #4a90e2;
}

:deep(.user-icon) {
  font-size: 20px;
  color: rgba(0, 0, 0, 0.6);
  background: rgba(0, 0, 0, 0.08);
  border-radius: 50%;
  padding: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
  