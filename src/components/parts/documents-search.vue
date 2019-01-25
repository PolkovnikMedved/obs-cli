<template>
    <aside class="t-sidebar sidebar-background">
        <div class="l-row">
            <div class="l-col">
                <button class="c-btn c-btn--primary c-btn--raised spaced" v-on:click="reset">Documents</button>
            </div>
            <div class="l-col">
                <router-link :to="{ name: 'structures' }" class="c-btn c-btn--primary c-btn--raised spaced">Structures</router-link>
            </div>
        </div>

        <form class="c-form c-form--block">
            <fieldset class="c-form__fieldset">
                <legend class="c-form__legend clean-fieldset">Recherche</legend>
                <div class="c-form__field-group" :class="{ 'c-form__field--danger': $v.search.documentNumber.$error }">
                    <label for="doc-num" class="c-form__label s-text--bold">Doc N°</label>
                    <input id="doc-num" class="c-form__field full-width" type="text" v-model.trim="$v.search.documentNumber.$model" name="doc-number" autocomplete="off">
                </div>
                <div class="c-form__field-group">
                    <label for="doc-name" class="c-form__label s-text--bold">Nom du document</label>
                    <input id="doc-name" class="c-form__field full-width" type="text" v-model.trim="search.documentName" name="doc-name" autocomplete="off">
                </div>
                <div class="c-form__field-group">
                    <label for="doc-cat" class="c-form__label s-text--bold">Catégorie du document</label>
                    <input id="doc-cat" class="c-form__field full-width" type="text" v-model.trim="search.documentCategory" name="doc-cat" autocomplete="off">
                </div>
                <div class="c-form__field-group">
                    <label for="created-by" class="c-form__label s-text--bold">Créé par</label>
                    <input id="created-by" class="c-form__field full-width" type="text" v-model.trim="search.createdBy" name="created-by" autocomplete="off">
                </div>
                <div class="c-form__field-group">
                    <label for="modified-by" class="c-form__label s-text--bold">Modifié par</label>
                    <input id="modified-by" class="c-form__field full-width" type="text" v-model.trim="search.modifiedBy" name="modified-by" autocomplete="off">
                </div>
            </fieldset>
            <button class="c-btn c-btn--primary c-btn--raised c-btn--ripple c-form__button spaced-no-left full-width s-text--center" v-on:click.prevent="forward" type="submit" :disabled="$v.$invalid">Soumettre</button>
        </form>
    </aside>
</template>

<script>
import { numeric } from "vuelidate/lib/validators";

export default {
  name: "doc-search",
  data() {
    return {
      documents: [],
      errors: [],
      search: { documentNumber: "", documentName: "", documentCategory: "", createdBy: "", modifiedBy: "" }
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
  },
  validations: {
    search: {
      documentNumber: {
        numeric
      }
    }
  }
};
</script>
