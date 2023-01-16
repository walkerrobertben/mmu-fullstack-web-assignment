<template>
	<TopBar/>
	<router-view/>

	<n-divider/>
	<n-text style="display: block; width: 100%; margin-bottom: 20px; text-align: center;">MMU FSW BLOG</n-text>
</template>

<style>
:root {
	font-size: 16px;
	--b-page-width: 1200px;
}
p, a, span {
	font-size: inherit;
}

.b-rem-spacer {
	width: 100%;
	height: 1rem;
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