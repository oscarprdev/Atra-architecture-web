<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';
import type { PersonalInfo } from '../../core/types/data.types.ts';
import ContactInfo from '../Contact-info/Contact-info.vue';
import { DefaultContactService } from '../../core/services/contact-service';
import Image1 from '../../assets/images/contact.webp';

const contactImage = Image1;

const personalInfo: Ref<PersonalInfo | null> = ref(null);

onMounted(async () => {
  personalInfo.value = await new DefaultContactService().getPersonalInfo();
});
</script>

<template>
  <div class="contact__container" v-if="personalInfo">
    <figure class="contact-image-wrapper">
      <img :src="contactImage" alt="contact image" />
    </figure>
    <ContactInfo :personalInfo="personalInfo" />
  </div>
</template>

<style scoped>
.contact__container {
  position: relative;

  padding: 1rem 3rem;
  width: 100vw;
  height: 100vh;
}

.contact-image-wrapper {
  position: absolute;
  width: 50vw;
  top: 5rem;
  left: 2rem;
  position: relative;
  z-index: 1;
  animation: fade-right linear 0.4s;
}

.contact-image-wrapper img {
  box-shadow: 0 0 10px 10px rgba(0, 0, 0, 0.096);
}

.contact-image-wrapper::after {
  position: absolute;
  z-index: -1;
  top: 5rem;
  left: 5rem;
  content: '';
  width: 50vw;
  height: 80vh;
  background-color: var(--hero-image-light);
}

@media screen and (max-width: 1200px) {
  .contact__container {
    width: 80vw;
    margin-top: 0;
  }

  .contact__title {
    margin-top: 5rem;
    color: #fff;
    position: relative;
    right: 0;
  }

  .contact__image-container {
    width: 100vw;
    height: 40rem;
    position: absolute;
    top: 7rem;
    left: 0;
  }
}

@media screen and (max-width: 550px) {
  .contact__container {
    width: 95vw;
    padding: 1rem;
    margin-top: 0;
  }

  .contact__title {
    margin-top: 8rem;
    color: #fff;
    position: relative;
    top: 0;
    right: 0;
  }

  .contact__image-container {
    width: 100vw;
    height: 40rem;
    position: absolute;
    top: 7rem;
    left: 0;
  }
}
</style>
