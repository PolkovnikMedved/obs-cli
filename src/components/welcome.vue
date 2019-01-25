<template>
  <div class="t-body">
    <main class="t-content">
      <error-alert :errors="errors" />

      <div class="l-row l-row--gutter">
        <div class="l-col-offset-3 l-col-6 l-justify--center">
          <h1>{{ hello }}</h1>
          <form action="" class="c-form c-form--block full-width">
            <div class="l-row ">
              <div class="l-col-4 l-justify--end">
                <div class="c-form__field-group">
                  <label for="username-1" class="c-form__label spaced">Pseudonyme<span class="c-form__required">*</span></label>
                </div>
              </div>

              <div class="l-col-4">
                <div class="c-form__field-group full-width" :class="{ 'c-form__field--danger': $v.user.pseudo.$error }">
                  <input id="username-1" class="c-form__field full-width" v-model.trim="$v.user.pseudo.$model" type="text" name="username" autocomplete="off">
                </div>
              </div>
            </div>
            <div class="l-row ">
              <div class="l-col-4 l-justify--end">
                <div class="c-form__field-group">
                  <label for="password-1" class="c-form__label spaced">Mot de passe<span class="c-form__required">*</span></label>
                </div>
              </div>

              <div class="l-col-4">
                <div class="c-form__field-group full-width">
                  <input id="password-1" class="c-form__field full-width" v-model.trim="$v.user.pass.$model" type="password" name="password" autocomplete="off">
                </div>
              </div>
            </div>

            <div class="l-row">
              <div class="l-col-offset-4 l-col-4">
                <div class="c-form__field-group full-width">
                  <button class="c-btn c-btn--primary c-btn--raised c-btn--ripple c-form__button s-text--center" type="submit" style="margin-top:5px" :disabled="$v.$invalid" @click.prevent="goToDocuments">Sign in</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { HTTP } from "../http-common";
import ErrorAlert from "./parts/error-alert";
import { required, minLength } from "vuelidate/lib/validators";

export default {
  name: "welcome",
  data() {
    return {
      hello: "Bienvenue dans l'observatoire 3.0!",
      serverMessage: "",
      errors: [],
      user: { pseudo: "", pass: "" }
    };
  },
  computed: {},
  methods: {
    goToDocuments() {
      this.$router.push({ name: "documents" });
    }
  },
  components: { ErrorAlert },
  async beforeMount() {
    console.log("$V : " + this.$v);
    // Let us see if the server is up
    HTTP.get("")
      .then(r => {
        this.serverMessage = r.data;
        console.log(JSON.stringify(this.serverMessage));
      })
      .catch(e => this.errors.push(e));
  },
  validations: {
    user: {
      pseudo: {
        required,
        minLength: minLength(2)
      },
      pass: {
        required
      }
    }
  }
};
</script>
