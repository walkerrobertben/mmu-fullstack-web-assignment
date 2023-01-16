<template>
	<div class="b-page-flexed">
		<div>
			<TopBar/>
			<router-view/>
		</div>
		<div>
			<n-divider/>
			<n-text style="display: block; width: 100%; margin-bottom: 20px; text-align: center;">MMU FSW BLOG</n-text>
		</div>
	</div>
</template>

<style>
:root {
	font-size: 16px;
	--b-page-width: 1200px;
}
p, a, span {
	font-size: inherit;
}


.b-page-flexed {
	min-height: 100vh;
	display: flex;
	flex-direction: column;
}
.b-page-flexed > div:nth-child(1) {
	flex-grow: 1;
}

.b-page-width {
	margin: 0 auto;
	width: var(--b-page-width);
}
@media only screen and (max-width: 1325px) {:root {--b-page-width: 924px}}
@media only screen and (max-width: 1024px) {:root {--b-page-width: 650px}}
@media only screen and (max-width: 700px) {:root {--b-page-width: calc(100% - 50px)}}
</style>

<script>
import TopBar from "./views/components/universal/topbar.vue"

export default {
	components: {TopBar}
}

</script>