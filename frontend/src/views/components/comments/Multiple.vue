<template>
    <Toaster ref="toaster"/>

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
            <CommentSingle v-for="comment in comments" :comment="comment" :b-is-owned="bIsOwned" @try-delete="() => {tryDelete(comment.comment_id)}"/>
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

import Toaster from "../../components/universal/toaster.vue"
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
        } else {
            this.$refs.toaster.error("Unable to post comment");
        }
    });

    this.comment_text = "";
}

function tryDelete(comment_id) {
    comment_service.deleteSingle(comment_id)
    .then((success) => {
        if (success) {
            getComments.call(this);
        } else {
            this.$refs.toaster.error("Unable to delete comment");
        }
    });
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
        bIsOwned: Boolean,
    },
    methods: {tryPost, tryDelete},
    components: {Toaster, CommentSingle},
}
</script>