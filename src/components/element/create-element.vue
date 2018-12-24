<template>
    <form class="c-table__item create-element" :data-index="index" style="background-color: lightcoral; margin:0;">
        <div class="c-table__cell table-cell-five">#</div>
        <div class="c-table__cell table-cell-twenty">
            <input type="text" class="c-form__field" placeholder="tag" v-model="element.tag"/>
        </div>
        <div class="c-table__cell table-cell-five">
            <input placeholder="Optional" type="checkbox" id="optional" class="c-form__field"/>
        </div>
        <div class="c-table__cell table-cell-five">
            <input placeholder="Repetitive" type="checkbox" id="repetitive" class="c-form__field"/>
        </div>
        <div class="c-table__cell table-cell-twenty">
            <input type="text" placeholder="type" class="c-form__field" v-model="element.type"/>
        </div>
        <div class="c-table__cell table-cell-thirty">
            <input type="text" placeholder="description" class="c-form__field" v-model="element.description"/>
        </div>
        <div class="c-table__cell table-cell-fifteen">
            <button type="button" @click.prevent="send" class="c-btn c-btn--success c-btn--raised">
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

    export default {
        props: ['index'],
        data() {
            return {
                element: {
                    tag: '',
                    optional: false,
                    repetitive: false,
                    type: '',
                    description: '',
                },
            };
        },
        components: { CheckIcon, TrashIcon },
        methods: {
            send() {
                console.log('We would send ' + JSON.stringify(this.element));
            },
            remove(index) {
                this.$emit('remove', index);
            },
        },
    };
</script>
