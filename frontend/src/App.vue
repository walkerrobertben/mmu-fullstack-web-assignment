<template>
	<n-config-provider :theme-overrides="{ common: { fontWeightStrong: '600' } }">
		<n-loading-bar-provider>
			<n-message-provider>
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
			</n-message-provider>
		</n-loading-bar-provider>
	</n-config-provider>
</template>

<style>
:root {
	font-size: 16px;
	--b-page-width: 1200px;

	overflow-y: scroll;
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
import TopBar from "./views/components/navigation/topbar.vue"

export default {
	components: {TopBar}
}
</script>