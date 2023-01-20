<template>
    <n-form ref="form" :show-label="false" @submit.prevent="tryLogin" @keydown.enter.stop>
        <n-form-item :validation-status="emailStatus" :feedback="emailFeedback">
            <n-input type="email" placeholder="email@domain.com" v-model:value="email" @focus="enteringInfo"/>
        </n-form-item>
        <n-form-item :validation-status="loginStatus">
            <n-input type="password" placeholder="Password" v-model:value="password" @focus="enteringInfo"/>
        </n-form-item>

        <n-space justify="center" align="center" :size="0">
            <n-button :type="loginFailed ? 'Error' : 'Primary'" :loading="attempting" attr-type="submit">Login</n-button>

            <div class="b-unable-clipper" :class="{'b-revealed': loginFailed}">
                <n-text type="error">Unable to login</n-text>
            </div>
        </n-space>
    </n-form>
</template>

<style>
.b-unable-clipper {
    width: 0px;
    padding-left: 0px;
    transform: translateX(16px);

    overflow: hidden;

    transition-property: width, padding-left, transform;
    transition-duration: .3s;
    transition-timing-function: var(--n-bezier);
}
.b-unable-clipper.b-revealed {
    width: 93.16px; /*based on font and text*/
    max-width: fit-content;
    padding-left: 16px;
    transform: translateX(0px);
}
.b-unable-clipper span {
    white-space: nowrap;
}
</style>

<script>
import { computed } from "vue";
import { Joi } from 'vue-joi-validation';

import { auth_service } from "../../../services/auth.service"

function validateEmailWithJoi(email_value) {
    if (!email_value) return true;
    const schema = Joi.object({value: Joi.string().email()});
    const validation = schema.validate({value: email_value});
    return !validation.error;
}

function enteringInfo() { //on input focus
    this.loginFailed = false;
}

function tryLogin() { //on button click
    this.attempting = true;
    this.loginFailed = false;

    auth_service.login(this.email, this.password).then((loginResult) => {
        this.attempting = false;
        this.loginFailed = !loginResult;

        if (loginResult) {
            auth_service.reload_for_auth();
        }
    });
}

export default {
    data() {
        return {
            email: null,
            password: null,

            attempting: false,
            loginFailed: false,

            loginStatus: computed(() => {
                return this.loginFailed ? "error" : undefined;
            }),

            emailStatus: computed(() => {
                if (this.loginStatus == undefined) {
                    return !validateEmailWithJoi(this.email) ? "warning" : undefined;
                } else {
                    return this.loginStatus;
                }
            }),
            
            emailFeedback: computed(() => {
                return !validateEmailWithJoi(this.email) ? "Enter a valid email address" : undefined;
            }),
            
        }
    },
    mounted() {
        //keydown event propogates up and then something higher stops it (todo with the naieve popup)
        //this lets the submit event run!
        // this.$refs.form.$el.addEventListener("keydown", (event) => {
        //     event.stopPropagation();
        // });

        //replaced with @keydown.enter.stop on the form!
    },
    methods: {enteringInfo, tryLogin}
}
</script>