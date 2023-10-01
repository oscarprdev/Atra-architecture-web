<script setup lang="ts">
import { IconCheck } from '@tabler/icons-vue';
import Switch from '../Switch/Switch.vue';
import { IconCloudUpload } from '@tabler/icons-vue';

defineProps<{
  name: string | null;
  description: string | null;
  year: string | null;
  top: boolean;
  canCreateProject: boolean;
}>();

const emit = defineEmits<{
  (e: 'onInputChange', event: Event): void;
  (e: 'onCloseModal'): void;
  (e: 'onToggleSwitch'): void;
  (e: 'onSubmitForm', event: Event): void;
}>();
</script>

<template>
  <form class="form-container" @submit="(e: Event) => emit('onSubmitForm', e)">
    <label>
      <div class="input-title">
        Nom
        <p class="input-error" v-if="!name">
          * El nom del projecte es requerit
        </p>
        <IconCheck class="icon-check" v-else :size="17" />
      </div>

      <input
        id="name"
        :value="name"
        @input="(e: Event) => emit('onInputChange', e)"
      />
    </label>
    <label>
      <div class="input-title">
        Any
        <p class="input-error" v-if="!year">
          * El any del projecte es requerit
        </p>
        <p class="input-error" v-else-if="!Number(year)">
          * El valor del any deu ser un numero
        </p>
        <p class="input-error" v-else-if="Number(year) < 1980">
          * El valor del any deu ser mes gran que 1980
        </p>
        <p
          class="input-error"
          v-else-if="Number(year) > new Date().getFullYear() + 1"
        >
          {{
            `El valor del any deu ser menor que ${new Date().getFullYear() + 1}`
          }}
        </p>
        <IconCheck class="icon-check" v-else :size="17" />
      </div>

      <input
        id="year"
        :value="year"
        @input="(e: Event) => emit('onInputChange', e)"
      />
    </label>
    <label>
      <div class="input-title">
        Descripcio
        <p class="input-error" v-if="!description">
          * La descripcio del projecte es requerida
        </p>
        <IconCheck class="icon-check" v-else :size="17" />
      </div>

      <input
        id="description"
        :value="description"
        @input="(e: Event) => emit('onInputChange', e)"
      />
    </label>
    <label>
      Es un projecte destacat?
      <Switch :top="top" @on-toggle-switch="emit('onToggleSwitch')" />
    </label>
    <div class="buttons-wrapper">
      <button
        class="create-project-btn create-project-btn--cancel"
        @click="emit('onCloseModal')"
      >
        Cancelar
      </button>
      <button
        class="create-project-btn create-project-btn--create"
        type="submit"
        :disabled="!canCreateProject"
      >
        Crear projecte <IconCloudUpload />
      </button>
    </div>
  </form>
</template>

<style scoped>
.icon-check {
  animation: appearing 0.8s ease;
}

.form-container {
  margin-top: 3rem;
  width: 37%;
  height: 100%;
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

.input-title {
  display: flex;
  align-items: center;
  gap: 0.2rem;
}

.input-error {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 0.6rem;
  color: rgb(223, 0, 0);
  text-transform: none;
}

.buttons-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;
  width: 100%;
  margin-top: 1rem;
  gap: 1.5rem;
  height: fit-content;
}

.create-project-btn {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 1rem 2rem;

  border-radius: var(--dashboard-min-radius);
  border: none;
  color: white;
  font-family: 'Open Sans', 'Helvetica Neue', sans-serif;

  cursor: pointer;
}

.create-project-btn[disabled] {
  background: rgb(225, 225, 225);
  box-shadow: none;
}

.create-project-btn[disabled]:hover {
  cursor: not-allowed;
  background: rgb(225, 225, 225);
  box-shadow: none;
}

.create-project-btn--cancel {
  padding: 1.1rem 2.4rem;
  background: white;
  color: var(--dashboard-dark);
  border: 1px solid var(--dashboard-gray-light);
}

.create-project-btn--create {
  background: var(--dashboard-dark);
}

.create-project-btn--create:hover {
  background: var(--dashboard-dark-light);
}
</style>
