<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { Row, Col, Typography, Card, Button, Divider, List } from 'ant-design-vue';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const scenarioId = ref(route.params.id as string);
const scenario = ref<any>(null);
const loading = ref(true);

// 场景数据（实际项目中应该从API获取）
const scenariosData = {
  'inspection': {
    id: 'inspection',
    name: '巡检应用',
    category: 'inspection',
    image: '/images/scenarios/inspection.jpg',
    description: '氢燃料电池无人机在巡检领域拥有独特优势。相比传统电池无人机，其续航时间更长，可实现单次飞行覆盖更大面积的巡检任务，大幅提升工作效率。尤其适用于电力线路、风力发电场、光伏电站等大型设施的巡检，可快速发现设备隐患，降低人工巡检成本和安全风险。',
    benefits: [
      '长时间飞行：单次飞行可覆盖更大区域，提高巡检效率',
      '快速部署：5分钟内完成加氢，立即执行新任务',
      '稳定可靠：全天候适应性强，工作温度范围广',
      '数据采集：搭载高清相机和热成像设备，实现全面检测',
      '智能分析：结合AI算法，自动识别设备异常'
    ],
    cases: [
      '某省电网使用擎天H100进行输电线路巡检，单日巡检效率提升200%',
      '西北某光伏电站采用青鸾H25进行组件热斑检测，发现隐患效率提高150%'
    ],
    relatedProducts: [
      {
        id: 'qingtian-h100',
        name: '擎天H100',
        image: '/images/products/qingtian-h100-1.jpg'
      },
      {
        id: 'qingluan-h25',
        name: '青鸾H25',
        image: '/images/products/qingluanH25-1.jpg'
      }
    ]
  },
  'cleaning': {
    id: 'cleaning',
    name: '清洁服务',
    category: 'cleaning',
    image: '/images/scenarios/cleaning.jpg',
    description: '氢燃料电池无人机在清洁服务领域具有显著优势。长续航时间和强载重能力使其能够携带足够的清洁设备和溶液，一次完成大面积的清洁工作。特别适用于高空建筑外墙、光伏板表面等传统清洁方式难以到达或成本高昂的场景。',
    benefits: [
      '长效作业：单次飞行时间长，可完成大规模清洁任务',
      '高空作业：安全替代人工高空作业，降低风险',
      '精准控制：定位精度高，确保清洁彻底',
      '成本节约：减少人力投入，提高清洁效率',
      '环保节能：零排放，绿色环保'
    ],
    cases: [
      '华东某10MW光伏电站使用擎天H100清洗组件，清洗效率提升300%，节约用水40%',
      '北京某高层建筑外墙清洗项目，使用氢能无人机替代传统吊篮，作业时间缩短60%'
    ],
    relatedProducts: [
      {
        id: 'qingtian-h100',
        name: '擎天H100',
        image: '/images/products/qingtian-h100-1.jpg'
      }
    ]
  },
  'emergency': {
    id: 'emergency',
    name: '应急救援',
    category: 'emergency',
    image: '/images/scenarios/emergency.jpg',
    description: '氢燃料电池无人机在应急救援中发挥着不可替代的作用。其长续航能力确保在灾难现场长时间保持空中巡查；强大的载重能力可以运送急救物资；恶劣环境适应性强，能在极端天气条件下执行任务。在地震、洪水、山火等自然灾害和危险事故中，可提供实时侦察和物资投送。',
    benefits: [
      '快速响应：应急情况下快速部署，第一时间获取现场信息',
      '空中侦察：提供实时高清画面，辅助决策',
      '物资投送：向灾区或孤岛投送急救药品、食品等物资',
      '通信中继：在通信中断区域提供临时通信支持',
      '搜索救援：配合红外设备，搜寻失踪人员'
    ],
    cases: [
      '南方某省洪灾期间，擎天H100为被困山区运送急救药品，挽救多人生命',
      '西部某地区森林火灾，使用氢能无人机进行火情侦察，掌握火势蔓延情况'
    ],
    relatedProducts: [
      {
        id: 'qingtian-h100',
        name: '擎天H100',
        image: '/images/products/qingtian-h100-1.jpg'
      }
    ]
  },
  'logistics': {
    id: 'logistics',
    name: '物流运输',
    category: 'logistics',
    image: '/images/scenarios/logistics.jpg',
    description: '氢燃料电池无人机为物流行业带来革命性变化。相较于传统电池无人机，氢能无人机拥有更长的航程和更大的载重能力，可以轻松应对中远距离、较重物品的配送需求。尤其适合偏远地区、海岛、山区等交通不便地区的物流配送，解决最后一公里问题。',
    benefits: [
      '远距离配送：单次飞行可达数十公里，覆盖范围广',
      '高效准时：不受地面交通影响，确保准时送达',
      '重物运输：载重能力强，可运送较重货物',
      '全天候运行：适应各种气候条件，保证配送稳定性',
      '绿色环保：零排放，符合绿色物流理念'
    ],
    cases: [
      '长江三峡地区使用擎天H100为偏远山区配送日常物资，解决交通不便问题',
      '东部沿海某渔场使用氢能无人机向近海渔船配送补给，效率提升200%'
    ],
    relatedProducts: [
      {
        id: 'qingtian-h100',
        name: '擎天H100',
        image: '/images/products/qingtian-h100-1.jpg'
      }
    ]
  }
};

