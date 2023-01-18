<template>
    <div class="b-page-width">

        <Subnav
            :back="true"
            :links="[
                {to: '/articles', name: 'Articles'},
                {to: `/article/${article_id}`, name: `${nice_title}`},
                {name: `${page_title}`}
            ]"
        />

        <Title :b-text="page_title"></Title>

        <n-card style="margin-bottom: 1.5rem">
            <n-form>
                <n-form-item label="Title">
                    <n-input v-model:value="article.updated.title" :placeholder="nice_title" ></n-input>
                </n-form-item>

                <n-form-item label="Author Name">
                    <n-input v-model:value="article.updated.author" :placeholder="nice_author"></n-input>
                </n-form-item>

                <n-form-item label="Body">
                    <n-input v-model:value="article.updated.article_text" :placeholder="nice_body" type="textarea" :autosize="{minRows: 10}"></n-input>
                </n-form-item>
            </n-form>
        </n-card>

        <n-card style="margin-bottom: 1.5rem">
            <n-text style="display: inline-block; line-height: 1.25; min-height: 20px; padding-left: 2px; padding-bottom: 6px;">Visiblity</n-text>
            
            <n-space align="center">
                <n-button-group>
                    <n-button secondary :type="this.article.updated.is_private ? 'info' : 'default'" @click="() => {setVisibility(false)}">Private</n-button>
                    <n-button secondary :type="this.article.updated.is_private ? 'default' : 'primary'" @click="() => {setVisibility(true)}">Public</n-button>
                </n-button-group>
                <n-tag :type="this.article.updated.is_private ? 'info' : 'primary'">{{ this.article.updated.is_private ? 'Only you can see this article' : 'Everyone can see this article' }}</n-tag>
            </n-space>
        </n-card>

        <n-space>
            <n-button :disabled="!has_made_changes" type="primary" style="margin-left:" @click="saveChanges">Save changes</n-button>
            <n-button :disabled="!has_made_changes" type="default" style="margin-left:" @click="discardChanges">Discard changes</n-button>
        </n-space>
        

    </div>
</template>

<style scoped>
.n-breadcrumb {
    margin-top: 1.5rem;
}
</style>

<script>

import { computed } from "vue"

import { article_service } from "../../../services/article.service"
import { auth_service } from "../../../services/auth.service";
import { redirect_service } from "../../../services/redirect.service";

import Subnav from "../../components/navigation/subnav.vue"
import Title from "../../components/universal/title.vue"

import mObject from "../../../utility/object_manipulation";

function setVisibility(isPublic) {
    this.article.updated.is_private = !isPublic;
}

function saveChanges() {
    if (this.has_made_changes) {

        const article_to_write = mObject.deepcopy(this.article.updated)

        article_service.updateSingle(this.article_id, article_to_write)
        .then((success) => {

            /*
                warning!

                the server will have updated date_edited and edit_count
                and these fields wont be present until the page is reloaded

                this isn't a problem unless we implement a 'remove edit field'
                button on the edit page.

                solution: replace article_to_write with a .getSingle() request
            */
           
            if (success) {
                this.article.original = article_to_write;
            }
        });
    }
}

function discardChanges() {
    this.article.updated = mObject.deepcopy(this.article.original);
}

export default {
    data() {
        return {
            article_id: -1,

            article: {
                original: {},
                updated: {},
            },

            nice_title: computed(() => {
                return this.article.updated.title == "" ? "My first article" : this.article.updated.title;
            }),
            nice_author: computed(() => {
                return this.article.updated.author == "" ? "John Doe" : this.article.updated.author;
            }),
            nice_body: computed(() => {
                return `Hi, my name is ${this.nice_author} and this is my first article.`
            }),

            has_made_changes: computed(() => {
                return !mObject.equals(this.article.original, this.article.updated);
            }),

            article_action: "null",
            page_title: computed(() => {
                return this.article_action.charAt(0).toUpperCase() + this.article_action.substring(1) + " Article";
            })
        }
    },
    mounted() {

        this.article_id = parseInt(this.$route.params.id);
        this.article_action = this.$route.params.action;

        article_service.getSingle(this.article_id)
        .then((json) => {

            if (!json.is_owned && auth_service.getUserLevel() < auth_service.USER_LEVELS.LEVEL_ADMIN) {
                return redirect_service.error_400();
            }

            this.article.original = json;
            this.article.updated = mObject.deepcopy(json);
        })
        .catch((error) => {
            redirect_service.error_404();
            console.error(error);
        });
    },

    methods: {setVisibility, saveChanges, discardChanges},
    components: {Subnav, Title}
}
</script>