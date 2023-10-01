<script setup lang="ts">
import DashboardPersonal from '../Dashboard-personal/Dashboard-personal.vue';
import DashboardAbout from '../Dashboard-about/Dashboard-about.vue';
import DashboardNav from '../Dashboard-nav/Dashboard-nav.vue';
import DashboardProjects from '../Dashboard-projects/Dashboard-projects.vue';
import { reactive } from 'vue';

export interface DashboardView {
  personal: boolean;
  about: boolean;
  projects: boolean;
}

const dashboardView = reactive<DashboardView>({
  personal: true,
  about: false,
  projects: false,
});

const toggleDashboardView = (view: string) => {
  Object.keys(dashboardView).forEach((key) => {
    const dashboardKey = key as keyof DashboardView;
    dashboardView[dashboardKey] = dashboardKey === view;
  });
};
</script>

<template>
  <DashboardNav
    :dashboardView="dashboardView"
    @toggleView="toggleDashboardView"
  />
  <aside>
    <DashboardPersonal v-if="dashboardView.personal" />
    <DashboardAbout v-if="dashboardView.about" />
    <DashboardProjects v-if="dashboardView.projects" />
  </aside>
</template>

<style scoped>
aside {
  display: grid;
  place-items: start;
  background-color: var(--dashboard-bg);
  font-weight: 300;
  width: 100%;
  font-family:
    system-ui,
    -apple-system,
    Roboto !important;
}
</style>
