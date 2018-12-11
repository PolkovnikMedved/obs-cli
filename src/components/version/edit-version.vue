<template>
  <div class="t-body">
    <simple-sidebar />
    <main class="t-content">
      <success-alert @closeSuccess="closeSuccess" :success="updated" :success_message="successMessage" />
      <error-alert :errors="errors" />

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
          <form class="c-form full-width" @submit.prevent="updateVersion">
            <div class="l-row">
              <fieldset class="c-form__fieldset c-form__fieldset--border">
                <legend class="c-form__legend">Remplissez le formulaire</legend>

                <div class="l-row">
                  <div class="l-col-3 l-justify--end nice-right">
                    <div class="c-form__field-group">
                      <label for="id" class="c-form__label spaced"
                        >Version Name</label
                      >
                    </div>
                  </div>
                  <div class="l-col-7">
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
                  <div class="l-col-3 l-justify--end nice-right">
                    <div class="c-form__field-group">
                      <label for="description" class="c-form__label spaced"
                        >Description
                        <span class="s-text s-text--danger">* </span></label
                      >
                    </div>
                  </div>
                  <div class="l-col-7">
                    <div class="c-form__field-group full-width">
                      <textarea
                        rows="5"
                        id="description"
                        class="c-form__field minimal-h spaced"
                        name="description"
                        v-model="version.description"
                        required
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div class="l-row nice-top">
                  <div class="l-col-3 l-justify--end nice-right">
                    <div class="c-form__field-group">
                      <label for="dfa" class="c-form__label spaced"
                        >N° DFA</label
                      >
                    </div>
                  </div>
                  <div class="l-col-7">
                    <div class="c-form__field-group full-width">
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
              <div class="l-col-offset-3 l-col-7">
                <button
                  class="c-btn c-btn--primary c-btn--raised c-btn--ripple c-form__button full-width s-text--center spaced"
                  type="submit"
                >
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

export default {
  name: "edit-version",
  props: ["version_id"],
  data() {
    return {
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
  computed: {},
  methods: {
    updateVersion: function() {
      this.errors = [];
      this.updated = false;
      HTTP.put("/version/update", this.version)
        .then(r => {
          this.version = r.data;
          this.updated = true;
        })
        .catch(e => {
          this.errors.push(e);
        });
    },
    closeSuccess: function() {
      this.success = false;
    }
  },
  components: { SuccessAlert, ErrorAlert, SimpleSidebar },
  async beforeMount() {
    let versionId = this.$route.params.version_id;
    HTTP.get("/version/" + versionId)
      .then(r => {
        this.version = r.data;
        console.log("Version: " + JSON.stringify(this.version));
      })
      .catch(e => {
        this.errors.push(e);
      });
  }
};
</script>
