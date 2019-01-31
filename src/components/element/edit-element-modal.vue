<template>
    <div class="c-modal-custom">
        <div class="c-modal__box">
            <div class="c-modal__header">
                <h1>Mise à jour</h1>
                <button class="c-btn communist-button" type="button" @click="close">
                    <close title="Close"/>
                </button>
            </div>

            <div class="c-modal__body">
                <success-alert @closeSuccess="closeSuccess" :success="updated" :success_message="successMessage"/>
                <error-alert :errors="this.errors" />
                <loader v-if="visible"></loader>

                <form class="c-form" @submit.prevent="submit">
                    <div class="l-row l-direction--column">
                        <fieldset class="c-form__fieldset c-form__fieldset--border">
                            <legend class="c-form__legend">Replissez le formulaire</legend>

                            <div class="l-row">
                                <div class="l-col-3 l-justify--end">
                                    <div class="c-form__field-group">
                                        <label for="id" class="c-form__label spaced">Id</label>
                                    </div>
                                </div>
                                <div class="l-col-6">
                                    <div class="c-form__field-group full-width">
                                        <input id="id" type="text" class="c-form__field spaced full-width" disabled v-model="currentElement.id"/>
                                    </div>
                                </div>
                            </div>

                            <div class="l-row">
                                <div class="l-col-3 l-justify--end">
                                    <div class="c-form__field-group">
                                        <label for="tag" class="c-form__label spaced">Tag</label>
                                    </div>
                                </div>
                                <div class="l-col-6">
                                    <div class="c-form__field-group full-width" :class="{ 'c-form__field--danger': $v.currentElement.tag.$error }">
                                        <input id="tag" type="text" class="c-form__field spaced full-width" v-model.trim="$v.currentElement.tag.$model"/>
                                    </div>
                                </div>
                            </div>

                            <div class="l-row">
                                <div class="l-col-3 l-justify--end">
                                    <div class="c-form__field-group">
                                        <label for="optional" class="c-form__label spaced">Optionnel</label>
                                    </div>
                                </div>
                                <div class="l-col-6">
                                    <div class="c-form__field-group">
                                        <input id="optional" type="checkbox" class="c-form__field spaced" v-model="currentElement.optional"/>
                                    </div>
                                </div>
                            </div>

                            <div class="l-row">
                                <div class="l-col-3 l-justify--end">
                                    <div class="c-form__field-group">
                                        <label for="repetitive" class="c-form__label spaced">Répétitif</label>
                                    </div>
                                </div>
                                <div class="l-col-6">
                                    <div class="c-form__field-group">
                                        <input id="repetitive" type="checkbox" class="c-form__field spaced" v-model="currentElement.repetitive"/>
                                    </div>
                                </div>
                            </div>

                            <div class="l-row">
                                <div class="l-col-3 l-justify--end">
                                    <div class="c-form__field-group">
                                        <label for="type" class="c-form__label spaced">Type</label>
                                    </div>
                                </div>

                                <div class="l-col-6">
                                    <div class="c-form__field-group full-width">
                                        <select class="c-form__field spaced full-width" id="type" v-if="structures && structures.length" v-model="chosenType">
                                            <option v-for="structure of structures" :key="structure">{{ structure }}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div class="l-row">
                                <div class="l-col-3 l-justify--end">
                                    <div class="c-form__field-group">
                                        <label for="description" class="c-form__label spaced">Description <span class="s-text s-text--danger">* </span></label>
                                    </div>
                                </div>
                                <div class="l-col-6">
                                    <div class="c-form__field-group full-width" :class="{ 'c-form__field--danger': $v.currentElement.description.$error }">
                                        <textarea id="description" class="c-form__label spaced" v-model="$v.currentElement.description.$model"></textarea>
                                    </div>
                                </div>
                            </div>
                        </fieldset>

                        <div class="l-row">
                            <div class="l-col-offset-3 l-col-6">
                                <div class="c-form__field-group full-width">
                                    <button class="c-btn c-btn--primary c-btn--raised spaced full-width s-text--center" :disabled="$v.$invalid">Soumettre</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import Close from "vue-material-design-icons/Close.vue";
import { HTTP } from "../../http-common";
import SuccessAlert from "../parts/success-alert.vue";
import ErrorAlert from "../parts/error-alert.vue";
import Loader from "../tools/loader.vue";
import { state, show, hide } from "../tools/loader-component";
import { required, minLength, maxLength } from "vuelidate/lib/validators";

export default {
  props: { element: { required: true } },
  components: { Close, ErrorAlert, SuccessAlert, Loader },
  data() {
    return {
      errors: [],
      updated: false,
      successMessage: "The element has been updated",
      structures: [],
      currentElement: {
        id: 0,
        tag: "",
        optional: false,
        repetitive: false,
        description: "",
        sequence: 0
      },
      chosenType: ""
    };
  },
  computed: {
    visible() {
      return state.visible;
    }
  },
  methods: {
    submit() {
      show();
      if (this.chosenType !== null && this.chosenType !== "") {
        HTTP.get("/structure/" + this.chosenType)
          .then(r => {
            this.element.tag = this.currentElement.tag;
            this.element.description = this.currentElement.description;
            this.element.sequence = this.currentElement.sequence;
            this.element.optional = this.currentElement.optional;
            this.element.repetitive = this.currentElement.repetitive;
            this.element.typeStructure = r.data;
            this.updateElement(this.element);
          })
          .catch(e => {
            this.errors.push(e);
          })
          .finally(() => hide());
      }
      else {
        this.element.tag = this.currentElement.tag;
        this.element.description = this.currentElement.description;
        this.element.sequence = this.currentElement.sequence;
        this.element.optional = this.currentElement.optional;
        this.element.repetitive = this.currentElement.repetitive;
        this.updateElement(this.element);
        hide();
      }
    },
    close: function() {
      this.$emit("close");
    },
    closeSuccess: function() {
      this.updated = false;
    },
    updateElement(element) {
      console.log("Call to update element");
      HTTP.put("/structure-element/update", JSON.stringify(element), { headers: {"Content-Type": "application/json"}})
        .then(() => {
          this.updated = true;
          console.log("Updated = " + this.updated + ", message = " + this.successMessage);
        })
        .catch(e => this.errors.push(e));
    }
  },
  async beforeMount() {
    HTTP.get("/structure/all-names")
      .then(r => {
        this.structures = r.data;
      })
      .catch(e => {
        this.errors.push(e);
      });
    this.currentElement.id = this.element.id;
    this.currentElement.tag = this.element.tag;
    this.currentElement.description = this.element.description;
    this.currentElement.optional = this.element.optional;
    this.currentElement.repetitive = this.element.repetitive;
    this.currentElement.sequence = this.element.sequence;
    this.chosenType = (this.element.typeStructure && this.element.typeStructure.name) ? this.element.typeStructure.name : "";
  },
  validations:  {
    currentElement: {
      tag: {
        minLength: minLength(2),
        maxLength: maxLength(80)
      },
      description: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(767)
      }
    }
  }
};
</script>
