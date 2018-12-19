<template>
    <div class="l-row">
        <div class="l-col-12">

            <modals-container/>

            <div class="c-table c-table--striped full-width nice-top">
                <div class="c-table__thead">
                    <div class="c-table__item">
                        <div class="c-table__cell s-text--bold table-cell-five">#</div>
                        <div class="c-table__cell s-text--bold table-cell-twenty">Tag</div>
                        <div class="c-table__cell s-text--bold table-cell-five">Opt.</div>
                        <div class="c-table__cell s-text--bold table-cell-five">Rep.</div>
                        <div class="c-table__cell s-text--bold table-cell-twenty">Structure</div>
                        <div class="c-table__cell s-text--bold table-cell-thirty">Description</div>
                        <div class="c-table__cell table-cell-fifteen">
                            <settings-icon />
                        </div>
                    </div>
                </div>

                <draggable v-if="structure.elements" v-model="structure.elements" class="c-table__tbody" @update="updateEnd">
                    <div class="c-table__item" v-for="element of structure.elements" :key="element.sequence">
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
                            <span v-if="element.typeStructure"><a @click.prevent="updateComponent(element.typeStructure)">{{ element.typeStructure.name }}</a></span>
                            <span v-else>Terminal</span>
                        </div>
                        <div class="c-table__cell s-text--sm table-cell-thirty">
                            <span v-if="element.description.length >= 50" class="c-tooltip">{{ element.description.substring(0, 50) }}...<span role="tooltip" data-position="tooltip-top">{{ element.description }}</span></span>
                            <span v-else>{{ element.description }}</span>
                        </div>
                        <div class="c-table__cell s-text--sm table-cell-fifteen">
                            <span class="primary-icon"><square-edit-outline-icon/></span>
                            <span class="c-tooltip info-icon" @click="openInformationModal(element)">
                                <information-icon title="Info"/>
                                <!--                                    <span role="tooltip" data-position="tooltip-left" class="large">
                                                                        <span v-if="element && element.signature && element.signature.modifiedBy != null">Modified by: {{ element.signature.modifiedBy }}</span>
                                                                        <span v-else>Created by: {{ element.signature.createdBy }}</span>
                                                                        <br/>
                                                                        <span v-if="element && element.signature && element.signature.modifiedAt != null">Modified at: {{ element.signature.modifiedAt | formatDate }}</span>
                                                                        <span v-else>Modified at: {{ element.signature.createdAt | formatDate }}</span>
                                                                    </span>-->
                            </span>
                        </div>
                    </div>
                </draggable>

                <div v-else class="c-table__tbody">
                    <div class="c-table__item">
                        <div class="c-table__cell table-cell-one-hundred">We have no elements to show</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import InformationIcon from "vue-material-design-icons/InformationVariant";
import SettingsIcon from "vue-material-design-icons/Settings";
import SquareEditOutlineIcon from "vue-material-design-icons/SquareEditOutline";
import CheckIcon from "vue-material-design-icons/Check";
import CloseIcon from "vue-material-design-icons/Close";
import Draggable from "vuedraggable";
import OneStructureElementModal from "./one-structure-element-modal.vue";

export default {
  name: "elements-list",
  props: {
    structure: {
      required: true
    }
  },
  components: { InformationIcon, SquareEditOutlineIcon, CloseIcon, CheckIcon, SettingsIcon, Draggable },
  methods: {
    updateEnd: function() {
      this.$emit("elementsReordered");
    },
    updateComponent: function (structure) {
      this.$emit("reloadStructure", structure);
    },
    openInformationModal: function(element) {
      this.$modal.show(OneStructureElementModal,
        {
          element: element
        },
        {
          height: "auto"
        }
      );
    }
  }
};
</script>
