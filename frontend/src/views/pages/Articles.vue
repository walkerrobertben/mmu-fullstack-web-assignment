<template>
    <div class="b-page-width">
        
        <Title b-text="Articles"></Title>

        <n-grid cols="1 450:2 700:3" responsive="self" :x-gap="16" :y-gap="16">
            <n-gi v-for="(article, index) in articles">
                <ArticleCard
                    :b-article-id="article.article_id"
                    :b-title="article.title"
                    :b-author="article.author"
                    :b-date="article.date_published"
                    :b-text="article.article_text"
                    :b-is-owned="index <= 1"
                    :b-is-private="index == 1"
                ></ArticleCard>
            </n-gi>
            
        </n-grid>
        
    </div>
</template>

<script>
import { article_service } from "../../services/article.service"

import Title from "../components/universal/title.vue"
import ArticleCard from "../components/articles/card.vue"

export default {
    data() {
        return {
            articles: [],
        }
    },
    mounted() {
        article_service.getAll()
        .then((json) => {
            this.articles = json;
        })
        .catch((error) => {
            console.error(error);
        });
    },
    components: {Title, ArticleCard} 
}
</script>