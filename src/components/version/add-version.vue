<template>
    <div class="t-body">
        <simple-sidebar/>
        <main class="t-content">

            <success-alert @closeSuccess="closeSuccess" :success="updated" :success_message="success_message"/>
            <error-alert :errors="errors" />
            <loader v-if="visible"></loader>

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

                    <form class="c-form full-width" @submit.prevent="prepareUpdate">
                        <div class="l-row">
                            <fieldset class="c-form__fieldset c-form__fieldset--border">
                                <legend class="c-form__legend">Remplissez le formulaire</legend>

                                <div class="l-row">
                                    <div class="l-col-4 l-justify--end nice-right">
                                        <div class="c-form__field-group">
                                            <label for="id" class="c-form__label spaced">Nom de la version<span class="s-text s-text--danger">* </span></label>
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
                                            <label for="type" class="c-form__label spaced">Type</label>
                                        </div>
                                    </div>

                                    <div class="l-col-8">
                                        <div class="c-form__field-group full-width">
                                            <select class="c-form__field spaced full-width" id="type" v-if="structures && structures.length" v-model="version.structure">
                                                <option v-for="structure of structures" :key="structure">{{ structure }}</option>
                                            </select>
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
import { state, show, hide } from "../tools/loader-component";
import Loader from "../tools/loader.vue";

export default {
    name: 'add-version',
    props: ['doc_id'],
    data() {
        return {
            document: [],
            structures: [],
            version: {
                name: '',
                description: '',
                dfaName: '',
                structure: '',
                document: {}
            },
            errors: [],
            updated: false,
            success_message: "La version a bien été créée."
        };
    },
    computed: {
        visible() {
            return state.visible;
        },
    },
    methods: {
        updateDocument(document) {
            HTTP.put("/document/update", JSON.stringify(document), {headers: {'Content-Type': 'application/json'}})
                .then(r => {
                    this.document = r.data;
                    this.updated = true;
                    this.version.structure = '';
                })
                .catch(e => {
                    this.errors.push(e);
                })
        },
        prepareUpdate() {
            show();
            if (this.version.structure !== null) {
                HTTP.get("/structure/" + this.version.structure)
                    .then(r => {
                        this.version.structure = r.data;
                        this.document.versions.push(this.version);
                        this.updateDocument(this.document);
                        hide();
                    })
                    .catch(e => {
                        this.errors.push(e);
                        hide();
                    });
            } else {
                this.version.structure = '';
                this.document.versions.push(this.version);
                this.updateDocument(this.document);
            }
            if(this.visible) {hide();}
        },
        closeSuccess: function() {
            this.updated = false;
        }
    },
    components: {ErrorAlert, SuccessAlert, SimpleSidebar, Loader},
    async beforeMount() {
        show();
        let documentId = this.$route.params.doc_id;
        HTTP.get('/document/' + documentId)
            .then(r => {
                this.document = r.data;
            })
            .catch(e => {
                this.errors.push(e);
            })
            .finally(() => hide());

        show();
        HTTP.get("/structure/all-names")
            .then(r => {
                this.structures = r.data;
            })
            .catch(e => {
                this.errors.push(e);
            })
            .finally(() => hide());
    }
};
</script>
