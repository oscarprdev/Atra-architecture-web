<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

const props = defineProps<{
  path: string;
}>();

const isHeaderLight = ref(false);

const handleScroll = () => {
  if (window.scrollY > 500) {
    isHeaderLight.value = false;
  }

  if (props.path === '/' && window.scrollY < 500) {
    isHeaderLight.value = true;
  }
};

watch(
  () => props.path,
  (path) => {
    isHeaderLight.value = path === '/';
  }
);

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});
</script>

<template>
  <header>
    <ul>
      <li>
        <router-link :light="isHeaderLight" v-if="props.path !== '/'" to="/"
          >Inici</router-link
        >
      </li>
      <li>
        <router-link
          to="/projects"
          :light="isHeaderLight"
          :class="`${props.path === '/projects' && 'active'}`"
          >Projectes</router-link
        >
      </li>
      <li>
        <router-link
          to="/about"
          :light="isHeaderLight"
          :class="`${props.path === '/about' && 'active'}`"
          >Qui som</router-link
        >
      </li>
      <li>
        <router-link
          to="/contact"
          :light="isHeaderLight"
          :class="`${props.path === '/contact' && 'active'}`"
          >Contacte</router-link
        >
      </li>
    </ul>
  </header>
</template>

<style scoped>
header {
  position: fixed;
  display: flex;
  align-items: center;
  width: 100vw;
  z-index: 3;
  padding: 1rem 5rem;

  opacity: 0;
  background: linear-gradient(
    rgba(58, 32, 33, 0.24),
    rgba(53, 30, 31, 0.08) 50px,
    rgba(51, 29, 30, 0) 100px
  );
  animation: fade-left 0.7s linear forwards;
}

ul {
  display: flex;
  align-items: center;
  justify-content: end;
  gap: clamp(1rem, 2vw, 2rem);
  width: 100%;
}

li {
  display: flex;
  flex-direction: column;
}

.active:before {
  content: '';
  width: 3rem;
  height: 1px;
  background-color: var(--dark);
  position: absolute;
  bottom: -5px;
  left: 0;
  transform: scaleX(1);
  transform-origin: left center;
  transition: transform 0.3s ease;
}

a {
  cursor: pointer;
  font-size: clamp(1rem, 5vw, 2rem);
  position: relative;
  color: var(--dark);
}

a::before {
  content: '';
  width: 3rem;
  height: 1px;
  background-color: var(--dark);
  position: absolute;
  bottom: -5px;
  left: 0;
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 0.3s ease;
}

a:hover::before {
  transform: scaleX(1);
}

a[light='true'] {
  color: white;
}

a[light='true']::before {
  background-color: white;
}
</style>
