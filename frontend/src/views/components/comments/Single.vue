<template>
    <n-space :size="16">
        <n-text depth="3">{{ comment.date_published }}</n-text>
        <n-text style="white-space: pre">{{ comment.comment_text }}</n-text>
    </n-space>
</template>

<script>
export default {
    props: {
        comment: Object,
    },
}
</script>