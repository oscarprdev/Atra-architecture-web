<script setup lang="ts">
import Loader from '../Loader/Loader.vue';
</script>

<template>
  <section class="modal-loading">
    <Loader />
    <p>Carregant informacio...</p>
  </section>
</template>

<style>
.modal-loading {
  margin-top: 1rem;
  padding: 3rem;
  display: grid;
  place-items: center;
  width: fit-content;
  height: fit-content;
}
</style>
