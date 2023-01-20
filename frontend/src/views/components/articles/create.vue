<template>
    <Toaster ref="toaster"/>
    <n-card>
        <n-space align="center" :size="24">
            <n-text style="display: inline-block; padding-top: 3px;">Create new article</n-text>
            <n-button type="primary" :round="true" @click="createArticle" :loading="is_creating">
                <template #icon>
                    <n-icon>
                        <Plus/>
                    </n-icon>
                </template>
                <n-text style="padding-top:2px; color: inherit">New</n-text>
            </n-button>
        </n-space>
    </n-card>
</template>

<style scoped>
.n-card {
    margin-top: 1.25rem;
    margin-bottom: 1.25rem; 
}

.n-button {
    padding-left: 15px;
}
</style>

<script>
import { article_service } from "../../../services/article.service"
import Toaster from "../universal/toaster.vue"
import Plus from "../../assets/Plus.vue"

const placeholder_title = "My first article";
const placeholder_author = "John Doe";
const placeholder_body = `Hi, my name is ${placeholder_author} and this is my first article.`;

function createArticle() {
    this.is_creating = true;

    article_service.createSingle({
        title: placeholder_title,
        author: placeholder_author,
        article_text: placeholder_body,
        is_private: true,
    })
    .then((result) => {
        if (this._.isUnmounted) return; //element unmounted before async finished
        
        this.is_creating = false;

        if (result.success) {
            const new_article_id = result.json.article_id;
            this.$router.push(`/article/${new_article_id}/create`);
        } else {
            this.$refs.toaster.error("Unable to create new article");
        }
    });
}

export default {
    data() {
        return {
            is_creating: false,
        }
    },
    methods: {createArticle},
    components: {Toaster, Plus},
}
</script>