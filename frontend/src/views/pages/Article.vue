<template>
    <div class="b-page-width">

        <n-page-header>
            <n-breadcrumb>
                <n-breadcrumb-item @click="goBack">
                    <n-icon><BackArrow/></n-icon>
                    Articles
                </n-breadcrumb-item>
                <n-breadcrumb-item>{{article.title}}</n-breadcrumb-item>
            </n-breadcrumb>
        </n-page-header>

        <n-space class="b-title-and-tags" :size="0">
            <div style="flex-grow: 1">
                <Title :b-text="article.title"></Title>
            </div>
            <div>
                <ArticleTags :b-show-wrote="true" :b-is-private="true"></ArticleTags>
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

.n-page-header-wrapper {
    margin: 1.25rem 0;
}
.b-page-title {
    margin: 0;
}
</style>

<style>
.b-title-and-tags {
    margin: 1.25rem 0;
    align-items: center;
}
.b-title-and-tags > div:nth-child(1){
    flex-grow: 1;
}
</style>

<script>
import { ref } from "vue";
import { article_service } from "../../services/article.service"

import Title from "../components/universal/title.vue"
import BackArrow from "../assets/BackArrow.vue"
import ArticleTags from "../components/articles/tags.vue"

const article_id = ref(-1);
const article = ref({});

function goBack() {
    history.back();
}

export default {
    data() {
        return {
            article_id: article_id,
            article: article,
        }
    },
    mounted() {
        article_id.value = this.$route.params.id;
        
        article_service.getSingle(article_id.value)
        .then((json) => {
            article.value = json;
        })
        .catch((error) => {
            console.error(error);
        });
    },
    methods: {goBack},
    components: {Title, BackArrow, ArticleTags}
}
</script>