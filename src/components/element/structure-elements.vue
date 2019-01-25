<template>
    <div class="t-body">
        <elements-sidebar :class="{ 'hidden-menu': !this.showMenu }"/>

        <span @click="showMenuHandler" class="menu-opener">
            <LeftArrow title="Close Menu" v-if="this.showMenu" />
            <RightArrow title="Open Menu" v-else />
        </span>

        <main class="t-content">
            <v-dialog/>
            <loader v-if="visible"/>
            <error-alert :errors="errors"/>
            <success-alert :success="success" :success_message="successMessage" @closeSuccess="closeSuccess"/>

            <div class="l-row l-row--gutter">
                <div class="l-col-6">
                    <h1>Structure <span v-if="currentStructure && currentStructure.name">{{ currentStructure.name }}</span></h1>
                </div>
                <div class="l-col-6 l-justify--end">
                    <span v-if="orderChanged" style="padding-top:10px; padding-right:10px;">
                        <span>The order has been changed. Do you want to save ?</span>&nbsp;
                        <button class="c-btn c-btn--success c-btn--raised" @click="updateOrder">Save</button>&nbsp;
                    </span>
                </div>
            </div>

            <div class="l-row l-row--gutter" v-if="history.length !== 1">
                <div class="l-col-12">
                    <ul class="breadcrumb">
                        <li v-for="(el, index) of history" :key="el.name">
                            <button class="c-btn" type="button" @click.prevent="backStructure(el)" v-if="(index !== (history.length-1))">{{el.name}}</button>
                            <button class="c-btn" type="button" v-else-if="(index === (history.length -1))" disabled>{{ el.name }}</button>
                        </li>
                    </ul>
                </div>
            </div>

            <elements-list
                :structure="currentStructure"
                @reloadStructure="changeStructure"
                @elementsReordered="elementsReordered"
                @updateStructure="updateCurrentStructure"
            />
        </main>
    </div>
</template>

<script>
import Loader from "../tools/loader.vue";
import { hide, show, state } from "../tools/loader-component";
import { HTTP } from "../../http-common";
import SuccessAlert from "../parts/success-alert";
import ElementsSidebar from "../parts/elements-sidebar";
import ElementsList from "./elements-list.vue";
import ErrorAlert from "../parts/error-alert";
import LeftArrow from "vue-material-design-icons/ArrowLeft";
import RightArrow from "vue-material-design-icons/ArrowRight";

export default {
  name: "structure-elements",
  props: ["structure_name"],
  data() {
    return {
      showMenu: true,
      initialElements: [],
      initialStructure: [],
      currentStructure: [],
      errors: [],
      history: [],
      orderChanged: false,
      success: false,
      successMessage: "The order has been successfully changed"
    };
  },
  computed: {
    visible() {
      return state.visible;
    }
  },
  methods: {
    showMenuHandler() {
      this.showMenu = !this.showMenu;
    },
    updateCurrentStructure(structure) {
      HTTP.put("/structure/update", JSON.stringify(structure), { headers: {"Content-Type": "application/json"} })
        .then(r => {
          this.currentStructure = r.data;
          this.successMessage = "La structure a bien été mise à jour";
          this.success = true;
        })
        .catch(e => this.errors.push(e));
    },
    updateOrder: function () {
      HTTP.put("structure/update-order", this.currentStructure)
        .then(r => {
          this.currentStructure = r.data;
          this.orderChanged = false;
          this.successMessage = "L'ordre des éléments a bien été mis à jour.";
          this.success = true;
        })
        .catch(e => this.errors.push(e));
    },
    closeSuccess: function () {
      this.success = false;
    },
    elementsReordered: function (reorderedElements) {
      let changed = false;
      if (this.initialElements.length === reorderedElements.length) {
        for (let i = 0; i < this.initialElements.length; i++) {
          if (this.initialElements[i] !== reorderedElements[i]) {
            changed = true;
            break;
          }
        }
      }
      this.orderChanged = changed;
    },
    changeStructure: function (structure) {
      this.history.push(structure);
      this.currentStructure = structure;
      this.initialElements = structure.elements;
    },
    backStructure: function (structure) {
      // Set desired structure as current structure
      this.currentStructure = structure;

      // Remove all structures that are after `structure` from history
      for (let i = 0; i < this.history.length; i++) {
        if (this.history[i].name === structure.name) {
          this.history.length = this.history.indexOf(structure) + 1;
        }
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    if (this.history.length <= 1) {
      next(true);
    } else {
      this.$modal.show("dialog", {
        title: "Are you sure ?",
        text: "Do you want to leave " + this.initialStructure.name + " structure ?",
        buttons: [
          {
            title: "No",
            handler: () => {
              next(false);
              this.$modal.hide("dialog");
            }
          },
          {
            title: "Yes",
            handler: () => {
              next(true);
            }
          }
        ]
      });
    }
  },
  components: { Loader, SuccessAlert, ElementsSidebar, ElementsList, ErrorAlert, LeftArrow, RightArrow },
  async beforeMount() {
    show();
    HTTP.get("structure/" + this.$route.params.structure_name)
      .then(r => {
        this.initialStructure = r.data;
        this.initialElements = this.initialStructure.elements;
        this.currentStructure = this.initialStructure;
        this.history.push(this.initialStructure);
        hide();
      })
      .catch(e => {
        this.errors.push(e);
        hide();
      });
  }
};
</script>
