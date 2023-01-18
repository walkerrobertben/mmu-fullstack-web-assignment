<template>
    <span v-if="showGreeting">Hi {{ name }}</span>
</template>

<script>
import { computed } from "vue"
import { auth_service } from "../../../services/auth.service"

export default {
    data() {
        return {
            showGreeting: computed(auth_service.isAuthenticated),
            name: computed(() => {
                if (this.showGreeting) {
                    return auth_service.getUser().first_name;
                }
            }),
        }
    }
}
</script>