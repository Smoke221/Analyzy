<template>
    <div class="container">
      <div class="left-container">
        <fileSummary :style="{ maxHeight: '350px', overflowY: 'auto' }" />
        <AIChat :style="{ minHeight: '300px', overflowY: 'auto' }" />
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
    justify-content: space-around;
    gap: 1vw;
    height: auto;
    flex-wrap: wrap;
    padding: 10px;
}

.left-container {
    flex: 1;
    padding: 5px;
}

.right-container {
    flex: 2;
}
</style>