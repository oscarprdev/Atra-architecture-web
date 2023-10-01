<script setup lang="ts">
import { type PersonalInfo } from '../../core/types/data.types.ts';

const props = defineProps<{
  personalInfo: PersonalInfo;
}>();
</script>

<template>
  <article class="contact__info">
    <h2>{{ props.personalInfo.name }}</h2>
    <h3>{{ props.personalInfo.phone }}</h3>
    <h3>{{ props.personalInfo.email }}</h3>
    <a
      target="_blank"
      href="https://www.google.es/maps/place/C.+dels+Dolors,+37,+46500+Sagunt,+Val%C3%A8ncia/@39.6782503,-0.2788762,17z/data=!3m1!4b1!4m6!3m5!1s0xd601516b4710047:0x96451dfa8bae958d!8m2!3d39.6782462!4d-0.2763013!16s%2Fg%2F11c4mrv63c?entry=ttu"
      >{{ props.personalInfo.direction }}</a
    >
  </article>
</template>

<style scoped>
.contact__info {
  position: absolute;
  left: 50%;
  bottom: 2rem;
  z-index: 1;

  padding: 3rem;
  background-color: var(--dark);
  color: var(--text-gray);

  font-size: clamp(0.8rem, 2vw, 1.2rem);
  box-shadow: 0 0 10px 10px rgba(0, 0, 0, 0.096);
  animation: fade-left linear 0.4s;
}

a {
  color: var(--text-gray);
  font-family:
    vercetti,
    -apple-system,
    sans-serif;
}

@media screen and (max-width: 1200px) {
  .contact__info {
    align-self: center;
    margin-left: 0;
  }
}
</style>
