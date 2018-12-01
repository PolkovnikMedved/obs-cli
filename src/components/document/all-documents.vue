<template>
  <div class="t-body">
    <documents-search />
    <main class="t-content">
      <div v-if="errors && errors.length">
        <div v-for="(error, index) of errors" :key="index" class="c-notification c-notification--danger">
          <p>{{ error.message }}</p>
        </div>
      </div>

      <loader v-if="visible"></loader>

      <div class="l-row l-row--gutter">
        <div class="l-col"><h1>Document versions management</h1></div>
      </div>

      <div v-if="documents.content && documents.content.length" class="l-row">
        <div class="l-col-12">
          <div class="l-row">
            <div class="l-col-1">
              <span class="s-text s-text--bold">IMG</span>
            </div>
            <div class="l-col-7">
              <span class="s-text s-text--bold">Id - Description</span>
            </div>
            <div class="l-col-3">
              <span class="s-text s-text--bold">Category</span>
            </div>
            <div class="l-col-1"></div>
          </div>

          <div v-for="(document, index) of documents.content" :key="index" class="l-row">
            <div class="l-col-1">
              <span>{{ document.number }}</span>
            </div>
            <div class="l-col-7">
              <span>{{ document.label.frenchLabel }}</span>
            </div>
            <div class="l-col-3">
              <span>{{ document.category.label.frenchLabel }}</span>
            </div>
            <div class="l-col-1">
              <span>add</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Loader from "../tools/loader.vue";
import DocumentsSearch from "../parts/documents-search.vue";
import { state, show, hide } from "../tools/loader-component";
import { HTTP } from "../../http-common";
export default {
  name: "versions",
  data() {
    return {
      errors: [],
      documents: []
    };
  },
  computed: {
    visible() {
      return state.visible;
    }
  },
  components: { DocumentsSearch, Loader },
  async beforeMount() {
    show();
    HTTP.get("document/all")
      .then(response => {
        this.documents = response.data;
        hide();
      })
      .catch(e => {
        this.errors.push(e);
        hide();
      });
  }
};
</script>
