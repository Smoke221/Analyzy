<template>
    <displayFile />
</template>
<script>
import displayFile from "./sectionsOfAnalyzePage/DisplayFile.vue";
import fileSummary from "./sectionsOfAnalyzePage/fileSummary.vue";
import AIChat from "./sectionsOfAnalyzePage/AIChat.vue"

export default {
    components: {
        displayFile,
        fileSummary,
        AIChat,
    },
}
</script>
<style scoped></style>