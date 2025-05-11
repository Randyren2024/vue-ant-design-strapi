<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import { Row, Col, Typography, Divider, Form, Input, Button, notification } from 'ant-design-vue';
import { 
  EnvironmentOutlined, 
  PhoneOutlined, 
  MailOutlined, 
  ClockCircleOutlined,
  WechatOutlined,
  WeiboOutlined,
  LinkedinOutlined
} from '@ant-design/icons-vue';
import NetlifyContactForm from '../components/NetlifyContactForm.vue';

const { t } = useI18n();
const formRef = ref();
const formState = reactive({
  name: '',
  email: '',
  phone: '',
  company: '',
  message: ''
});

// 表单验证规则
const rules = {
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入有效的邮箱地址', trigger: 'blur' }
  ],
  phone: [{ required: true, message: '请输入电话', trigger: 'blur' }],
  message: [{ required: true, message: '请输入留言内容', trigger: 'blur' }]
};

// 提交表单
const onSubmit = () => {
  formRef.value.validate().then(() => {
    // 这里可以添加表单提交的处理逻辑
    notification.success({
      message: '提交成功',
      description: '感谢您的留言，我们将尽快与您联系。'
    });
    // 重置表单
    formRef.value.resetFields();
  }).catch(error => {
    console.log('验证失败', error);
  });
};

// 公司信息
const companyInfo = {
  address: '北京市海淀区中关村创新大厦B座10层',
  tel: '+86 10-8888-7777',
  email: 'contact@hydrogentech.com',
  workTime: '周一至周五 09:00-18:00'
};

// 社交媒体
const socialMedia = [
  { name: '微信', icon: WechatOutlined, link: '#' },
  { name: '微博', icon: WeiboOutlined, link: '#' },
  { name: '领英', icon: LinkedinOutlined, link: '#' }
];
</script>

<template>
  <div class="contact">
    <div class="page-header">
      <h1>{{ t('contact.title') }}</h1>
    </div>
    
    <div class="container">
      <a-row :gutter="[48, 48]">
        <!-- 联系表单 -->
        <a-col :xs="24" :md="14">
          <a-typography-title level="2">留言咨询</a-typography-title>
          <NetlifyContactForm />
        </a-col>
        
        <!-- 联系信息 -->
        <a-col :xs="24" :md="10">
          <a-typography-title level="2">联系方式</a-typography-title>
          
          <div class="contact-info">
            <div class="info-item">
              <div class="info-icon">
                <EnvironmentOutlined />
              </div>
              <div class="info-content">
                <h3>{{ t('contact.address') }}</h3>
                <p>{{ companyInfo.address }}</p>
              </div>
            </div>
            
            <div class="info-item">
              <div class="info-icon">
                <PhoneOutlined />
              </div>
              <div class="info-content">
                <h3>{{ t('contact.tel') }}</h3>
                <p>{{ companyInfo.tel }}</p>
              </div>
            </div>
            
            <div class="info-item">
              <div class="info-icon">
                <MailOutlined />
              </div>
              <div class="info-content">
                <h3>Email</h3>
                <p>{{ companyInfo.email }}</p>
              </div>
            </div>
            
            <div class="info-item">
              <div class="info-icon">
                <ClockCircleOutlined />
              </div>
              <div class="info-content">
                <h3>工作时间</h3>
                <p>{{ companyInfo.workTime }}</p>
              </div>
            </div>
          </div>
          
          <!-- 社交媒体 -->
          <div class="social-media">
            <a-typography-title level="3">{{ t('contact.followUs') }}</a-typography-title>
            <div class="social-links">
              <a v-for="(social, index) in socialMedia" :key="index" :href="social.link" target="_blank" class="social-link">
                <component :is="social.icon" />
                <span>{{ social.name }}</span>
              </a>
            </div>
          </div>
        </a-col>
      </a-row>
      
      <!-- 地图 -->
      <div class="map-container">
        <a-typography-title level="2">公司位置</a-typography-title>
        <div class="map-placeholder">
          <!-- 实际项目中这里可以接入高德地图或百度地图API -->
          <img src="/images/factory/factory-1.jpg" alt="公司地图" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.contact {
  width: 100%;
}

.page-header {
  background-color: #f5f5f5;
  padding: 60px 5%;
  text-align: center;
  margin-bottom: 40px;
}

.page-header h1 {
  font-size: 2.5rem;
  margin: 0;
}

.container {
  padding: 0 5% 60px;
}

.contact-info {
  margin-top: 20px;
}

.info-item {
  display: flex;
  margin-bottom: 20px;
}

.info-icon {
  width: 40px;
  height: 40px;
  background-color: #1890ff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  margin-right: 15px;
}

.info-content h3 {
  margin: 0 0 5px;
  font-size: 16px;
}

.info-content p {
  margin: 0;
  color: #666;
}

.social-media {
  margin-top: 40px;
}

.social-links {
  display: flex;
  gap: 20px;
  margin-top: 15px;
}

.social-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #333;
  text-decoration: none;
  transition: all 0.3s;
}

.social-link:hover {
  color: #1890ff;
}

.social-link span {
  margin-top: 5px;
  font-size: 12px;
}

.map-container {
  margin-top: 60px;
}

.map-placeholder {
  height: 400px;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  overflow: hidden;
}

.map-placeholder img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (max-width: 768px) {
  .page-header {
    padding: 40px 5%;
  }
  
  .container {
    padding: 0 5% 40px;
  }
  
  .map-placeholder {
    height: 300px;
  }
}
</style> 