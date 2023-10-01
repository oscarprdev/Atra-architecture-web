<script setup lang="ts">
import { IconPhotoPlus, IconSquareRoundedX } from '@tabler/icons-vue';
import { ref } from 'vue';

defineProps<{
  images: string[];
  mainImage: string | null;
}>();

const emit = defineEmits<{
  (e: 'onInputMainImageChange', event: Event): void;
  (e: 'onUploadMainImage', event: Event): void;
  (e: 'onInputImageChange', event: Event): void;
  (e: 'onUploadImage', event: Event): void;
  (e: 'onRemoveImage', image: string): void;
}>();

const uploadImage = ref<HTMLInputElement | null>(null);
const uploadMainImage = ref<HTMLInputElement | null>(null);

const onUploadImage = (e: Event, isMain?: boolean) => {
  e.preventDefault();

  if (isMain && uploadMainImage.value) {
    uploadMainImage.value.click();
  }

  if (!isMain && uploadImage.value) {
    uploadImage.value.click();
  }
};
</script>

<template>
  <div class="images-section">
    <figure class="main-image-wrapper">
      <input
        class="input-image"
        type="file"
        ref="uploadMainImage"
        @change="(e: Event) => emit('onInputMainImageChange', e)"
      />
      <p class="input-error main-image-error" v-if="!mainImage">
        * La imatge principal es requerida
      </p>
      <img v-if="mainImage" :src="mainImage" alt="project main image" />
      <button
        v-if="mainImage"
        @:click="(e: Event) => onUploadImage(e, true)"
        class="upload-image-btn main-btn"
      >
        <IconPhotoPlus />
      </button>
      <span v-else class="default-image">
        <div class="default-image-content">
          <p>Imatge principal</p>
          <button
            @:click="(e: Event) => onUploadImage(e, true)"
            class="upload-image-btn"
          >
            <IconPhotoPlus />
          </button>
        </div>
      </span>
    </figure>
    <section v-if="images" class="images-list">
      <figure
        v-if="images.length > 0"
        v-for="image in images"
        class="image-wrapper"
      >
        <img :src="image" alt="project image" />
        <span class="remove-icon" @click="emit('onRemoveImage', image)">
          <IconSquareRoundedX color="white" :size="32" />
        </span>
      </figure>
      <span v-if="images.length < 10" class="default-image-item">
        <p class="input-error image-error" v-if="images.length === 0">
          * Minim una imatge es requerida
        </p>
        <input
          class="input-image"
          type="file"
          multiple
          ref="uploadImage"
          @change="(e: Event) => emit('onInputImageChange', e)" />
        <button @:click="onUploadImage" class="upload-image-btn">
          <IconPhotoPlus /></button
      ></span>
    </section>
  </div>
</template>

<style scoped>
.images-section {
  width: 45%;
  height: 100%;
  padding: 1rem;

  display: flex;
  flex-direction: column;
  align-items: center;
}

.input-error {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 0.6rem;
  color: rgb(223, 0, 0);
  text-transform: none;
}

.main-image-error {
  right: 1rem;
}

.image-error {
  top: auto;
  left: 0;
  right: 0;
  bottom: -1.7rem;
  width: 10rem;
}

.input-image {
  display: none;
}

.main-image-wrapper {
  position: relative;
  display: grid;
  place-items: center;
  height: 40%;
  width: 85%;
  border-radius: 0.5rem;
  overflow: hidden;
}

.default-image {
  width: 100%;
  height: 100%;
  border: 1px dashed orangered;
  border-radius: 0.5rem;

  display: grid;
  place-items: center;

  transition: all 0.2s ease;
}

.default-image-item {
  position: relative;
  width: 30%;
  height: 25%;
  border: 1px dashed orangered;
  border-radius: 0.5rem;

  display: grid;
  place-items: center;

  transition: all 0.2s ease;
}

.image-wrapper {
  position: relative;
  width: 30%;
  height: 25%;
  overflow: hidden;
  margin: 0;
  border-radius: 0.5rem;
}

.main-btn {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
}

.default-image:hover .default-image-item:hover {
  background-color: rgb(255, 247, 231);
}

.default-image-content {
  display: grid;
  place-items: center;
}

.upload-image-btn {
  display: grid;
  place-items: center;
  padding: 0.4rem;
  border-radius: var(--dashboard-radius);
  border: none;
  box-shadow: var(--shadow-btn);
  color: white;
  cursor: pointer;

  background: var(--dashboard-dark);
}

.images-list {
  position: relative;
  width: 100%;
  height: 60%;
  padding: 0 2rem;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 1rem;
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

.image-wrapper:hover .remove-icon {
  opacity: 1;
}
</style>
