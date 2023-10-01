<script setup lang="ts">
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import { type ProjectDetail } from '../../core/types/data.types.ts';
import ProjectHeader from '../Project-header/Project-header.vue';
import ProjectGallery from '../Project-gallery/Project-gallery.vue';
import { DefaultProjectsService } from '../../core/services/projects.service';
import Toast from '../Toast/Toast.vue';
import { useToast } from '../../core/composables/useToast';

const route = useRoute();
const project = ref<ProjectDetail>();
const { toastState, manageToastState } = useToast();

onMounted(async () => {
  const id = route.params.id as string;
  const projectResponse = await new DefaultProjectsService().getProjectById(id);

  if ('status' in projectResponse) {
    manageToastState(projectResponse.status, '', 'Error carregant projectes');
  } else {
    project.value = projectResponse;
  }
});
</script>

<template>
  <article class="project-container" v-if="project">
    <ProjectHeader v-if="project" :project="project" />
    <ProjectGallery v-if="project" :project="project" />
  </article>
  <Toast
    v-if="toastState.open"
    :content="toastState.content"
    :type="toastState.type"
  />
</template>

<style scoped>
.project-container {
  width: 100vw;
  padding: 2rem 0;

  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
