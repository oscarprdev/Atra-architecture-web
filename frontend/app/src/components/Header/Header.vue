<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import HeaderDesktop from './Header-desktop.vue';
import HeaderMobile from './Header-mobile.vue';

const path = ref('');

watch(
    () => window.location,
    async (location) => {
        path.value = location.href;
    }
);

onMounted(() => {
    path.value = window.location.hash.replace('', '/');
});
</script>

<template>
    <HeaderDesktop
        class="header-desktop"
        :path="path"
    />
    <HeaderMobile
        class="header-mobile"
        :path="path"
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
