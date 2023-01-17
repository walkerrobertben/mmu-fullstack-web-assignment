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
    
    // history.back();

    for (let i = this.links.length - 1; i >= 0; i--) {
        const link = this.links[i];
        if (link.to != undefined) {
            this.$router.push(link.to);
            break;
        }
    }
}

function nav_to(to) {
    if (to == null) return;
    this.$router.push(to);
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