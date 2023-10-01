<script setup lang="ts">
import { useRouter } from 'vue-router';
import Button from '../Button/Button.vue';
import type { DashboardView } from '../Dashboard/Dashboard.vue';
import { IconId } from '@tabler/icons-vue';
import { IconFileDescription } from '@tabler/icons-vue';
import { IconListDetails } from '@tabler/icons-vue';
import { IconKey } from '@tabler/icons-vue';
import { IconLogout } from '@tabler/icons-vue';

const props = defineProps<{
  dashboardView: DashboardView;
}>();

const router = useRouter();

const handleCloseSession = async (): Promise<void> => {
  document.cookie = 'false';
  await router.push('/');
};

const emit = defineEmits<{
  toggleView: [view: string];
}>();
</script>

<template>
  <nav>
    <ul class="nav-list">
      <li class="nav-header"><h2>ATRA</h2></li>
      <li
        :class="`nav-item ${props.dashboardView.personal && 'active'}`"
        v-on:click="emit('toggleView', 'personal')"
      >
        <IconFileDescription /> Informacio personal
      </li>
      <li
        :class="`nav-item ${props.dashboardView.about && 'active'}`"
        v-on:click="emit('toggleView', 'about')"
      >
        <IconId /> Descripcio
      </li>
      <li
        :class="`nav-item ${props.dashboardView.projects && 'active'}`"
        v-on:click="emit('toggleView', 'projects')"
      >
        <IconListDetails />
        Projectes
      </li>
      <li class="nav-item">
        <IconKey />
        Admin
      </li>
    </ul>
    <button class="logout-btn" v-on:click="handleCloseSession">
      <IconLogout /> Tancar sessio
    </button>
  </nav>
</template>

<style>
nav {
  display: flex;
  align-items: start;
  flex-direction: column;
  padding: 1rem 0 3rem;
  justify-content: space-between;
  font-size: 1.3rem;
  height: 100vh;
  border-right: 1px solid black;

  background-color: var(--dark);
  color: white;
}

.nav-list {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  gap: 0.8rem;
  width: 18vw;

  text-align: center;
}

.nav-header {
  display: flex;
  flex-direction: column;
  font-size: clamp(0.7rem, 5vw, 1rem);
  padding: 0 1rem;
  margin-bottom: 2rem;
  height: 5rem;
  position: relative;
  margin-left: -1.4rem;
}

.nav-header h2 {
  color: white;
}

.nav-header::after {
  content: '';
  width: 10rem;
  height: 1px;
  background-color: rgb(131, 131, 131);
  margin-top: 3rem;

  position: absolute;
  bottom: 0;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  cursor: pointer;
  font-size: clamp(0.7rem, 5vw, 1rem);
  position: relative;

  color: rgb(131, 131, 131);
  width: 100%;
  padding: 0 1rem;
  height: 4rem;
  margin-left: -1.4rem;
  border-radius: 0.3rem;

  font-family:
    system-ui,
    -apple-system,
    Roboto !important;
  transition: all 0.2s ease;
}

.nav-item:hover {
  color: white;
  background-color: rgba(131, 131, 131, 0.158);
}

.active {
  color: white;
  background-color: rgba(131, 131, 131, 0.158);
}

.logout-btn {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0 2rem;
  background-color: transparent;
  border: none;

  color: rgb(131, 131, 131);
  font-family: 'Open Sans', 'Helvetica Neue', sans-serif;

  cursor: pointer;
}

.logout-btn:hover {
  color: white;
}
</style>
