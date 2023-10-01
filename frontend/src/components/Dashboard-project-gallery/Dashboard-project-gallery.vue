<script setup lang="ts">
import { ref } from 'vue';
import DashboardEditImage from '../Dashboard-edit-image/Dashboard-edit-image.vue';
import { IconPhotoPlus, IconSquareRoundedX } from '@tabler/icons-vue';
import Toast from '../Toast/Toast.vue';
import { useToast } from '../../core/composables/useToast';

const MAX_NUM_IMAGES = 18;

const props = defineProps<{
  currentImages: string[];
  mainImage: string;
  isLoding: boolean;
}>();

const emit = defineEmits<{
  (e: 'onNewImageUploaded', image: File): void;
  (e: 'onRemoveCurrentImage', index: number): void;
  (e: 'onRetrieveMainImage', image: File): void;
}>();

const previewNewImages = ref<string[]>([]);
const uploadImage = ref<HTMLInputElement | null>(null);

const { toastState, manageToastState } = useToast();

const removeImageFromCurrentImages = (currentImage: string) => {
  const index = props.currentImages.findIndex((i) => i === currentImage);
  if (typeof index === 'number') {
    emit('onRemoveCurrentImage', index);
  }
};

const removeImageFromNewImages = (newImage: string) => {
  const index = previewNewImages.value?.findIndex((i) => i === newImage);
  if (typeof index === 'number') {
    previewNewImages.value?.splice(index, 1);
  }
};

const onRemoveImage = (e: Event, image: string) => {
  e.preventDefault();

  const currentImageToRemove = props.currentImages.find(
    (currentImage) => currentImage === image
  );
  const newImageToRemove = previewNewImages.value?.find(
    (previewImage) => previewImage === image
  );

  if (currentImageToRemove) {
    removeImageFromCurrentImages(currentImageToRemove);
  }

  if (newImageToRemove) {
    removeImageFromNewImages(newImageToRemove);
  }
};

const onRetrieveMainImage = (image: File) => emit('onRetrieveMainImage', image);

const onUploadProjectImage = () => {
  if (uploadImage.value) {
    uploadImage.value.click();
  }
};

const onInputImageChange = (e: Event) => {
  const totalImages =
    props.currentImages.length + previewNewImages.value.length;

  if (totalImages < MAX_NUM_IMAGES) {
    const inputElement = e.target as HTMLInputElement;
    const files: FileList | null = inputElement.files;

    if (files) {
      Object.values(files).forEach((file: File) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const imageUrl = reader.result as string;

          previewNewImages.value.push(imageUrl);

          emit('onNewImageUploaded', file);
        };
      });
    } else {
      manageToastState(
        400,
        '',
        "No s'ha pogut carregar la imatge, torna a intentar-ho"
      );
    }
  } else {
    manageToastState(400, '', 'Maxim 14 imatges per projecte');
  }
};
</script>

<template>
  <section class="gallery-edit-images-card">
    <input
      type="file"
      multiple
      ref="uploadImage"
      class="input-file"
      @change="onInputImageChange"
    />
    <button
      class="upload-image-btn"
      type="button"
      @click="onUploadProjectImage"
    >
      Carregar imatge <IconPhotoPlus />
    </button>
    <section class="project-gallery">
      <DashboardEditImage
        v-if="mainImage"
        :is-loading="isLoding"
        :edit-disabled="false"
        :image="mainImage"
        @retrieve-image-file="onRetrieveMainImage"
        typeImg="main"
      />
      <article
        v-if="currentImages.concat(previewNewImages).length > 0"
        ref="projectImage"
        class="project-image-container"
        v-for="image in currentImages.concat(previewNewImages)"
      >
        <img :src="image" alt="project image" />
        <span class="remove-icon" @click="(e) => onRemoveImage(e, image)">
          <IconSquareRoundedX color="white" :size="32" />
        </span>
      </article>
    </section>
  </section>
  <Toast
    v-if="toastState.open"
    :content="toastState.content"
    :type="toastState.type"
  />
</template>

<style scoped>
.gallery-edit-images-card {
  display: flex;
  align-items: start;
  justify-content: space-between;
  flex-wrap: wrap;
  position: relative;

  overflow: hidden;

  width: 70%;
  height: 100%;
  border-radius: var(--dashboard-min-radius);
  padding: 1rem;

  box-shadow: 0 0 3px 3px rgba(104, 104, 104, 0.082);
}

.upload-image-btn {
  display: flex;
  align-items: center;
  gap: 0.3rem;

  position: absolute;
  top: 1rem;
  right: 1.3rem;

  padding: 1rem 2.5rem;
  border-radius: var(--dashboard-min-radius);
  border: none;
  box-shadow: 0 0 3px 3px rgba(90, 90, 90, 0.11);
  color: white;

  background: var(--dashboard-dark);

  cursor: pointer;
}

.upload-image-btn:hover {
  background: var(--dashboard-dark-light);
}
.project-gallery {
  display: flex;
  align-items: end;
  flex-wrap: wrap;
  width: 100%;

  gap: 0.3rem;
}

.input-file {
  display: none;
}

.project-image-container {
  position: relative;
  border-radius: var(--dashboard-min-radius);
  height: 13vh;
  width: calc(var(--width-main-edit-image) / 2 - 0.15rem);
  overflow: hidden;
  animation: appearing 0.3s ease forwards;
}

.remove-icon {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  display: grid;
  place-items: center;
  background-color: rgba(0, 0, 0, 0.353);
  opacity: 0;
  transition: opacity 0.3s ease;
  cursor: pointer;
  z-index: 3;
}

.project-image-container:hover .remove-icon {
  opacity: 1;
}
</style>
