<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { Card, Button, Row, Col, Typography, Divider, Tabs } from 'ant-design-vue';
import { useRouter } from 'vue-router';

const { t } = useI18n();
const router = useRouter();
const activeKey = ref('all');

// 场景数据
const allScenarios = [
  {
    id: 'inspection',
    name: '巡检应用',
    category: 'inspection',
    image: '/images/scenarios/inspection.jpg',
    description: '无人机光伏板巡检，可快速检测缺陷，提高巡检效率，降低人力成本。',
    products: ['qingluan-h25']
  },
  {
    id: 'pv-cleaning',
    name: '光伏板清洗',
    category: 'cleaning',
    image: '/images/scenarios/cleaning.jpg',
    description: '无人机自动化清洗光伏板，效率高，成本低，适合大型光伏电站。',
    products: ['qingtian-h100']
  },
  {
    id: 'emergency',
    name: '应急救援',
    category: 'emergency',
    image: '/images/scenarios/emergency.jpg',
    description: '无人机应急救援，可快速投送急救物资，尤其适合恶劣环境。',
    products: ['qingtian-h100']
  },
  {
    id: 'logistics',
    name: '物流运输',
    category: 'logistics',
    image: '/images/scenarios/logistics.jpg',
    description: '无人机物流配送，可快速送达偏远地区，解决最后一公里问题。',
    products: ['qingtian-h100']
  }
];

// 场景分类
const categories = [
  { key: 'all', label: t('scenarios.filter.all') },
  { key: 'inspection', label: t('scenarios.filter.inspection') },
  { key: 'cleaning', label: t('scenarios.filter.cleaning') },
  { key: 'emergency', label: t('scenarios.filter.emergency') },
  { key: 'logistics', label: t('scenarios.filter.logistics') }
];

// 根据分类筛选场景
const filteredScenarios = computed(() => {
  if (activeKey.value === 'all') {
    return allScenarios;
  }
  return allScenarios.filter(scenario => scenario.category === activeKey.value);
});

// 切换分类
const changeCategory = (key: string) => {
  activeKey.value = key;
};
</script>

<template>
  <div class="scenarios">
    <div class="page-header">
      <h1>{{ t('scenarios.title') }}</h1>
    </div>
    
    <div class="container">
      <!-- 场景分类 -->
      <a-tabs v-model:activeKey="activeKey" @change="changeCategory">
        <a-tab-pane v-for="category in categories" :key="category.key" :tab="category.label" />
      </a-tabs>
      
      <!-- 场景列表 -->
      <a-row :gutter="[24, 24]">
        <a-col :xs="24" :sm="12" v-for="scenario in filteredScenarios" :key="scenario.id">
          <a-card hoverable @click="router.push(`/scenarios/${scenario.id}`)">
            <template #cover>
              <img :alt="scenario.name" :src="scenario.image" />
            </template>
            <a-card-meta :title="scenario.name">
              <template #description>{{ scenario.description }}</template>
            </a-card-meta>
            <div class="card-footer">
              <a-button type="primary">
                {{ t('common.viewDetails') }}
              </a-button>
            </div>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<style scoped>
.scenarios {
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

.card-footer {
  margin-top: 20px;
  text-align: center;
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