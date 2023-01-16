<template>
    <n-dropdown class="b-login-button-dropdown" trigger="click" :options="dropdownOptions">
        <div class="b-li">
            <span>
                <n-text>Login</n-text>
                <span class="b-hover-underline"></span>
            </span>
        </div>
    </n-dropdown>
</template>

<style>
.n-dropdown-menu.b-login-button-dropdown {
    margin-top: 0;
    padding: 0;
}
</style>

<script>
import { h } from "vue";

import LoginForm from "../forms/login.vue";
import MountComponent from "../../../utility/mountComponent"

export default {
    data() {
        return {
            dropdownOptions: [
                {
                    type: "render",
                    render: () => {
                        return MountComponent(
                            LoginForm,
                            h("div", {style: "width: 200px; padding: 0.5rem;"})
                        ); 
                    },
                }
            ]
        }
    },
    updated(a) {
        console.log(a);
    }
}
</script>