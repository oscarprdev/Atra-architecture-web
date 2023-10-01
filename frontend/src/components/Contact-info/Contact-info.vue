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
  align-self: start;
  margin-left: 5rem;

  font-size: clamp(0.8rem, 2vw, 1.2rem);
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
