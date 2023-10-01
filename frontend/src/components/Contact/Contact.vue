<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';
import type {
  ContactFormData,
  PersonalInfo,
} from '../../core/types/data.types.ts';
import ContactForm from '../Contact-form/Contact-form.vue';
import ContactInfo from '../Contact-info/Contact-info.vue';
import { DefaultContactService } from '../../core/services/contact-service';

const contactImage = ref();

const personalInfo: Ref<PersonalInfo | null> = ref(null);

const formKeys: Ref<ContactFormData | null> = ref(null);
const buttonContent: Ref<string | null> = ref(null);

onMounted(async () => {
  personalInfo.value = await new DefaultContactService().getPersonalInfo();
  contactImage.value = await new DefaultContactService().getContactImage();

  formKeys.value = {
    name: 'Nom',
    surname: 'Cognom',
    subject: 'Asumpte',
    email: 'Email',
    content: 'Missatge',
  };
  buttonContent.value = 'enviar email';
});
</script>

<template>
  <h1 class="contact__title">Contacte</h1>
  <div class="contact__image-container">
    <img
      v-if="contactImage"
      :src="contactImage"
      alt="random background contact image"
    />
  </div>
  <div class="contact__container" v-if="personalInfo">
    <ContactInfo :personalInfo="personalInfo" />
    <ContactForm :personalInfo="personalInfo" />
  </div>
</template>

<style scoped>
.contact__title {
  color: var(--dark);
  font-size: clamp(3rem, 10vw, 8rem);
  text-transform: uppercase;
  z-index: 1;

  position: absolute;
  right: 10rem;
  top: 4rem;

  animation: fade-left ease-in-out 0.5s;
}

.contact__image-container {
  width: 40vw;
  height: 40rem;
  position: absolute;
  top: 12rem;
  left: 12rem;
}

.contact__container {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  gap: 3rem;

  margin-top: 20rem;

  padding: 3rem;
  width: 50vw;

  z-index: 1;

  background-color: var(--dark);
  color: var(--text-gray);

  animation: fade-bottom ease-in-out 0.5s;
}

@keyframes fade-left {
  0% {
    opacity: 0;
    transform: translateX(-1rem);
  }

  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fade-bottom {
  0% {
    opacity: 0;
    transform: translateY(2rem);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
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
