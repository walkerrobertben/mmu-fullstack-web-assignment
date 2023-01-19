<template></template>
<script>
import { useLoadingBar } from "naive-ui"
export default {
    mounted() {
        const loader = useLoadingBar();
        
        this.start = () => {
            loader.start();
        };
        
        this.finish = (success) => {
            if (success) {
                loader.finish();
            } else {
                loader.error();
            }
        };
    },
}
</script>