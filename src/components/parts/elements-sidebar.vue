<template>
    <aside class="t-sidebar sidebar-background">
        <div class="l-row">
            <div class="l-col">
                <router-link :to="{ name: 'documents' }" class="c-btn c-btn--primary c-btn--raised spaced">Documents</router-link>
            </div>
            <div class="l-col">
                <router-link :to="{ name: 'structures' }" class="c-btn c-btn--primary c-btn--raised spaced">Structures</router-link>
            </div>
        </div>
    </aside>
</template>

<script>
export default {
  name: "elements-sidebar"
};
</script>
