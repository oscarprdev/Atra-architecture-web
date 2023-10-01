<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  path: string;
}>();

const headerActive = ref(false);

const handleIcon = (): void => {
  headerActive.value = !headerActive.value;
};
</script>

<template>
  <header :class="`${headerActive && 'header-active'}`">
    <div
      :class="`${
        headerActive
          ? 'hamburguer-container ham-active'
          : 'hamburguer-container'
      }`"
      @click="handleIcon"
    >
      <span class="hamburguer-top" />
      <span class="hamburguer" />
      <span class="hamburguer-bottom" />
    </div>
    <ul v-if="headerActive" class="header-mobile__list-links">
      <li @click="handleIcon">
        <router-link v-if="props.path !== '/'" to="/">Inici</router-link>
      </li>
      <li @click="handleIcon">
        <router-link
          to="/projects"
          :class="`${props.path === '/projects' && 'active'}`"
          >Projectes</router-link
        >
      </li>
      <li @click="handleIcon">
        <router-link
          to="/about"
          :class="`${props.path === '/about' && 'active'}`"
          >Qui som</router-link
        >
      </li>
      <li @click="handleIcon">
        <router-link
          to="/contact"
          :class="`${props.path === '/contact' && 'active'}`"
          >Contacte</router-link
        >
      </li>
    </ul>
  </header>
</template>

<style scoped>
header {
  position: sticky;
  display: flex;
  align-items: end;
  width: 100vw;
  padding: 0;
  z-index: 3;

  opacity: 1;
}

.header-active {
  height: 100vh;
  position: sticky;
}

.hamburguer-container {
  width: 2rem;
  height: 2rem;
  position: absolute;
  top: 2rem;
  right: 3rem;
  cursor: pointer;

  z-index: 1;
}

.hamburguer-container span {
  width: 100%;
  height: 2px;
  background-color: var(--dark);
  transition: 0.4s;
}

.hamburguer-top {
  position: absolute;
}

.hamburguer {
  position: absolute;
  top: 0.6rem;
}

.hamburguer-bottom {
  position: absolute;
  top: 1.2rem;
}

.ham-active .hamburguer-top {
  transform: translate(0, 9px) rotate(-45deg);
}

.ham-active .hamburguer {
  opacity: 0;
}

.ham-active .hamburguer-bottom {
  transform: translate(0, -9px) rotate(45deg);
}

.header-mobile__list-links {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 2rem;
  font-size: 1.5rem;
  padding: 7rem 2rem;
  width: 100vw;
  height: 100vh;
  margin: 0;

  background-color: var(--bg-gray);

  opacity: 0;

  animation: header-fade 0.2s linear forwards;
}

a {
  cursor: pointer;
  font-size: 1.5rem;
  position: relative;
  color: var(--dark);
}

a:before {
  content: '';
  width: 3rem;
  height: 2px;
  background-color: var(--dark);
  position: absolute;
  bottom: -5px;
  left: 0;
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 0.3s ease;
}

a:hover:before {
  transform: scaleX(1);
}

@keyframes header-fade {
  0% {
    opacity: 0;
    transform: translateX(10rem);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
