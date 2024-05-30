<template>
    <div>
        <iframe :src="fileURL" type="application/pdf" frameBorder="0" scrolling="auto" height="900"
            width="100%"></iframe>
    </div>
</template>
<script>
export default {
    props: {
        fileURL: {
            type: String,
            required: true
        }
    }
}
</script>
<style scoped></style>