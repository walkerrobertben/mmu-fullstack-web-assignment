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
                <n-button secondary>Read more</n-button>
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

const truncate_after = 280;

function truncate(str) {
    if (str.length > truncate_after) {
        var t = str.substring(0, truncate_after);
        if (t.slice(-1) === " ") {
            t = str.substring(0, truncate_after - 1);
        }

        return t + "...";
    } else {
        return str;
    }
    
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
        bTitle: String,
        bAuthor: String,
        bDate: String,
        bText: String,
        bIsOwned: Boolean,
    }
}
</script>