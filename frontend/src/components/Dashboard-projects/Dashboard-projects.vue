<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { DefaultProjectsService } from '../../core/services/projects.service.ts';
import { Project } from '../../core/types/data.types';
import Modal from '../Modal/Modal.vue';
import DashboardProjectDetail from '../Dashboard-project-detail/Dashboard-project-detail.vue';
import Loader from '../Loader/Loader.vue';
import ModalRemoveProject from '../Modal-remove-project/Modal-remove-project.vue';
import ModalLoading from '../Modal-loading/Modal-loading.vue';
import Toast from '../Toast/Toast.vue';
import { useToast } from '../../core/composables/useToast';
import { useModals } from '../../core/composables/useModals';
import { IconFolderPlus } from '@tabler/icons-vue';
import ModalCreateProject from '../Modal-create-project/Modal-create-project.vue';

const projects = ref<Project[]>();
const projectsLoading = ref(false);

const { toastState, manageToastState } = useToast();
const { modalState, openModal, isModalOpened, closeModal } = useModals();

const onOpenRemoveModal = ({ id, name }: { id: string; name: string }) => {
  openModal('remove-project', { id, projectName: name });
};
const onProjectRemoved = async (status: number) => {
  manageToastState(status, 'Projecte Eliminat', 'Error eliminant projecte');
  await updateProjectList();
};

const onUpdateProject = async (status: number) => {
  manageToastState(
    status,
    'Projectes actualitzats',
    'Error actualitzant projectes'
  );
  await updateProjectList();
};

const onProjectUploaded = async (status: number) => {
  closeModal('create-project');
  manageToastState(
    status,
    'Projecte creat correctament',
    'Error creant projecte'
  );
  await updateProjectList();
};

const updateProjectList = async () => {
  projects.value = await new DefaultProjectsService().getProjects();
};

onMounted(async () => {
  openModal('loading');
  projectsLoading.value = true;
  await updateProjectList();
  projectsLoading.value = false;
  closeModal('loading');
});
</script>

<template>
  <section class="dashboard-projects" id="projects-section">
    <header class="dashboard-projects-header">
      <h1>Projectes</h1>
      <button class="create-project-btn" @click="openModal('create-project')">
        Crear projecte <IconFolderPlus />
      </button>
    </header>
    <div class="loader-wrapper" v-if="projectsLoading">
      <Loader>
        <template #text>
          <p>Carregant projectes</p>
        </template>
      </Loader>
    </div>
    <article
      v-if="!projectsLoading"
      v-for="(project, index) in projects"
      :key="project.id"
      class="project-container"
    >
      <Dashboard-project-detail
        :project="project"
        :index="index"
        @on-open-remove-modal="onOpenRemoveModal"
        @on-project-update="onUpdateProject"
      />
    </article>
    <Modal
      v-if="isModalOpened()"
      @on-close-modal="closeModal()"
      :no-icon="isModalOpened('loading')"
    >
      <ModalLoading v-if="isModalOpened('loading')" />
      <ModalRemoveProject
        v-if="isModalOpened('remove-project')"
        :project-name="modalState.removeModal.projectName"
        :project-id="modalState.removeModal.id"
        @on-close-modal="closeModal('remove-project')"
        @on-update-project-list="onProjectRemoved"
      />
      <ModalCreateProject
        v-if="isModalOpened('create-project')"
        @on-close-modal="closeModal('create-project')"
        @on-project-uploaded="onProjectUploaded"
      />
    </Modal>
  </section>
  <Toast
    v-if="toastState.open"
    :content="toastState.content"
    :type="toastState.type"
  />
</template>

<style scoped>
.dashboard-projects-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

h1 {
  font-size: 1.6rem;
}

.loader-wrapper {
  display: grid;
  place-items: center;
  height: 100vh;
}

.loader-text {
  position: absolute;
  margin-top: -33rem;
}

.dashboard-projects {
  display: grid;
  place-items: center;
  justify-self: center;
  width: 80vw;
  height: 100vh;
  background-color: var(--dashboard-white);
  box-shadow: 0 0 5px 5px rgba(201, 201, 201, 0.295);
  color: black;
  padding: 1.5rem 2rem;
  overflow-y: scroll;
  border-radius: var(--dashboard-min-radius);
}

.project-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-top: 1rem;
  width: 100%;
  border-bottom: 1px solid var(--dashboard-gray-super-light);
}

.project-container:last-child {
  border-bottom: none;
}

.create-project-btn {
  display: flex;
  align-items: center;
  justify-self: end;
  gap: 0.3rem;
  padding: 0.9rem 1.5rem;

  border-radius: var(--dashboard-min-radius);
  border: none;
  box-shadow: 0 0 3px 3px rgba(90, 90, 90, 0.11);
  color: white;
  font-family: 'Open Sans', 'Helvetica Neue', sans-serif;

  cursor: pointer;
  background: var(--dashboard-dark);
}

.create-project-btn:hover {
  background: var(--dashboard-dark-light);
}
</style>
