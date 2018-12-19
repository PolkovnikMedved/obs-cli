<template>
        <div class="c-modal-custom">
            <div class="c-modal__box">
                <div class="c-modal__header">
                    <h1>Information</h1>
                    <button class="c-btn communist-button" type="button" @click="closeModal">
                        <close title="Close"/>
                    </button>
                </div>

                <div class="c-modal__body">
                    <div class="l-row l-row--gutter">
                        <div class="l-col-4">
                            <span>Id</span>
                        </div>
                        <div class="l-col-8">
                            <span>{{ element.id }}</span>
                        </div>
                    </div>
                    <div class="l-row l-row--gutter">
                        <div class="l-col-4">
                            <span>Tag</span>
                        </div>
                        <div class="l-col-8">
                            <span>{{ element.tag }}</span>
                        </div>
                    </div>
                    <div class="l-row l-row--gutter">
                        <div class="l-col-4">
                            <span>Repetitif</span>
                        </div>
                        <div class="l-col-8">
                            <span v-if="element.repetitive" class="ecolo-button"><check-icon/></span>
                            <span v-else class="communist-button"><close-icon/></span>
                        </div>
                    </div>
                    <div class="l-row l-row--gutter">
                        <div class="l-col-4">
                            <span>Optionnel</span>
                        </div>
                        <div class="l-col-8">
                            <span v-if="element.optional" class="ecolo-button"><check-icon/></span>
                            <span v-else class="communist-button"><close-icon/></span>
                        </div>
                    </div>
                    <div class="l-row l-row--gutter">
                        <div class="l-col-4">
                            <span>Type</span>
                        </div>
                        <div class="l-col-8">
                            <span v-if="element.typeStructure">{{ element.typeStructure.name }}</span>
                            <span v-else>Terminal</span>
                        </div>
                    </div>
                    <div class="l-row l-row--gutter">
                        <div class="l-col-4">
                            <span>Description</span>
                        </div>
                        <div class="l-col-8">
                            <span>{{ element.description }}</span>
                        </div>
                    </div>
                    <div class="l-row l-row--gutter">
                        <div class="l-col-4">
                            <span>Created at</span>
                        </div>
                        <div class="l-col-8">
                            <span>{{ element.signature.createdAt | formatDate }}</span>
                        </div>
                    </div>
                    <div class="l-row l-row--gutter">
                        <div class="l-col-4">
                            <span>Created by</span>
                        </div>
                        <div class="l-col-8">
                            <span>{{ element.signature.createdBy }}</span>
                        </div>
                    </div>
                    <div class="l-row l-row--gutter">
                        <div class="l-col-4">
                            <span>Last modified at</span>
                        </div>
                        <div class="l-col-8">
                            <span>{{ element.signature.modifiedAt | formatDate }}</span>
                        </div>
                    </div>
                    <div class="l-row l-row--gutter">
                        <div class="l-col-4">
                            <span>Last modified by</span>
                        </div>
                        <div class="l-col-8">
                            <span>{{ element.signature.modifiedBy }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
import Close from "vue-material-design-icons/Close.vue";
import CheckIcon from "vue-material-design-icons/Check";
import CloseIcon from "vue-material-design-icons/Close";

export default {
  props: ["element"],
  components: { Close, CheckIcon, CloseIcon },
  methods: {
    closeModal: function() {
      this.$emit("close");
    }
  }
};
</script>
