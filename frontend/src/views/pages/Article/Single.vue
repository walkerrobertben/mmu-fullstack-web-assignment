<template>
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
                <ArticleTags :b-article-id="article_id" :b-show-wrote="true" :b-is-private="true"></ArticleTags>
            </div>
        </n-space>

        <n-space :vertical="true" :size="0">
            <n-text>by {{article.author}}</n-text>
            <n-text>Published {{article.date_published}}</n-text>
            <!-- <n-text depth="3">Edited {{article.date_edited}}</n-text> -->
        </n-space>
        <n-divider/>
        <n-text>{{article.article_text}}</n-text>
        <n-divider/>
        <n-h3>Comments (0)</n-h3>
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

import Subnav from "../../components/universal/subnav.vue"
import Title from "../../components/universal/title.vue"
import ArticleTags from "../../components/articles/tags.vue"

export default {
    data() {
        return {
            article_id: -1,
            article: {},
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
    components: {Subnav, Title, ArticleTags}
}
</script>