// 根据ID获取场景信息
onMounted(() => {
  if (scenarioId.value && scenariosData[scenarioId.value as keyof typeof scenariosData]) {
    scenario.value = scenariosData[scenarioId.value as keyof typeof scenariosData];
    loading.value = false;
  } else {
    // 场景不存在，跳转到场景列表页
    router.push('/scenarios');
  }
});
</script>

<template>
  <div class="scenario-detail">
    <div v-if="loading" class="loading">
      <a-spin size="large" />
    </div>
    
    <div v-else class="container">
      <!-- 场景头部 -->
      <div class="scenario-header" :style="{ backgroundImage: `url(${scenario.image})` }">
        <div class="header-content">
          <h1>{{ scenario.name }}</h1>
          <p>{{ t(`scenarios.filter.${scenario.id}`) }}</p>
        </div>
      </div>
      
      <!-- 场景描述 -->
      <div class="scenario-section">
        <a-typography-title level="2">应用概述</a-typography-title>
        <a-divider />
        <a-typography-paragraph>
          {{ scenario.description }}
        </a-typography-paragraph>
      </div>
      
      <!-- 应用优势 -->
      <div class="scenario-section">
        <a-typography-title level="2">应用优势</a-typography-title>
        <a-divider />
        <a-row :gutter="[24, 24]">
          <a-col :xs="24" :sm="24" :md="24">
            <a-card>
              <ul class="benefits-list">
                <li v-for="(benefit, index) in scenario.benefits" :key="index">{{ benefit }}</li>
              </ul>
            </a-card>
          </a-col>
        </a-row>
      </div>
      
      <!-- 案例分享 -->
      <div class="scenario-section">
        <a-typography-title level="2">案例分享</a-typography-title>
        <a-divider />
        <a-list :data-source="scenario.cases">
          <template #renderItem="{ item }">
            <a-list-item>
              <a-card>
                {{ item }}
              </a-card>
            </a-list-item>
          </template>
        </a-list>
      </div>
      
      <!-- 相关产品 -->
      <div class="scenario-section">
        <a-typography-title level="2">推荐产品</a-typography-title>
        <a-divider />
        <a-row :gutter="[24, 24]">
          <a-col :xs="24" :sm="12" :md="8" v-for="product in scenario.relatedProducts" :key="product.id">
            <a-card hoverable @click="router.push(`/products/${product.id}`)">
              <template #cover>
                <img :src="product.image" :alt="product.name" />
              </template>
              <a-card-meta :title="product.name">
                <template #description>
                  <a-button type="primary">
                    {{ t('common.viewDetails') }}
                  </a-button>
                </template>
              </a-card-meta>
            </a-card>
          </a-col>
        </a-row>
      </div>
      
      <div class="back-button">
        <a-button @click="router.push('/scenarios')">
          {{ t('common.back') }}
        </a-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.scenario-detail {
  width: 100%;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
}

.container {
  padding: 0 0 60px;
}

.scenario-header {
  height: 400px;
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
}

.header-content {
  text-align: center;
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 30px 60px;
  border-radius: 8px;
}

.header-content h1 {
  font-size: 2.5rem;
  margin: 0 0 10px;
  color: white;
}

.header-content p {
  font-size: 1.25rem;
  margin: 0;
}

.scenario-section {
  padding: 0 10%;
  margin-bottom: 40px;
}

.benefits-list {
  padding-left: 20px;
}

.benefits-list li {
  margin-bottom: 12px;
}

.back-button {
  text-align: center;
  margin-top: 40px;
}

@media (max-width: 768px) {
  .scenario-header {
    height: 300px;
  }
  
  .header-content {
    padding: 20px 30px;
  }
  
  .header-content h1 {
    font-size: 2rem;
  }
  
  .scenario-section {
    padding: 0 5%;
  }
}
</style> 