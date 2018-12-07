<template>
  <div v-if="errors && errors.length">
    <div v-for="(error, index) of errors" :key="index" class="c-notification c-notification--danger" role="dialog" aria-label="first notification" aria-describedby="desc_2">
      <p id="desc_2" class="c-notification__message">{{ error.message }}</p>
      <button @click="removeError(error)" aria-label="close" class="c-btn"><close-icon/></button>
    </div>
  </div>
</template>

<script>
import CloseIcon from "vue-material-design-icons/Close.vue";

export default {
  name: "error-alert",
  props: ["errors"],
  data() {
    return {
      created: false
    };
  },
  methods: {
    removeError: function(e) {
      const index = this.errors.indexOf(e);
      this.errors.splice(index, 1);
    }
  },
  components: { CloseIcon }
};
</script>
