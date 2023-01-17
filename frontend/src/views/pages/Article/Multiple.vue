<template>
    <div class="b-page-width">
        
        <Title b-text="Articles"></Title>

        <CreateButton/>

        <n-grid cols="1 550:2 800:3" responsive="self" :x-gap="16" :y-gap="16">
            <n-gi v-for="(article, index) in articles">
                <ArticleCard
                    :b-article-id="article.article_id"
                    :b-title="article.title"
                    :b-author="article.author"
                    :b-date-published="article.date_published"
                    :b-date-edited="article.date_edited"
                    :b-text="article.article_text"
                    :b-is-owned="article.is_owned"
                    :b-is-private="article.is_private"
                ></ArticleCard>
            </n-gi>
            
        </n-grid>
        
    </div>
</template>

<script>
import { article_service } from "../../../services/article.service"

import Title from "../../components/universal/title.vue"
import CreateButton from "../../components/articles/create.vue"
import ArticleCard from "../../components/articles/card.vue"

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
    components: {Title, CreateButton, ArticleCard}
}
</script>