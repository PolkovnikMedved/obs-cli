<template>
    <modal height="auto" name="copy-structure-modal" :clickToClose="false" @before-close="reload">
        <div class="c-modal-custom">
            <div class="c-modal__box">
                <div class="c-modal__header">
                    <h1>Copie de la structure N°{{ structure_name }}</h1>
                    <button class="c-btn communist-button" type="button" @click="$modal.hide('copy-structure-modal')">
                        <close title="Close"/>
                    </button>
                </div>

                <div class="c-modal__body">
                    <error-alert :errors="errors"/>
                    <success-alert @closeSuccess="closeSuccess" :success="success" :success_message="this.successMessage"/>
                    <div style="margin:10px;">
                        <h3>Origine</h3>
                        <p>Structure: {{ structure_name }}</p>

                        <br/>

                        <h3>Destination</h3>
                    </div>

                    <form class="c-form" @submit.prevent="createCopy">
                        <div class="l-row">
                            <fieldset class="c-form__fieldset c-form__fieldset--border">

                                <legend class="c-form__legend">Entrez le nom de la nouvelle structure</legend>

                                <div class="l-row">
                                    <div class="l-col-3 l-justify--end nice-right">
                                        <div class="c-form__field-group">
                                            <label for="id" class="c-form__label spaced">Nom <span class="s-text--warning s-text--bold">*</span></label>
                                        </div>
                                    </div>

                                    <div class="l-col-5">
                                        <div class="c-form__field-group full-width">
                                            <input id="id" class="c-form__field full-width spaced" type="text" name="id" v-model="newStructureName" placeholder="EX.: 950_COPY"/>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                        </div>

                        <div class="l-row">
                            <div class="l-col-offset-3 l-col-5">
                                <button class="c-btn c-btn--success c-btn--raised s-text--center spaced full-width">Soumettre</button>
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

export default {
    name: "copy-structure-modal",
    props: ["structure_name"],
    data () {
        return {
            newStructureName: "",
            errors: [],
            success: false,
            successMessage: "Une nouvelle structure a bien été créée"
        };
    },
    methods: {
        createCopy: function () {
            if(this.structure_name !== this.newStructureName) {
                HTTP.get("/structure/copy?from=" + this.structure_name + "&to=" + this.newStructureName)
                    .then(this.success = true)
                    .catch(e => this.errors.push(e));
            }
        },
        reload: function() {
            this.$emit('reload');
        },
        closeSuccess: function() {
            this.success = false;
        }
    },
    components: {SuccessAlert, ErrorAlert, Close }
}
</script>
