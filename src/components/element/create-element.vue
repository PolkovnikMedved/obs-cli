<template>
    <form class="c-table__item create-element" :data-index="index" style="background-color: rgb(230,240,249); margin:0;">
        <div class="c-table__cell table-cell-five spaced-top-bottom">#</div>
        <div class="c-table__cell table-cell-twenty">
            <input type="text" class="c-form__field spaced-top-bottom full-width" placeholder="tag" v-model="element.tag"/>
        </div>
        <div class="c-table__cell table-cell-five">
            <input placeholder="Optional" type="checkbox" id="optional" class="c-form__field spaced-top-bottom"/>
        </div>
        <div class="c-table__cell table-cell-five">
            <input placeholder="Repetitive" type="checkbox" id="repetitive" class="c-form__field spaced-top-bottom"/>
        </div>
        <div class="c-table__cell table-cell-twenty">
            <select name="type" class="c-form__field spaced-top-bottom full-width" id="type" v-if="structures && structures.length" v-model="element.typeStructure.name">
                <option v-for="structure of structures" :key="structure">{{ structure }}</option>
            </select>
        </div>
        <div class="c-table__cell table-cell-thirty">
            <input type="text" placeholder="description" class="c-form__field spaced-top-bottom full-width" v-model="element.description"/>
        </div>
        <div class="c-table__cell table-cell-fifteen l-justify--center">
            <button type="button" @click.prevent="send(index)" class="c-btn c-btn--success c-btn--raised">
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
                },
                structures: []
            };
        },
        components: { CheckIcon, TrashIcon },
        methods: {
            send(index) {
                console.log('We would send ' + JSON.stringify(this.element));
                this.$emit('create', index, this.element);
            },
            remove(index) {
                this.$emit('remove', index);
            },
        },
        async beforeMount() {
            HTTP.get("/structure/all-names")
                .then(r => {
                    this.structures = r.data;
                })
                .catch(e => {
                    this.errors.push(e);
                });
        }
    };
</script>
