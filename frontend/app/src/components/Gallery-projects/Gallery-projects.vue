<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getProjectsByTop } from '../../services/get-project-top';
import { Project } from '../../types/project.type';

type GalleryProjects = Pick<
    Project,
    'id' | 'name' | 'mainImage' | 'description' | 'year'
>[];
const projects = ref<GalleryProjects>();

onMounted(async () => {
    projects.value = await getProjectsByTop();
});
</script>

<template>
    <section
        class="flex flex-col items-center w-[90vw] gap-[2.5rem]"
        v-if="projects"
    >
        <article
            v-for="(project, index) in projects"
            :key="project.id"
            class="flex flex-col items-center gap-5 w-full md:flex-row md:mb-[8rem] md:first-of-type:mt-10 md:relative md:even:flex-row-reverse"
        >
            <div class="relative w-full md:w-[40vw]">
                <figure
                    class="object-cover w-full h-[30vh] overflow-hidden md:w-[40vw] md:h-[60vh]"
                >
                    <img
                        :src="project.mainImage"
                        alt="project image"
                        class="w-full h-full"
                    />
                </figure>
                <span
                    class="absolute w-full h-[30vh] bg-[var(--image-contrast)] top-[0.5rem] right-[-0.5rem] z-[-1] md:w-[40vw] md:h-[60vh] md:top-[2rem] md:right-[-2rem]"
                ></span>
            </div>
            <div
                :class="{ 'md:items-end md:ml-0 md:mr-20': index % 2 === 1 }"
                class="flex flex-col items-center gap-5 relative md:items-start md:ml-20 md:w-[40vw]"
            >
                <p class="text-4xl md:text-[3rem]">{{ project.name }}</p>
                <p class="text-[20px] text-center md:text-[1.7rem] md:text-left">
                    {{ project.description }}
                </p>
                <p
                    :class="{ 'md:right-[4rem] md:left-auto': index % 2 === 1 }"
                    class="absolute bottom-[-4rem] text-[4rem] text-[var(--dark-light)] md:text-[8rem] md:bottom-[-7rem] md:left-[4rem]"
                >
                    {{ project.year }}
                </p>
            </div>
            <div
                :class="{ 'md:left-[5rem] md:right-auto': index % 2 === 1 }"
                class="mt-[2rem] flex flex-col items-center md:absolute md:bottom-0 md:right-[5rem]"
            >
                <a
                    :href="`projecte/${project.id}`"
                    class="text-[var(--dark-smooth)] hover:text-[var(--dark)] text-[30px md:text-[40px]"
                    >Veure mes</a
                >
                <span
                    class="mt-[0.5rem] h-[1px] w-[20vw] bg-gradient-to-r from-transparent via-[var(--dark-smooth)] to-transparent"
                ></span>
            </div>
        </article>
    </section>
</template>
