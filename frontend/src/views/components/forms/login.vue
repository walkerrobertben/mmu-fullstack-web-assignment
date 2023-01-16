<template>
    <n-form :show-label="false">
        <n-form-item :validation-status="emailStatus" :feedback="emailFeedback">
            <n-input type="email" placeholder="email@domain.com" v-model:value="email" @focus="enteringInfo"/>
        </n-form-item>
        <n-form-item :validation-status="loginStatus">
            <n-input type="password" placeholder="Password" v-model:value="password" @focus="enteringInfo"/>
        </n-form-item>

        <n-space justify="center" align="center" :size="0">
            <n-button :type="loginFailed ? 'Error' : 'Primary'" :loading="loggingIn" @click="tryLogin">Login</n-button>

            <div class="b-unable-clipper" :class="{'b-revealed': loginFailed}">
                <n-text type="error" v-resize="unableTextResized">Unable to login</n-text>
            </div>

        </n-space>
    </n-form>
</template>

<style>
.b-unable-clipper {
    width: 0px;
    padding-left: 0px;
    transform: translateX(16px);

    overflow-x: hidden;

    /* transition: width .3s var(--n-bezier); */
    transition-property: width, padding-left, transform;
    transition-duration: .3s;
    transition-timing-function: var(--n-bezier);
}
.b-unable-clipper.b-revealed {
    width: v-bind(unableRevealWidth);
    padding-left: 16px;
    transform: translateX(0px);
}
.b-unable-clipper span {
    white-space: nowrap;
}
</style>

<script>
import { computed, ref, onMounted } from "vue";
import { Joi } from 'vue-joi-validation';

const email = ref("");
const password = ref("");

const loggingIn = ref(false);
const loginFailed = ref(false);

const unableRevealWidth = ref(0);

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

function unableTextResized({width, height}) {
    unableRevealWidth.value = width.toString() + "px";
}

export default {
    data() {
        return {
            email: email,
            password: password,

            loggingIn: loggingIn,
            loginFailed: loginFailed,

            emailStatus: computed(() => {
                const loginStatus = getLoginStatus();
                return loginStatus == undefined ? getEmailStatus() : loginStatus;
            }),
            
            emailFeedback: computed(getEmailFeedback),

            loginStatus: computed(getLoginStatus),
            
            unableRevealWidth: unableRevealWidth,
        }
    },
    methods: {enteringInfo, tryLogin, unableTextResized}
}
</script>