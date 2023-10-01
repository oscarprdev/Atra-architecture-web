<script setup lang="ts">
import {
  sendEmail,
  type SendEmailInput,
} from '../../core/services/email-service.ts';
import { reactive } from 'vue';
import { type PersonalInfo } from '../../core/types/data.types.ts';
import Button from '../Button/Button.vue';

const props = defineProps<{
  personalInfo: PersonalInfo;
}>();

interface Form {
  name: string;
  email: string;
  subject: string;
  content: string;
}

const contactForm = reactive<Form>({
  name: '',
  email: '',
  subject: '',
  content: '',
});

const handleChange = (e: Event): void => {
  const target = e.target as HTMLInputElement;
  const key = target?.id as keyof Form;
  contactForm[key] = target?.value;
};

const resetContactForm = (): void => {
  contactForm.name = '';
  contactForm.email = '';
  contactForm.subject = '';
  contactForm.content = '';
};

const handleContactSubmit = async (e: Event): Promise<void> => {
  e.preventDefault();

  const sendEmailInput: SendEmailInput = {
    to: props.personalInfo.email,
    from: contactForm.name,
    email: contactForm.email,
    subject: contactForm.subject,
    content: contactForm.content,
  };

  const response = await sendEmail(sendEmailInput);

  if (response) {
    resetContactForm();
  }
};
</script>

<template>
  <form
    class="contact__form"
    v-on:submit="(e: Event) => handleContactSubmit(e)"
  >
    <div class="contact__field">
      <label>
        Nom
        <input
          id="name"
          :value="contactForm.name"
          v-on:input="(e: Event) => handleChange(e)"
          required
        />
      </label>
      <label>
        Asumpte
        <input
          id="subject"
          :value="contactForm.subject"
          v-on:input="(e: Event) => handleChange(e)"
          required
        />
      </label>
      <label>
        Email
        <input
          class="email-input"
          id="email"
          type="email"
          :value="contactForm.email"
          v-on:input="(e: Event) => handleChange(e)"
          required
        />
      </label>
      <label>
        Missatge
        <textarea
          id="content"
          maxlength="500"
          :value="contactForm.content"
          v-on:input="(e: Event) => handleChange(e)"
          required
        />
      </label>
    </div>
    <Button content="Enviar email" type="submit" />
  </form>
</template>

<style scoped>
.contact__form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  font-size: clamp(1rem, 5vw, 1.5rem);
}

.contact__field {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
}

.email-input {
  text-transform: none;
}

input,
textarea {
  font-size: 1.2rem;
}

textarea {
  text-transform: capitalize;
  padding: 1rem;
  width: 100%;
  height: 12rem;
  resize: none;
  background-color: transparent;
  border: 1px solid var(--text-gray);
  color: var(--text-gray);
}

@media screen and (max-width: 1200px) {
  .contact__form {
    width: 100%;
  }
}

@media screen and (max-width: 550px) {
  .contact__form {
    width: 100%;
  }
}
</style>
