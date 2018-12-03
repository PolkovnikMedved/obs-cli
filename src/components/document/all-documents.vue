<template>
  <div class="t-body">
    <documents-search @filter="filter" />
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

          <div class="l-row very-nice-bottom very-nice-top">
            <div class="l-col-12">
              <nav class="p-pagination" aria-label="pagination">
                <paginate
                    :pageCount="documents.totalPages"
                    :container-class="'c-list c-list--inline l-content--center'"
                    :page-link-class="'c-list-item'"
                    :active-class="'c-list-item--is-active'"
                    :click-handler="pageCallback">
                  <span slot="prevContent">
                    <svg viewBox="0 0 20 20" id="ic_chevron_left" width="30" height="30">
                      <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>
                    </svg>
                  </span>
                  <span slot="nextContent">
                    <svg viewBox="0 0 20 20" id="ic_chevron_right" width="30" height="30">
                      <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
                    </svg>
                  </span>
                </paginate>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Loader from "../tools/loader.vue";
import Paginate from "vuejs-paginate";
import DocumentsSearch from "../parts/documents-search.vue";
import { state, show, hide } from "../tools/loader-component";
import { HTTP } from "../../http-common";
export default {
  name: "versions",
  data() {
    return {
      errors: [],
      documents: []//,
      //search: {}
    };
  },
  computed: {
    visible() {
      return state.visible;
    }
  },
  methods: {
      filter: function(search) {
      console.log("From documents: " + JSON.stringify(search));
    },
      pageCallback: function(pageNum){
      show();
      HTTP.get("document/all?page=" + pageNum)
        .then(r => {
          this.documents = r.data;
          hide();
        })
        .catch(e => {this.errors.push(e); hide()});
    }
  },
  components: { DocumentsSearch, Loader, Paginate },
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
