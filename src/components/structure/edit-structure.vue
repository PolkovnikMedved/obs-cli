<template>
    <div class="t-body">
        <simple-sidebar></simple-sidebar>

        <main class="t-content">
            <success-alert @closeSuccess="closeSuccess" :success="updated" :success_message="successMessage"/>
            <error-alert :errors="errors" />
            <loader v-if="visible"></loader>

            <div class="l-row l-row--gutter full-width">
                <div class="l-col-12">
                    <h1>Mise à jour de la structure {{ currentStructure }}</h1>
                </div>
            </div>

            <div class="l-row l-row--gutter full-width">
                <div class="l-col-6">
                    <form class="c-form full-width" @submit.prevent="updateStructure">
                        <div class="l-row">
                            <fieldset class="c-form__fieldset c-form__fieldset--border">
                                <legend class="c-form__legend">Remplissez le formulaire</legend>

                                <div class="l-row">
                                    <div class="l-col-4 l-justify--end">
                                        <div class="c-form__field-group">
                                            <label for="id" class="c-form__label spaced">Nom de la structure</label>
                                        </div>
                                    </div>
                                    <div class="l-col-8">
                                        <div class="c-form__field-group full-width">
                                            <input id="id" class="c-form__field full-width spaced" type="text" name="id" disabled placeholder="ex.: BDP" v-model="structure.name"/>
                                        </div>
                                    </div>
                                </div>

                                <div class="l-row nice-top">
                                    <div class="l-col-4 l-justify--end">
                                        <div class="c-form__field-group">
                                            <label for="tag" class="c-form__label spaced">Tag</label>
                                        </div>
                                    </div>
                                    <div class="l-col-8">
                                        <div class="c-form__field-group full-width" :class="{ 'c-form__field--danger': $v.structure.tag.$error }">
                                            <input id="tag" class="c-form__field full-width spaced" type="text" name="tag" v-model.trim="$v.structure.tag.$model"/>
                                        </div>
                                    </div>
                                </div>

                                <div class="l-row nice-top">
                                    <div class="l-col-4 l-justify--end">
                                        <div class="c-form__field-group">
                                            <label for="description" class="c-form__label spaced">Description <span class="s-text s-text--danger">* </span></label>
                                        </div>
                                    </div>
                                    <div class="l-col-8">
                                        <div class="c-form__field-group full-width" :class="{ 'c-form__field--danger': $v.structure.description.$error }">
                                            <textarea id="description" class="c-form__field spaced" name="description" v-model.trim="$v.structure.description.$model"></textarea>
                                        </div>
                                    </div>
                                </div>

                            </fieldset>
                        </div>

                        <div class="l-row nice-top">
                            <div class="l-col-offset-4 l-col-8">
                                <button class="c-btn c-btn--primary c-btn--raised c-btn--ripple c-form__button full-width s-text--center spaced" type="submit" :disabled="$v.$invalid">Soumettre</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </main>

    </div>
</template>

<script>
import SimpleSidebar from "../parts/simple-sidebar.vue";
import ErrorAlert from "../parts/error-alert.vue";
import SuccessAlert from "../parts/success-alert.vue";
import { HTTP } from "../../http-common";
import { hide, show, state } from "../tools/loader-component";
import Loader from "../tools/loader.vue";
import { required, minLength, maxLength } from "vuelidate/lib/validators";

export default {
  name: "edit-structure",
  props: ["structure_name"],
  data() {
    return {
      updated: false,
      errors: [],
      structure: { name: "", tag: "", description: "" }
    };
  },
  computed: {
    visible() {
      return state.visible;
    },
    currentStructure() {
      return this.$route.params.structure_name;
    },
    successMessage() {
      return "La structure " + this.currentStructure + " a bien été mise à jour.";
    }
  },
  methods: {
    updateStructure: function() {
      show();
      HTTP.put("structure/update", JSON.stringify(this.structure), { headers: {"Content-Type": "application/json"} })
        .then(r => {
          if (r) console.log();
          this.updated = true;
          hide();
        })
        .catch(e => {
          this.errors.push(e);
          hide();
        });
    },
    closeSuccess: function() {
      this.updated = false;
    }
  },
  components: { SimpleSidebar, ErrorAlert, SuccessAlert, Loader },
  async beforeMount() {
    show();
    HTTP.get("structure/" + this.currentStructure)
      .then(r => {
        this.structure = r.data;
        hide();
      })
      .catch(e => {
        this.errors.push(e);
        hide();
      });
  },
  validations: {
    structure: {
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
