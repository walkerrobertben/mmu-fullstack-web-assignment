<template>
	<TopBar/>
	<router-view/>
</template>

<style>
:root {
	font-size: 16px;
}
p, a, span {
	font-size: inherit;
}
</style>

<script>
import TopBar from "./views/components/universal/topbar.vue"
export default {
	components: {TopBar} 
}
</script>