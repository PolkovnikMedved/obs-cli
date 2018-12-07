<template>
  <div v-if="success" class="c-notification c-notification--success" role="dialog" aria-label="first notification" aria-describedby="desc_1">
    <p id="desc_1" class="c-notification__message">{{ success_message }}</p>
    <button @click="success = !success" aria-label="close" class="c-btn"><close-icon/></button>
  </div>
</template>

<script>
import CloseIcon from "vue-material-design-icons/Close.vue";
export default {
  name: "success-alert",
  props: ["success", "success_message"],
  components: { CloseIcon }
};
</script>
