<template>

	<n-config-provider>
		<div class="b-topbar">
			<n-space :size="16">

				<router-link to="/">
					<span>
						<n-text>Home</n-text>
						<span class="b-hover-underline"></span>
					</span>
				</router-link>

				<router-link to="/articles">
					<span>
						<n-text>Articles</n-text>
						<span class="b-hover-underline"></span>
					</span>
				</router-link>

				<router-link to="/login">
					<span>
						<n-text>Login</n-text>
						<span class="b-hover-underline"></span>
					</span>
				</router-link>
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

.b-topbar a {
	display: flex;
	align-items: center;

	padding: 1rem;

	font-size: 1.5rem;
	text-decoration: none;

}

.b-topbar a > span {
	position: relative;
}

.b-topbar a .b-hover-underline {
	position: absolute;
	
	left: 0;
	right: 0;
	bottom: 0;
	height: 3px;

	background-color: v-bind("themeVars.primaryColor");

	transform: scaleX(0);
	transform-origin: right center;
	
	transition-property: transform, height, bottom;
	transition-duration: .2s;
}

.b-topbar a.router-link-active .b-hover-underline {
	bottom: -1px;
	height: 4px;
}

.b-topbar a:hover .b-hover-underline, .b-topbar a.router-link-active .b-hover-underline {
	transform: scaleX(1);
	transform-origin: left center;
}
</style>

<script>

import { useThemeVars } from 'naive-ui'

export default {
  data() {
    return {
		themeVars: useThemeVars(),
	}
  }
}
</script>