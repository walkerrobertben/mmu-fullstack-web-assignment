<template>
    <n-dropdown v-if="!isLoggedIn" class="b-login-button-dropdown" trigger="click" :options="loginDropdownOptions">
        <div class="b-li">
            <span>
                <n-text>Login</n-text>
                <span class="b-hover-underline"></span>
            </span>
        </div>
    </n-dropdown>

    <div v-if="isLoggedIn" class="b-li" @click="logout">
        <span>
            <n-text>Logout</n-text>
            <span class="b-hover-underline"></span>
        </span>
    </div>
</template>

<style>
.n-dropdown-menu.b-login-button-dropdown {
    margin-top: 0;
    padding: 0;
}
</style>

<script>
import { h, computed } from "vue";

import { auth_service } from "../../../services/auth.service"

import LoginForm from "../forms/login.vue";
import getMountedComponent from "../../../utility/mount_component"

const loginDropdownOptions = [
    {
        type: "render",
        render: () => {
            return getMountedComponent(
                LoginForm,
                h("div", {style: "width: 200px; padding: 1rem;"})    
            ); 
        },
    }
]

export default {
    data() {
        return {
            loginDropdownOptions,
            isLoggedIn: computed(auth_service.isAuthenticated),
        }
    },
    methods: {
        logout: auth_service.logout
    }
}
</script>