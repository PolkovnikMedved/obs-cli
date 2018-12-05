<template>
    <div class="t-body">
        <simple-sidebar/>
        <main class="t-content">

            <div v-if="updated" class="c-notification c-notification--success" role="dialog" aria-label="first notification" aria-describedby="desc_1">
                <p id="desc_1" class="c-notification__message">La version à bien été créée.</p>
            </div>

            <div v-if="errors && errors.length">
                <div v-for="error of errors" class="c-notification c-notification--danger">
                    {{ error.message }}
                </div>
            </div>

            <div class="l-row l-row--gutter">
                <div class="l-col">
                    <h1>{{ msg }} pour le document N°{{ doc_id }}</h1>
                </div>
            </div>

            <div class="l-row l-row--gutter">
                <div class="l-col-6">

                    <form class="c-form full-width" @submit.prevent="createVersion">
                        <div class="l-row">
                            <fieldset class="c-form__fieldset s-text--center">
                                <legend class="c-form__legend">Remplissez le formulaire</legend>

                                <div class="l-row">
                                    <div class="l-col-3 l-justify--end nice-right">
                                        <div class="c-form__field-group">
                                            <label for="id" class="c-form__label spaced">Version Id <span class="s-text s-text--danger">* </span></label>
                                        </div>
                                    </div>
                                    <div class="l-col-7">
                                        <div class="c-form__field-group full-width">
                                            <input id="id" class="c-form__field full-width spaced" type="text" name="id" v-model="version.id"/>
                                        </div>
                                    </div>
                                </div>

                                <div class="l-row nice-top">
                                    <div class="l-col-3 l-justify--end nice-right">
                                        <div class="c-form__field-group">
                                            <label for="description" class="c-form__label spaced">Description <span class="s-text s-text--danger">* </span></label>
                                        </div>
                                    </div>
                                    <div class="l-col-7">
                                        <div class="c-form__field-group full-width">
                                            <textarea rows="5" id="description" class="c-form__field minimal-h spaced" name="description" v-model="version.description"></textarea>
                                        </div>
                                    </div>
                                </div>

                                <div class="l-row nice-top">
                                    <div class="l-col-3 l-justify--end nice-right">
                                        <div class="c-form__field-group">
                                            <label for="dfa" class="c-form__label spaced">N° DFA <span class="s-text s-text--danger">* </span></label>
                                        </div>
                                    </div>
                                    <div class="l-col-7">
                                        <div class="c-form__field-group full-width">
                                            <input id="dfa" class="c-form__field full-width spaced" type="text" name="dfa" v-model="version.dfa"/>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                        </div>

                        <div class="l-row nice-top">
                            <div class="l-col-offset-3 l-col-7">
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
    import { HTTP } from '../../http-common';
    import SimpleSidebar from './../parts/simple-sidebar.vue';

    export default {
        name: 'add-version',
        props: ['doc_id'],
        data() {
            return {
                msg: 'Ajout d\'une version',
                document: [],
                version: {
                    id: '',
                    description: '',
                    dfa: '',
                    document: {}
                },
                errors: [],
                updated: false
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
        components: {SimpleSidebar},
        created: function () {
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
