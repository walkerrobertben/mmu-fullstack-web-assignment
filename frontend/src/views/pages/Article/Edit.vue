<template>
    <div class="b-page-width">

        <Subnav
            :back="true"
            :links="[
                {to: '/articles', name: 'Articles'},
                {to: `/article/${article_id}`, name: `${article.title}`},
                {name: 'Edit Article'}
            ]"
        />

        <Title b-text="Edit Article"></Title>

    </div>
</template>

<style scoped>
.n-breadcrumb {
    margin-top: 1.5rem;
}
</style>

<script>
import { article_service } from "../../../services/article.service"

import Subnav from "../../components/navigation/subnav.vue"
import Title from "../../components/universal/title.vue"

export default {
    data() {
        return {
            article_id: -1,
            article: {},
        }
    },
    mounted() {

        this.article_id = parseInt(this.$route.params.id);
        if (isNaN(this.article_id)) {
            //redirect to error page here?
        }

        article_service.getSingle(this.article_id)
        .then((json) => {
            this.article = json;
        })
        .catch((error) => {
            console.error(error);
        });
    },
    components: {Subnav, Title}
}
</script>