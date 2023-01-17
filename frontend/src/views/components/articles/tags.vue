<template>
    <n-space justify="right" :size="8">
        <n-tag v-if="bShowWrote" type="warning">Your wrote this article</n-tag>
        <n-tag :type="bIsPrivate ? 'info' : 'primary'">{{ bIsPrivate ? 'Private' : 'Public' }}</n-tag>
        <n-button size="small" @click="editArticle">Edit</n-button>
    </n-space>
</template>

<script>
function editArticle() {
    this.$router.push(`/article/${this.bArticleId}/edit`);
}

export default {
    props: {
        bArticleId: Number,
        bShowWrote: Boolean,
        bIsPrivate: Boolean,
    },
    methods: {editArticle}
}
</script>