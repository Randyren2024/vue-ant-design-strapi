import axios from 'axios';

// 国家/地区代码到语言的映射
const countryToLanguage: Record<string, string> = {
  // 中文地区
  'CN': 'zh-CN', // 中国
  'TW': 'zh-CN', // 台湾
  'HK': 'zh-CN', // 香港
  'MO': 'zh-CN', // 澳门
  'SG': 'zh-CN', // 新加坡(部分)
  
  // 英语地区
  'US': 'en-US', // 美国
  'GB': 'en-US', // 英国
  'AU': 'en-US', // 澳大利亚
  'CA': 'en-US', // 加拿大
  'NZ': 'en-US', // 新西兰
  'IE': 'en-US', // 爱尔兰
  
  // 日语地区
  'JP': 'ja-JP', // 日本
  
  // 西班牙语地区
  'ES': 'es-ES', // 西班牙
  'MX': 'es-ES', // 墨西哥
  'AR': 'es-ES', // 阿根廷
  'CO': 'es-ES', // 哥伦比亚
  
  // 法语地区
  'FR': 'fr-FR', // 法国
  'BE': 'fr-FR', // 比利时
  'CH': 'fr-FR', // 瑞士（多语言国家，这里以法语为主）
  'LU': 'fr-FR', // 卢森堡
  
  // 德语地区
  'DE': 'de-DE', // 德国
  'AT': 'de-DE', // 奥地利
  'LI': 'de-DE', // 列支敦士登
};

// 存储在localStorage中的键
const LOCALE_STORAGE_KEY = 'user-preferred-locale';
const IP_COUNTRY_STORAGE_KEY = 'user-ip-country';
const IP_DETECTION_TIMESTAMP = 'ip-detection-timestamp';
const IP_DETECTION_FAILURE_COUNT = 'ip-detection-failure-count';

// IP检测的有效期（24小时，单位为毫秒）
const IP_DETECTION_TTL = 24 * 60 * 60 * 1000;
// 最大重试次数
const MAX_FAILURE_COUNT = 3;

/**
 * 根据浏览器语言获取默认语言
 */
export const getDefaultLocaleFromBrowser = (): string => {
  const browserLanguage = navigator.language || (navigator as any).userLanguage;
  if (!browserLanguage) return 'en-US';
  
  const browserLangPrefix = browserLanguage.split('-')[0].toLowerCase();
  const supportedLangs: Record<string, string> = {
    'zh': 'zh-CN',
    'en': 'en-US',
    'ja': 'ja-JP',
    'es': 'es-ES',
    'fr': 'fr-FR',
    'de': 'de-DE'
  };
  
  return supportedLangs[browserLangPrefix] || 'en-US';
};

/**
 * 保存用户首选语言到localStorage
 */
export const saveUserPreferredLocale = (locale: string) => {
  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch (error) {
    console.error('Failed to save user preferred locale:', error);
  }
};

/**
 * 从localStorage获取用户首选语言
 */
export const getUserPreferredLocale = (): string | null => {
  try {
    return localStorage.getItem(LOCALE_STORAGE_KEY);
  } catch (error) {
    console.error('Failed to get user preferred locale:', error);
    return null;
  }
};

/**
 * 检查IP检测是否过期
 */
const isIpDetectionExpired = (): boolean => {
  try {
    const timestamp = localStorage.getItem(IP_DETECTION_TIMESTAMP);
    if (!timestamp) return true;
    
    const timestampValue = parseInt(timestamp, 10);
    return Date.now() - timestampValue > IP_DETECTION_TTL;
  } catch (error) {
    return true;
  }
};

/**
 * 从缓存获取国家代码
 */
const getCachedCountryCode = (): string | null => {
  try {
    return localStorage.getItem(IP_COUNTRY_STORAGE_KEY);
  } catch (error) {
    return null;
  }
};

/**
 * 缓存国家代码和时间戳
 */
const cacheCountryCode = (countryCode: string) => {
  try {
    localStorage.setItem(IP_COUNTRY_STORAGE_KEY, countryCode);
    localStorage.setItem(IP_DETECTION_TIMESTAMP, Date.now().toString());
    // 重置失败计数
    localStorage.setItem(IP_DETECTION_FAILURE_COUNT, '0');
  } catch (error) {
    console.error('Failed to cache country code:', error);
  }
};

/**
 * 获取并增加失败计数
 */
const incrementFailureCount = (): number => {
  try {
    const count = parseInt(localStorage.getItem(IP_DETECTION_FAILURE_COUNT) || '0', 10);
    const newCount = count + 1;
    localStorage.setItem(IP_DETECTION_FAILURE_COUNT, newCount.toString());
    return newCount;
  } catch (error) {
    return 0;
  }
};

/**
 * 检测用户IP并返回合适的语言
 */
export const detectLocaleFromIP = async (): Promise<string> => {
  // 获取用户首选语言，如果已经设置则直接返回
  const userPreferredLocale = getUserPreferredLocale();
  if (userPreferredLocale) {
    return userPreferredLocale;
  }
  
  // 检查失败次数，如果超过最大重试次数，直接返回浏览器语言
  try {
    const failureCount = parseInt(localStorage.getItem(IP_DETECTION_FAILURE_COUNT) || '0', 10);
    if (failureCount >= MAX_FAILURE_COUNT) {
      return getDefaultLocaleFromBrowser();
    }
  } catch (error) {
    // 如果无法读取失败次数，继续尝试检测
  }
  
  // 检查缓存的国家代码是否有效
  if (!isIpDetectionExpired()) {
    const cachedCountryCode = getCachedCountryCode();
    if (cachedCountryCode && countryToLanguage[cachedCountryCode]) {
      return countryToLanguage[cachedCountryCode];
    }
  }
  
  // 获取浏览器语言作为备选
  const defaultLocale = getDefaultLocaleFromBrowser();
  
  try {
    // 设置超时时间为5秒
    const response = await axios.get('https://ipinfo.io/json?token=1eb61c9abcdd60', {
      timeout: 5000
    });
    
    if (response.data && response.data.country) {
      const countryCode = response.data.country;
      // 缓存国家代码
      cacheCountryCode(countryCode);
      
      // 如果我们有此国家的语言映射，则使用它
      if (countryToLanguage[countryCode]) {
        return countryToLanguage[countryCode];
      }
    }
    
    // 如果没有匹配的国家，使用浏览器语言
    return defaultLocale;
  } catch (error) {
    // 增加失败计数
    const failureCount = incrementFailureCount();
    console.warn(`IP detection failed (attempt ${failureCount}/${MAX_FAILURE_COUNT}):`, error);
    
    // 返回浏览器语言作为默认值
    return defaultLocale;
  }
};

export default {
  detectLocaleFromIP,
  saveUserPreferredLocale,
  getUserPreferredLocale,
  getDefaultLocaleFromBrowser
};