<template>
    <div class="t-body">
        <simple-sidebar></simple-sidebar>

        <main class="t-content">
            <success-alert @closeSuccess="closeSuccess" :success="success" :success_message="successMessage"/>
            <error-alert :errors="this.errors" />

            <div class="l-row l-row--gutter full-width">
                <div class="l-col-12">
                    <h1>Update structure element</h1>
                </div>
            </div>


        </main>
    </div>
</template>

<script>
import SimpleSidebar from "../parts/simple-sidebar.vue";
import SuccessAlert from "../parts/success-alert.vue";
import ErrorAlert from "../parts/error-alert.vue";

export default {
  props: ["element_id"],
  name: "edit-element",
  data() {
    return {
      success: false
    };
  },
  components: { SimpleSidebar, SuccessAlert, ErrorAlert },
  methods: {
    closeSuccess: function() {
      this.success = false;
    }
  }
};
</script>
