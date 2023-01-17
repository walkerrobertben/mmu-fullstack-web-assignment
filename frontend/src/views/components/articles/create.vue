<template>
    <n-card>
        <n-space align="center" :size="24">
            <n-text style="display: inline-block; padding-top: 3px;">Create new article</n-text>
            <n-button type="primary" :round="true" @click="createArticle">
                <template #icon>
                    <n-icon>
                        <Plus/>
                    </n-icon>
                </template>
                <n-text style="padding-top:2px; color: inherit">New</n-text>
            </n-button>
        </n-space>
    </n-card>
</template>

<style scoped>
.n-card {
    margin-top: 1.25rem;
    margin-bottom: 1.25rem; 
}
</style>

<script>

import { article_service } from "../../../services/article.service"

import Plus from "../../assets/Plus.vue"

const placeholder_title = "My first article";
const placeholder_author = "John Doe";
const placeholder_body = `Hi, my name is ${placeholder_author} and this is my first article.`;

function createArticle() {
    article_service.createSingle({
        title: placeholder_title,
        author: placeholder_author,
        article_text: placeholder_body,
        is_private: true,
    })
    .then((result) => {
        if (result.success) {
            const new_article_id = result.json.article_id;
            this.$router.push(`/article/${new_article_id}/edit`);
        }
    });
}

export default {
    methods: {createArticle},
    components: {Plus},
}
</script>