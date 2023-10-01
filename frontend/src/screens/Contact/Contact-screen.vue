<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

const Contact = defineAsyncComponent(
  async () => await import('../../components/Contact/Contact.vue')
);
</script>

<template>
  <section class="screen contact-screen">
    <Contact />
  </section>
</template>

<style scoped>
.contact-screen {
  margin-top: -2rem;
  padding-bottom: 5rem;
}
</style>
