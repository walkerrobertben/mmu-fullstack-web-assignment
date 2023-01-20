<template>
    <Loader ref="loader"/>
    <Toaster ref="toaster"/>

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
                <n-form-item label="Title" :feedback="validation.feedback.title" :validation-status="validation.status.title">
                    <n-input v-model:value="article.updated.title" :placeholder="nice_title"
                        @input="() => { validation.enable.title = true }"
                        @focus="() => { validation.enable.title = article.updated.title.length > 0 }"
                    />
                </n-form-item>

                <n-form-item label="Author name" :feedback="validation.feedback.author" :validation-status="validation.status.author">
                    <n-input v-model:value="article.updated.author" :placeholder="nice_author"
                        @input="() => { validation.enable.author = true }"
                        @focus="() => { validation.enable.author = article.updated.author.length > 0 }"
                    />
                </n-form-item>

                <n-form-item label="Body" :feedback="validation.feedback.article_text" :validation-status="validation.status.article_text">
                    <n-input v-model:value="article.updated.article_text" :placeholder="nice_body" type="textarea" :autosize="{minRows: 10}"
                        @input="() => { validation.enable.article_text = true }"
                        @focus="() => { validation.enable.article_text = article.updated.article_text.length > 0 }"
                    />
                </n-form-item>
            </n-form>
        </n-card>

        <n-card style="margin-bottom: 1.5rem">
            <n-text style="display: inline-block; line-height: 1.25; min-height: 20px; padding-left: 2px; padding-bottom: 6px;">Visiblity</n-text>
            
            <n-space align="center" style="margin-bottom: 1.25rem">
                <n-button-group>
                    <n-button secondary :type="this.article.updated.is_private ? 'info' : 'default'" @click="() => {setVisibility(false)}">Private</n-button>
                    <n-button secondary :type="this.article.updated.is_private ? 'default' : 'primary'" @click="() => {setVisibility(true)}">Public</n-button>
                </n-button-group>
                <n-tag :type="this.article.updated.is_private ? 'info' : 'primary'">{{ this.article.updated.is_private ? 'Only you can see this article' : 'Everyone can see this article' }}</n-tag>
            </n-space>

            <n-text style="display: inline-block; line-height: 1.25; min-height: 20px; padding-left: 2px; padding-bottom: 6px;">Delete article</n-text>
            <n-space align="center">
                <n-button type="error" @click="promptDelete">Delete article</n-button>
                <n-tag type="error">Delete this article, and all comments on it</n-tag>
            </n-space>
        </n-card>

        <n-space>
            <n-button :disabled="!has_made_changes" type="primary" style="margin-left:" @click="saveChanges" :loading="is_saving">Save changes</n-button>
            <n-button :disabled="!has_made_changes" type="default" style="margin-left:" @click="discardChanges">Discard changes</n-button>
        </n-space>
        
    </div>


    <n-modal
        :show="show_delete_popup"
        preset="dialog"
        type = "error"
        title="Delete article"
        content="Are you sure you want to delete this article?"
        positive-text="Delete article"
        negative-text="Cancel"
        transform-origin="center"

        :loading="is_deleting"

        :on-close="() => {show_delete_popup = false}"
        :on-negative-click="() => {show_delete_popup = false}"
        :on-positive-click="doDelete"
    />
    
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

import Loader from "../../components/universal/loader.vue"
import Toaster from "../../components/universal/toaster.vue"
import Subnav from "../../components/navigation/subnav.vue"
import Title from "../../components/universal/title.vue"

import DeleteIcon from "../../assets/Delete.vue"

import mObject from "../../../utility/object_manipulation";

const form_fields = ["title", "author", "article_text"];
const form_field_nice = {
    "title": "Title",
    "author": "Author name",
    "article_text": "Body",
}

function setVisibility(isPublic) {
    this.article.updated.is_private = !isPublic;
}

function saveChanges() {
    if (this.has_made_changes) {

        setAllValidate.call(this, true);

        //check validation
        for (let i = 0; i < form_fields.length; i++) {
            const field = form_fields[i];
            const result = validator(field, this.article.updated[field]);
            if (result !== undefined) {
                this.$refs.toaster.error(result);
                return;
            }
        };

        this.is_saving = true;

        const article_to_write = mObject.deepcopy(this.article.updated)

        article_service.updateSingle(this.article_id, article_to_write)
        .then((success) => {
            
            if (this._.isUnmounted) return; //element unmounted before async finished

            /*
                warning!

                the server will have updated date_edited and edit_count
                and these fields wont be present until the page is reloaded

                this isn't a problem unless we implement a 'remove edit field'
                button on the edit page.

                solution: replace article_to_write with a .getSingle() request
            */

            this.is_saving = false;
           
            if (success) {
                setAllValidate.call(this, false);
                this.article.original = article_to_write;
            } else {
                this.$refs.toaster.error("Unable to save changes");
            }
        });
    }
}

function discardChanges() {
    this.article.updated = mObject.deepcopy(this.article.original);
}

function promptDelete() {
    this.show_delete_popup = true;
}
function doDelete() {

    this.is_deleting = true;

    article_service.deleteSingle(this.article_id)
    .then((success) => {
        if (this._.isUnmounted) return; //element unmounted before async finished

        this.is_deleting = false;
        this.show_delete_popup = false;
        
        if (success) {
            redirect_service.go("/articles"); //redirect to articles
        } else {
            this.$refs.toaster.error("Unable to delete article");
        }
    });
}

function validator(field, value) {
    if (value != null && value.length > 0) {
        return undefined;
    } else {
        return `${form_field_nice[field]} cannot be empty`;
    }
}

function setAllValidate(enable) {
    form_fields.forEach((field) => {
        this.validation.enable[field] = enable;
    });
}

export default {
    data() {

        const validation = {
            enable: {},
            status: {},
            feedback: {}
        };

        form_fields.forEach((field) => {

            validation.enable[field] = false;

            validation.status[field] = computed(() => {
                const result = validator(field, this.article.updated[field]);
                return !this.validation.enable[field] || result === undefined ? undefined : "error";
            });

            validation.feedback[field] = computed(() => {
                const result = validator(field, this.article.updated[field]);
                return !this.validation.enable[field] || result === undefined ? undefined : result;
            });
        });

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
            }),

            validation: validation,

            show_delete_popup: false,

            is_saving: false,
            is_deleting: false,
        }
    },
    mounted() {

        this.$refs.loader.start();

        this.article_id = parseInt(this.$route.params.id);
        this.article_action = this.$route.params.action;

        article_service.getSingle(this.article_id)
        .then((json) => {
            if (this._.isUnmounted) return; //element unmounted before async finished

            if (!json.is_owned && auth_service.getUserLevel() < auth_service.USER_LEVELS.LEVEL_ADMIN) {
                return redirect_service.error_400();
            }

            this.$refs.loader.finish(true);
            this.article.original = json;
            this.article.updated = mObject.deepcopy(json);
        })
        .catch((error) => {
            if (this._.isUnmounted) return; //element unmounted before async finished

            redirect_service.error_404();
            
            console.error(error);
            this.$refs.loader.finish(false);
            this.$refs.toaster.error("Unable to load article from server");
        });
    },

    methods: {setVisibility, saveChanges, discardChanges, promptDelete, doDelete},
    components: {Loader, Toaster, Subnav, Title, DeleteIcon}
}
</script>