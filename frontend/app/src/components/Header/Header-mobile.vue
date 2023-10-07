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
                headerActive ? 'hamburguer-container ham-active' : 'hamburguer-container'
            }`"
            @click="handleIcon"
        >
            <span class="hamburguer-top" />
            <span class="hamburguer" />
            <span class="hamburguer-bottom" />
        </div>
        <transition name="fade">
            <ul
                v-if="headerActive"
                class="header-mobile__list-links"
            >
                <li @click="handleIcon">
                    <a
                        v-if="props.path !== '/'"
                        href="/"
                        >Inici</a
                    >
                </li>
                <li @click="handleIcon">
                    <a
                        href="/projects"
                        :class="`${props.path === '/projects' && 'active'}`"
                        >Projectes</a
                    >
                </li>
                <li @click="handleIcon">
                    <a
                        href="/about"
                        :class="`${props.path === '/about' && 'active'}`"
                    >
                        Qui som
                    </a>
                </li>
                <li @click="handleIcon">
                    <a
                        href="/contact"
                        :class="`${props.path === '/contact' && 'active'}`"
                        >Contacte</a
                    >
                </li>
            </ul>
        </transition>
    </header>
</template>

<style scoped>
header {
  position: fixed;
  display: flex;
  align-items: end;
  width: 100vw;
  padding: 0;
  z-index: 3;
}

.header-active {
  height: 100vh;
  width: 100%;
  position: fixed;
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

  background-color: var(--light);

  /* animation: header-fade 0.2s linear forwards; */
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


.fade-enter-active,
.fade-enter {
  animation: header-fade-in 0.2s linear forwards;
}

.fade-leave-active, .fade-leave-to {
  animation: header-fade-out 0.2s linear forwards;
}

@keyframes header-fade-in {
  0% {
    opacity: 0;
    transform: translateX(10rem);
  }

  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes header-fade-out {
  0% {
    opacity: 1;
    transform: translateX(0);
  }

  100% {
    opacity: 0;
    transform: translateX(10rem);
  }
}
</style>
