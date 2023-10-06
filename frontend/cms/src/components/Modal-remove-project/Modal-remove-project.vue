<script setup lang="ts">
import { ref } from 'vue';
import { DefaultAdminService } from '../../core/services/admin-service';
import Loader from '../Loader/Loader.vue';

const props = defineProps<{
  projectId: string;
  projectName: string;
}>();

const emit = defineEmits<{
  (e: 'onCloseModal'): void;
  (e: 'onUpdateProjectList', status: number): void;
}>();

const isRemoving = ref(false);

const onRemoveProject = async () => {
  isRemoving.value = true;

  const status = await new DefaultAdminService().removeProjectById({
    id: props.projectId,
  });

  emit('onCloseModal');
  emit('onUpdateProjectList', status);
  isRemoving.value = false;
};
</script>

<template>
  <section class="remove-project-modal">
    <template v-if="!isRemoving">
      <p>
        Estas segur que vols eliminar el projecte de
        <b>{{ props.projectName }}</b> ?
      </p>
      <div class="buttons-wrapper">
        <button class="modal-btn cancel-btn" @click="emit('onCloseModal')">
          No
        </button>
        <button class="modal-btn remove-btn" @click="onRemoveProject">
          Si, estic segur
        </button>
      </div>
    </template>
    <template v-else-if="isRemoving">
      <div class="loader-wrapper">
        <Loader />
        Eliminant projecte
      </div>
    </template>
  </section>
</template>

<style scoped>
.remove-project-modal {
  display: grid;
  place-items: center;

  width: fit-content;
  height: 30vh;

  padding: 3rem 2rem;
}

.loader-wrapper {
  display: grid;
  place-items: center;
  height: 7rem;
}

.buttons-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;
  width: 70%;
  gap: 1rem;
  height: fit-content;
}

.modal-btn {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.8rem 1.2rem;

  border-radius: var(--dashboard-min-radius);
  border: none;
  /* box-shadow: var(--shadow-btn); */
  color: white;
  font-family: 'Open Sans', 'Helvetica Neue', sans-serif;

  cursor: pointer;
}

.cancel-btn {
  padding: 0.8rem 3rem;
  background-color: white;
  color: var(--dashboard-dark);
  border: 1px solid var(--dashboard-gray-light);
}

.remove-btn {
  background: var(--dashboard-dark);
}

.remove-btn:hover {
  background: var(--dashboard-dark-light);
}
</style>
