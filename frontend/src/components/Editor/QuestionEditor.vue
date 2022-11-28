<script setup>
import { ref, computed } from "vue";
import { PlusIcon, TrashIcon } from '@heroicons/vue/24/solid';
import { v4 as uuidV4 } from 'uuid';
import store from "../../store";

const props = defineProps({
   question: Object,
    index: Number
});

const emit = defineEmits(['change', 'addQuestion', 'deleteQuestion']);

// Recreate the whole question data to avoid unintentional reference change
const model = ref(JSON.parse(JSON.stringify(props.question)));

const questionTypes = computed(() => store.state.questionTypes);

const upperCaseFirst = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

const shouldHaveOptions = () => {
    return ["select", "radio", "checkbox"].includes(model.value.type);
}

const getOptions = () => {
    return model.value.data.options;
}

const setOptions = (options) => {
    model.value.data.options = options;
}

const addOption = () => {
    setOptions([...getOptions(), { uuid: uuidV4(), text: ""}]);
    dataChange();
}

const removeOption = (option) => {
    setOptions(getOptions().filter((opt) => opt !== option));
    dataChange();
}

const typeChange = () => {
    if (shouldHaveOptions()) {
        setOptions(getOptions() || []);
    }
    dataChange();
}

const dataChange = () => {
    const data = JSON.parse(JSON.stringify(model.value));
    if (!shouldHaveOptions()) {
        delete data.data.options;
    }
    emit("change", data);
}

const addQuestion = () => {
    emit("addQuestion", props.index + 1);
}

const deleteQuestion = () => {
    emit("deleteQuestion", props.index);
}
</script>
<template>
    <!-- Question Index -->
    <div class="flex items-center justify-between">
        <h3 class="text-lg font-bold">
            {{ index + 1 }}. {{ model.question }}
        </h3>
        <div class="flex items-center">
            <button
                type="button"
                @click="addQuestion()"
                class="flex items-center text-xs py-1 px-3 mr-2 rounded-sm
                        text-white bg-gray-600 hover:bg-gray-700"
            >
                <PlusIcon class="h-4 w-4 mt-0.5 flex items-center" />
                Add
            </button>
            <button
                type="button"
                @click="deleteQuestion()"
                class="flex items-center text-xs py-1 px-3 mr-2 rounded-sm
                        border border-transparent text-red-500 hover:border-red-600"
            >
                <TrashIcon class="h-4 w-4 mt-0.5 flex items-center" />
                Delete
            </button>
        </div>
    </div>
    <!--/ Question Index -->
    <div class="grid gap-3 grid-cols-12">
        <div class="mt-3 col-span-9">
            <label
                :for="'question_text_' + model.data"
                class="block text-sm font-medium text-gray-700"
            >Question Text</label>
            <input
                type="text"
                :name="'question_text_' + model.data"
                :id="'question_text_' + model.data"
                v-model="model.question"
                @change="dataChange"
                class="mt-1 focus:ring-indigo-500 focus:border-indigo-500
                       block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            >
        </div>
        <div class="mt-3 col-span-3">
            <label
                :for="'question_text_' + model.data"
                class="block text-sm font-medium text-gray-700"
            >Select Question Type</label>

            <select
                name="question_type"
                id="question_type"
                v-model="model.type"
                @change="typeChange"
                class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md
                       shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
                <option v-for="type in questionTypes" :key="type" :value="type">{{ upperCaseFirst(type) }}</option>
            </select>
        </div>
    </div>
    <div class="mt-3 col-span-9">
        <label
            :for="'question_text_' + model.data"
            class="block text-sm font-medium text-gray-700"
        >Description</label>
        <textarea
            :name="'question_description_' + model.id"
            v-model="model.description"
            @change="dataChange"
            :id="'question_description_' + model.id"
            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500
                       block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        ></textarea>
    </div>
    <!--Data-->
    <div>
        <div v-if="shouldHaveOptions()" class="mt-2">
            <h4 class="text-sm font-semibold mb-1 flex justify-between items-center">
                Options
                <button
                    type="button"
                    @click="addOption()"
                    class=""
                >
                    <PlusIcon class="h-4 w-4 mt-0.5 flex items-center" />
                    Add Option
                </button>
            </h4>
            <div v-if="!model.data.options.length" class="text-xs text-gray-600 text-center py-3">
                You don't have any options defined
            </div>
            <div
                v-for="(option, index) in model.data.options"
                :key="option.uuid"
                class="flex items-center mb-1"
            >
               <span class="w-6 text-sm">{{ index + 1 }}</span>
                <input
                    type="text"
                    v-model="option.text"
                    @change="dataChange"
                    class="w-full rounded-sm py-1 px-2 text-xs border border-gray-300
                           focus:border-indigo-500"
                >
                <button
                    type="button"
                    @click="removeOption(option)"
                    class="h-6 w-6 rounded-full flex items-center justify-center border border-transparent
                           transition-colors hover:border-red-100"
                >
                    <TrashIcon class="h-4 w-4 mt-0.5 flex items-center text-color-red" />
                </button>
            </div>
        </div>
    </div>
    <hr class="my-4">
</template>
<style scoped>

</style>
