<template></template>
<script>
import { useMessage } from "naive-ui"
export default {
    mounted() {
        const toaster = useMessage();
        
        this.error = (msg) => {
            toaster.error(msg);
        };
    },
}
</script>