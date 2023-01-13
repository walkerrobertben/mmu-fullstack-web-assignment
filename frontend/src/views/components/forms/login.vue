<template>
    <n-form :show-label="false">
        <n-form-item :validation-status="emailStatus" :feedback="emailFeedback">
            <n-input type="email" placeholder="email@domain.com" v-model:value="email" @focus="enteringInfo"/>
        </n-form-item>
        <n-form-item :validation-status="loginStatus">
            <n-input type="password" placeholder="Password" v-model:value="password" @focus="enteringInfo"/>
        </n-form-item>

        <n-space justify="start" align="center" :size="16">
            <n-button :type="loginFailed ? 'Error' : 'Primary'" :loading="loggingIn" @click="tryLogin">Login</n-button>
            <n-text :type="loginFailed ? 'error' : 'default'" class="invisible" :class="{'revealed': loginFailed}">Unable to login</n-text>
        </n-space>
    </n-form>
</template>

<style>
.invisible {
    opacity: 0;
    transition: opacity .3s var(--n-bezier);
}
.invisible.revealed {
    opacity: 1;
}
</style>

<script>

import { computed, ref } from "vue";
import { Joi } from 'vue-joi-validation';

const email = ref("");
const password = ref("");

const loggingIn = ref(false);
const loginFailed = ref(false);

function validateEmailWithJoi() {
    const schema = Joi.object({
        value: Joi.string().email()
    });
    const validation = schema.validate({value: email.value});
    return validation;
}

function getEmailStatus() {
    if (!email.value) return undefined;
    const validation = validateEmailWithJoi();
    return validation.error ? "warning" : undefined;
}
function getEmailFeedback() {
    if (!email.value) return undefined;
    const validation = validateEmailWithJoi();
    return validation.error ? "Enter a valid email address" : undefined;
}

function getLoginStatus() {
    return loginFailed.value ? "error" : undefined;
}

function enteringInfo() { //on input focus
    loginFailed.value = false;
}

function tryLogin() { //on button click
    loggingIn.value = true;
    loginFailed.value = false;

    setTimeout(() => {
        loggingIn.value = false;
        loginFailed.value = true;
    }, 1000);
}

export default {
    data() {
        return {
            email: email,
            password: password,

            loggingIn: loggingIn,
            loginFailed: loginFailed,

            loginStatus: computed(getLoginStatus),
            
            emailStatus: computed(() => {
                const loginStatus = getLoginStatus();
                return loginStatus == undefined ? getEmailStatus() : loginStatus;
            }),
            emailFeedback: computed(getEmailFeedback),
        }
    },
    methods: {enteringInfo, tryLogin}
}
</script>