<template>
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

			<div class="b-space-grow"></div>

			<div class="b-li b-not-link">
				<UserGreeting/>
			</div>
			
			<AuthControl/>

		</n-space>

		<n-divider/>
	</div>
	<div class="b-space-content"></div>
</template>

<style>
.b-topbar {
	position: fixed;

	top: 0;
	left: 0;
	right: 0;

	z-index: 1000;
	background-color: v-bind("themeVars.baseColor");
}

.b-space-content {
	width: 100%;
	height: calc( (1rem * 1.6) + 2rem + 2rem + 1px);
}

.b-topbar .n-space {
	padding: 1rem;
}

.b-topbar .n-space div:nth-child(3) {
	flex-grow: 1;
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

.b-topbar .b-li:not(.b-not-link) {
	cursor: pointer;
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

import UserGreeting from "../universal/usergreeting.vue"
import AuthControl from "./authcontrol.vue"

export default {
  data() {
    return {
		themeVars: useThemeVars(),
	}
  },
  components: {UserGreeting, AuthControl},
}
</script>