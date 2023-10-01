<script setup lang="ts">
import { ProjectDetail } from '../../core/types/data.types';
import Switch from '../Switch/Switch.vue';

defineProps<{
  project: ProjectDetail;
}>();
const emit = defineEmits<{
  (e: 'onInputChange', a: Event): void;
  (e: 'onToggleSwitch'): void;
}>();
</script>

<template>
  <h3 class="form-card-title">Informacio del projecte</h3>
  <label>
    Nom
    <input
      id="name"
      :value="project.name"
      v-on:input="(e) => emit('onInputChange', e)"
    />
  </label>
  <label>
    Any
    <slot name="year-input-error" />
    <input
      id="year"
      :value="project.year"
      @input="(e) => emit('onInputChange', e)"
    />
  </label>
  <label>
    Descripcio
    <input
      id="description"
      :value="project.description"
      @input="(e) => emit('onInputChange', e)"
    />
  </label>
  <label>
    Projecte destacat
    <Switch :top="project.top" @on-toggle-switch="emit('onToggleSwitch')" />
  </label>
</template>

<style scoped>
.form-card-title {
  color: rgb(27, 27, 27);
  font-weight: bold;
  font-family: 'Open Sans', 'Helvetica Neue', sans-serif;
}

label {
  position: relative;
  width: 100%;
  font-weight: bold;
  text-transform: capitalize;
  margin-top: 1rem;
  font-family: 'Open Sans', 'Helvetica Neue', sans-serif;
}

input {
  color: rgb(31, 31, 31);
  width: 100%;
  border: 1px solid var(--image-border-brown);
  caret-color: var(--dark);
  border-radius: var(--dashboard-min-radius);
  font-family: 'Open Sans', 'Helvetica Neue', sans-serif;
}
</style>
