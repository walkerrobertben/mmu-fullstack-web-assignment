<template>
    <n-card>
        <n-h3>Post comment</n-h3>
        <n-form :show-label="false" @submit.prevent="tryPost">
            <n-form-item>
                <n-input v-model:value="comment_text" :placeholder="`Wow ${bArticleAuthor}, nice article!`" type="textarea" :autosize="{minRows: 3}"></n-input>
            </n-form-item>
            <n-button attr-type="submit" secondary>Post comment</n-button>
        </n-form>
    </n-card>

    <n-card style="margin-top: 1.5rem">
        <n-h3>Comments ({{ comments.length }})</n-h3>
        <n-space :vertical="true" :size="16">
            <CommentSingle v-for="comment in comments" :comment="comment"/>
        </n-space>
    </n-card>
</template>

<style scoped>
.n-h3 {
    margin-top: 0;
    margin-bottom: 0.5rem;
}
</style>

<script>
import { comment_service } from "../../../services/comment.service"
import CommentSingle from "./Single.vue"

function getComments() {
    comment_service.getAll(this.bArticleId)
    .then((json) => {
        this.comments = json;
    })
    .catch((error) => {
        console.error(error);
    });
}

function tryPost() {
    const new_comment = {
        comment_text: this.comment_text,
    };

    comment_service.createSingle(this.bArticleId, new_comment)
    .then((result) => {
        if (result.success) {
            getComments.call(this);
        }
    });

    this.comment_text = "";
}

export default {
    data() {
        return {
            comments: [],
            comment_text: "",
        }
    },
    mounted() {
        getComments.call(this);
    },
    props: {
        bArticleId: Number,
        bArticleAuthor: String,
    },
    methods: {tryPost},
    components: {CommentSingle},
}
</script>