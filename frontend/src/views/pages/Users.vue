<template>
    <div class="b-page-width">
		<Title b-text="User Management" :b-user-greeting="true"></Title>
	</div>
</template>

<script>
import Title from "../components/universal/title.vue"

export default {
    components: {Title} 
}
</script>