<template>
    <n-space justify="right" :size="8">
        <n-tag v-if="bShowWrote" type="warning">Your wrote this article</n-tag>
        <n-tag :type="bIsPrivate ? 'info' : 'primary'">{{ bIsPrivate ? 'Private' : 'Public' }}</n-tag>
        <n-tag>Edit</n-tag>
    </n-space>
</template>

<script>
export default {
    props: {
        bShowWrote: Boolean,
        bIsPrivate: Boolean,
    }
}
</script>