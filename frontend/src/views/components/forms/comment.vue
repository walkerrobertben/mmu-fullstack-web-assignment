<template>
    <n-form :show-label="false" @submit.prevent="tryPost">
        <n-form-item :validation-status="comment_status" :feedback="comment_feedback">
            <n-input
                type="textarea"
                :placeholder="placeholder"
                :autosize="{minRows: 3}"
                v-model:value="comment_text"
                @input="() => { do_validate = true }"
                @focus="() => { do_validate = false }"
            >

                
                
            </n-input>
        </n-form-item>
        <n-button attr-type="submit" secondary :loading="isPosting">Post comment</n-button>
    </n-form>
</template>

<script>
import { computed } from "vue"
// import { Joi } from 'vue-joi-validation';

function validateComment() {
    return !this.do_validate || this.comment_text.length > 0;
}

function tryPost() {
    this.do_validate = true;

    if (validateComment.call(this)) {
        this.$emit("tryPost", this.comment_text);
        this.comment_text = "";
    }
}

export default {
    data() {
        return {
            comment_text: "",

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
        isPosting: Boolean,
        placeholder: String,
    },
    methods: {tryPost},
}
</script>