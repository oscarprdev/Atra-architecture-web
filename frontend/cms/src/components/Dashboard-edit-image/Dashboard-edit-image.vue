<script setup lang="ts">
import Loader from '../Loader/Loader.vue';
import { onMounted, ref, watch } from 'vue';
import { IconPhotoEdit } from '@tabler/icons-vue';

const props = defineProps<{
  isLoading: boolean;
  image: string;
  typeImg: 'about' | 'main' | 'list';
}>();

const prevImage = ref<string | null>();
const uploadImage = ref<HTMLInputElement | null>(null);

const emit = defineEmits<{
  retrieveImageFile: [file: File];
}>();

watch(
  () => props.image,
  (image) => {
    prevImage.value = image;
  }
);

const onEditImage = (e: Event) => {
  e.preventDefault();
  if (uploadImage.value) {
    uploadImage.value.click();
  }
};
const onInputImageChange = (e: Event) => {
  const inputElement = e.target as HTMLInputElement;
  const file = inputElement.files?.[0];

  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      prevImage.value = reader.result as string;
    };

    emit('retrieveImageFile', file);
  }
};

onMounted(() => {
  prevImage.value = props.image;
});
</script>

<template>
  <article :class="`dashboard-image-container ${props.typeImg}`">
    <div v-if="props.isLoading" class="image-skeleton">
      <Loader />
    </div>
    <div class="image-wrapper" v-if="!props.isLoading && prevImage">
      <img :src="prevImage" alt="Project image" />
    </div>
    <input
      class="input-image"
      type="file"
      ref="uploadImage"
      v-on:change="(e) => onInputImageChange(e)"
    />
    <button
      v-if="!props.isLoading"
      v-on:click="(e) => onEditImage(e)"
      class="edit-image-btn"
    >
      <IconPhotoEdit />
    </button>
  </article>
</template>

<style>
.dashboard-image-container {
  align-self: center;
  position: relative;
}

.image-wrapper {
  overflow: hidden;
  height: 12rem;
  border: 1px solid black;
}

.main {
  width: var(--width-main-edit-image);
  overflow: hidden;
  border-radius: var(--dashboard-min-radius);
}

.image-skeleton {
  width: 30rem;
  height: 12rem;
  border: 1px solid rgb(238, 238, 238);
  background-color: rgb(232, 232, 232);

  display: grid;
  place-items: center;
}

.input-image {
  display: none;
}

.edit-image-btn {
  position: absolute;
  bottom: 0.5rem;
  left: 0.5rem;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.4rem;
  border-radius: var(--dashboard-radius);
  border: none;
  box-shadow: var(--shadow-btn);
  color: white;
  cursor: pointer;
  border: 1px solid white;
  background: var(--dashboard-dark);
}
</style>
