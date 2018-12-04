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
            <div class="l-col-8">
              <span class="s-text s-text--bold" style="padding-left:25px">Id - Description</span>
            </div>
            <div class="l-col-3">
              <span class="s-text s-text--bold">Category</span>
            </div>
            <div class="l-col-1"></div>
          </div>

          <div v-for="(document, index) of documents.content" :key="index" class="l-row">
            <div class="l-col-8">
              <span><chevron-down fill-color="#086cc4"/> {{ document.number }} - {{ document.label.frenchLabel }}</span>
            </div>
            <div class="l-col-3">
              <span>{{ document.category.label.frenchLabel }}</span>
            </div>
            <div class="l-col-1">
              <span><plus-icon fill-color="#07b358"/></span>
            </div>
          </div>

          <div class="l-row very-nice-bottom very-nice-top">
            <div class="l-col-12">
              <nav class="p-pagination" aria-label="pagination">
                <paginate
                    :pageCount="documents.totalPages"
                    :container-class="'c-list c-list--inline l-content--center'"
                    :prev-text="'f'"
                    :next-text="'n'"
                    :page-link-class="'c-list-item'"
                    :active-class="'c-list-item--is-active'"
                    :click-handler="pageCallback">
                  <span class="wide-icon" slot="prevContent"> <chevron-left fill-color="#086cc4" /> </span>
                  <span class="wide-icon" slot="nextContent"> <chevron-right fill-color="#086cc4" /> </span>
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
import ChevronLeft from "vue-material-design-icons/ChevronLeft";
import ChevronRight from "vue-material-design-icons/ChevronRight";
import ChevronDown from "vue-material-design-icons/ChevronDown";
import PlusIcon from "vue-material-design-icons/Plus";
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
        .catch(e => {
          this.errors.push(e);
          hide();
        });
    }
  },
  components: { DocumentsSearch, Loader, Paginate, ChevronLeft, ChevronRight, PlusIcon, ChevronDown },
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
