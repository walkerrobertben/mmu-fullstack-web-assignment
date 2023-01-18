<template>
    <n-h1 class="b-page-title">
        {{ bText }}
    </n-h1>
</template>

<style scoped>
.n-h1 {
    padding-top: 1.25rem;
    margin-bottom: 1.25rem;
}
</style>

<script>
export default {
    props: {
        bText: String,
        bUserGreeting: Boolean,
    },
}
</script>