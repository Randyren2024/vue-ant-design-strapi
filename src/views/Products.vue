<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { Card, Button, Row, Col, Typography, Divider, Tabs } from 'ant-design-vue';
import { useRouter } from 'vue-router';

const { t } = useI18n();
const router = useRouter();
const activeKey = ref('all');

// 产品数据
const allProducts = [
  {
    id: 'qingtian-h100',
    name: '擎天H100',
    category: 'drone',
    image: '/images/products/qingtian-h100-1.jpg',
    description: '重载氢燃料电池多旋翼无人机，飞行时间长达180分钟，载重能力强。',
  },
  {
    id: 'qingluan-h25',
    name: '青鸾H25',
    category: 'drone',
    image: '/images/products/qingluanH25-1.jpg',
    description: '轻型氢燃料电池多旋翼无人机，适用于巡检等轻载场景。',
  },
  {
    id: 'hits-series',
    name: '麒麟HiTS系列',
    category: 'component',
    image: '/images/products/hits-series.jpg',
    description: '氢燃料电池系统，提供多种功率等级选择。',
  },
  {
    id: 'hits-200',
    name: '麒麟HiTS-200',
    category: 'component',
    image: '/images/products/hits-series.jpg',
    description: '200W氢燃料电池系统，适用于小型无人机。',
  },
  {
    id: 'hits-400',
    name: '麒麟HiTS-400',
    category: 'component',
    image: '/images/products/hits-series.jpg',
    description: '400W氢燃料电池系统，提供稳定高效的动力。',
  },
  {
    id: 'hits-3000',
    name: '麒麟HiTS-3000',
    category: 'component',
    image: '/images/products/hits-series.jpg',
    description: '3000W氢燃料电池系统，适用于中大型无人机。',
  },
  {
    id: 'hydrogen-bike',
    name: '氢电共享两轮车',
    category: 'vehicle',
    image: '/images/products/hydrogen-bike-1.jpg',
    description: '环保高效的城市共享交通工具，续航里程长。',
  },
  {
    id: 'hydrogen-car',
    name: '氢能观光车',
    category: 'vehicle',
    image: '/images/products/hydrogen-bike-1.jpg',
    description: '氢能驱动的景区观光车，零排放，运营成本低。',
  }
];

// 产品分类
const categories = [
  { key: 'all', label: t('products.filter.all') },
  { key: 'drone', label: t('products.filter.drone') },
  { key: 'component', label: t('products.filter.component') },
  { key: 'vehicle', label: t('products.filter.vehicle') }
];

// 根据分类筛选产品
const filteredProducts = computed(() => {
  if (activeKey.value === 'all') {
    return allProducts;
  }
  return allProducts.filter(product => product.category === activeKey.value);
});

// 切换分类
const changeCategory = (key: string) => {
  activeKey.value = key;
};
</script>

<template>
  <div class="products">
    <div class="page-header">
      <h1>{{ t('products.title') }}</h1>
    </div>
    
    <div class="container">
      <!-- 产品分类 -->
      <a-tabs v-model:activeKey="activeKey" @change="changeCategory">
        <a-tab-pane v-for="category in categories" :key="category.key" :tab="category.label" />
      </a-tabs>
      
      <!-- 产品列表 -->
      <a-row :gutter="[24, 24]">
        <a-col :xs="24" :sm="12" :md="8" v-for="product in filteredProducts" :key="product.id">
          <a-card hoverable @click="router.push(`/products/${product.id}`)">
            <template #cover>
              <img :alt="product.name" :src="product.image" />
            </template>
            <a-card-meta :title="product.name">
              <template #description>{{ product.description }}</template>
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
.products {
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