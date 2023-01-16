<template>
	<div class="b-form-container">
		<n-card>
			<LoginForm/>
		</n-card>
	</div>
</template>

<style>
.b-form-container {

	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	margin: auto;

	display: flex;
	justify-content: center;
  	align-items: center;

	max-width: 20rem;
	height: calc(100vh - 6rem);
	padding: 3rem;

	pointer-events: none;
}
.b-form-container > * {
	pointer-events: auto;
}
</style>

<script>
import LoginForm from "../components/forms/login.vue"

export default {
	components: {LoginForm} 
}
</script>