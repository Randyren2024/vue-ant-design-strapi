<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { Row, Col, Typography, Tabs, Descriptions, Card, Button, Carousel, Skeleton, Spin } from 'ant-design-vue';

const { t, locale } = useI18n();
const route = useRoute();
const router = useRouter();
const productId = ref(route.params.id as string);
const product = ref<any>(null);
const loading = ref(true);

// 产品数据（实际项目中应该从API获取）
const productsData = {
  'qingtian-h100': {
    id: 'qingtian-h100',
    name: { 
      'zh-CN': '擎天H100',
      'en-US': 'HydroSky H100',
      'ja-JP': 'ハイドロスカイ H100',
      'de-DE': 'HydroSky H100',
      'fr-FR': 'HydroSky H100',
      'es-ES': 'HydroSky H100'
    },
    category: 'drone',
    description: {
      'zh-CN': '重载氢燃料电池多旋翼无人机，飞行时间长达180分钟，载重能力强。',
      'en-US': 'Heavy-duty hydrogen fuel cell multirotor drone with flight time up to 180 minutes and strong payload capacity.',
      'ja-JP': '飛行時間が最大180分、高負荷容量を持つ大型水素燃料電池マルチローター・ドローン。',
      'de-DE': 'Schwerlast-Wasserstoff-Brennstoffzellen-Multirotor-Drohne mit Flugzeiten bis zu 180 Minuten und starker Nutzlastkapazität.',
      'fr-FR': 'Drone multirotor à pile à combustible à hydrogène pour charges lourdes, avec un temps de vol jusqu\'à 180 minutes et une forte capacité de charge utile.',
      'es-ES': 'Dron multirrotor de celda de combustible de hidrógeno para cargas pesadas, con tiempo de vuelo de hasta 180 minutos y gran capacidad de carga.'
    },
    images: [
      '/images/products/qingtian-h100-1.jpg',
      '/images/products/qingtian-h100-2.jpg',
    ],
    specs: [
      { key: '飞行时间', value: '180分钟' },
      { key: '最大载重', value: '10kg' },
      { key: '最大飞行高度', value: '4000m' },
      { key: '最大飞行距离', value: '20km' },
      { key: '燃料电池功率', value: '3000W' },
    ],
    features: [
      '长续航：单次飞行可达3小时，大幅提升作业效率',
      '强载重：最大载重10kg，可满足多种任务需求',
      '高适应性：全天候工作，适应-20°C至45°C环境',
      '智能规划：支持自主航线规划，一键起降',
      '模块化设计：易于维护和升级'
    ],
    scenarios: ['inspection', 'emergency', 'logistics'],
    files: [
      { name: '产品手册', url: '/files/HiTS Drone Series Catalog.pdf' }
    ]
  },
  'qingluan-h25': {
    id: 'qingluan-h25',
    name: '青鸾H25',
    category: 'drone',
    description: '轻型氢燃料电池多旋翼无人机，适用于巡检等轻载场景。',
    images: [
      '/images/products/qingluanH25-1.jpg',
      '/images/products/qingluanH25-2.jpg',
    ],
    specs: [
      { key: '飞行时间', value: '120分钟' },
      { key: '最大载重', value: '2kg' },
      { key: '最大飞行高度', value: '3000m' },
      { key: '最大飞行距离', value: '15km' },
      { key: '燃料电池功率', value: '800W' },
    ],
    features: [
      '轻便灵活：整机重量小于5kg，易于携带和部署',
      '长续航：单次飞行可达2小时，满足大多数巡检需求',
      '低噪音：飞行噪音低于60dB，适合城市环境使用',
      '智能避障：配备全向感知系统，自动避开障碍物',
      '一键起降：支持一键起飞、返航和降落'
    ],
    scenarios: ['inspection'],
    files: [
      { name: '产品手册', url: '/files/HiTS Drone Series Catalog.pdf' }
    ]
  },
  'hits-series': {
    id: 'hits-series',
    name: '麒麟HiTS系列',
    category: 'component',
    description: '氢燃料电池系统，提供多种功率等级选择。',
    images: [
      '/images/products/hits-series.jpg',
    ],
    specs: [
      { key: '功率范围', value: '200W-12000W' },
      { key: '能量密度', value: '900Wh/kg' },
      { key: '工作温度', value: '-20°C至45°C' },
      { key: '使用寿命', value: '5000小时以上' },
      { key: '加氢时间', value: '5分钟内' },
    ],
    features: [
      '高能量密度：达900Wh/kg，远超锂电池',
      '快速补能：加氢仅需5分钟，大幅减少待机时间',
      '长寿命：使用寿命超过5000小时，降低运营成本',
      '全温域适应：可在-20°C至45°C环境下稳定工作',
      '智能管理：配备电池管理系统，实时监控状态'
    ],
    scenarios: [],
    files: [
      { name: '产品手册', url: '/files/HiTS Drone Series Catalog.pdf' }
    ]
  },
  'hydrogen-bike': {
    id: 'hydrogen-bike',
    name: '氢电共享两轮车',
    category: 'vehicle',
    description: '环保高效的城市共享交通工具，续航里程长。',
    images: [
      '/images/products/hydrogen-bike-1.jpg',
    ],
    specs: [
      { key: '续航里程', value: '150km' },
      { key: '最高时速', value: '25km/h' },
      { key: '充电时间', value: '3分钟' },
      { key: '整车重量', value: '25kg' },
      { key: '燃料电池功率', value: '500W' },
    ],
    features: [
      '超长续航：单次充氢可行驶150公里',
      '快速补能：加氢仅需3分钟，便捷高效',
      '绿色环保：零排放，无噪音，符合可持续发展理念',
      '智能共享：支持手机App解锁，实时定位',
      '安全可靠：氢燃料储存安全，多重保护机制'
    ],
    scenarios: [],
    files: [
      { name: '产品手册', url: '/files/HiTS Drone Series Catalog.pdf' }
    ]
  }
};

