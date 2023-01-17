<template>
    <div class="b-page-width">
        
        <Title b-text="Articles"></Title>

        <n-card>
            <n-space align="center" :size="24">
                <n-text style="display: inline-block; padding-top: 3px;">Create new article</n-text>
                <n-button type="primary" :round="true">
                    <template #icon>
                        <n-icon>
                            <Plus/>
                        </n-icon>
                    </template>
                    <n-text style="padding-top:2px; color: inherit">New</n-text>
                </n-button>
            </n-space>
        </n-card>

        <n-grid cols="1 550:2 800:3" responsive="self" :x-gap="16" :y-gap="16" style="margin-bottom: 16px;">
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

<style scoped>
.n-card {
    margin-top: 1.25rem;
    margin-bottom: 1.25rem; 
}
</style>

<script>
import { article_service } from "../../../services/article.service"

import Title from "../../components/universal/title.vue"
import ArticleCard from "../../components/articles/card.vue"
import Plus from "../../assets/Plus.vue"

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
    components: {Title, ArticleCard, Plus}
}
</script>