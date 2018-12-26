<template>
    <div class="l-row l-row--gutter">
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
            </div>

            <draggable :list="children" @update="updateEnd" :options="{ draggable: '.show-element', disabled: this.disabled }" class="c-table__tbody full-width">
                <component
                    v-for="(child, index) in children"
                    :key="index"
                    :is="child.component.is"
                    v-bind="child.component.props"
                    @addTop="addTop"
                    @addBottom="addBottom"
                    @remove="remove"
                    @reloadStructure="reloadStructure"
                />
            </draggable>
        </div>
    </div>
</template>

<script>
import SettingsIcon from "vue-material-design-icons/Settings";
import ShowOneElement from "./show-one-element.vue";
import CreateElement from "./create-element.vue";
import Draggable from "vuedraggable";

export default {
  //name: ["elements-list-new"],
  props: ["structure"],
  data() {
    return {
      children: [],
      full: false
    };
  },
  components: { ShowOneElement, CreateElement, SettingsIcon, Draggable },
  watch: {
    structure(val) {
      if (val && val.elements) {
        this.children = [];
        val.elements.forEach((el, index) => {
          this.children.push({ component: { is: ShowOneElement, props: { element: el, index } } });
        });
      }
    }
  },
  computed: {
    disabled() {
      return this.full;
    }
  },
  methods: {
    updateEnd() {
      let elements = [];
      this.children.forEach(child => {
        elements.push(child.component.props.element);
      });
      this.$emit("elementsReordered", elements);
    },
    addTop(index) {
      if (!this.full) {
        this.children.splice(index, 0, { component: {is: CreateElement, props: {index}}});
        this.full = true;
      }
    },
    addBottom(index) {
      if (!this.full) {
        this.children.splice(index + 1, 0, {
          component: { is: CreateElement, props: { index: index + 1 } }
        });
        this.full = true;
      }
    },
    remove(index) {
      this.children.splice(index, 1);
      this.full = false;
    },
    reloadStructure(str) {
      this.$emit("reloadStructure", str);
    }
  }
};
</script>
