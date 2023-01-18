<template>
    <div class="b-page-width">
		<Title b-text="Users" :b-user-greeting="true"></Title>

        <n-data-table
            :columns="columns"
            :data="users"
        />

        <n-card style="margin-top: 1.5rem">

            <n-h3>Add new user</n-h3>

            <n-form :show-label="false" @submit.prevent="tryAddUser">

                <n-space :vertical="true" align="stretch" :size="16" style="margin-bottom: 1rem">
                    <n-space :size="16">
                        <n-input v-model:value="new_user.first_name" class="b-input-name" type="text" placeholder="First name"/>
                        <n-input v-model:value="new_user.last_name"  class="b-input-name" type="text" placeholder="Last name"/>
                    </n-space>
                    <n-input v-model:value="new_user.email"    type="email"    placeholder="email@domain.com"/>
                    <n-input v-model:value="new_user.password" type="password" placeholder="Password"/>
                </n-space>

                <n-button type="primary" attr-type="submit">Add user</n-button>
            </n-form>
        </n-card>

	</div>
</template>

<style>
div:has(> .b-input-name) {
    flex-grow: 1;
}
</style>

<script>
import { user_service } from "../../services/user.service"
import { auth_service } from "../../services/auth.service"

import Title from "../components/universal/title.vue"

function getUsers() {
    user_service.getAll()
    .then((users) => {
        this.users = withRoles(users);
    })
    .catch((error) => {
        console.error(error);
    });
}

function tryAddUser() {

    user_service.createSingle(this.new_user)
    .then((result) => {
        if (result.success) {
            getUsers.call(this);
        }
    });

    for (const key in this.new_user) {
        this.new_user[key] = "";
    }
}

function withRoles(users) {
    users.forEach((user) => {
        user.role = auth_service.USER_LEVEL_NAMES[user.user_level];
    });
    return users;
}

export default {
    data() {
        return {

            columns: [
                {key: "email",      title: "Email"     },
                {key: "first_name", title: "First name"},
                {key: "last_name",  title: "Last name" },
                {key: "role",       title: "Role"      },
            ],

            users: [],

            new_user: {
                first_name: "",
                last_name : "",
                email     : "",
                password  : "",
            }
        }
    },
    mounted() {
        getUsers.call(this);
    },
    methods: {tryAddUser},
    components: {Title},
}
</script>