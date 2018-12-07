<template>
  <div class="t-body">
    <documents-search @filter="filter" @reset="reset" />
    <main class="t-content">
      <copy-version-modal :version_id="versionToCopy" :document_id="documentToCopy" @reload="closedModal" />

      <error-alert :errors="errors" />

      <loader v-if="visible"></loader>

      <div class="l-row l-row--gutter">
        <div class="l-col"><h1>Document versions management</h1></div>
      </div>

      <div v-if="documents.content && documents.content.length" class="l-row l-row--gutter">
        <div class="l-col-12">
          <div class="l-row">
            <div class="l-col-8">
              <span class="s-text s-text--bold" style="padding-left:25px">Id - Description</span>
            </div>
            <div class="l-col-3">
              <span class="s-text s-text--bold">Category</span>
            </div>
          </div>

          <div v-for="(document, index) of documents.content" :key="index" class="l-row with-roof">
            <div class="l-col-12">

              <div v-if="document.versions && document.versions.length" class="l-row">
                <div class="l-col-12" @click="document.show = !document.show">

                  <div class="l-row" v-bind:class="{ 'first-blue': document.show }">
                    <div class="l-col-8">
                      <span v-if="document.show"> <chevron-up fill-color="#086cc4"/> </span>
                      <span v-else> <chevron-down fill-color="#086cc4"/> </span>
                      <span v-if="document.label.frenchLabel && document.label.frenchLabel.length <= 70">{{document.number}} - {{document.label.frenchLabel}}</span>
                      <span v-else-if="document.label.frenchLabel && document.label.frenchLabel.length > 70">{{document.number}} - <span class="c-tooltip">{{document.label.frenchLabel.substring(0, 70)}}...<span role="tooltip" data-position="tooltip-top">{{ document.label.frenchLabel }}</span></span></span>
                    </div>
                    <div class="l-col-3">
                      <span class="s-text">{{ document.category.label.frenchLabel }}</span>
                    </div>
                    <div class="l-col-1">
                      <span>
                        <router-link :to="{ name: 'add-version', params: { doc_id: document.number } }">
                          <plus-icon fill-color="#07b358" name="add" />
                        </router-link>
                      </span>
                    </div>
                  </div>

                  <div class="l-row" v-if="document.show">
                    <div class="l-row" :class="{ 'second-blue': document.show }">
                      <div class="l-col-1">
                        <span class="s-text s-text--bold">Id</span>
                      </div>

                      <div class="l-col-3">
                        <span class="s-text s-text--bold">Structure</span>
                      </div>

                      <div class="l-col-4">
                        <span class="s-text s-text--bold">Description</span>
                      </div>

                      <div class="l-col-1">
                        <span class="s-text s-text--bold">DFA</span>
                      </div>

                      <div class="l-col-1">
                        <span class="s-text s-text--bold">Auteur</span>
                      </div>

                      <div class="l-col-1">
                        <span class="s-text s-text--bold">Date</span>
                      </div>
                      <div class="l-col-1">
                        <settings fill-color="#5a6772" name="settings"/>
                      </div>
                    </div>

                    <div v-for="(version, index) of document.versions" class="l-row" :key="index"  style="padding:5px;">
                      <div class="l-col-1">
                        <span>{{ version.name }}</span>
                      </div>

                      <div class="l-col-3">
                        <span v-if="version.structure != null && version.structure.name">{{ version.structure.name }}</span>
                        <span v-else>{{ version.structure }}</span>
                      </div>

                      <div class="l-col-4">
                        <span v-if="!version.description"></span>
                        <span v-else-if="version.description.length <= 50">{{ version.description }}</span>
                        <span class="c-tooltip" v-else>{{ version.description.substring(0, 50) }}... <span role="tooltip" data-position="tooltip-top">{{ version.description }}</span></span>
                      </div>

                      <div class="l-col-1">
                        <span v-if="!version.dfaName"></span>
                        <span v-else-if="version.dfaName.length <= 5">{{ version.dfaName }}</span>
                        <span class="c-tooltip" v-else>{{ version.dfaName.substring(0, 5) }}... <span role="tooltip" data-position="tooltip-top">{{ version.dfaName }}</span></span>
                      </div>

                      <div class="l-col-1">
                        <span v-if="version.signature.modifiedBy === null">{{ version.signature.createdBy }}</span>
                        <span>{{ version.signature.modifiedBy }}</span>
                      </div>

                      <div class="l-col-1">
                        <span v-if="version.signature.modifiedAt === null">{{ version.signature.createdAt | formatDate}}</span>
                        <span>{{ version.signature.modifiedAt |formatDate }}</span>
                      </div>

                      <div class="l-col-1">
                        <router-link :to="{ name: 'edit-version', params: { version_id: version.name } }" class="blue-icon">
                          <square-edit-outline title="Edit version" />
                        </router-link>
                        &nbsp;
                        <a :data-version="version.name" :data-document="document.number" @click.prevent="copyVersion($event)" class="orange-icon">
                          <content-copy fill-color="#086cc4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div v-else class="l-row">
                <div class="l-col-8">
                  <span><chevron-down fill-color="#5a6772" text-fill="closed"/></span>
                  <span v-if="document.label.frenchLabel && document.label.frenchLabel.length <= 70">{{document.number}} - {{document.label.frenchLabel}}</span>
                  <span v-else-if="document.label.frenchLabel && document.label.frenchLabel.length > 70">{{document.number}} - <span class="c-tooltip">{{document.label.frenchLabel.substring(0, 70)}}...<span role="tooltip" data-position="tooltip-top">{{ document.label.frenchLabel }}</span></span></span>
                </div>
                <div class="l-col-3">
                  <span>{{ document.category.label.frenchLabel }}</span>
                </div>
                <div class="l-col-1">
                  <router-link :to="{ name: 'add-version', params: { doc_id: document.number } }">
                    <plus-icon fill-color="#07b358" name="add" />
                  </router-link>
                </div>
              </div>
            </div>
          </div>

          <div class="l-row very-nice-bottom very-nice-top">
            <div class="l-col-12">
              <nav class="p-pagination" aria-label="pagination">
                <paginate
                    :forcePage="currentPage"
                    :pageCount="documents.totalPages"
                    :container-class="'c-list c-list--inline l-content--center'"
                    :prev-text="'f'"
                    :next-text="'n'"
                    :page-link-class="'c-list-item'"
                    :active-class="'c-list-item--is-active'"
                    :click-handler="pageCallback">
                  <span class="wide-icon" slot="prevContent"> <chevron-left name="previous" fill-color="#086cc4" /> </span>
                  <span class="wide-icon" slot="nextContent"> <chevron-right name="next" fill-color="#086cc4" /> </span>
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
import ChevronUp from "vue-material-design-icons/ChevronUp";
import PlusIcon from "vue-material-design-icons/Plus";
import Settings from "vue-material-design-icons/Settings";
import SquareEditOutline from "vue-material-design-icons/SquareEditOutline";
import ContentCopy from "vue-material-design-icons/ContentCopy";
import CopyVersionModal from "../version/copy-version-modal.vue"
import ErrorAlert from "../parts/error-alert";

