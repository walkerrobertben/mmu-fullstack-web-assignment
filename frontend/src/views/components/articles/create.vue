<template>
    <n-card>
        <n-space align="center" :size="24">
            <n-text style="display: inline-block; padding-top: 3px;">Create new article</n-text>
            <n-button type="primary" :round="true" @click="createArticle">
                <template #icon>
                    <n-icon>
                        <Plus/>
                    </n-icon>
                </template>
                <n-text style="padding-top:2px; color: inherit">New</n-text>
            </n-button>
        </n-space>
    </n-card>
</template>

<style scoped>
.n-card {
    margin-top: 1.25rem;
    margin-bottom: 1.25rem; 
}
</style>

<script>
import Plus from "../../assets/Plus.vue"

function createArticle() {
    
}

export default {
    methods: {createArticle},
    components: {Plus},
}
</script>