<template>
    <div class="b-page-width">

        <Subnav
            :back="true"
            :links="[
                {to: '/articles', name: 'Articles'},
                {to: `/article/${article_id}`, name: `${nice_title}`},
                {name: 'Edit Article'}
            ]"
        />

        <Title b-text="Edit Article"></Title>

        <n-card style="margin-bottom: 1.5rem">
            <n-form>
                <n-form-item label="Title">
                    <n-input v-model:value="article.title" :placeholder="nice_title" ></n-input>
                </n-form-item>

                <n-form-item label="Author Name">
                    <n-input v-model:value="article.author" :placeholder="nice_author"></n-input>
                </n-form-item>

                <n-form-item label="Body">
                    <n-input v-model:value="article.article_text" :placeholder="nice_body" type="textarea" :autosize="{minRows: 10}"></n-input>
                </n-form-item>
            </n-form>
        </n-card>

        <n-card style="margin-bottom: 1.5rem">
            <n-text style="display: inline-block; line-height: 1.25; min-height: 20px; padding-left: 2px; padding-bottom: 6px;">Visiblity</n-text>
            
            <n-space align="center">
                <n-button-group>
                    <n-button secondary :type="is_private ? 'info' : 'default'" @click="() => {setVisibility(false)}">Private</n-button>
                    <n-button secondary :type="is_private ? 'default' : 'primary'" @click="() => {setVisibility(true)}">Public</n-button>
                </n-button-group>
                <n-tag :type="is_private ? 'info' : 'primary'" v-text="is_private ? 'Only you can see this article' : 'Everyone can see this article'"></n-tag>
            </n-space>
        </n-card>

        <n-space>
            <n-button type="primary" style="margin-left:">Save changes</n-button>
            <n-button type="default" style="margin-left:">Discard changes</n-button>
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

import Subnav from "../../components/navigation/subnav.vue"
import Title from "../../components/universal/title.vue"

function setVisibility(isPublic) {
    this.is_private = !isPublic;
}

export default {
    data() {
        return {
            article_id: -1,
            article: {},

            is_private: false,

            nice_title: computed(() => {
                return this.article.title == "" ? "My first article" : this.article.title;
            }),
            nice_author: computed(() => {
                return this.article.author == "" ? "John Doe" : this.article.author;
            }),
            nice_body: computed(() => {
                return `Hi, my name is ${this.nice_author} and this is my first article.`
            }),
        }
    },
    mounted() {

        this.article_id = parseInt(this.$route.params.id);
        if (isNaN(this.article_id)) {
            //redirect to error page here?
        }

        article_service.getSingle(this.article_id)
        .then((json) => {
            this.article = json;
        })
        .catch((error) => {
            console.error(error);
        });
    },

    methods: {setVisibility},
    components: {Subnav, Title}
}
</script>