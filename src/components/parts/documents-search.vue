<template>
    <aside class="t-sidebar">
        <div class="l-row">
            <div class="l-col">
                <button class="c-btn c-btn--primary c-btn--raised spaced">Documents</button>
            </div>
            <div class="l-col">
                <button class="c-btn c-btn--primary c-btn--raised spaced">Structures</button>
            </div>
        </div>

        <form class="c-form c-form--block">
            <fieldset class="c-form__fieldset">
                <legend class="c-form__legend">Search</legend>
                <div class="c-form__field-group">
                    <label for="doc-num" class="c-form__label s-text--bold">Doc N°</label>
                    <input id="doc-num" class="c-form__field full-width" type="text" v-model="search.documentNumber" name="doc-number" autocomplete="off">
                </div>
                <div class="c-form__field-group">
                    <label for="doc-name" class="c-form__label s-text--bold">Doc. name</label>
                    <input id="doc-name" class="c-form__field full-width" type="text" v-model="search.documentName" name="doc-name" autocomplete="off">
                </div>
                <div class="c-form__field-group">
                    <label for="doc-cat" class="c-form__label s-text--bold">Doc. Cat.</label>
                    <input id="doc-cat" class="c-form__field full-width" type="text" v-model="search.documentCategory" name="doc-cat" autocomplete="off">
                </div>
                <div class="c-form__field-group">
                    <label for="author" class="c-form__label s-text--bold">Author</label>
                    <input id="author" class="c-form__field full-width" type="text" v-model="search.author" name="author" autocomplete="off">
                </div>
            </fieldset>
            <button class="c-btn c-btn--primary c-btn--raised c-btn--ripple c-form__button spaced-no-left full-width s-text--center" v-on:click.prevent="forward" type="submit">Submit</button>
        </form>
    </aside>
</template>

<script>
import { HTTP } from "../../http-common";

export default {
  name: "doc-search",
  data() {
    return {
      documents: [],
      errors: [],
      search: { documentNumber: "", documentName: "", documentCategory: "", author: "" }
    };
  },
  methods: {
    send: function() {
        alert(this.search.documentNumber);
        HTTP.get('/document/allFiltered?documentNumber='+this.search.documentNumber+'&documentName='+this.search.documentName+'&documentCategory='+this.search.documentCategory+'&author=' + this.search.author)
            .then(r => {this.documents = r.data; console.log("Documents: " + JSON.stringify(this.documents))})
            .catch(e => {this.errors.push(e); console.log('Error: ' + e)})
    },
    forward: function() {
        this.send();
        this.$emit('filter', this.documents);
    }
  }
};
</script>
