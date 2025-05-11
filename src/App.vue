<script setup lang="ts">
import { ref, watchEffect, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { Layout, Menu, Button, Dropdown, notification } from 'ant-design-vue';
import { useRouter, useRoute } from 'vue-router';
import SeoManager from './components/SeoManager.vue';
import localeService from './services/localeService';

const { t, locale } = useI18n();
const router = useRouter();
const route = useRoute();
const selectedKeys = ref<string[]>(['home']);

// IP语言检测状态
const isDetectingLanguage = ref(false);
// 是否首次访问
const isFirstVisit = ref(localeService.getUserPreferredLocale() === null);

// 根据当前路由设置选中的菜单项
watchEffect(() => {
  const path = route.path;
  if (path === '/') {
    selectedKeys.value = ['home'];
  } else if (path.startsWith('/products')) {
    selectedKeys.value = ['products'];
  } else if (path.startsWith('/scenarios')) {
    selectedKeys.value = ['scenarios'];
  } else if (path.startsWith('/about')) {
    selectedKeys.value = ['about'];
  } else if (path.startsWith('/news')) {
    selectedKeys.value = ['news'];
  } else if (path.startsWith('/contact')) {
    selectedKeys.value = ['contact'];
  }
});

const languages = [
  { key: 'zh-CN', label: '中文' },
  { key: 'en-US', label: 'English' },
  { key: 'ja-JP', label: '日本語' },
  { key: 'es-ES', label: 'Español' },
  { key: 'fr-FR', label: 'Français' },
  { key: 'de-DE', label: 'Deutsch' }
];

// 根据用户的IP检测语言
const detectLanguageByIP = async () => {
  if (isDetectingLanguage.value) return;
  
  isDetectingLanguage.value = true;
  try {
    // 使用localeService检测合适的语言
    const detectedLocale = await localeService.detectLocaleFromIP();
    locale.value = detectedLocale;
    
    // 对于首次访问的用户，显示语言设置通知
    if (isFirstVisit.value) {
      const languageLabel = languages.find(lang => lang.key === detectedLocale)?.label || 'English';
      
      notification.info({
        message: detectedLocale === 'zh-CN' ? '语言设置通知' : 'Language Setting',
        description: detectedLocale === 'zh-CN' 
          ? `根据您的位置，我们已将网站语言设置为${languageLabel}。您可以随时通过右上角的语言选择器更改语言。` 
          : `Based on your location, we've set the website language to ${languageLabel}. You can change the language anytime using the language selector in the top right corner.`,
        duration: 8,
      });
      
      // 标记为非首次访问
      isFirstVisit.value = false;
    }
  } catch (error) {
    console.warn('Language detection failed, using browser default');
    // 使用浏览器默认语言
    locale.value = localeService.getDefaultLocaleFromBrowser();
  } finally {
    isDetectingLanguage.value = false;
  }
};

const changeLanguage = (lang: string) => {
  locale.value = lang;
  // 将用户选择的语言保存到localStorage
  localeService.saveUserPreferredLocale(lang);
};

// 移动端菜单
const collapsed = ref(false);
const toggleCollapsed = () => {
  collapsed.value = !collapsed.value;
};

// 在组件挂载时检测语言
onMounted(() => {
  detectLanguageByIP();
});
</script>

<template>
  <SeoManager />
  
  <a-layout class="layout">
    <a-layout-header class="header">
      <div class="logo" @click="router.push('/')">
        <img src="/logo.svg" alt="HydrogenDrone" height="40" />
      </div>
      
      <!-- 桌面端菜单 -->
      <div class="desktop-menu">
        <a-menu
          v-model:selectedKeys="selectedKeys"
          theme="light"
          mode="horizontal"
          :style="{ lineHeight: '64px' }"
          :overflowedIndicator="null"
        >
          <a-menu-item key="home" @click="router.push('/')">{{ t('nav.home') }}</a-menu-item>
          <a-menu-item key="products" @click="router.push('/products')">{{ t('nav.products') }}</a-menu-item>
          <a-menu-item key="scenarios" @click="router.push('/scenarios')">{{ t('nav.scenarios') }}</a-menu-item>
          <a-menu-item key="about" @click="router.push('/about')">{{ t('nav.about') }}</a-menu-item>
          <a-menu-item key="news" @click="router.push('/news')">{{ t('nav.news') }}</a-menu-item>
          <a-menu-item key="contact" @click="router.push('/contact')">{{ t('nav.contact') }}</a-menu-item>
        </a-menu>
      </div>
      
      <!-- 语言切换 -->
      <a-dropdown placement="bottomRight" class="lang-dropdown">
        <a-button type="text">
          {{ languages.find(lang => lang.key === locale)?.label || '中文' }}
          <span class="dropdown-icon">▼</span>
        </a-button>
        <template #overlay>
          <a-menu>
            <a-menu-item v-for="lang in languages" :key="lang.key" @click="changeLanguage(lang.key)">
              {{ lang.label }}
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
      
      <!-- 移动端菜单按钮 -->
      <div class="mobile-menu-button">
        <a-button type="text" @click="toggleCollapsed">
          <span class="menu-icon">☰</span>
        </a-button>
      </div>
    </a-layout-header>
    
    <!-- 移动端菜单抽屉 -->
    <div v-if="collapsed" class="mobile-menu">
      <a-menu
        v-model:selectedKeys="selectedKeys"
        theme="light"
        mode="vertical"
      >
        <a-menu-item key="home" @click="router.push('/'); toggleCollapsed()">{{ t('nav.home') }}</a-menu-item>
        <a-menu-item key="products" @click="router.push('/products'); toggleCollapsed()">{{ t('nav.products') }}</a-menu-item>
        <a-menu-item key="scenarios" @click="router.push('/scenarios'); toggleCollapsed()">{{ t('nav.scenarios') }}</a-menu-item>
        <a-menu-item key="about" @click="router.push('/about'); toggleCollapsed()">{{ t('nav.about') }}</a-menu-item>
        <a-menu-item key="news" @click="router.push('/news'); toggleCollapsed()">{{ t('nav.news') }}</a-menu-item>
        <a-menu-item key="contact" @click="router.push('/contact'); toggleCollapsed()">{{ t('nav.contact') }}</a-menu-item>
      </a-menu>
    </div>
    
    <a-layout-content>
      <router-view />
    </a-layout-content>
    
    <a-layout-footer class="footer">
      <div class="footer-content">
        <div class="footer-logo">
          <img src="/logo.svg" alt="HydrogenDrone" height="30" />
          <p>© {{ new Date().getFullYear() }} {{ t('common.companyName') }}. {{ t('common.rights') }}</p>
        </div>
        <div class="footer-links">
          <div class="footer-section">
            <h3>{{ t('nav.products') }}</h3>
            <ul>
              <li><a @click="router.push('/products/qingtian-h100')">{{ t('products.items.qingtianH100.name') }}</a></li>
              <li><a @click="router.push('/products/qingluan-h25')">{{ t('products.items.qingluanH25.name') }}</a></li>
              <li><a @click="router.push('/products/hits-series')">{{ t('products.items.hitsSeries.name') }}</a></li>
            </ul>
          </div>
          <div class="footer-section">
            <h3>{{ t('nav.scenarios') }}</h3>
            <ul>
              <li><a @click="router.push('/scenarios/inspection')">{{ t('scenarios.filter.inspection') }}</a></li>
              <li><a @click="router.push('/scenarios/emergency')">{{ t('scenarios.filter.emergency') }}</a></li>
              <li><a @click="router.push('/scenarios/logistics')">{{ t('scenarios.filter.logistics') }}</a></li>
            </ul>
          </div>
          <div class="footer-section">
            <h3>{{ t('nav.about') }}</h3>
            <ul>
              <li><a @click="router.push('/about')">{{ t('about.company') }}</a></li>
              <li><a @click="router.push('/contact')">{{ t('nav.contact') }}</a></li>
              <li><a @click="router.push('/news')">{{ t('nav.news') }}</a></li>
            </ul>
          </div>
        </div>
      </div>
    </a-layout-footer>
  </a-layout>
</template>

<style scoped>
.layout {
  min-height: 100vh;
  width: 100%;
  max-width: 100%;
  margin: 0;
  padding: 0;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  padding: 0 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  position: sticky;
  top: 0;
  z-index: 1000;
  width: 100%;
}

.logo {
  cursor: pointer;
  display: flex;
  align-items: center;
}

.desktop-menu {
  flex: 1;
  display: flex;
  justify-content: center;
  min-width: 600px;
}

.lang-dropdown {
  margin-left: 16px;
}

.dropdown-icon {
  font-size: 12px;
  margin-left: 4px;
}

.mobile-menu-button {
  display: none;
}

.menu-icon {
  font-size: 20px;
}

.mobile-menu {
  display: none;
}

.footer {
  background: #f0f2f5;
  padding: 24px 50px;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  margin: 0 auto;
}

.footer-logo {
  flex: 0 0 300px;
}

.footer-logo p {
  margin-top: 10px;
  color: #666;
}

.footer-links {
  display: flex;
  gap: 60px;
}

.footer-section h3 {
  margin-bottom: 16px;
  font-size: 16px;
}

.footer-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-section li {
  margin-bottom: 8px;
}

.footer-section a {
  color: #666;
  text-decoration: none;
  cursor: pointer;
}

.footer-section a:hover {
  color: #1890ff;
}

@media (max-width: 992px) {
  .desktop-menu {
    min-width: auto;
  }
  
  :deep(.ant-menu-item) {
    padding: 0 10px;
    font-size: 14px;
  }
}

@media (max-width: 768px) {
  .header {
    padding: 0 20px;
  }
  
  .desktop-menu {
    display: none;
  }
  
  .mobile-menu-button {
    display: block;
  }
  
  .mobile-menu {
    display: block;
    position: fixed;
    top: 64px;
    left: 0;
    right: 0;
    background: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    z-index: 999;
  }
  
  .footer {
    padding: 24px 20px;
  }
  
  .footer-content {
    flex-direction: column;
  }
  
  .footer-logo {
    margin-bottom: 24px;
  }
  
  .footer-links {
    flex-direction: column;
    gap: 24px;
  }
}

:deep(.ant-layout-content) {
  width: 100%;
  padding: 0;
  margin: 0;
  background-color: #fff;
}

:deep(.ant-menu-item) {
  padding: 0 16px;
  font-size: 15px;
}
</style>