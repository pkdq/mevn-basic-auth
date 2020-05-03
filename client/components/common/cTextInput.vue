<template>
    <input 
        :type="type"
        :value="value"
        @input="$emit('input', $event.target.value)"
        class="w-full text-sm bg-brown-lightest p-3 focus:outline-none text-brown mb-3" 
        :placeholder="placeholder">
</template>

<script>
export default {
    name: 'cTextInput',
    props: {
        placeholder: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: false,
            default: 'text'
        },
        value: {
            type: String,
            required: false,
            default: ''
        }
    },
}
</script>