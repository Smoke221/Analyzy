<template>
    <div class="container">
        <div class="left-container">
            <fileSummary />
            <AIChat />
        </div>
        <div class="right-container">
            <displayFile />
        </div>
    </div>
</template>

<script>
import displayFile from "./sectionsOfAnalyzePage/DisplayFile.vue";
import fileSummary from "./sectionsOfAnalyzePage/fileSummary.vue";
import AIChat from "./sectionsOfAnalyzePage/AIChat.vue";

export default {
    components: {
        displayFile,
        fileSummary,
        AIChat,
    },
};
</script>

<style scoped>
.container {
    display: flex;
    justify-content: space-between;
    height: 100vh;
}

.left-container {
    flex: 1;
}

.right-container {
    flex: 2;
}

.right-container iframe {
    height: 100%;
    width: 100%;
}
</style>