// 根据ID获取产品信息
onMounted(() => {
  if (productId.value && productsData[productId.value as keyof typeof productsData]) {
    product.value = productsData[productId.value as keyof typeof productsData];
    loading.value = false;
  } else {
    // 产品不存在，跳转到产品列表页
    router.push('/products');
  }
});

// 获取当前语言的产品名称
const localizedName = computed(() => {
  if (!product.value || typeof product.value.name === 'string') return product.value?.name || '';
  return product.value.name[locale.value] || product.value.name['en-US'] || Object.values(product.value.name)[0];
});

// 获取当前语言的产品描述
const localizedDescription = computed(() => {
  if (!product.value || typeof product.value.description === 'string') return product.value?.description || '';
  return product.value.description[locale.value] || product.value.description['en-US'] || Object.values(product.value.description)[0];
});
</script>

<template>
  <div class="product-detail">
    <div v-if="loading" class="loading">
      <a-spin size="large" />
    </div>
    
    <div v-else class="container">
      <!-- 产品图片轮播 -->
      <a-row :gutter="24">
        <a-col :xs="24" :md="12">
          <a-carousel class="product-carousel">
            <div v-for="(image, index) in product.images" :key="index">
              <img :src="image" :alt="localizedName" class="carousel-image" />
            </div>
          </a-carousel>
        </a-col>
        
        <a-col :xs="24" :md="12">
          <div class="product-info">
            <a-typography-title level="2">{{ localizedName }}</a-typography-title>
            <a-typography-paragraph>{{ localizedDescription }}</a-typography-paragraph>
            
            <div class="product-actions">
              <a-button type="primary" size="large" @click="router.push('/contact')">
                {{ t('contact.title') }}
              </a-button>
              <a-button v-if="product.files && product.files.length > 0" 
                        size="large" 
                        @click="window.open(product.files[0].url, '_blank')">
                {{ t('common.download') }}
              </a-button>
            </div>
          </div>
        </a-col>
      </a-row>
      
      <!-- 产品详情选项卡 -->
      <div class="product-details">
        <a-tabs default-active-key="specs">
          <a-tab-pane key="specs" :tab="t('products.detail.specs')">
            <a-descriptions bordered :column="{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }">
              <a-descriptions-item v-for="(spec, index) in product.specs" :key="index" :label="spec.key">
                {{ spec.value }}
              </a-descriptions-item>
            </a-descriptions>
          </a-tab-pane>
          
          <a-tab-pane key="features" :tab="t('products.detail.features')">
            <a-card>
              <ul class="feature-list">
                <li v-for="(feature, index) in product.features" :key="index">{{ feature }}</li>
              </ul>
            </a-card>
          </a-tab-pane>
          
          <a-tab-pane v-if="product.scenarios && product.scenarios.length > 0" 
                      key="scenarios" 
                      :tab="t('products.detail.scenarios')">
            <a-row :gutter="[16, 16]">
              <a-col :xs="24" :sm="12" :md="8" v-for="scenarioId in product.scenarios" :key="scenarioId">
                <a-card hoverable @click="router.push(`/scenarios/${scenarioId}`)">
                  <template #cover>
                    <img :src="`/images/scenarios/${scenarioId}.jpg`" :alt="scenarioId" />
                  </template>
                  <a-card-meta :title="scenarioId">
                    <template #description>{{ t(`scenarios.filter.${scenarioId}`) }}</template>
                  </a-card-meta>
                </a-card>
              </a-col>
            </a-row>
          </a-tab-pane>
          
          <a-tab-pane v-if="product.files && product.files.length > 0" 
                      key="download" 
                      :tab="t('products.detail.download')">
            <a-list :data-source="product.files">
              <template #renderItem="{ item }">
                <a-list-item>
                  <a :href="item.url" target="_blank">
                    <a-button type="primary">
                      <template #icon><download-outlined /></template>
                      {{ item.name }}
                    </a-button>
                  </a>
                </a-list-item>
              </template>
            </a-list>
          </a-tab-pane>
        </a-tabs>
      </div>
      
      <div class="back-button">
        <a-button @click="router.push('/products')">
          {{ t('common.back') }}
        </a-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-detail {
  width: 100%;
  padding: 40px 0;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
}

.container {
  padding: 0 10%;
}

.product-carousel {
  margin-bottom: 24px;
}

.carousel-image {
  width: 100%;
  height: 400px;
  object-fit: cover;
}

.product-info {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.product-actions {
  margin-top: 24px;
  display: flex;
  gap: 16px;
}

.product-details {
  margin-top: 48px;
}

.feature-list {
  padding-left: 20px;
}

.feature-list li {
  margin-bottom: 12px;
}

.back-button {
  margin-top: 24px;
  text-align: center;
}

@media (max-width: 768px) {
  .carousel-image {
    height: 250px;
  }
  
  .product-info {
    margin-top: 24px;
  }
  
  .container {
    padding: 0 5%;
  }
}
</style> 