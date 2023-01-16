<template>
    <n-h1>{{ bText }}</n-h1>
</template>

<style scoped>
.n-h1 {
    margin-top: 1.25rem;
    margin-bottom: 1.25rem;
}
</style>

<script>
export default {
    props: {
        bText: String
    }
}
</script>