<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { List, Card, Tag, Input, Divider, Space, Typography } from 'ant-design-vue';
import { useRouter } from 'vue-router';

const { t } = useI18n();
const router = useRouter();
const searchValue = ref('');

// 使用computed属性动态获取翻译
const newsData = computed(() => [
  {
    id: 'news-001',
    title: t('news.newsData.news-001.title'),
    summary: t('news.newsData.news-001.summary'),
    date: '2024-03-15',
    category: t('news.newsData.news-001.category'),
    tags: t('news.newsData.news-001.tags', undefined, { returnObjects: true }),
    image: '/images/news/news-1.svg'
  },
  {
    id: 'news-002',
    title: t('news.newsData.news-002.title'),
    summary: t('news.newsData.news-002.summary'),
    date: '2024-02-20',
    category: t('news.newsData.news-002.category'),
    tags: t('news.newsData.news-002.tags', undefined, { returnObjects: true }),
    image: '/images/news/news-2.svg'
  },
  {
    id: 'news-003',
    title: t('news.newsData.news-003.title'),
    summary: t('news.newsData.news-003.summary'),
    date: '2024-01-10',
    category: t('news.newsData.news-003.category'),
    tags: t('news.newsData.news-003.tags', undefined, { returnObjects: true }),
    image: '/images/news/news-3.svg'
  },
  {
    id: 'news-004',
    title: t('news.newsData.news-004.title'),
    summary: t('news.newsData.news-004.summary'),
    date: '2023-12-18',
    category: t('news.newsData.news-004.category'),
    tags: t('news.newsData.news-004.tags', undefined, { returnObjects: true }),
    image: '/images/news/news-4.svg'
  }
]);

// 使用computed属性获取翻译后的分类
const categories = computed(() => [
  { name: t('news.categories.all'), count: newsData.value.length },
  { 
    name: t('news.categories.tech'), 
    count: newsData.value.filter(item => item.category === t('news.newsData.news-001.category')).length 
  },
  { 
    name: t('news.categories.application'), 
    count: newsData.value.filter(item => item.category === t('news.newsData.news-002.category')).length 
  },
  { 
    name: t('news.categories.cooperation'), 
    count: newsData.value.filter(item => item.category === t('news.newsData.news-003.category')).length 
  },
  { 
    name: t('news.categories.honor'), 
    count: newsData.value.filter(item => item.category === t('news.newsData.news-004.category')).length 
  }
]);

// 标签聚合
const allTags = computed(() => {
  const tags: string[] = [];
  newsData.value.forEach(news => {
    news.tags.forEach(tag => {
      if (!tags.includes(tag)) tags.push(tag);
    });
  });
  return tags;
});

// 搜索功能
const onSearch = () => {
  console.log('搜索:', searchValue.value);
  // 实际项目中这里可以实现搜索逻辑
};

// 点击新闻
const goToNewsDetail = (id: string) => {
  router.push(`/news/${id}`);
};
</script>

<template>
  <div class="news">
    <div class="page-header">
      <h1>{{ t('news.title') }}</h1>
    </div>
    
    <div class="container">
      <a-row :gutter="24">
        <!-- 新闻列表 -->
        <a-col :xs="24" :md="16">
          <a-input-search
            v-model:value="searchValue"
            :placeholder="t('news.search')"
            @search="onSearch"
            class="search-input"
          />
          
          <a-list
            :data-source="newsData"
            :grid="{ gutter: 16, xs: 1, sm: 1, md: 1, lg: 1, xl: 1, xxl: 1 }"
            class="news-list"
          >
            <template #renderItem="{ item }">
              <a-list-item>
                <a-card hoverable @click="goToNewsDetail(item.id)">
                  <a-row :gutter="16">
                    <a-col :xs="24" :sm="8">
                      <img :src="item.image" :alt="item.title" class="news-image" />
                    </a-col>
                    <a-col :xs="24" :sm="16">
                      <div class="news-meta">
                        <a-tag color="blue">{{ item.category }}</a-tag>
                        <span class="news-date">{{ item.date }}</span>
                      </div>
                      <a-typography-title level="4" class="news-title">{{ item.title }}</a-typography-title>
                      <a-typography-paragraph class="news-summary">{{ item.summary }}</a-typography-paragraph>
                      <div class="news-tags">
                        <a-tag v-for="(tag, index) in item.tags" :key="index">{{ tag }}</a-tag>
                      </div>
                      <a-typography-text class="news-readmore">{{ t('news.readMore') }} →</a-typography-text>
                    </a-col>
                  </a-row>
                </a-card>
              </a-list-item>
            </template>
          </a-list>
        </a-col>
        
        <!-- 侧边栏 -->
        <a-col :xs="24" :md="8" class="sidebar">
          <!-- 分类 -->
          <div class="sidebar-section">
            <a-typography-title level="3">{{ t('news.categories') }}</a-typography-title>
            <a-divider />
            <ul class="category-list">
              <li v-for="(category, index) in categories" :key="index">
                <a href="javascript:;">{{ category.name }} <span>({{ category.count }})</span></a>
              </li>
            </ul>
          </div>
          
          <!-- 最近文章 -->
          <div class="sidebar-section">
            <a-typography-title level="3">{{ t('news.recentPosts') }}</a-typography-title>
            <a-divider />
            <ul class="recent-list">
              <li v-for="(news, index) in newsData.slice(0, 3)" :key="index" @click="goToNewsDetail(news.id)">
                <a href="javascript:;">{{ news.title }}</a>
                <span class="recent-date">{{ news.date }}</span>
              </li>
            </ul>
          </div>
          
          <!-- 标签 -->
          <div class="sidebar-section">
            <a-typography-title level="3">{{ t('news.tags') }}</a-typography-title>
            <a-divider />
            <div class="tag-cloud">
              <a-tag v-for="(tag, index) in allTags" :key="index" color="blue">{{ tag }}</a-tag>
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<style scoped>
.news {
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

.search-input {
  margin-bottom: 20px;
}

.news-list {
  margin-bottom: 40px;
}

.news-image {
  width: 100%;
  height: 140px;
  object-fit: cover;
  border-radius: 4px;
}

.news-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.news-date {
  color: #999;
  font-size: 14px;
}

.news-title {
  margin-bottom: 8px !important;
}

.news-summary {
  color: #666;
  margin-bottom: 8px !important;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news-tags {
  margin-bottom: 10px;
}

.news-readmore {
  color: #1890ff;
  cursor: pointer;
}

.sidebar {
  padding-left: 24px;
}

.sidebar-section {
  margin-bottom: 40px;
}

.category-list, .recent-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.category-list li, .recent-list li {
  margin-bottom: 10px;
}

.category-list a, .recent-list a {
  color: #333;
  text-decoration: none;
  transition: all 0.3s;
}

.category-list a:hover, .recent-list a:hover {
  color: #1890ff;
}

.category-list span {
  color: #999;
}

.recent-list li {
  position: relative;
  padding-bottom: 10px;
  border-bottom: 1px solid #f0f0f0;
}

.recent-date {
  display: block;
  font-size: 12px;
  color: #999;
  margin-top: 5px;
}

.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

@media (max-width: 768px) {
  .page-header {
    padding: 40px 5%;
  }
  
  .container {
    padding: 0 5% 40px;
  }
  
  .sidebar {
    padding-left: 0;
    margin-top: 40px;
  }
}
</style> 