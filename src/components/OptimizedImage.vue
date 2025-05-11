<template>
  <picture class="optimized-image" :class="{ 'loading': isLoading, 'loaded': !isLoading }">
    <source :srcset="webpSrc" type="image/webp" />
    <img
      :src="fallbackSrc"
      :alt="alt"
      :width="width"
      :height="height"
      loading="lazy"
      @load="handleImageLoaded"
      @error="handleImageError"
      :class="imageClass"
    />
    <div v-if="isLoading" class="loading-placeholder" :style="placeholderStyle"></div>
  </picture>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

interface Props {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  imageClass?: string;
}

const props = withDefaults(defineProps<Props>(), {
  width: 0,
  height: 0,
  imageClass: '',
});

const isLoading = ref(true);
const hasError = ref(false);

// 计算WebP和后备源的路径
const webpSrc = computed(() => {
  if (props.src.includes('/images/')) {
    // 如果是本地图片，使用已优化的WebP版本
    return props.src.replace(/\.(jpg|jpeg|png)$/, '.webp');
  }
  return props.src;
});

const fallbackSrc = computed(() => {
  if (props.src.includes('/images/') && props.src.match(/\.(jpg|jpeg|png)$/)) {
    // 对于本地图片，使用优化后的jpg版本
    return props.src.replace(/\.(jpg|jpeg|png)$/, '_optimized.jpg');
  }
  return props.src;
});

// 计算占位符样式
const placeholderStyle = computed(() => {
  if (props.width && props.height) {
    return {
      paddingBottom: `${(props.height / props.width) * 100}%`,
      backgroundColor: '#f5f5f5',
    };
  }
  return {
    paddingBottom: '56.25%', // 默认16:9比例
    backgroundColor: '#f5f5f5',
  };
});

// 图片加载完成
const handleImageLoaded = () => {
  isLoading.value = false;
};

// 图片加载错误
const handleImageError = () => {
  hasError.value = true;
  isLoading.value = false;
  console.error(`图片加载失败: ${props.src}`);
};
</script>

<style scoped>
.optimized-image {
  position: relative;
  display: block;
  width: 100%;
  overflow: hidden;
}

.loading-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #f5f5f5;
  transition: opacity 0.3s ease;
}

.loading img {
  opacity: 0;
}

.loaded img {
  opacity: 1;
  transition: opacity 0.3s ease;
}

img {
  display: block;
  width: 100%;
  height: auto;
  object-fit: cover;
}
</style> 