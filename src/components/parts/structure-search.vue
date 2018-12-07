<template>
    <aside class="t-sidebar sidebar-background">
        <div class="l-row">
            <div class="l-col">
                <router-link :to="{ name: 'documents' }" class="c-btn c-btn--primary c-btn--raised spaced">Documents</router-link>
            </div>
            <div class="l-col">
                <button @click.prevent="reset" class="c-btn c-btn--primary c-btn--raised spaced">Structures</button>
            </div>
        </div>

        <form class="c-form c-form--block">
            <fieldset class="c-form__fieldset clean-fieldset">
                <legend class="c-form__legend clean-fieldset">Search</legend>
                <div class="c-form__field-group">
                    <label for="doc-num" class="c-form__label s-text--bold">Name</label>
                    <input id="doc-num" class="c-form__field full-width" type="text" v-model="search.structureName" name="doc-number" autocomplete="off">
                </div>
                <div class="c-form__field-group">
                    <label for="doc-name" class="c-form__label s-text--bold">Tag</label>
                    <input id="doc-name" class="c-form__field full-width" type="text" v-model="search.structureTag" name="doc-name" autocomplete="off">
                </div>
                <div class="c-form__field-group">
                    <label for="doc-cat" class="c-form__label s-text--bold">Description</label>
                    <input id="doc-cat" class="c-form__field full-width" type="text" v-model="search.structureDescription" name="doc-cat" autocomplete="off">
                </div>
                <div class="c-form__field-group">
                    <label for="created-by" class="c-form__label s-text--bold">Created By</label>
                    <input id="created-by" class="c-form__field full-width" type="text" v-model="search.createdBy" name="created-by" autocomplete="off">
                </div>
                <div class="c-form__field-group">
                    <label for="modified-by" class="c-form__label s-text--bold">Modified By</label>
                    <input id="modified-by" class="c-form__field full-width" type="text" v-model="search.modifiedBy" name="modified-by" autocomplete="off">
                </div>
            </fieldset>
            <button class="c-btn c-btn--primary c-btn--raised c-btn--ripple c-form__button spaced-no-left full-width s-text--center" v-on:click.prevent="forward" type="submit">Submit</button>
        </form>
    </aside>
</template>

<script>
    export default {
        name: "structure-search",
        data() {
            return {
                documents: [],
                errors: [],
                search: { structureName: "", structureTag: "", structureDescription: "", createdBy: "", modifiedBy: "" }
            };
        },
        methods: {
            forward: function() {
                //this.send();
                this.$emit("filter", this.search);
            },
            reset: function() {
                this.$emit("reset");
            }
        }
    };
</script>
