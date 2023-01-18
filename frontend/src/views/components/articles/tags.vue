<template>
    <n-space v-if="shouldShowTags" justify="right" :size="8">
        <n-tag v-if="bShowWrote && bIsOwned">You wrote this article</n-tag>
        <n-tag :type="bIsPrivate ? 'info' : 'primary'">{{ bIsPrivate ? 'Private' : 'Public' }}</n-tag>
        <n-button size="small" @click="editArticle">Edit</n-button>
    </n-space>
</template>

<script>

import { computed } from "vue";
import { auth_service } from "../../../services/auth.service";

function editArticle() {
    this.$router.push(`/article/${this.bArticleId}/edit`);
}

export default {
    data() {
        return {
            shouldShowTags: computed(() => {
                return this.bIsOwned || auth_service.getUserLevel() >= auth_service.USER_LEVELS.LEVEL_ADMIN;
            }),
        }
    },
    props: {
        bArticleId: Number,
        
        bIsOwned: Boolean,
        bIsPrivate: Boolean,

        bShowWrote: Boolean,
    },
    methods: {editArticle}
}
</script>