<template>
    <Loader ref="loader"/>
    <Toaster ref="toaster"/>

    <n-card>
        <n-h3>Post comment</n-h3>
        <CommentForm
            :is-posting="this.is_posting"
            :placeholder="`Wow ${bArticleAuthor}, nice article!`"
            @try-post="tryPost"
        />
    </n-card>

    <n-card style="margin-top: 1.5rem">
        <n-h3>Comments ({{ comments.length }})</n-h3>
        <n-space :vertical="true" :size="16">
            <CommentSingle
                v-for="comment in comments"
                :comment="comment"
                :b-is-owned="bIsOwned"
                :b-is-deleting="is_deleting == comment.comment_id"
                @try-delete="() => {tryDelete(comment.comment_id)}"
            />
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

import Loader from "../../components/universal/loader.vue"
import Toaster from "../../components/universal/toaster.vue"
import CommentSingle from "./Single.vue"
import CommentForm from "../forms/comment.vue"

function getComments() {
    this.$refs.loader.start();

    comment_service.getAll(this.bArticleId)
    .then((json) => {
        if (this._.isUnmounted) return; //element unmounted before async finished

        this.$refs.loader.finish(true);
        this.comments = json;
    })
    .catch((error) => {
        if (this._.isUnmounted) return; //element unmounted before async finished
        
        console.error(error);
        this.$refs.loader.finish(false);
        this.$refs.toaster.error("Unable to load comments from server");
    });
}

function tryPost(comment_text) {

    this.is_posting = true;

    comment_service.createSingle(this.bArticleId, {comment_text})
    .then((result) => {
        if (this._.isUnmounted) return; //element unmounted before async finished

        this.is_posting = false;

        if (result.success) {
            getComments.call(this);
        } else {
            this.$refs.toaster.error("Unable to post comment");
        }
    });
}

function tryDelete(comment_id) {

    this.is_deleting = comment_id;

    comment_service.deleteSingle(comment_id)
    .then((success) => {
        if (this._.isUnmounted) return; //element unmounted before async finished
        
        this.is_deleting = null;

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

            is_posting: false,
            is_deleting: null,
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
    components: {Loader, Toaster, CommentSingle, CommentForm},
}
</script>