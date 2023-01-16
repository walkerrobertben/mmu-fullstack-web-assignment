<template>
    <n-card>
        <div class="b-container">
            <div v-if="bIsOwned" class="b-tags">
                <n-space justify="right" :size="8">
                    <n-tag type="info">Private</n-tag>
                    <n-tag>Edit</n-tag>
                </n-space>
            </div>
            <div class="b-content">
                <n-h2>{{bTitle}}</n-h2>
                <n-space :vertical="true" :size="0">
                    <n-text>by {{bAuthor}}</n-text>
                    <n-text>{{bDate}}</n-text>
                </n-space>
                <n-divider/>
                <n-text>{{truncatedText}}</n-text>
            </div>
            <div class="b-bottom">
                <n-divider/>
                <n-button class="b-card-read-more" secondary @click="readArticle" :data-article-id="bArticleId">Read more</n-button>
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

<style>
.n-button.b-card-read-more * {
    pointer-events: none;
}
</style>

<script>
import { computed } from "vue";

const truncate_after = 280;

function truncate(str) {
    if (str.length > truncate_after) {
        return str.substring(0, (str[truncate_after - 1] === " " ? truncate_after - 1 : truncate_after)) + "...";
    } else {
        return str;
    }
}

function readArticle(event) {
    this.$router.push(`/articles/${event.target.dataset.articleId}`);
}

export default {
    data() {
        return {
            truncatedText: computed(() => {
                return truncate(this.bText);
            })
        }
    },
    props: {
        bArticleId: Number,
        bTitle: String,
        bAuthor: String,
        bDate: String,
        bText: String,
        bIsOwned: Boolean,
    },
    methods: {readArticle}
}
</script>