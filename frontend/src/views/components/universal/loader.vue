<template></template>
<script>
import { useLoadingBar } from "naive-ui"
export default {
    mounted() {
        const loader = useLoadingBar();

        let n = 0;
        
        this.start = () => {
            if (n == 0) {
                loader.start();
            }
            n += 1;
        };
        
        this.finish = (success) => {
            n -= 1;
            if (n == 0) {
                if (success) {
                    loader.finish();
                } else {
                    loader.error();
                }
            }
        };
    },
}
</script>