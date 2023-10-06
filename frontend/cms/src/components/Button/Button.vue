<script setup lang="ts">
const props = defineProps<{
  content: string;
  type: 'button' | 'submit' | 'reset' | undefined;
}>();
</script>

<template>
  <button :type="props.type">
    <span>
      {{ props.content }}
    </span>
    <slot name="icon" />
  </button>
</template>

<style scoped>
button {
  align-self: center;
  font-size: 1rem;
  padding: 1.2rem 0;
  width: 100%;
  cursor: pointer;
  text-transform: uppercase;
  position: relative;
  overflow: hidden;
  background-color: var(--bg-gray);
  color: var(--dark);
  border: 1px solid var(--dark);

  transition: color 0.4s ease;
}

button::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
  background-color: rgba(33, 33, 33, 0.4);
  transform: translateY(100%);
  transition-delay: 0.5s;
  transition: transform 0.3s linear;
  z-index: 0;
}

button:hover::after {
  transform: translateY(0%);
}

button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
  background-color: rgba(33, 33, 33, 0.53);
  transform: translateY(100%);
  transition: transform 0.6s linear;
  z-index: 0;
}

button:hover::before {
  transform: translateY(0%);
}

span {
  position: relative;
  z-index: 1;
  transition: color 0.6s linear;
}

button:hover span {
  color: #fff;
}
</style>
