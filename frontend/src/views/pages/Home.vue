<template>
	<div class="b-page-width">
		
		
		<Title b-text="Welcome to the blog!" :b-user-greeting="true"></Title>

		<n-h2>MMU full stack web assignment</n-h2>
		<n-h3>Ben Walker</n-h3>
	</div>
</template>

<style scoped>
.n-h2, .n-h3 {
	margin: 0;
}
</style>

<script>
import UserGreeting from "../components/universal/usergreeting.vue"
import Title from "../components/universal/title.vue"

export default {
    components: {UserGreeting, Title} 
}
</script>