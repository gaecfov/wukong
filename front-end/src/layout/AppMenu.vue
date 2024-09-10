<script setup>
import AppMenuItem from '@/layout/AppMenuItem.vue';

const model = ref([
    {
        label: 'menu.system',
        items: [{ label: 'menu.user', icon: 'pi pi-user', to: '/users' }]
    }
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>
