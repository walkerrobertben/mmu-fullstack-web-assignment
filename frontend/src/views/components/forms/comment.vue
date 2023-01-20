<template>
    <Toaster ref="toaster"/>

    <n-form :show-label="false" @submit.prevent="tryPost">
        <n-form-item :validation-status="comment_status" :feedback="comment_feedback">
            <n-input
                type="textarea"
                :placeholder="placeholder"
                :autosize="{minRows: 3}"
                v-model:value="comment_text"
                @input="() => { do_validate = true }"
                @focus="() => { do_validate = comment_text.length > 0 }"
            >

            </n-input>
        </n-form-item>
        <n-button attr-type="submit" secondary :loading="is_posting">Post comment</n-button>
    </n-form>
</template>

<script>
import { computed } from "vue"
import { comment_service } from "../../../services/comment.service"

import Toaster from "../universal/toaster.vue"

function validateComment() {
    return !this.do_validate || this.comment_text.length > 0;
}

function tryPost() {

    this.do_validate = true;
    if (!validateComment.call(this)) return;

    this.is_posting = true;

    comment_service.createSingle(this.articleId, {comment_text: this.comment_text})
    .then((result) => {
        if (this._.isUnmounted) return; //element unmounted before async finished

        this.is_posting = false;

        if (result.success) {
            this.comment_text = "";
            this.do_validate = false;
            this.$emit("commentAdded");

        } else {
            this.$refs.toaster.error("Unable to post comment");
        }
    });
}

export default {
    data() {
        return {

            comment_text: "",
            is_posting: false,

            //validation:
            do_validate: false,
            comment_status: computed(() => {
                return !validateComment.call(this) ? "error" : undefined;
            }),
            comment_feedback: computed(() => {
                return !validateComment.call(this) ? "Comment cannot be empty" : undefined;
            }),
        }
    },
    props: {
        articleId: Number,
        placeholder: String,
    },
    emits: ["commentAdded"],
    methods: {tryPost},
    components: {Toaster}
}
</script>