export default {
  name: "versions",
  data() {
    return {
      page: 1,
      errors: [],
      documents: [],
      search: { documentNumber: "", documentName: "", documentCategory: "", createdBy: "", modifiedBy: "" },
      documentVersion: "0",
      versionToCopy: "",
      documentToCopy: ""
    };
  },
  computed: {
    visible() {
      return state.visible;
    },
    currentPage() {
      return this.page - 1;
    }
  },
  /* We should pay attention to pagination. Sometimes page 1 = 0, sometimes page 1 = 1, should be refactored before I'm retired.... */
  methods: {
    closedModal: function() {
      this.reset();
    },
    reset: function() {
      this.page = 1;
      this.pageCallback(1);
    },
    filter: function(search) {
      this.search = search;
      this.getDocuments(0);
    },
    pageCallback: function(pageNum) {
      this.page = pageNum;
      this.getDocuments(pageNum);
    },
    getDocuments: function(pageNum) {
      show();
      let url = "document/all?documentNumber="+this.search.documentNumber+"&documentName="+this.search.documentName+"&documentCategory="+this.search.documentCategory+"&createdBy="+this.search.createdBy+"&modifiedBy="+this.search.modifiedBy+"&page=" + pageNum;
      HTTP.get(url)
        .then(r => {
          this.documents = r.data;
          this.addProperty();
          hide();
        })
        .catch(e => {
          this.errors.push(e);
          hide();
        });
    },
    addProperty: function() {
      // This will add 'show' property to our objects
      Object.keys(this.documents.content).forEach(key => {
        this.$set(this.documents.content[key], "show", false);
      });
    },
    copyVersion: function(event) {
      let element = event.currentTarget;
      this.versionToCopy = element.getAttribute("data-version");
      this.documentToCopy = element.getAttribute("data-document");
      this.$modal.show("copy-version-modal");
    }
  },
  components: {
    ErrorAlert,
    DocumentsSearch,
    Loader,
    Paginate,
    ChevronLeft,
    ChevronRight,
    PlusIcon,
    ChevronDown,
    ChevronUp,
    Settings,
    SquareEditOutline,
    ContentCopy,
    CopyVersionModal
  },
  async beforeMount() {
    this.getDocuments(0);
  }
};
</script>
