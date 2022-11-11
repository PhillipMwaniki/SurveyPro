<script setup>
import PageComponent from "../components/PageComponent.vue";
import { PlusIcon } from '@heroicons/vue/24/solid'

</script>
<template>
    <PageComponent>
        <template v-slot="header">
            <div class="flex justify-between items-center">
                <h1 class="text-3xl font-bold text-gray-900">Surveys</h1>
                <router-link :to="{ name: 'surveys.create'}"
                             class="py-2 px-3 text-white bg-emerald-500 rounded-md hover:bg-emerald-600">
                    <PlusIcon class="h-4 w-4 inline-block"/> Survey
                </router-link>
            </div>
        </template>
    </PageComponent>
</template>
<style scoped>

</style>
