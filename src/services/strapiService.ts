import { Strapi } from '@strapi/sdk-js';

const strapi = new Strapi({
  url: import.meta.env.VITE_STRAPI_URL,
  prefix: '/api',
  store: {
    key: 'strapi_jwt',
    useLocalStorage: true,
  },
  axiosOptions: {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_STRAPI_API_TOKEN}`,
    },
  },
});

// 产品相关接口
export const getProducts = async () => {
  try {
    const response = await strapi.find('products', {
      populate: '*',
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// 应用场景相关接口
export const getScenarios = async () => {
  try {
    const response = await strapi.find('scenarios', {
      populate: '*',
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching scenarios:', error);
    throw error;
  }
};

// 新闻相关接口
export const getNews = async () => {
  try {
    const response = await strapi.find('news', {
      populate: '*',
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};

// 公司信息相关接口
export const getCompanyInfo = async () => {
  try {
    const response = await strapi.findOne('company-info', 1, {
      populate: '*',
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching company info:', error);
    throw error;
  }
};

export default {
  getProducts,
  getScenarios,
  getNews,
  getCompanyInfo,
};