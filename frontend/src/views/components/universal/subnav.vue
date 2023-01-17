<template>
    <n-breadcrumb>
        <n-breadcrumb-item v-if="back" @click="nav_back"><n-icon><BackArrow/></n-icon></n-breadcrumb-item>
        <n-breadcrumb-item v-for="link in links" @click="() => {nav_to(link.to)}">{{ link.name }}</n-breadcrumb-item>
    </n-breadcrumb>
</template>

<style scoped>
.n-breadcrumb {
    margin-top: 1.5rem;
}
</style>

<script>
import BackArrow from "../../assets/BackArrow.vue"

function nav_back() {
    //this.$router.go(-1);
    history.back();
}

function nav_to(link) {
    if (link == null) return;
    this.$router.push(link);
}

export default {
    props: {
        back: Boolean,
        links: Array
    },
    components: {BackArrow},
    methods: {nav_back, nav_to}
}
</script>