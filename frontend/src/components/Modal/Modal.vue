<script setup lang="ts">
import { IconX } from '@tabler/icons-vue';
import { onMounted } from 'vue';

defineProps<{
  noIcon?: boolean;
}>();

const emit = defineEmits<{
  (e: 'onCloseModal'): void;
}>();

onMounted(() => {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      emit('onCloseModal');
    }
  });
});
</script>

<template>
  <div class="modal-backdrop">
    <div class="modal">
      <IconX v-if="!noIcon" class="close-icon" @:click="emit('onCloseModal')" />
      <slot></slot>
    </div>
  </div>
</template>

<style>
.modal-backdrop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(58, 58, 58, 0.3);

  display: grid;
  place-items: center;
  z-index: 10;

  backdrop-filter: blur(3px);
}

.modal {
  max-width: 900px;
  max-height: 1000px;
  background-color: white;
  display: grid;
  place-items: center;
  opacity: 0;

  position: relative;
  overflow: hidden;

  animation: appearing 0.3s ease forwards;
}

.close-icon {
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
  color: black;
}
</style>
