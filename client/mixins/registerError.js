export default {
    methods: {
        setErrors(error) {
            Object.keys(error.response.data).forEach(field => {
                this.errors.add({
                    field,
                    msg: error.response.data[field]
                })
            })
        }
    }
}