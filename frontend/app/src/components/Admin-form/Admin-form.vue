<script setup lang="ts">
import { reactive } from 'vue';
import { submitForm } from '../../services/submit-form';

interface AdminForm {
    email: string;
    password: string;
}

const adminForm = reactive<AdminForm>({
    email: '',
    password: ''
});

const handleChange = (e: Event): void => {
    const target = e.target as HTMLInputElement;
    const key = target?.id as keyof AdminForm;
    adminForm[key] = target?.value;
};

const handleSubmit = async (e: Event): Promise<void> => {
    e.preventDefault();

    const form = {
        email: adminForm.email,
        password: adminForm.password
    };

    const response = await submitForm(form);

    if (response) {
        const newTab = window.open(
            'https://atra-architecture-frontend.vercel.app/#/dashboard',
            '_blank'
        );

        if (newTab) {
            newTab.focus();
        }
    }
};
</script>

<template>
    <form
        v-on:submit="(e: Event) => handleSubmit(e)"
        class="bg-[var(--dark)] shadow-lg rounded-sm border-[var(--dark)] border px-20 py-10 w-[90vw] max-w-md"
    >
        <div class="mb-4">
            <label
                for="email"
                class="block text-[var(--light)] text-sm mb-2"
            >
                <p class="text-[20px]">Email</p>
            </label>
            <input
                type="email"
                id="email"
                required
                class="text-[20px] shadow bg-transparent appearance-none border border-[var(--light)] rounded-sm w-full py-2 px-3 text-[var(--light)] leading-tight focus:outline-none focus:shadow-outline"
                v-on:input="(e: Event) => handleChange(e)"
            />
        </div>
        <div class="mb-6">
            <label
                for="password"
                class="text-[20px] block text-[var(--light)] text-sm mb-2"
            >
                <p class="text-[20px]">Contrasenya</p>
            </label>
            <input
                type="password"
                id="password"
                required
                class="text-[20px] shadow bg-transparent appearance-none border border-[var(--light)] rounded-sm w-full py-2 px-3 text-[var(--light)] leading-tight focus:outline-none focus:shadow-outline"
                v-on:input="(e: Event) => handleChange(e)"
            />
        </div>
        <div class="flex items-center justify-center">
            <button
                type="submit"
                class="text-[20px] bg-[var(--light)] hover:bg-[var(--dark)] border hover:text-[var(--light)] hover:border hover:border-[var(--light)] text-[var(--dark)] py-2 px-24 rounded focus:outline-none focus:shadow-outline transition-all duration-200"
            >
                Entrar
            </button>
        </div>
    </form>
</template>
