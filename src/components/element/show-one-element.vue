<template>
    <div class="c-table__item show-element" :data-index="index">
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
        <span class="primary-icon" @click="openEditModal(element)">
            <square-edit-outline-icon title="Edit"/>
        </span>
            <button @click="addTop(index)" class="c-btn add-before spaced-icon"></button>
            <button @click="addBottom(index)" class="c-btn add-after spaced-icon"></button>

            <span class="info-icon spaced-icon" @click="openInformationModal(element)">
            <information-icon title="Info"/>
        </span>
        </div>
    </div>
</template>

<script>
import InformationIcon from "vue-material-design-icons/InformationVariant";
import SquareEditOutlineIcon from "vue-material-design-icons/SquareEditOutline";
import CheckIcon from "vue-material-design-icons/Check";
import CloseIcon from "vue-material-design-icons/Close";

export default {
  //name: ["show-element"],
  props: ["element", "index"],
  components: { CloseIcon, SquareEditOutlineIcon, CheckIcon, InformationIcon },
  methods: {
    openInformationModal: function(el) {console.log(el);},
    openEditModal: function(el) {console.log(el);},
    updateComponent: function(el) {console.log(el);},
    addTop: function(index) { this.$emit("addTop", index); },
    addBottom: function(index) { this.$emit("addBottom", index);}
  }
};
</script>
