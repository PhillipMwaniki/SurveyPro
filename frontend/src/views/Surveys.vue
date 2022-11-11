<script setup>
import PageComponent from "../components/PageComponent.vue";
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/vue/24/solid'
import store from '../store';
import { computed} from "vue";
const surveys = computed(() => store.state.surveys);

const deleteSurvey = (survey) => {
    if (confirm(`Are you sure? This actions can't be undone`)) {
        // delete survey
    }
}
</script>
<template>
    <PageComponent>
        <template v-slot:header>
            <div class="flex justify-between items-center">
                <h1 class="text-3xl font-bold text-gray-900">Surveys</h1>
                <router-link :to="{ name: 'surveys.create'}"
                             class="py-2 px-3 text-white bg-emerald-500 rounded-md hover:bg-emerald-600">
                    <PlusIcon class="h-4 w-4 inline-block"/> Survey
                </router-link>
            </div>
        </template>
        <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
            <div
                v-for="survey in surveys"
                :key="survey.id"
                class="flex flex-col py-4 px-6 shadow-md bg-white hover:bg-gray-50 h-[470px]">
                <img :src="survey.image" :alt="survey.description" class="w-full h-48 object-cover">
                <h4 class="mt-4 text-lg font-bold">{{ survey.title }}</h4>
                <div v-html="survey.description" class="overflow-hidden flex-1"></div>
                <div class="flex justify-between items-center mt-3">
                    <router-link
                        :to="{ name: 'surveys.create', params: { id: survey.id }}"
                        class="flex py-2 px-4 border border-transparent text-sm
                        rounded-md text-white bg-indigo-600 hover:bg-indigo-600
                        focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    ><PencilIcon class="h-4 w-4 mr-2 mt-1"/> Edit</router-link>
                    <button v-if="survey.id" type="button"
                            @click="deleteSurvey(survey)"
                            class="h-8 w-8 flex items-center rounded-full border border-transparent
                             text-sm text-red-500 focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                        <TrashIcon class="h-6 w-6"/>
                    </button>
                </div>
            </div>
        </div>
    </PageComponent>
</template>
<style scoped>

</style>
