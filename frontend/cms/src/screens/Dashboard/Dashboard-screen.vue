<script setup lang="ts">
import Dashboard from '../../components/Dashboard/Dashboard.vue';
import { Toaster } from 'vue-sonner';
</script>

<template>
  <section class="dashboard-view">
    <Dashboard />
    <Toaster />
  </section>
</template>

<style>
.dashboard-view {
  width: 100vw;
  display: flex;
  position: relative;
}

.dashboard-view p,
h1,
h2,
h3,
input,
label {
  color: rgb(110, 110, 110);
  font-weight: 300;
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    'Open Sans',
    'Helvetica Neue',
    sans-serif;
}
</style>
