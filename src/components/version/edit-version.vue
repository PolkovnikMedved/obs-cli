<template>
  <div class="t-body">
    <simple-sidebar />
    <main class="t-content">
      <success-alert @closeSuccess="closeSuccess" :success="updated" :success_message="successMessage" />
      <error-alert :errors="errors" />
      <loader v-if="visible"></loader>

      <div v-if="version && version.document && version.document.label" class="l-row l-row--gutter" >
        <div class="l-col">
          <h1>Document {{ version.document.label.frenchLabel }}</h1>
        </div>
      </div>

      <div class="l-row l-row--gutter">
        <div class="l-col">
          <h1>
            Mise à jour de la version
            <span v-if="version">{{ version.name }}</span>
          </h1>
        </div>
      </div>

      <div class="l-row l-row--gutter">
        <div class="l-col-6">
          <form class="c-form full-width" @submit.prevent="prepareUpdate">
            <div class="l-row">
              <fieldset class="c-form__fieldset c-form__fieldset--border">
                <legend class="c-form__legend">Remplissez le formulaire</legend>

                <div class="l-row">
                  <div class="l-col-4 l-justify--end nice-right">
                    <div class="c-form__field-group">
                      <label for="id" class="c-form__label spaced">Nom de la version</label>
                    </div>
                  </div>
                  <div class="l-col-8">
                    <div class="c-form__field-group full-width">
                      <input
                        id="id"
                        class="c-form__field full-width spaced"
                        type="text"
                        name="id"
                        v-model="version.name"
                        disabled
                      />
                    </div>
                  </div>
                </div>

                <div class="l-row nice-top">
                  <div class="l-col-4 l-justify--end nice-right">
                    <div class="c-form__field-group">
                      <label for="description" class="c-form__label spaced">Description<span class="s-text s-text--danger">* </span></label>
                    </div>
                  </div>
                  <div class="l-col-8">
                    <div class="c-form__field-group full-width" :class="{ 'c-form__field--danger': $v.version.description.$error }">
                      <textarea
                        rows="5"
                        id="description"
                        class="c-form__field minimal-h spaced"
                        name="description"
                        v-model="$v.version.description.$model"
                        required
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div class="l-row">
                  <div class="l-col-4 l-justify--end nice-right">
                    <div class="c-form__field-group">
                      <label for="type" class="c-form__label spaced">Type</label>
                    </div>
                  </div>

                  <div class="l-col-8">
                    <div class="c-form__field-group full-width">
                      <select class="c-form__field spaced full-width" id="type" v-if="structures && structures.length" v-model="version.structure.name">
                        <option v-for="structure of structures" :key="structure">{{ structure }}</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div class="l-row nice-top">
                  <div class="l-col-4 l-justify--end nice-right">
                    <div class="c-form__field-group">
                      <label for="dfa" class="c-form__label spaced">N° DFA</label>
                    </div>
                  </div>
                  <div class="l-col-8">
                    <div class="c-form__field-group full-width" :class="{ 'c-form__field--danger': $v.version.dfaName.$error }">
                      <input
                        id="dfa"
                        class="c-form__field full-width spaced"
                        type="text"
                        name="dfa"
                        v-model="version.dfaName"
                      />
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>

            <div class="l-row nice-top">
              <div class="l-col-offset-4 l-col-8">
                <button class="c-btn c-btn--primary c-btn--raised c-btn--ripple c-form__button full-width s-text--center spaced" type="submit" :disabled="$v.$invalid">
                  Soumettre
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { HTTP } from "../../http-common";
import SimpleSidebar from "./../parts/simple-sidebar.vue";
import ErrorAlert from "../parts/error-alert";
import SuccessAlert from "../parts/success-alert";
import { state, show, hide } from "../tools/loader-component";
import Loader from "../tools/loader.vue";
import { required, minLength, maxLength } from "vuelidate/lib/validators";

export default {
  name: "edit-version",
  props: ["version_id"],
  data() {
    return {
      structures: [],
      version: {
        name: "",
        description: "",
        dfaName: ""
      },
      errors: [],
      updated: false,
      successMessage: "La version à bien été mise à jour."
    };
  },
  computed: {
    visible() {
      return state.visible;
    }
  },
  methods: {
    getAllStructures() {
      HTTP.get("/structure/all-names")
        .then(r => {
          this.structures = r.data;
        })
        .catch(e => {
          this.errors.push(e);
        });
    },
    prepareUpdate() {
      show();
      this.errors = [];
      this.updated = false;

      if ( typeof this.version.structure === "object") {
        console.log("Structure is an object");
        this.updateVersion(this.version);
        hide();
      } else if ( typeof this.version.structure === "string") {
        console.log("Structure is a string");
        HTTP.get("/structure/" + this.version.structure)
          .then(r => {
            this.version.structure = r.data;
            this.updateVersion(this.version);
          })
          .catch(e => {
            this.errors.push(e);
          })
          .finally(() => hide());
      } else {
        console.log("Structure " + this.version.structure);
      }

     if (this.visible) { hide(); }
    },
    updateVersion(v) {
      //this.errors = [];
      //this.updated = false;
      HTTP.put("/version/update", JSON.stringify(v), { headers: {'Content-Type': 'application/json'}})
        .then(r => {
          this.version = r.data;
          this.updated = true;
        })
        .catch(e => {
          this.errors.push(e);
        });
    },
    closeSuccess: function() {
      this.updated = false;
    }
  },
  components: { SuccessAlert, ErrorAlert, SimpleSidebar, Loader },
  async beforeMount() {
    show();
    let versionId = this.$route.params.version_id;
    HTTP.get("/version/" + versionId)
      .then(r => {
        this.version = r.data;
        this.getAllStructures();
      })
      .catch(e => {
        this.errors.push(e);
      })
      .finally(() => {
        if (this.version.structure == null) {
          this.version.structure = { name: "" };
        }
        hide();
      });
  },
  validations: {
    version: {
      description: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(767)
      },
      dfaName: {
        maxLength: maxLength(20)
      }
    }
  }
};
</script>
