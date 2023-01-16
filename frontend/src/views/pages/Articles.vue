<template>


    <n-text>{{ articles }}</n-text>

    <!-- <p v-for="article in articles">{{ article.title }}</p> -->

</template>

<script>

import { ref } from "vue";
import { article_service } from "../../services/article.service"

const articles = ref([]);

export default {
    data() {
        return {
            articles: articles,
        }
    },
    mounted() {
        article_service.getAll().then((json) => {
            articles.value = json;
        })
    }
}
</script>