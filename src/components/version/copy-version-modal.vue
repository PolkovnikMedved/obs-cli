<template>
    <modal height="auto" name="copy-version-modal" :clickToClose="false" @before-close="reload">
        <div class="c-modal-custom">
            <div class="c-modal__box">
                <div class="c-modal__header">
                    <h1>Copy version N°{{ version_id }}</h1>
                    <button class="c-btn communist-button" type="button" @click="$modal.hide('copy-version-modal')">
                    <close title="Close"/>
                    </button>
                </div>

                <div class="c-modal__body">
                    <error-alert :errors="errors"/>
                    <success-alert @closeSuccess="closeSuccess" :success="success" :success_message="this.successMessage"/>
                    <div style="margin:10px;">
                        <h3>Origin</h3>
                        <p>Document: {{ document_id }}</p>
                        <p>Version : {{ version_id }} </p>

                        <br/>

                        <h3>Destination</h3>
                        <p>Document: {{ document_id }}</p>
                    </div>

                    <form class="c-form" @submit.prevent="createCopy">
                        <div class="l-row">
                            <fieldset class="c-form__fieldset c-form__fieldset--border">

                                <legend class="c-form__legend">Enter a name for the new version</legend>

                                <div class="l-row">
                                    <div class="l-col-3 l-justify--end nice-right">
                                        <div class="c-form__field-group">
                                            <label for="id" class="c-form__label spaced">New version name</label>
                                        </div>
                                    </div>

                                    <div class="l-col-5">
                                        <div class="c-form__field-group full-width" :class="{ 'c-form__field--danger': $v.newVersionName.$error }">
                                            <input id="id" class="c-form__field full-width spaced" type="text" name="id" v-model.trim="$v.newVersionName.$model" placeholder="EX.: 950_COPY"/>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                        </div>

                        <div class="l-row">
                            <div class="l-col-offset-3 l-col-5">
                                <button class="c-btn c-btn--success c-btn--raised s-text--center spaced full-width" :disabled="$v.$invalid">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </modal>
</template>

<script>
import { HTTP } from "../../http-common";
import Close from "vue-material-design-icons/Close.vue";
import ErrorAlert from "../parts/error-alert";
import SuccessAlert from "../parts/success-alert";
import { required, minLength, maxLength } from "vuelidate/lib/validators";

export default {
    name: "copy-version-modal",
    props: ["version_id", "document_id"],
    data () {
        return {
            newVersionName: "",
            errors: [],
            success: false,
            successMessage: "Une nouvelle version a bien été créée"
        };
    },
    methods: {
        createCopy: function () {
            if(this.version_id !== this.newVersionName) {
                HTTP.get("/version/copy?from=" + this.version_id + "&to=" + this.newVersionName)
                    .then(() => {
                        this.success = true;
                    })
                    .catch(e => this.errors.push(e));
            }
        },
        reload: function() {
            this.success = false;
            this.$emit('reload');
        },
        closeSuccess: function() {
            this.success = false;
        }
    },
    components: {SuccessAlert, ErrorAlert, Close },
    validations: {
      newVersionName: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(20)
      }
    }
}
</script>
