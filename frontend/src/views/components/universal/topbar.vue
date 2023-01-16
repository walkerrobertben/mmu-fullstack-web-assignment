<template>

	<n-config-provider>
		<div class="b-topbar">
			<n-space :size="16">

				<router-link to="/" class="b-li">
					<span>
						<n-text>Home</n-text>
						<span class="b-hover-underline"></span>
					</span>
				</router-link>

				<router-link to="/articles" class="b-li">
					<span>
						<n-text>Articles</n-text>
						<span class="b-hover-underline"></span>
					</span>
				</router-link>

				<LoginButton class="b-li"/>

			</n-space>

			<n-divider/>
		</div>
	</n-config-provider>
</template>

<style>

.b-topbar .n-space {
	margin: 1rem;
}

.b-topbar .n-divider{
	margin: 0;
}

.b-topbar .b-li {
	display: flex;
	align-items: center;

	padding: 1rem;

	font-size: 1rem;
	text-decoration: none;

}

.b-topbar .b-li > span {
	position: relative;
}

.b-topbar .b-li .b-hover-underline {
	position: absolute;
	
	left: 0;
	right: 0;
	bottom: 0;
	height: 2px;

	background-color: v-bind("themeVars.primaryColor");

	transform: scaleX(0);
	transform-origin: right center;
	
	transition-property: transform, height, bottom;
	transition-duration: .2s;
}

.b-topbar .b-li:hover .b-hover-underline, .b-topbar .b-li.router-link-active .b-hover-underline {
	transform: scaleX(1);
	transform-origin: left center;
}
</style>

<script>

import { useThemeVars } from 'naive-ui'
import LoginButton from "./loginbutton.vue"

export default {
  data() {
    return {
		themeVars: useThemeVars(),
	}
  },
  components: {LoginButton},
}
</script>