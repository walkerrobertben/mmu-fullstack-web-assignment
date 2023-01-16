<template>
    <!-- <n-text>{{ articles }}</n-text> -->
    <div class="b-article-list">

    </div>
    <ArticleCard/>
</template>

<style>
    
</style>

<script>

import { ref } from "vue";
import { article_service } from "../../services/article.service"

const articles = ref([]);

import ArticleCard from "../components/articles/card.vue"

export default {
    data() {
        return {
            articles: articles,
        }
    },
    mounted() {
        article_service.getAll()
        .then((json) => {
            articles.value = json;
        })
        .catch((error) => {
            console.error(error);
            articles.value = [];
        });
    },
    components: {ArticleCard} 
}
</script>