<template>
    <Toaster ref="toaster"/>
    
    <div class="b-page-width">

        <Subnav
            :back="true"
            :links="[
                {to: '/articles', name: 'Articles'},
                {name: `${article.title}`},
            ]"
        />

        <n-space class="b-title-and-tags" :size="0">
            <div style="flex-grow: 1">
                <Title :b-text="article.title"></Title>
            </div>
            <div>
                <ArticleTags :b-article-id="article_id" :b-is-owned="article.is_owned" :b-is-private="article.is_private" :b-show-wrote="true"></ArticleTags>
            </div>
        </n-space>

        <n-space :vertical="true" :size="0">
            <n-text>by {{article.author}}</n-text>
            <n-text>Published {{article.date_published}}</n-text>
            <n-text v-if="article.edit_count >= 2 && article.date_edited != undefined" depth="3" italic>Edited on {{article.date_edited}}</n-text>
        </n-space>

        <n-divider/>
        <n-text style="white-space: pre-wrap">{{article.article_text}}</n-text>
        <n-divider/>

        <CommentList :b-article-id="article_id" :b-article-author="article.author" :b-is-owned="article.is_owned"/>
    </div>
</template>

<style scoped>
.b-page-title {
    margin: 0;
}
</style>

<style>
/* the margins are a bit weird here to give space between title and tag when flexbox wraps */
.b-title-and-tags {
    margin-top: calc(1rem - 0.75rem);
    margin-bottom: 1.25rem;
    align-items: center;
}
.b-title-and-tags > div:nth-child(1){
    flex-grow: 1;
    margin-top: 0.75rem;
}
.b-title-and-tags > div:nth-child(2){
    flex-grow: 1;
    margin-top: 0.75rem;
}
</style>

<script>
import { article_service } from "../../../services/article.service"
import { redirect_service } from "../../../services/redirect.service";

import Toaster from "../../components/universal/toaster.vue"
import Subnav from "../../components/navigation/subnav.vue"
import Title from "../../components/universal/title.vue"
import ArticleTags from "../../components/articles/tags.vue"
import CommentList from "../../components/comments/Multiple.vue"

export default {
    data() {
        return {
            article_id: parseInt(this.$route.params.id),
            article: {},
        }
    },
    mounted() {
        
        article_service.getSingle(this.article_id)
        .then((json) => {
            this.article = json;
        })
        .catch((error) => {
            redirect_service.error_404();
            console.error(error);
            this.$refs.toaster.error("Unable to load article from server");
        });
    },
    components: {Toaster, Subnav, Title, ArticleTags, CommentList}
}
</script>