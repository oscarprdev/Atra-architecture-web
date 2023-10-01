<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import Button from '../Button/Button.vue';
import { DefaultAboutService } from '../../core/services/about-service';
import { DefaultAdminService } from '../../core/services/admin-service';
import Toast from '../Toast/Toast.vue';
import DashboardEditImage from '../Dashboard-edit-image/Dashboard-edit-image.vue';
import { useToast } from '../../core/composables/useToast';
import { IconLoader2 } from '@tabler/icons-vue';
import { useModals } from '../../core/composables/useModals';
import Modal from '../Modal/Modal.vue';
import ModalLoading from '../Modal-loading/Modal-loading.vue';

interface About {
  image: string;
  text: string[];
}
const { isModalOpened, openModal, closeModal } = useModals();

const aboutInfoLoading = ref(false);
const aboutImageFile = ref<File | null>(null);

const { toastState, manageToastState } = useToast();

const about = reactive<About>({
  image: '',
  text: ['...', '...', '...'],
});

const handleTextareaInput = (e: Event): void => {
  const target = e.target as HTMLInputElement;
  const textareaId = target?.id;
  const index = Number(textareaId.split('-')[1]);

  about.text[index] = target?.value;
};

const updateImageFile = (file: File) => {
  aboutImageFile.value = file;
};

const prepareAboutInput = () => {
  return {
    ...(aboutImageFile.value
      ? { newImage: aboutImageFile.value as File }
      : { image: about.image }),
    text: about.text,
    project: 'about',
  };
};

const handleAboutSubmit = async (e: Event) => {
  e.preventDefault();

  aboutInfoLoading.value = true;

  const aboutInput = prepareAboutInput();

  const { status } = await new DefaultAdminService().updateAboutInfo(
    aboutInput
  );

  manageToastState(
    status,
    'Informacio de ATRA actualitzada',
    'Error actualitzant informacio de ATRA'
  );

  aboutInfoLoading.value = false;
};

onMounted(async () => {
  openModal('loading');

  aboutInfoLoading.value = true;
  const aboutInfoResponse =
    await new DefaultAboutService().getAboutScreenInfo();

  about.image = aboutInfoResponse.image;
  about.text = aboutInfoResponse.text;

  aboutInfoLoading.value = false;
  closeModal('loading');
});
</script>

<template>
  <section class="dashboard-about">
    <Modal v-if="isModalOpened()" :no-icon="true">
      <ModalLoading v-if="isModalOpened('loading')" />
    </Modal>
    <h2 class="dashboard-about-title">Actualitzar Descripcio</h2>
    <form class="dashboard-about-form" v-on:submit="handleAboutSubmit">
      <DashboardEditImage
        :image="about.image"
        :is-loading="aboutInfoLoading"
        typeImg="about"
        @retrieveImageFile="updateImageFile"
      />
      <label class="text-container" v-for="(text, index) in about.text">
        <p>{{ index + 1 }}</p>
        <textarea
          :disabled="aboutInfoLoading"
          :id="`textarea-${index}`"
          :value="text"
          v-on:input="handleTextareaInput"
        />
      </label>
      <button class="edit-about-btn" type="submit">
        {{ aboutInfoLoading ? 'Actualitzant...' : 'Actualitzar' }}
        <IconLoader2 :size="15" class="loading-icon" v-if="aboutInfoLoading" />
      </button>
    </form>
  </section>
  <Toast
    v-if="toastState.open"
    :content="toastState.content"
    :type="toastState.type"
  />
</template>

<style>
.dashboard-about {
  display: grid;
  place-items: flex-start;
  justify-items: center;
  gap: 1rem;
  padding: 5rem;
  width: 100%;
  height: 100vh;
}
.dashboard-about-title {
  position: absolute;
  top: 0;
  font-family:
    cormorant,
    -apple-system,
    sans-serif !important;
  font-weight: 400 !important;
  color: #515151;
  font-size: 1.6rem;
}

.dashboard-about-form {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  background-color: var(--dashboard-white);
  width: 70%;
  height: fit-content;
  border-radius: var(--dashboard-min-radius);
  padding: 1rem;
  gap: 0.5rem;

  box-shadow: 0 0 3px 3px rgba(104, 104, 104, 0.082);
}

label {
  width: 100%;
  font-weight: bold;
  text-transform: capitalize;
  font-family: 'Open Sans', 'Helvetica Neue', sans-serif;
}

.text-container {
  display: flex;
  flex-direction: row;
}

textarea {
  font-family:
    cormorant,
    -apple-system,
    sans-serif !important;
  padding: 1rem;
  font-size: 1rem;

  height: 5.8rem;
  resize: none;
  color: rgb(31, 31, 31);
  width: 100%;
  border: 1px solid var(--dashboard-gray-super-light);
  caret-color: var(--dark);
  border-radius: 0.4rem;
}

textarea:disabled {
  border: none;
  padding: 1rem 0;
}

.edit-about-btn {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 1rem 3rem;

  border-radius: var(--dashboard-min-radius);
  border: none;
  box-shadow: var(--shadow-btn);
  color: white;
  font-family: 'Open Sans', 'Helvetica Neue', sans-serif;

  cursor: pointer;
}

.edit-about-btn {
  background: var(--dashboard-dark);
}

.edit-about-btn:hover {
  background: var(--dashboard-dark-light);
}

.loading-icon {
  animation: rotate 1s linear infinite;
}
</style>
