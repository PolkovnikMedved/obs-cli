<template>
    <div class="t-body">
        <simple-sidebar></simple-sidebar>

        <main class="t-content">
            <success-alert @closeSuccess="closeSuccess" :success="created" :success_message="successMessage"/>
            <error-alert :errors="this.errors" />

            <div class="l-row l-row--gutter full-width">
                <div class="l-col-12">
                    <h1>Creation d'une nouvelle structure</h1>
                </div>
            </div>

            <div class="l-row l-row--gutter full-width">
                <div class="l-col-6">
                    <form class="c-form full-width" @submit.prevent="createStructure">
                        <div class="l-row">
                            <fieldset class="c-form__fieldset c-form__fieldset--border">
                                <legend class="c-form__legend">Remplissez le formulaire</legend>

                                <div class="l-row">
                                    <div class="l-col-4 l-justify--end">
                                        <div class="c-form__field-group">
                                            <label for="id" class="c-form__label spaced">Nom de la structure<span class="s-text s-text--danger">* </span></label>
                                        </div>
                                    </div>
                                    <div class="l-col-8">
                                        <div class="c-form__field-group full-width" :class="{ 'c-form__field--danger': $v.structure.name.$error }">
                                            <input id="id" class="c-form__field full-width spaced" type="text" name="id" placeholder="ex.: BDP" v-model.trim="$v.structure.name.$model"/>
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
                                            <input id="tag" class="c-form__field full-width spaced"  type="text" name="tag" v-model.trim="$v.structure.tag.$model"/>
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
                                <button class="c-btn c-btn--primary c-btn--raised c-btn--ripple c-form__button full-width s-text--center spaced" :disabled="$v.$invalid" type="submit">Soumettre</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </main>

    </div>
</template>

<script>
import SuccessAlert from "../parts/success-alert.vue";
import ErrorAlert from "../parts/error-alert.vue";
import SimpleSidebar from "../parts/simple-sidebar.vue";
import { HTTP } from "../../http-common";
import { required, minLength, maxLength } from "vuelidate/lib/validators";

export default {
  name: "add-structure",
  data() {
    return {
      errors: [],
      createdName: "",
      created: false,
      structure: { name: "", tag: "", description: "" }
    };
  },
  components: { SimpleSidebar, SuccessAlert, ErrorAlert },
  methods: {
    reset: function() {
      this.structure.name = "";
      this.structure.tag = "";
      this.structure.description = "";
    },
    createStructure: function() {
      console.log("Structure = " + JSON.stringify(this.structure));
      HTTP.post("structure/add", JSON.stringify(this.structure), { headers: {'Content-Type': 'application/json'} })
        .then(r => {
          this.createdName = r.data.name;
          this.created = true;
        })
        .catch(e => { this.errors.push(e); });
      this.reset();
    },
    closeSuccess: function() {
      this.created = false;
    }
  },
  computed: {
    successMessage() {
      return "La nouvelle structure " + this.createdName + " a bien été créée.";
    }
  },
  validations: {
    structure: {
      name: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(80)
      },
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
