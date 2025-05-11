<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { Row, Col, Typography, Divider, Card, Tabs } from 'ant-design-vue';

const { t } = useI18n();
const activeKey = ref('company');

// 发展历程数据 - 使用computed动态获取翻译
const historyData = computed(() => [
  { year: '2018', event: t('about.history_data.2018') },
  { year: '2019', event: t('about.history_data.2019') },
  { year: '2020', event: t('about.history_data.2020') },
  { year: '2021', event: t('about.history_data.2021') },
  { year: '2022', event: t('about.history_data.2022') },
  { year: '2023', event: t('about.history_data.2023') },
  { year: '2024', event: t('about.history_data.2024') }
]);

// 工厂图片 - 使用computed动态获取翻译
const factoryImages = computed(() => [
  { src: '/images/factory/factory-1.jpg', title: t('about.factory_images.factory1') },
  { src: '/images/assembly/assembly-1.jpg', title: t('about.factory_images.assembly1') }
]);

// 合作伙伴 - 使用computed动态获取翻译
const partners = computed(() => [
  { name: t('about.partners_data.cas'), logo: '/images/partners/cas.svg' },
  { name: t('about.partners_data.tsinghua'), logo: '/images/partners/tsinghua.svg' },
  { name: t('about.partners_data.sinopec'), logo: '/images/partners/sinopec.svg' },
  { name: t('about.partners_data.sgcc'), logo: '/images/partners/sgcc.svg' }
]);
</script>

<template>
  <div class="about">
    <div class="page-header">
      <h1>{{ t('about.title') }}</h1>
    </div>
    
    <div class="container">
      <!-- 选项卡 -->
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="company" :tab="t('about.company')">
          <div class="company-profile">
            <a-row :gutter="[24, 24]">
              <a-col :xs="24" :md="12">
                <a-typography-title level="2">{{ t('common.companyName') }}</a-typography-title>
                <a-typography-paragraph>
                  {{ t('about.company_intro.p1') }}
                </a-typography-paragraph>
                <a-typography-paragraph>
                  {{ t('about.company_intro.p2') }}
                </a-typography-paragraph>
                <a-typography-paragraph>
                  {{ t('about.company_intro.p3') }}
                </a-typography-paragraph>
              </a-col>
              <a-col :xs="24" :md="12">
                <img src="/images/factory/factory-1.jpg" :alt="t('about.company_image_alt')" class="company-image" />
              </a-col>
            </a-row>
          </div>
        </a-tab-pane>
        
        <a-tab-pane key="history" :tab="t('about.history')">
          <a-timeline>
            <a-timeline-item v-for="(item, index) in historyData" :key="index">
              <template #dot>
                <div class="timeline-year">{{ item.year }}</div>
              </template>
              <div class="timeline-content">
                <a-typography-paragraph>{{ item.event }}</a-typography-paragraph>
              </div>
            </a-timeline-item>
          </a-timeline>
        </a-tab-pane>
        
        <a-tab-pane key="factory" :tab="t('about.factory')">
          <a-row :gutter="[24, 24]">
            <a-col :xs="24" :sm="12" v-for="(image, index) in factoryImages" :key="index">
              <a-card>
                <template #cover>
                  <img :src="image.src" :alt="image.title" />
                </template>
                <a-card-meta :title="image.title" />
              </a-card>
            </a-col>
          </a-row>
        </a-tab-pane>
        
        <a-tab-pane key="partners" :tab="t('about.partners')">
          <a-typography-title level="3" class="partners-title">{{ t('about.strategic_partners') }}</a-typography-title>
          <div class="partners-description">
            <a-typography-paragraph>
              {{ t('about.partners_description') }}
            </a-typography-paragraph>
          </div>
          <a-row :gutter="[32, 32]" class="partners-list">
            <a-col :xs="12" :sm="6" v-for="(partner, index) in partners" :key="index">
              <div class="partner-item">
                <div class="partner-logo-container">
                  <img :src="partner.logo" :alt="partner.name" class="partner-logo" />
                </div>
                <div class="partner-name">{{ partner.name }}</div>
              </div>
            </a-col>
          </a-row>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<style scoped>
.about {
  width: 100%;
}

.page-header {
  background-color: #f5f5f5;
  padding: 60px 10%;
  text-align: center;
  margin-bottom: 40px;
}

.page-header h1 {
  font-size: 2.5rem;
  margin: 0;
}

.container {
  padding: 0 10% 60px;
}

.company-image {
  width: 100%;
  border-radius: 8px;
}

.timeline-year {
  padding: 4px 8px;
  border-radius: 4px;
  background-color: #1890ff;
  color: white;
  font-weight: bold;
}

.timeline-content {
  padding: 10px 0;
}

.partners-title {
  margin-bottom: 20px;
  text-align: center;
}

.partners-description {
  max-width: 800px;
  margin: 0 auto 40px;
  text-align: center;
}

.partners-list {
  margin-top: 30px;
}

.partner-item {
  text-align: center;
  padding: 24px;
  border: 1px solid #eee;
  border-radius: 8px;
  transition: all 0.3s;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.partner-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  border-color: #1890ff;
}

.partner-logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  width: 100%;
  margin-bottom: 20px;
}

.partner-logo {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.partner-name {
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin-top: auto;
}

@media (max-width: 768px) {
  .page-header {
    padding: 40px 5%;
  }
  
  .container {
    padding: 0 5% 40px;
  }
}
</style> 