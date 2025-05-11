<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { Row, Col, Typography, Divider, Tag, Card } from 'ant-design-vue';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const newsId = ref(route.params.id as string);
const news = ref<any>(null);
const loading = ref(true);

// 使用computed属性动态获取翻译的新闻数据
const newsData = computed(() => ({
  'news-001': {
    id: 'news-001',
    title: t('news.newsData.news-001.title'),
    summary: t('news.newsData.news-001.summary'),
    content: t('news.newsData.news-001.content'),
    date: '2024-03-15',
    author: 'HydrogenDrone ' + t('news.newsCenter'),
    category: t('news.newsData.news-001.category'),
    tags: t('news.newsData.news-001.tags', undefined, { returnObjects: true }),
    image: '/images/news/news-1.svg',
    relatedNews: ['news-004', 'news-003']
  },
  'news-002': {
    id: 'news-002',
    title: t('news.newsData.news-002.title'),
    summary: t('news.newsData.news-002.summary'),
    content: t('news.newsData.news-002.content'),
    date: '2024-02-20',
    author: 'HydrogenDrone ' + t('news.newsCenter'),
    category: t('news.newsData.news-002.category'),
    tags: t('news.newsData.news-002.tags', undefined, { returnObjects: true }),
    image: '/images/news/news-2.svg',
    relatedNews: ['news-001']
  },
  'news-003': {
    id: 'news-003',
    title: t('news.newsData.news-003.title'),
    summary: t('news.newsData.news-003.summary'),
    content: t('news.newsData.news-003.content'),
    date: '2024-01-10',
    author: 'HydrogenDrone ' + t('news.newsCenter'),
    category: t('news.newsData.news-003.category'),
    tags: t('news.newsData.news-003.tags', undefined, { returnObjects: true }),
    image: '/images/news/news-3.svg',
    relatedNews: ['news-001', 'news-004']
  },
  'news-004': {
    id: 'news-004',
    title: t('news.newsData.news-004.title'),
    summary: t('news.newsData.news-004.summary'),
    content: t('news.newsData.news-004.content'),
    date: '2023-12-18',
    author: 'HydrogenDrone ' + t('news.newsCenter'),
    category: t('news.newsData.news-004.category'),
    tags: t('news.newsData.news-004.tags', undefined, { returnObjects: true }),
    image: '/images/news/news-4.svg',
    relatedNews: ['news-001', 'news-003']
  }
}));

// 根据ID获取新闻详情
onMounted(() => {
  if (newsId.value && newsData.value[newsId.value as keyof typeof newsData.value]) {
    news.value = newsData.value[newsId.value as keyof typeof newsData.value];
    loading.value = false;
  } else {
    // 新闻不存在，跳转到新闻列表页
    router.push('/news');
  }
});

// 获取相关新闻数据
const getRelatedNewsData = (relatedIds: string[]) => {
  return relatedIds.map(id => newsData.value[id as keyof typeof newsData.value]).filter(Boolean);
};
</script>

<template>
  <div class="news-detail">
    <div v-if="loading" class="loading">
      <a-spin size="large" />
    </div>
    
    <div v-else class="container">
      <!-- 新闻头部 -->
      <div class="news-header">
        <h1>{{ news.title }}</h1>
        <div class="news-meta">
          <a-tag color="blue">{{ news.category }}</a-tag>
          <span class="news-date">{{ news.date }}</span>
          <span class="news-author">{{ news.author }}</span>
        </div>
      </div>
      
      <!-- 新闻内容 -->
      <div class="news-content">
        <div class="featured-image">
          <img :src="news.image" :alt="news.title" />
        </div>
        
        <div class="news-text" v-html="news.content"></div>
        
        <div class="news-tags">
          <a-tag v-for="(tag, index) in news.tags" :key="index">{{ tag }}</a-tag>
        </div>
      </div>
      
      <!-- 相关新闻 -->
      <div v-if="news.relatedNews && news.relatedNews.length > 0" class="related-news">
        <a-divider />
        <a-typography-title level="3">相关新闻</a-typography-title>
        
        <a-row :gutter="[24, 24]">
          <a-col :xs="24" :sm="12" v-for="item in getRelatedNewsData(news.relatedNews)" :key="item.id">
            <a-card hoverable @click="router.push(`/news/${item.id}`)">
              <a-row :gutter="16">
                <a-col :xs="24" :sm="8">
                  <img :src="item.image" :alt="item.title" class="related-image" />
                </a-col>
                <a-col :xs="24" :sm="16">
                  <a-typography-title level="4" class="related-title">{{ item.title }}</a-typography-title>
                  <div class="related-meta">
                    <span>{{ item.date }}</span>
                  </div>
                </a-col>
              </a-row>
            </a-card>
          </a-col>
        </a-row>
      </div>
      
      <div class="back-button">
        <a-button @click="router.push('/news')">
          {{ t('common.back') }}
        </a-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.news-detail {
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

.news-header {
  margin-bottom: 30px;
}

.news-header h1 {
  font-size: 2.2rem;
  margin-bottom: 15px;
}

.news-meta {
  display: flex;
  align-items: center;
  gap: 15px;
  color: #666;
}

.news-content {
  margin-bottom: 40px;
}

.featured-image {
  margin-bottom: 30px;
}

.featured-image img {
  width: 100%;
  max-height: 500px;
  object-fit: cover;
  border-radius: 8px;
}

.news-text {
  font-size: 16px;
  line-height: 1.8;
  color: #333;
}

.news-text p {
  margin-bottom: 20px;
}

.news-tags {
  margin-top: 30px;
}

.related-news {
  margin-top: 50px;
  margin-bottom: 40px;
}

.related-image {
  width: 100%;
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
}

.related-title {
  font-size: 16px !important;
  margin-bottom: 10px !important;
  line-height: 1.4 !important;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.related-meta {
  font-size: 12px;
  color: #999;
}

.back-button {
  text-align: center;
  margin-top: 30px;
}

@media (max-width: 768px) {
  .container {
    padding: 0 5%;
  }
  
  .news-header h1 {
    font-size: 1.8rem;
  }
  
  .featured-image img {
    max-height: 300px;
  }
}
</style> 