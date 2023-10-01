<script setup lang="ts">
import { defineAsyncComponent, onMounted, ref, type Ref } from 'vue';
import { type Project } from '../../core/types/data.types.ts';
import { DefaultProjectsService } from '../../core/services/projects.service';
import Toast from '../../components/Toast/Toast.vue';
import { useToast } from '../../core/composables/useToast';

const Projects = defineAsyncComponent(
  async () => await import('../../components/Projects/Projects.vue')
);
const { toastState, manageToastState } = useToast();
const projects: Ref<Project[] | []> = ref([]);

onMounted(async () => {
  const projectsResponse = await new DefaultProjectsService().getProjects();

  if ('status' in projectsResponse) {
    manageToastState(projectsResponse.status, '', 'Error carregant projectes');
  } else {
    projects.value = projectsResponse;
  }
});
</script>

<template>
  <section class="screen projects-screen">
    <Projects v-if="projects" :projects="projects" />
  </section>
  <Toast
    v-if="toastState.open"
    :content="toastState.content"
    :type="toastState.type"
  />
</template>

<style scoped>
.projects-screen {
  max-width: 100vw;
  padding: 5rem 0 0;
}
</style>
