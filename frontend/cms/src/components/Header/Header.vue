<script setup lang="ts">
import { useRoute } from 'vue-router';
import { onMounted, ref, watch } from 'vue';
import HeaderDesktop from '../Header-desktop/Header-desktop.vue';
import HeaderMobile from '../Header-mobile/Header-mobile.vue';

const route = useRoute();
const path = ref('');

watch(route, async (route) => {
  path.value = route.fullPath;
});

onMounted(() => {
  path.value = window.location.hash.replace('#', '');
});
</script>

<template>
  <HeaderDesktop
    class="header-desktop"
    :path="path"
    v-if="path !== '/dashboard'"
  />
  <HeaderMobile
    class="header-mobile"
    :path="path"
    v-if="path !== '/dashboard'"
  />
</template>

<style scoped>
.header-mobile {
  display: none;
}

@media screen and (max-width: 630px) {
  .header-desktop {
    display: none;
  }

  .header-mobile {
    display: block;
  }
}
</style>
