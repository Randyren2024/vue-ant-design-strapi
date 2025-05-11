<template>
  <div class="netlify-form-container">
    <form
      name="contact"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      @submit.prevent="handleSubmit"
    >
      <input type="hidden" name="form-name" value="contact" />
      <div hidden>
        <input name="bot-field" />
      </div>
      
      <a-row :gutter="24">
        <a-col :xs="24" :md="12">
          <a-form-item :label="t('contact.name')">
            <a-input
              v-model:value="formData.name"
              name="name"
              required
            />
          </a-form-item>
        </a-col>
        
        <a-col :xs="24" :md="12">
          <a-form-item :label="t('contact.email')">
            <a-input
              v-model:value="formData.email"
              name="email"
              type="email"
              required
            />
          </a-form-item>
        </a-col>
      </a-row>
      
      <a-row :gutter="24">
        <a-col :xs="24" :md="12">
          <a-form-item :label="t('contact.phone')">
            <a-input
              v-model:value="formData.phone"
              name="phone"
              required
            />
          </a-form-item>
        </a-col>
        
        <a-col :xs="24" :md="12">
          <a-form-item :label="t('contact.company')">
            <a-input
              v-model:value="formData.company"
              name="company"
            />
          </a-form-item>
        </a-col>
      </a-row>
      
      <a-form-item :label="t('contact.message')">
        <a-textarea
          v-model:value="formData.message"
          name="message"
          :rows="4"
          required
        />
      </a-form-item>
      
      <a-form-item>
        <a-button
          type="primary"
          html-type="submit"
          :loading="submitting"
          size="large"
        >
          {{ submitting ? '提交中...' : t('contact.submit') }}
        </a-button>
      </a-form-item>
    </form>
    
    <a-alert
      v-if="formSuccess"
      type="success"
      :message="t('contact.successMessage')"
      show-icon
      banner
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import { notification } from 'ant-design-vue';

const { t } = useI18n();
const submitting = ref(false);
const formSuccess = ref(false);

const formData = reactive({
  name: '',
  email: '',
  phone: '',
  company: '',
  message: ''
});

const encode = (data: Record<string, string>) => {
  const formData = new FormData();
  Object.keys(data).forEach(key => {
    formData.append(key, data[key]);
  });
  return formData;
};

const handleSubmit = async (e: Event) => {
  const form = e.target as HTMLFormElement;
  submitting.value = true;
  
  try {
    const formDataObj = {
      'form-name': 'contact',
      ...formData
    };

    const response = await fetch("/", {
      method: "POST",
      body: encode(formDataObj)
    });

    if (!response.ok) {
      throw new Error(`Form submission failed: ${response.status} ${response.statusText}`);
    }

    // Reset form
    form.reset();
    Object.keys(formData).forEach(key => {
      formData[key as keyof typeof formData] = '';
    });
    
    formSuccess.value = true;
    notification.success({
      message: t('contact.successMessage'),
      duration: 5
    });
    
    setTimeout(() => {
      formSuccess.value = false;
    }, 5000);
  } catch (error) {
    console.error('Form submission error:', error);
    notification.error({
      message: t('contact.errorTitle') || 'Form Submission Error',
      description: t('contact.errorMessage') || 'Failed to submit the form. Please try again later.'
    });
  } finally {
    submitting.value = false;
  }
};
</script>

<style scoped>
.netlify-form-container {
  width: 100%;
  margin-bottom: 20px;
}

:deep(.ant-form-item) {
  margin-bottom: 16px;
}

:deep(.ant-alert) {
  margin-top: 20px;
}
</style>