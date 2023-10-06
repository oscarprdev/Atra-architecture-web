<script setup lang="ts">
import { ref } from 'vue';
import { Project } from '../../core/types/data.types';
import DashboardProjectEdit, {
  OnOpenRemoveModalinput,
} from '../Dashboard-project-edit/Dashboard-project-edit.vue';

defineProps<{
  project: Project;
  index: number;
}>();

const emit = defineEmits<{
  (e: 'onOpenRemoveModal', input: OnOpenRemoveModalinput): void;
  (e: 'onProjectUpdate', status: number): void;
}>();

const projectIndex = ref<number | null>(null);

const expandProjectDetail = (e: MouseEvent, index: number) => {
  e.preventDefault();
  e.stopPropagation();

  projectIndex.value = typeof projectIndex.value === 'number' ? null : index;
  const scrollSection = document.getElementById('projects-section');
  const projectHeader = document.getElementById('project-detail-header');

  if (scrollSection && projectHeader) {
    const headerHeight = projectHeader.getBoundingClientRect().height;
    const scrollPosition = e.clientY - e.offsetY - 20;

    setTimeout(() => {
      scrollSection.scrollBy({
        top:
          scrollPosition < headerHeight / 1.5 ? e.offsetY * -1 : scrollPosition,
        behavior: 'smooth',
      });
    }, 150);
  }
};

const onProjectIsUpdated = (status: number) => {
  projectIndex.value = null;
  emit('onProjectUpdate', status);
};

const onOpenRemoveModal = (input: OnOpenRemoveModalinput) =>
  emit('onOpenRemoveModal', input);
</script>

<template>
  <header
    id="project-detail-header"
    :class="`project-container-header ${
      projectIndex === index && 'header-active'
    }`"
    @:click="(e: MouseEvent) => expandProjectDetail(e, index)"
  >
    <div class="project-info">
      <p>{{ index + 1 }}</p>
      <figure class="image-container">
        <img :src="project.mainImage" alt="project image" />
      </figure>
      <p>{{ project.name }}</p>
      <p>{{ project.year }}</p>
    </div>
    <span
      :class="`expand-icon ${
        projectIndex === index ? 'expand-icon--opened' : 'expand-icon--closed'
      }`"
    />
  </header>
  <section
    :class="`project-edit ${
      projectIndex === index ? 'project-edit--opened' : 'project-edit--closed'
    }`"
  >
    <Dashboard-project-edit
      v-if="projectIndex === index"
      :project-id="project.id"
      @on-open-remove-modal="onOpenRemoveModal"
      @on-project-update="onProjectIsUpdated"
    />
  </section>
</template>

<style scoped>
.project-container-header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 4rem;
  gap: 3rem;

  padding: 3rem 1rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

.project-container-header:hover {
  background-color: rgb(241, 241, 241);
}

.header-active {
  background-color: rgb(232, 231, 231);
}

.project-container-header::before {
  position: absolute;
  content: '';
  width: 4px;
  height: 100%;
  background-color: #afafaf;
  top: 0;
  left: 0;
  opacity: 0;
  z-index: 10;
}

.project-container-header:hover.project-container-header::before {
  opacity: 1;
}

.project-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.project-info p {
  color: rgb(110, 110, 110);
  font-weight: 300;
}

.image-container {
  height: 5rem;
  width: 5rem;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid var(--text-gray);
}

.expand-icon {
  width: 3rem;
  height: 3rem;
  cursor: pointer;
  position: relative;
}

.expand-icon::before {
  position: absolute;
  content: '';
  width: 100%;
  height: 1px;
  background-color: var(--dashboard-gray-light);
  top: 50%;
}

.expand-icon::after {
  position: absolute;
  content: '';
  width: 1px;
  height: 100%;
  background-color: var(--dashboard-gray-light);
  left: 50%;
  transform: rotate(0deg);
  transition: transform 0.5s ease;
}

.expand-icon.expand-icon--opened::after {
  transform: rotate(-90deg);
  animation: expand-icon-opened 0.6s ease forwards;
}

.project-edit {
  position: relative;
  width: 100%;
}

.project-edit--opened {
  animation: project-opened 0.5s ease forwards;
}

.project-edit--closed {
  animation: project-closed 0.5s ease forwards;
}

@keyframes project-opened {
  from {
    height: 1rem;
  }

  to {
    height: 80vh;
  }
}

@keyframes project-closed {
  from {
    height: 80vh;
  }

  to {
    height: 1rem;
    display: none;
  }
}

@keyframes expand-icon-opened {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>
