<template>
    <div class="t-body">
        <simple-sidebar/>
        <main class="t-content">

            <success-alert :success="updated" :success_message="success_message"/>
            <error-alert :errors="errors" />

            <div class="l-row l-row--gutter">
                <div class="l-col">
                    <h1>Ajout d'une version pour le document <span v-if="document">N°{{ document.number }}</span></h1>
                </div>
            </div>

            <div class="l-row l-row--gutter">
                <div class="l-col">
                    <h3><span v-if="document && document.label">{{ document.label.frenchLabel }}</span></h3>
                </div>
            </div>

            <div class="l-row l-row--gutter">
                <div class="l-col-6">

                    <form class="c-form full-width" @submit.prevent="createVersion">
                        <div class="l-row">
                            <fieldset class="c-form__fieldset c-form__fieldset--border">
                                <legend class="c-form__legend">Remplissez le formulaire</legend>

                                <div class="l-row">
                                    <div class="l-col-4 l-justify--end nice-right">
                                        <div class="c-form__field-group">
                                            <label for="id" class="c-form__label spaced">Version Name<span class="s-text s-text--danger">* </span></label>
                                        </div>
                                    </div>
                                    <div class="l-col-8">
                                        <div class="c-form__field-group full-width">
                                            <input id="id" class="c-form__field full-width spaced" type="text" name="id" v-model="version.name" required/>
                                        </div>
                                    </div>
                                </div>

                                <div class="l-row">
                                    <div class="l-col-4 l-justify--end nice-right">
                                        <div class="c-form__field-group">
                                            <label for="description" class="c-form__label spaced">Description <span class="s-text s-text--danger">* </span></label>
                                        </div>
                                    </div>
                                    <div class="l-col-8">
                                        <div class="c-form__field-group full-width">
                                            <textarea rows="5" id="description" class="c-form__field minimal-h spaced" name="description" v-model="version.description" required></textarea>
                                        </div>
                                    </div>
                                </div>

                                <div class="l-row">
                                    <div class="l-col-4 l-justify--end nice-right">
                                        <div class="c-form__field-group">
                                            <label for="dfa" class="c-form__label spaced">N° DFA</label>
                                        </div>
                                    </div>
                                    <div class="l-col-8">
                                        <div class="c-form__field-group full-width">
                                            <input id="dfa" class="c-form__field full-width spaced" type="text" name="dfa" v-model="version.dfaName"/>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                        </div>

                        <div class="l-row">
                            <div class="l-col-offset-4 l-col-8">
                                <button class="c-btn c-btn--primary c-btn--raised c-btn--ripple c-form__button full-width s-text--center spaced" type="submit">Soumettre</button>
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
import SuccessAlert from "../parts/success-alert";
import ErrorAlert from "../parts/error-alert";

export default {
    name: 'add-version',
    props: ['doc_id'],
    data() {
        return {
            document: [],
            version: {
                name: '',
                description: '',
                dfaName: '',
                document: {}
            },
            errors: [],
            updated: false,
            success_message: "La version à bien été créée."
        };
    },
    computed: {},
    methods: {
        createVersion: function () {
            this.version.document = this.document;
            HTTP.post('/version/add', this.version, {headers: {'Content-Type': 'application/json'}})
                .then(r => {
                    this.version = r.data;
                    this.updated = true;
                })
                .catch(e => {
                    this.errors.push(e);
                });
        }
    },
    components: {ErrorAlert, SuccessAlert, SimpleSidebar},
    async beforeMount() {
        let documentId = this.$route.params.doc_id;
        HTTP.get('/document/' + documentId)
            .then(r => {
                this.document = r.data;
            })
            .catch(e => {
                this.errors.push(e);
            });
    }
};
</script>