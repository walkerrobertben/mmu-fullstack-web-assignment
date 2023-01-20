<template>
    <Toaster ref="toaster"/>

    <n-form :show-label="false" @submit.prevent="tryAddUser">

        <n-space :vertical="true" align="stretch" :size="0">
            <n-space :size="24">
                <n-form-item :feedback="validation.feedback.first_name" :validation-status="validation.status.first_name" class="b-input-name">
                    <n-input v-model:value="new_user.first_name" type="text" placeholder="First name"
                        @input="() => { validation.enable.first_name = true }"
                        @focus="() => { validation.enable.first_name = new_user.first_name.length > 0 }"
                    />
                </n-form-item>
                <n-form-item :feedback="validation.feedback.last_name" :validation-status="validation.status.last_name" class="b-input-name">
                    <n-input v-model:value="new_user.last_name" type="text" placeholder="Last name"
                        @input="() => { validation.enable.last_name = true }"
                        @focus="() => { validation.enable.last_name = new_user.last_name.length > 0 }"
                    />
                </n-form-item>
            </n-space>
            <n-form-item :feedback="validation.feedback.email" :validation-status="validation.status.email">
                <n-input v-model:value="new_user.email" type="email" placeholder="email@domain.com"
                    @input="() => { validation.enable.email = true }"
                    @focus="() => { validation.enable.email = new_user.email.length > 0 }"
                />
            </n-form-item>
            <n-form-item :feedback="validation.feedback.password" :validation-status="validation.status.password">
                <n-input v-model:value="new_user.password" type="password" placeholder="Password"
                    @input="() => { validation.enable.password = true }"
                    @focus="() => { validation.enable.password = new_user.password.length > 0 }"
                >

                    <template #suffix>
                        <n-popover trigger="click" placement="bottom" :show-arrow="false">
                            <template #trigger>
                                <n-button text>
                                    <template #icon>
                                        <InfoIcon/>
                                    </template>
                                </n-button>
                            </template>
                            <n-text :strong="true">Password criteria</n-text>
                            <n-space :vertical="true" :size="0">
                                <n-text>1 uppercase character</n-text>
                                <n-text>1 lowercase character</n-text>
                                <n-text>1 number</n-text>
                                <n-text>1 symbol @$!%*?&</n-text>
                                <n-text>8+ characters long</n-text>
                            </n-space>
                        </n-popover>
                    </template>

                </n-input>
            </n-form-item>
            
        </n-space>

        <n-button type="primary" attr-type="submit" :loading="is_adding">Add user</n-button>
    </n-form>
</template>

<style>
div:has(> .b-input-name) {
    flex-grow: 1;
}
</style>

<script>
import { computed } from "vue";
import { Joi } from 'vue-joi-validation';
import { user_service } from "../../../services/user.service"

import Toaster from "../../components/universal/toaster.vue"
import InfoIcon from "../../assets/Info.vue"

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/;

const form_keys = ["first_name", "last_name", "email", "password"];

const validators = {
    "first_name": (value) => {
        return value.length > 0 ? undefined : "First name cannot be empty";
    },
    "last_name": (value) => {   
        return value.length > 0 ? undefined : "Last name cannot be empty";
    },
    "email": (value) => {
        const schema = Joi.object({
            value: Joi
                .string()
                .email()
                .error((errors) => {
                    errors.forEach((error) => {
                        if(error.type == "any.empty") {
                            error.message = "Email cannot be empty";
                        } else if (error.type == "string.email") {
                            error.message = "Email must be valid";
                        }
                    });
                    return errors;
                }),
        });
        const validation = schema.validate({value});
        if (validation.error) {
            return validation.error.details[0].message;
        } else {
            return undefined;
        }
    },
    "password": (value) => {
        const schema = Joi.object({
            value: Joi.string()
                .regex(passwordPattern)
                .required()
                .error((errors) => {
                    errors.forEach((error) => {
                        if(error.type == "any.empty") {
                            error.message = "Password cannot be empty";
                        } else if (error.type == "string.regex.base") {
                            error.message = "Password must meet criteria";
                        }
                    });
                    return errors;
                }),
        });
        const validation = schema.validate({value});
        if (validation.error) {
            return validation.error.details[0].message;
        } else {
            return undefined;
        }
    },
};

function setAllValidate(enable) {
    form_keys.forEach((key) => {
        this.validation.enable[key] = enable;
    });
}

function setAllEmpty() {
    for (const key in this.new_user) {
        this.new_user[key] = "";
    }
}

function tryAddUser() {

    setAllValidate.call(this, true);

    //check validation
    for (let i = 0; i < form_keys.length; i++) {
        const key = form_keys[i];
        if (validators[key](this.new_user[key]) !== undefined) {
            return;
        }
    };

    this.is_adding = true;

    user_service.createSingle(this.new_user)
    .then((result) => {
        if (this._.isUnmounted) return; //element unmounted before async finished

        this.is_adding = false;

        if (result.success) {
            setAllEmpty.call(this);
            setAllValidate.call(this, false);
            this.$emit("userAdded");
        } else {
            this.$refs.toaster.error("Unable to add user");
        }
    });

}

export default {
    
    data() {

        const new_user = {};

        const validation = {
            enable: {},
            status: {},
            feedback: {}
        };

        form_keys.forEach((key) => {
            new_user[key] = "";

            validation.enable[key] = false;

            validation.status[key] = computed(() => {
                const result = validators[key](this.new_user[key]);
                return !this.validation.enable[key] || result === undefined ? undefined : "error";
            });

            validation.feedback[key] = computed(() => {
                const result = validators[key](this.new_user[key]);
                return !this.validation.enable[key] || result === undefined ? undefined : result;
            });
        });

        return {
            is_adding: false,
            new_user: new_user,
            validation: validation,

            test: computed(() => {
                console.log(this.new_user.first_name);
                return(this.new_user.first_name.toUpperCase());
            }),
        }
    },
    methods: {tryAddUser},
    emits: ["userAdded"],
    components: {Toaster, InfoIcon},
}

</script>