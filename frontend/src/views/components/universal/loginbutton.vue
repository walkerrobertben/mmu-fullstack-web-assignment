<template>
    <div>
        <span>
            <n-dropdown class="b-login-button-dropdown" trigger="click" :options="dropdownOptions" >
                <n-text>Login</n-text>
            </n-dropdown>
            <span class="b-hover-underline"></span>
        </span>
    </div>
</template>

<style>
.n-dropdown-menu.b-login-button-dropdown {
    margin-top: 12px;
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
    }
}
</script>