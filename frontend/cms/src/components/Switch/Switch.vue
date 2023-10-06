<script setup lang="ts">
import { IconX, IconCheck } from '@tabler/icons-vue';

defineProps<{
  top: boolean;
}>();

const emit = defineEmits<{
  (e: 'onToggleSwitch'): void;
}>();
</script>

<template>
  <div
    :class="`switch-container ${top ? 'switch-container--active' : ''}`"
    @click="emit('onToggleSwitch')"
  >
    <span :class="`switch ${top ? 'switch--active' : ''}`" />
    <template v-if="top">
      <IconCheck class="switch-icon switch-top" />
    </template>
    <template v-else>
      <IconX class="switch-icon" />
    </template>
  </div>
</template>

<style scoped>
.switch-container {
  width: 4rem;
  height: 2rem;
  background: linear-gradient(
    0deg,
    rgba(191, 191, 191, 1) 0%,
    rgba(94, 94, 94, 1) 100%
  );

  position: relative;
  padding: 0.1rem;
  border-radius: 5rem;
  cursor: pointer;
}

.switch-container--active {
  background: var(--dashboard-dark);
}
.switch {
  width: 1.7rem;
  height: 1.7rem;

  border-radius: 50%;

  position: absolute;
  top: 0.15rem;
  left: 0.17rem;
  background: linear-gradient(
    0deg,
    rgba(230, 230, 230, 1) 0%,
    rgba(255, 255, 255, 1) 100%
  );
  transition: 0.3s ease;
}

.switch--active {
  transform: translateX(1.9rem);
}

.switch-icon {
  position: absolute;
  right: 0.5rem;
  top: 0.3rem;
  color: white;
}

.switch-top {
  right: 2rem;
}
</style>
