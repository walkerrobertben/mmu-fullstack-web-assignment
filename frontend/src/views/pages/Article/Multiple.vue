<template>
    <Loader ref="loader"/>
    <Toaster ref="toaster"/>

    <div class="b-page-width">
        
        <Title b-text="Articles"></Title>

        <CreateButton v-if="canCreateArticle"/>

        <n-grid cols="1 550:2 800:3" responsive="self" :x-gap="16" :y-gap="16">
            <n-gi v-for="article in articles">
                <ArticleCard
                    :b-article-id="article.article_id"
                    :b-title="article.title"
                    :b-author="article.author"
                    :b-text="article.article_text"

                    :b-date-published="article.date_published"
                    :b-date-edited="article.date_edited"

                    :b-is-owned="article.is_owned"
                    :b-is-private="article.is_private"
                    :b-edit-count="article.edit_count"
                ></ArticleCard>
            </n-gi>
            
        </n-grid>
        
    </div>
</template>

<script>
import { computed } from "vue"
import { article_service } from "../../../services/article.service"
import { auth_service } from "../../../services/auth.service"

import Loader from "../../components/universal/loader.vue"
import Toaster from "../../components/universal/toaster.vue"
import Title from "../../components/universal/title.vue"
import CreateButton from "../../components/articles/create.vue"
import ArticleCard from "../../components/articles/card.vue"

export default {
    data() {
        return {

            canCreateArticle: computed(() => {
                return auth_service.getUserLevel() >= auth_service.USER_LEVELS.LEVEL_AUTHOR;
            }),

            articles: [],
        }
    },
    mounted() {

        this.$refs.loader.start();

        article_service.getAll()
        .then((json) => {
            this.$refs.loader.finish(true);
            this.articles = json;
        })
        .catch((error) => {
            console.error(error);
            this.$refs.loader.finish(false);
            this.$refs.toaster.error("Unable to load articles from server");
        });
    },
    components: {Loader, Toaster, Title, CreateButton, ArticleCard}
}
</script>