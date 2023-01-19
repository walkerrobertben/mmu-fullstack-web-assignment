<template></template>
<script>
import { useMessage } from "naive-ui"
export default {
    mounted() {
        const toaster = useMessage();
        this.error = toaster.error;
    },
}

</script>