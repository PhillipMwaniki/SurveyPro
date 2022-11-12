<script setup>
import PageComponent from "../components/PageComponent.vue";
import { IdentificationIcon } from '@heroicons/vue/24/solid'
import { useStore } from "vuex";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const store = useStore();
const route = useRoute();

let model = ref({
    title: '',
    status: false,
    description: null,
    image: null,
    expire_date: null,
    questions: [],
})

onMounted(() => {
    if (route.params.id) {
        model.value = store.state.surveys.find((s) => s.id === parseInt(route.params.id));
    }
})

const submit = () => {
    // save or update
}
</script>
<template>
    <PageComponent>
        <template v-slot:header>
            <div class="flex justify-between items-center">
                <h1 class="text-3xl font-bold text-gray-900">
                    {{ model.id ? model.title : 'Create a Survey' }}
                </h1>
            </div>
        </template>
        <form @submit.prevent="submit">
            <div class="shadow sm:rounded-md sm:overflow sm:overflow-hidden">
                <!-- Survey Fields -->
                <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                    <!-- Image -->
                    <div>
                        <label for="image" class="block text-sm font-medium text-gray-700">Image</label>
                        <div class="mt-1 flex items-center">
                            <img v-if="model.image" :src="model.image" :alt="model.title"
                                 class="w-64 h-48 obect-cover">
                            <span v-else class="flex items-center justify-center h-12 w-12
                                    rounded-full overflow-hideen bg-gray-100">
                                <IdentificationIcon class="h-[80%] w-[80%] text-gray-300" />
                            </span>
                            <button type="button"
                                    class="relative overflow-hidden ml-5 rounded-md border border-gray-300
                                        bg-white py-2 px-3 text-sm
                                        font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none
                                        focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                <input
                                    class="absolute left-0 top-0 right-0 bottom-0 opacity-0 cursor-pointer"
                                    type="file"
                                    name="file"
                                    id="file"
                                >
                                Change</button>
                        </div>
                    </div>
                    <!--/ Image -->
                    <!-- Title -->
                    <div>
                        <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            v-model="model.title"
                            autocomplete="survey_title"
                            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500
                                   block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        >
                    </div>
                    <!--/ Title -->
                    <!-- Description -->
                    <div>
                        <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
                        <div class="mt-1">
                            <textarea
                                type="text"
                                name="description"
                                id="description"
                                rows="3"
                                v-model="model.description"
                                autocomplete="survey_description"
                                placeholder="Describe your survey"
                                class="mt-1 focus:ring-indigo-500 focus:border-indigo-500
                                   block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                        </div>
                    </div>
                    <!--/ Description -->
                    <!-- Expire Date -->
                    <div>
                        <label for="expire_date" class="block text-sm font-medium text-gray-700">Expire Date</label>
                        <input
                            type="date"
                            name="expire_date"
                            id="expire_date"
                            v-model="model.expire_date"
                            autocomplete="survey_expire_date"
                            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500
                                   block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        >
                    </div>
                    <!--/ Expire Date -->
                    <!-- Status -->
                    <div class="flex items-start">
                        <div class="flex items-center h-5">
                            <input
                                type="checkbox"
                                name="status"
                                id="status"
                                v-model="model.status"
                                autocomplete="survey_status"
                                class="focus:ring-indigo-500 h-4 w-4
                                   block border-gray-300 rounded"
                            >
                        </div>
                        <div class="ml-3 text-sm">
                            <label for="status" class="block text-sm font-medium text-gray-700">Status</label>
                        </div>
                    </div>
                    <!--/ Status -->
                </div>
                <!--/ Survey Fields -->
            </div>
        </form>
    </PageComponent>
</template>
<style scoped>

</style>
