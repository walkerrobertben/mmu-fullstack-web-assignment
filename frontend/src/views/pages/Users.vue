<template>
    <Loader ref="loader"/>
    <Toaster ref="toaster"/>

    <div class="b-page-width">
		<Title b-text="Users" :b-user-greeting="true"></Title>

        <n-data-table
            :columns="columns"
            :data="users"
        />

        <n-card style="margin-top: 1.5rem">

            <n-h3>Add new user</n-h3>

            <UserForm @user-added="getUsers"/>
            
        </n-card>

        <n-modal
            :show="show_delete_popup"
            preset="dialog"
            type = "error"
            title="Delete user"
            content="Are you sure you want to delete this user?"
            positive-text="Delete user"
            negative-text="Cancel"
            transform-origin="center"

            :loading="is_deleting"

            :on-close="() => {show_delete_popup = false; prompting_delete_user_id = null}"
            :on-negative-click="() => {show_delete_popup = false; prompting_delete_user_id = null}"
            :on-positive-click="doDelete"
        />

	</div>
</template>


<script>
import { user_service } from "../../services/user.service"
import { auth_service } from "../../services/auth.service"

import Loader from "../components/universal/loader.vue"
import Toaster from "../components/universal/toaster.vue"
import Title from "../components/universal/title.vue"
import UserForm from "../components/forms/user.vue"

import { h } from "vue";
import { NButton } from "naive-ui";

function getUsers() {
    this.$refs.loader.start();

    user_service.getAll()
    .then((users) => {
        if (this._.isUnmounted) return; //element unmounted before async finished

        //compute extra data for table rows
        users.forEach((row) => {
            row.controller = this; //give row reference to this (for delete button to use)
            row.role = auth_service.USER_LEVEL_NAMES[row.user_level];
        });

        this.$refs.loader.finish(true);
        this.users = users;
    })
    .catch((error) => {
        if (this._.isUnmounted) return; //element unmounted before async finished

        console.error(error);
        this.$refs.loader.finish(false);
        this.$refs.toaster.error("Unable to load users from server");
    });
}

function promptDelete(user_id) {
    this.show_delete_popup = true;
    this.prompting_delete_user_id = user_id;
}

function doDelete() {
    this.is_deleting = true;

    user_service.deleteSingle(this.prompting_delete_user_id)
    .then((success) => {
        if (this._.isUnmounted) return; //element unmounted before async finished
        
        this.is_deleting = false;
        this.show_delete_popup = false;
        this.prompting_delete_user_id = null;

        if (success) {
            getUsers.call(this); //refresh users
        } else {
            this.$refs.toaster.error("Unable to delete user");
        }
    });
}

export default {
    data() {
        return {

            columns: [
                {key: "email",      title: "Email"     },
                {key: "first_name", title: "First name"},
                {key: "last_name",  title: "Last name" },
                {key: "role",       title: "Role"      },

                {key: "delete",     title: "Delete",
                    render(row) {
                        return h(NButton, 
                            { //button attributes
                                type: "error",
                                disabled: row.user_level >= auth_service.USER_LEVELS.LEVEL_ADMIN,
                                onClick: () => {
                                    promptDelete.call(row.controller, row.user_id); //row.controller gives the 'this' reference
                                },
                            },
                            { //button text
                                default: () => { 
                                    if (row.user_level >= auth_service.USER_LEVELS.LEVEL_ADMIN) {
                                        return "Cannot delete"; 
                                    } else {
                                        return "Delete user";
                                    }
                                }
                            }
                        );
                    }
                },
            ],

            users: [],



            show_delete_popup: false,
            prompting_delete_user_id: null,

            is_deleting: false,
        }
    },
    mounted() {
        getUsers.call(this);
    },
    methods: {getUsers, promptDelete, doDelete},
    components: {Loader, Toaster, Title, UserForm},
}
</script>