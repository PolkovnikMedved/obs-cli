<template>
    <div class="t-body">
        <simple-sidebar/>

        <main class="t-content">
            <loader v-if="visible"></loader>
            <error-alert :errors="errors" />

            <div class="l-row bottom-spaced">
                <div class="l-col-12">
                    <h1>Structure {{ getStructureName }}</h1>
                </div>
            </div>

            <div class="l-row">
                <div class="l-col-12">
                    <div class="c-table c-table--striped full-width nice-top">
                        <div class="c-table__thead">
                            <div class="c-table__item">
                                <div class="c-table__cell s-text--bold table-cell-five">#</div>
                                <div class="c-table__cell s-text--bold table-cell-twenty">Tag</div>
                                <div class="c-table__cell s-text--bold table-cell-five">Opt.</div>
                                <div class="c-table__cell s-text--bold table-cell-five">Rep.</div>
                                <div class="c-table__cell s-text--bold table-cell-twenty">Structure</div>
                                <div class="c-table__cell s-text--bold table-cell-thirty">Description</div>
<!--                                <div class="c-table__cell s-text&#45;&#45;bold table-cell-ten">Auteur</div>
                                <div class="c-table__cell s-text&#45;&#45;bold table-cell-ten">Date Modif.</div>-->
                                <div class="c-table__cell table-cell-fifteen">
                                    <settings-icon />
                                </div>
                            </div>
                        </div>

                        <div class="c-table__tbody" v-if="structure.children">
                            <div class="c-table__item" v-for="(element, index) of structure.children" :key="index">
                                <div class="c-table__cell s-text--sm table-cell-five">{{ element.sequence }}</div>
                                <div class="c-table__cell s-text--sm table-cell-twenty">
                                    <span v-if="element.tag == null && element.typeStructure != null && element.typeStructure.tag != null">{{ element.typeStructure.tag }}</span>
                                    <span v-else-if="element.tag != null">{{ element.tag }}</span>
                                </div>
                                <div class="c-table__cell s-text--sm table-cell-five">
                                    <span v-if="element.optional" class="ecolo-button"><check-icon/></span>
                                    <span v-else class="communist-button"><close-icon/></span>
                                </div>
                                <div class="c-table__cell s-text--sm table-cell-five">
                                    <span v-if="element.repetitive" class="ecolo-button"><check-icon/></span>
                                    <span v-else class="communist-button"><close-icon/></span>
                                </div>
                                <div class="c-table__cell s-text--sm table-cell-twenty">
                                    <span v-if="element.typeStructure">{{ element.typeStructure.name }}</span>
                                    <span v-else>TERMINAL</span>
                                </div>
                                <div class="c-table__cell s-text--sm table-cell-thirty">
                                    <span v-if="element.description.length >= 50" class="c-tooltip">{{ element.description.substring(0, 50) }}...<span role="tooltip" data-position="tooltip-top">{{ element.description }}</span></span>
                                    <span v-else>{{ element.description }}</span>
                                </div>
<!--                               <div class="c-table__cell s-text&#45;&#45;sm table-cell-ten">
                                    <span v-if="element.signature.modifiedBy != null">{{ element.signature.modifiedBy }}</span>
                                    <span v-else>{{ element.signature.createdBy }}</span>
                                </div>
                                <div class="c-table__cell s-text&#45;&#45;sm table-cell-ten">
                                    <span v-if="element.signature.modifiedAt != null">{{ element.signature.modifiedAt | formatDate }}</span>
                                    <span v-else>{{ element.signature.createdAt | formatDate }}</span>
                                </div>-->
                                <div class="c-table__cell s-text--sm table-cell-fifteen">
                                    <square-edit-outline-icon/>
                                    <span class="c-tooltip">
                                        <information-icon/>
                                        <span data-position="tooltip-left" role="tooltip">
                                            Author: {{ element.signature.createdBy }}<br/>
                                            Date: {{element.signature.createdAt | formatDate}}
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
import SimpleSidebar from "../parts/simple-sidebar.vue";
import ErrorAlert from "../parts/error-alert";
import Loader from "../tools/loader.vue";
import { hide, show, state } from "../tools/loader-component";
import { HTTP } from "../../http-common";
import SettingsIcon from "vue-material-design-icons/Settings";
import SquareEditOutlineIcon from "vue-material-design-icons/SquareEditOutline";
import CheckIcon from "vue-material-design-icons/Check";
import CloseIcon from "vue-material-design-icons/Close";
import InformationIcon from "vue-material-design-icons/Information";

export default {
  name: "structure-elements",
  props: ["structure_name"],
  data() {
    return {
      errors: [],
      structure: {}
    };
  },
  computed: {
    visible() {
      return state.visible;
    },
    getStructureName() {
      return this.$route.params.structure_name;
    }
  },
  components: { InformationIcon, SquareEditOutlineIcon, SettingsIcon, SimpleSidebar, ErrorAlert, Loader, CheckIcon, CloseIcon },
  async beforeMount() {
    show();
    HTTP.get("structure/" + this.getStructureName)
      .then(r => {
        this.structure = r.data;
        hide();
      })
      .catch(e => {
        this.errors.push(e);
        hide();
      });
  }
};
</script>
