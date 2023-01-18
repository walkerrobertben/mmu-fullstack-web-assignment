<template>
	<div>
		<div class="b-page-width">
			<Title b-text="Error 400" :b-user-greeting="true"></Title>
			<n-h2>Permission denied</n-h2>
		</div>
  </div>
</template>

<style scoped>
.n-h2 {
	margin: 0;
}
</style>

<script>
import Title from "../components/universal/title.vue"
export default {
	components: {Title},
}
</script>