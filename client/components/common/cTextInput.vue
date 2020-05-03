<template>
    <div class="mb-3">
        <input 
        :type="type"
        :name="name"
        :value="value"
        @input="$emit('input', $event.target.value)"
        @change="$emit('input', $event.target.value)"
        @focus="$emit('focus')"
        @blur="$emit('blur')"
        class="w-full text-sm bg-brown-lightest p-3 focus:outline-none text-brown" 
        :placeholder="placeholder">

        <span class="text-red-500 text-sm" v-if="error">{{ error }}</span>
    </div>
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
        },
        name: {
            type: String,
            required: true
        },
        error: {
            type: String,
            required: false
        }
    },
}
</script>