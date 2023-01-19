<template></template>
<script>
import { useLoadingBar } from "naive-ui"
export default {
    mounted() {
        
        let n = 0;
        this.loader = useLoadingBar();
        
        this.start = () => {
            if (n == 0) {
                this.loader.start();
            }
            n += 1;
        };
        
        this.finish = (success) => {
            n -= 1;
            if (n == 0) {
                if (success) {
                    this.loader.finish();
                } else {
                    this.loader.error();
                }
            }
        };
    },
    unmounted() {
        if (this.loader) {
            this.loader.finish();
        }
    },
}
</script>