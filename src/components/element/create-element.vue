<template>
    <form class="c-table__item create-element" :data-index="index" style="background-color: rgb(230,240,249); margin:0;">
        <div class="c-table__cell table-cell-five spaced-top-bottom">#</div>
        <div class="c-table__cell table-cell-twenty" :class="{'c-form__field--danger': $v.element.tag.$error}">
            <input type="text" class="c-form__field spaced-top-bottom full-width" placeholder="tag" v-model.trim="$v.element.tag.$model"/>
        </div>
        <div class="c-table__cell table-cell-five">
            <input placeholder="Optional" type="checkbox" v-model="element.optional" id="optional" class="c-form__field spaced-top-bottom"/>
        </div>
        <div class="c-table__cell table-cell-five">
            <input placeholder="Repetitive" type="checkbox" v-model="element.repetitive" id="repetitive" class="c-form__field spaced-top-bottom"/>
        </div>
        <div class="c-table__cell table-cell-twenty">
            <select name="type" class="c-form__field spaced-top-bottom full-width" id="type" v-if="structures && structures.length" v-model="element.typeStructure.name">
                <option v-for="structure of structures" :key="structure">{{ structure }}</option>
            </select>
        </div>
        <div class="c-table__cell table-cell-thirty" :class="{'c-form__field--danger': $v.element.description.$error}">
            <input type="text" placeholder="description" class="c-form__field spaced-top-bottom full-width" :class="{'.c-form__field--danger': $v.element.description.$error}" v-model.trim="$v.element.description.$model"/>
        </div>
        <div class="c-table__cell table-cell-fifteen l-justify--center">
            <button type="button" :disabled="$v.$invalid" @click.prevent="send(index)" class="c-btn c-btn--success c-btn--raised">
                <check-icon title="Save"/>
            </button>
            <button type="button" @click.prevent="remove(index)" class="c-btn c-btn--danger c-btn--raised">
                <trash-icon title="Cancel"/>
            </button>
        </div>
    </form>
</template>

<script>
    import CheckIcon from "vue-material-design-icons/Check.vue"
    import TrashIcon from "vue-material-design-icons/TrashCanOutline.vue"
    import { HTTP } from "../../http-common.js"
    import { required, minLength, maxLength } from "vuelidate/lib/validators";

    export default {
        props: ['index', 'structure'],
        data() {
            return {
                element: {
                    tag: '',
                    optional: false,
                    repetitive: false,
                    typeStructure: { name: '' },
                    description: '',
                    sequence: 0
                },
                structures: []
            };
        },
        components: { CheckIcon, TrashIcon },
        methods: {
            send(index) {
                this.element.sequence = index;
                console.log('We would send ' + JSON.stringify(this.element));
                this.$emit('create', index, this.element);
            },
            remove(index) {
                this.$emit('remove', index);
            },
        },
        async beforeMount() {
            console.log("Structure: " + JSON.stringify(this.structure));
            HTTP.get("/structure/all-names")
                .then(r => {
                    this.structures = r.data;
                })
                .catch(e => {
                    this.errors.push(e);
                });
        },
        validations:  {
            element: {
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
