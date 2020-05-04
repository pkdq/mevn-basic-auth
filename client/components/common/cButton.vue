<template>
    <button 
        :disabled="loading"
        class="w-full text-sm mt-3 py-3 text-white rounded-sm focus:outline-none hover:bg-emerald-light"
        :class="{ 'bg-emerald': !loading, 'bg-emerald-light cursor-not-allowed': loading }"
        @click="$emit('click')"
    >
        <c-loader v-if="loading" />
        <span v-else>{{ label }}</span>
    </button>
</template>

<script>
import cLoader from '@components/common/cLoader.vue'

export default {
    name: 'cButton',
    props: {
        label: {
            type: String,
            required: true
        },
        loading: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    components: {
        cLoader
    }
}
</script>