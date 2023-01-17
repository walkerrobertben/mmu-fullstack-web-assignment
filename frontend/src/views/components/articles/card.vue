<template>
    <n-card>
        <div class="b-container">
            <div v-if="bIsOwned" class="b-tags">
                <ArticleTags :b-article-id="bArticleId" :b-show-wrote="false" :b-is-private="bIsPrivate"></ArticleTags>
            </div>

            <div class="b-content">
                <n-h2>{{bTitle}}</n-h2>
                <n-space :vertical="true" :size="0">
                    <n-text>by {{bAuthor}}</n-text>
                    <n-text>{{bDatePublished}}</n-text>
                    <n-text v-if="bDateEdited != undefined" depth="3" italic>Edited on {{bDateEdited}}</n-text>
                </n-space>
                <n-divider/>
                <n-text>{{truncatedText}}</n-text>
            </div>
            <div class="b-bottom">
                <n-divider/>
                <n-button secondary @click="readArticle">Read more</n-button>
            </div>
        </div>
    </n-card>
</template>

<style scoped>
.n-card {
    height: 100%;
}
.b-container {
    height: 100%;
    display: flex;
    flex-direction: column;
}
.b-tags {
    margin-bottom: 0.5rem;
}
.b-content {
    flex-grow: 1;
}
.n-h2, .n-text {
    margin: 0;
}
.n-divider {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
}
</style>

<script>
import { computed } from "vue";

import ArticleTags from "./tags.vue"

const truncate_after = 280;

function truncate(str) {
    if (str.length > truncate_after) {
        return str.substring(0, (str[truncate_after - 1] === " " ? truncate_after - 1 : truncate_after)) + "...";
    } else {
        return str;
    }
}

function readArticle() {
    this.$router.push(`/article/${this.bArticleId}`);
}

export default {
    data() {
        return {
            truncatedText: computed(() => {
                return truncate(this.bText);
            }),
        }
    },
    props: {
        bArticleId: Number,
        bTitle: String,
        bAuthor: String,
        bDatePublished: String,
        bDateEdited: String,
        bText: String,
        bIsOwned: Boolean,
        bIsPrivate: Boolean,
    },
    methods: {readArticle},
    components: {ArticleTags}
}
</script>