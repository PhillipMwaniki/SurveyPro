<script setup>
import PageComponent from "../components/PageComponent.vue";
</script>
<template>
    <PageComponent>
        <template v-slot="header">
            <div class="flex justify-between items-center">
                <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
                <div></div>
            </div>
        </template>
    </PageComponent>
</template>
<style scoped>

</style>
