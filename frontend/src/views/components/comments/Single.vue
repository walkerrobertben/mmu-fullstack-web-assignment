<template>
    <n-space :size="16" style="flex-wrap: nowrap">
        
        <n-button v-if="shouldShowDelete" :loading="bIsDeleting" class="b-no-shrink" @click="$emit('tryDelete')" text type="error" style="font-size: 1rem; vertical-align: text-bottom;">
            <template #icon>
                <n-icon>
                    <DeleteIcon />
                </n-icon>
            </template>
        </n-button>

        <n-text class="b-no-shrink" depth="3">{{ comment.date_published }}</n-text>
        <n-text style="white-space: pre-wrap">{{ comment.comment_text }}</n-text>
    </n-space>
</template>

<style>
.n-space > div:has(> .b-no-shrink) {
    flex-shrink: 0;
}
</style>

<script>
import { computed } from "vue"
import { auth_service } from "../../../services/auth.service"

import DeleteIcon from "../../assets/Delete.vue"

export default {
    data() {
        return {
            shouldShowDelete: computed(() => {
                return this.bIsOwned || auth_service.getUserLevel() >= auth_service.USER_LEVELS.LEVEL_ADMIN;
            }),
        }
    },
    props: {
        bIsOwned: Boolean,
        bIsDeleting: Boolean,
        comment: Object,
    },
    components: {DeleteIcon}
}
</script>