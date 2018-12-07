<template>
    <div class="t-body">
        <structure-search @filter="filter" @reset="reset"></structure-search>

        <main class="t-content">
            <error-alert :errors="errors" />
            <loader v-if="visible"></loader>

            <div class="l-row l-row--gutter">
                <div class="l-col-11">
                    <h1>Structures management</h1>
                </div>
                <div class="l-col-1">
                    <router-link :to="{ name: 'add-structure' }" class="top-right-add">
                        <plus-circle-icon fill-color="#07b358" title="Add structure"/>
                    </router-link>
                </div>
            </div>

            <div v-if="structures.content && structures.content.length" class="l-row l-row--gutter">
                <div class="l-col-12">
                    <div class="l-row">
                        <div class="l-col-12">
                            <table class="c-table c-table--striped full-width">
                                <thead class="c-table__thead">
                                    <tr class="c-table__item">
                                        <th class="c-table__cell table-cell-fifteen">Structure</th>
                                        <th class="c-table__cell table-cell-fifteen">Tag</th>
                                        <th class="c-table__cell table-cell-thirty-five">Description</th>
                                        <th class="c-table__cell table-cell-fifteen">Author</th>
                                        <th class="c-table__cell table-cell-ten">Date</th>
                                        <th class="c-table__cell table-cell-ten">
                                            <settings-icon title="Settings" fill-color="#5a6772"/>
                                        </th>
                                    </tr>
                                </thead>

                                <tbody class="c-table__tbody">
                                    <tr v-for="(structure, index) of structures.content" :key="index" class="c-table__item">
                                        <td class="c-table__cell table-cell-fifteen">{{ structure.name }}</td>
                                        <td class="c-table__cell table-cell-fifteen">{{ structure.tag }}</td>
                                        <td class="c-table__cell table-cell-thirty-five">
                                            <span v-if="structure.description && structure.description.length >= 50" class="c-tooltip">
                                                {{ structure.description.substring(0, 50) }}...
                                                <span role="tooltip" data-position="tooltip-top">{{ structure.description }}</span>
                                            </span>
                                            <span v-if="structure.description && structure.description.length < 50">{{ structure.description }}</span>
                                        </td>
                                        <td class="c-table__cell table-cell-fifteen">
                                            <span v-if="structure && structure.signature && structure.signature.modifiedBy != null">{{ structure.signature.modifiedBy }}</span>
                                            <span v-else>{{ structure.signature.createdBy }}</span>
                                        </td>
                                        <td class="c-table__cell table-cell-ten">
                                            <span v-if="structure && structure.signature && structure.signature.modifiedAt != null">{{ structure.signature.modifiedAt | formatDate }}</span>
                                            <span v-else>{{ structure.signature.createdAt | formatDate }}</span>
                                        </td>
                                        <td class="c-table__cell table-cell-ten">
                                            <router-link :to="{ name: 'edit-structure', params: { structure_name: structure.name } }">
                                                <span class="blue-icon"><square-edit-outline-icon title="Edit structure"/></span>
                                            </router-link>
                                            &nbsp;
                                            <span class="orange-icon"><content-copy-icon title="Copy structure"/></span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div class="l-row very-nice-bottom very-nice-top">
                    <div class="l-col-12">
                        <nav class="p-pagination" aria-label="pagination">
                            <paginate
                                :forcePage="currentPage"
                                :pageCount="structures.totalPages"
                                :container-class="'c-list c-list--inline l-content--center'"
                                :prev-text="'f'"
                                :next-text="'n'"
                                :page-link-class="'c-list-item'"
                                :active-class="'c-list-item--is-active'"
                                :click-handler="pageCallback">
                                <span class="wide-icon blue-icon" slot="prevContent"> <chevron-left name="Previous page" /> </span>
                                <span class="wide-icon blue-icon" slot="nextContent"> <chevron-right name="Next page" /> </span>
                            </paginate>
                        </nav>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
import StructureSearch from "../parts/structure-search.vue";
import { hide, show, state } from "../tools/loader-component";
import { HTTP } from "../../http-common";
import Loader from "../tools/loader.vue";
import PlusCircleIcon from "vue-material-design-icons/PlusCircle";
import SettingsIcon from "vue-material-design-icons/Settings";
import SquareEditOutlineIcon from "vue-material-design-icons/SquareEditOutline";
import ContentCopyIcon from "vue-material-design-icons/ContentCopy";
import ChevronLeft from "vue-material-design-icons/ChevronLeft.vue";
import ChevronRight from "vue-material-design-icons/ChevronRight.vue";
import Paginate from "vuejs-paginate";
import ErrorAlert from "../parts/error-alert";

export default {
  name: "structures",
  data() {
    return {
      page: 1,
      errors: [],
      structures: [],
      search: { structureName: "", structureTag: "", structureDescription: "", createdBy: "", modifiedBy: "" }
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
  components: {
    ErrorAlert,
    ContentCopyIcon,
    SquareEditOutlineIcon,
    SettingsIcon,
    PlusCircleIcon,
    StructureSearch,
    Loader,
    ChevronLeft,
    ChevronRight,
    Paginate
  },
  methods: {
    getStructures: function(pageNum) {
      show();
      let url = "structure/all?name="+this.search.structureName+"&tag="+this.search.structureTag+"&description="+this.search.structureDescription+"&createdBy="+this.search.createdBy+"&modifiedBy="+this.search.modifiedBy+"&page=" + pageNum;
      HTTP.get(url)
        .then(r => {
          this.structures = r.data;
          hide();
        })
        .catch(e => {
          this.errors.push(e);
          hide();
        });
    },
    pageCallback: function(pageNum) {
      this.page = pageNum;
      this.getStructures(pageNum);
    },
    reset: function() {
      this.page = 1;
      this.pageCallback(1);
    },
    filter: function(search) {
      this.search = search;
      this.getStructures(0);
    }
  },
  async beforeMount() {
    this.getStructures(0);
  }
};
</script>
