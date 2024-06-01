<template>
    <div>
        <iframe :src="fileURL" type="application/pdf" frameBorder="0" scrolling="auto" height="900"
            width="100%"></iframe>
    </div>
</template>
<script>
import { store } from '../../vuex/store.js';

export default {
    computed: {
        fileURL() {
            //Get fileURL from Vuex store state.
            return store.state.fileURL;
        }
    }
}
</script>
<style scoped></style>