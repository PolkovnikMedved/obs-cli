<template>
  <div class="t-body">
    <documents-search @filter="filter" @reset="reset" :class="{ 'hidden-menu': !this.showMenu }" />
    <span @click="showMenuHandler" class="menu-opener">
      <LeftArrow title="Close Menu" v-if="this.showMenu" />
      <RightArrow title="Open Menu" v-else />
    </span>
    <main class="t-content">
      <copy-version-modal :version_id="versionToCopy" :document_id="documentToCopy" @reload="closedModal" />
      <error-alert :errors="errors" />
      <loader v-if="visible"></loader>
      <success-alert :success="success" :success_message="successMessage" @closeSuccess="closeSuccess"/>
      <v-dialog />

      <div class="l-row l-row--gutter">
        <div class="l-col"><h1>Gestion des versions</h1></div>
      </div>

      <div v-if="documents.content && documents.content.length" class="l-row l-row--gutter">
        <div class="l-col-12">
          <div class="l-row bottom-spaced-quart">
            <div class="l-col-8">
              <span class="s-text s-text--bold" style="padding-left:25px">Id - Description</span>
            </div>
            <div class="l-col-3">
              <span class="s-text s-text--bold">Catégorie</span>
            </div>
          </div>

          <div v-for="(document, index) of documents.content" :key="index" class="l-row with-roof bottom-spaced-quart">
            <div class="l-col-12">

              <div v-if="document.versions && document.versions.length" class="l-row">
                <div class="l-col-12">

                  <div class="l-row" v-bind:class="{ 'first-blue': document.show }">
                    <div class="l-col-8">
                      <span @click="document.show = !document.show" style="cursor:pointer;">
                        <span v-if="document.show"><chevron-up fill-color="#086cc4" title="Cacher les versions"/> </span>
                        <span v-else><chevron-down fill-color="#086cc4" title="Voir les versions"/> </span>
                      </span>
                      <span v-if="document.label.frenchLabel && document.label.frenchLabel.length <= 70">{{document.number}} - {{document.label.frenchLabel}}</span>
                      <span v-else-if="document.label.frenchLabel && document.label.frenchLabel.length > 70">{{document.number}} - <span class="c-tooltip">{{document.label.frenchLabel.substring(0, 70)}}...<span role="tooltip" data-position="tooltip-top">{{ document.label.frenchLabel }}</span></span></span>
                    </div>
                    <div class="l-col-3">
                      <span class="s-text">{{ document.category.label.frenchLabel }}</span>
                    </div>
                    <div class="l-col-1">
                      <span>
                        <router-link :to="{ name: 'add-version', params: { doc_id: document.number } }">
                          <plus-icon fill-color="#07b358" title="Ajouter une version" />
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

                    <div v-for="(version, index) of document.versions" class="l-row spaced-sub-row" :key="index"  style="padding:5px;">
                      <div class="l-col-1">
                        <span>{{ version.name }}</span>
                      </div>

                      <div class="l-col-3">
                        <span v-if="version.structure != null && version.structure.name">
                          <router-link :to="{ name: 'structure-elements', params: { structure_name: version.structure.name } }">
                            {{ version.structure.name }}
                          </router-link>
                        </span>
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
                        <router-link :to="{ name: 'edit-version', params: { version_id: version.name } }" class="primary-icon">
                          <square-edit-outline title="Mettre à jour" />
                        </router-link>
                        &nbsp;
                        <span :data-version="version.name" :data-document="document.number" @click.prevent="copyVersion($event)" class="warning-icon">
                          <content-copy title="Copier" fill-color="#086cc4" />
                        </span>
                        &nbsp;
                        <span class="communist-button" @click="removeVersion(version, document)">
                          <trash-icon title="Supprimer" class="icon" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div v-else class="l-row">
                <div class="l-col-8">
                  <span><chevron-down fill-color="#5a6772" text-fill="closed" title="Pas de versions pour ce document"/></span>
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
                  <span class="wide-icon" slot="prevContent"> <chevron-left name="previous" fill-color="#086cc4" title="Précédent"/> </span>
                  <span class="wide-icon" slot="nextContent"> <chevron-right name="next" fill-color="#086cc4" title="Suivant"/> </span>
                </paginate>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div class="l-row" v-else>
        <div class="l-col-12">
          <p>We did not find any documents based on your criteria.</p>
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
import CopyVersionModal from "../version/copy-version-modal.vue";
import ErrorAlert from "../parts/error-alert";
import TrashIcon from "vue-material-design-icons/TrashCanOutline";
import SuccessAlert from "../parts/success-alert";
import LeftArrow from "vue-material-design-icons/ArrowLeft";
import RightArrow from "vue-material-design-icons/ArrowRight";

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
      documentToCopy: "",
      success: false,
      successMessage: "La version a bien été supprimée",
      showMenu: true
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
    showMenuHandler() {
      this.showMenu = !this.showMenu;
    },
    closeSuccess() {
      this.success = false;
    },
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
    },
    updateDocument(document) {
      HTTP.put("/document/update", JSON.stringify(document), {headers: {'Content-Type': 'application/json'}})
        .then(() => {
          this.success = true;
        })
        .catch(e => this.errors.push(e));
    },
    removeVersion(version, document) {
      this.$modal.show("dialog", {
        title: "Soyez sûrs !",
        text: "Êtes-vous sûr de vouloir supprimer la version " + version.name + " du document ´´" + document.label.frenchLabel +"´´ ?",
        buttons: [
          {
            title: "Non",
            handler: () => {
              this.$modal.hide("dialog");
            }
          },
          {
            title: "Oui",
            handler: () => {
              for (var i = 0; i < document.versions.length; i++) {
                if (document.versions[i].name === version.name) {
                  document.versions.splice(i, 1);
                }
              }
              this.updateDocument(document);
              this.$modal.hide("dialog");
            }
          }
        ]
      });
    }
  },
  components: {
    SuccessAlert,
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
    CopyVersionModal,
    TrashIcon,
    LeftArrow,
    RightArrow
  },
  async beforeMount() {
    this.getDocuments(0);
  }
};
</script>
