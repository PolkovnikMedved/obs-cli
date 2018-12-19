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
                <success-alert @closeSuccess="closeSuccess" :success="updated" :success_message="this.successMessage"/>
                <error-alert :errors="this.errors" />

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
                                        <input id="id" type="text" name="id" class="c-form__field spaced full-width" disabled v-model="element.id"/>
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
                                    <div class="c-form__field-group full-width">
                                        <input id="tag" type="text" name="id" class="c-form__field spaced full-width" v-model="element.tag"/>
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
                                        <input id="optional" type="checkbox" name="id" class="c-form__field spaced" v-model="element.optional"/>
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
                                        <input id="repetitive" type="checkbox" name="id" class="c-form__field spaced" v-model="element.repetitive"/>
                                    </div>
                                </div>
                            </div>

                            <div class="l-row">
                                <div class="l-col-3 l-justify--end">
                                    <div class="c-form__field-group">
                                        <label for="description" class="c-form__label spaced">Description</label>
                                    </div>
                                </div>
                                <div class="l-col-6">
                                    <div class="c-form__field-group full-width">
                                        <textarea id="description" class="c-form__label spaced" v-model="element.description"></textarea>
                                    </div>
                                </div>
                            </div>
                        </fieldset>

                        <div class="l-row">
                            <div class="l-col-offset-3 l-col-6">
                                <div class="c-form__field-group full-width">
                                    <button class="c-btn c-btn--primary c-btn--raised spaced full-width s-text--center">Soumettre</button>
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

export default {
  props: { element: { required: true } },
  components: { Close, ErrorAlert, SuccessAlert },
  data() {
    return {
      errors: [],
      updated: false,
      successMessage: "The element has been updated"
    };
  },
  methods: {
    submit: function() {
      HTTP.put("/structure-element/update", JSON.stringify(this.element), { headers: {"Content-Type": "application/json"}})
        .then(() => {
          this.updated = true;
        })
        .catch(e => this.errors.push(e));
    },
    close: function() {
      this.$emit("close");
    },
    closeSuccess: function() {
      this.updated = false;
    }
  }
};
</script>
