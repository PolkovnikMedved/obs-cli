<template>
  <div class="t-body">
    <version-search />
    <main class="t-content">
      <div v-if="errors && errors.length">
        <div v-for="(error, index) of errors" :key="index" class="c-notification c-notification--danger">
          <p>{{ error.message }}</p>
        </div>
      </div>

      <loader v-if="visible"></loader>

      <div class="l-row l-row--gutter">
        <div class="l-col"><h1>Versions management</h1></div>
      </div>
    </main>
  </div>
</template>

<script>
import Loader from "../tools/loader.vue";
import VersionSearch from "../parts/version-search.vue";
import { state, show, hide } from "../tools/loader-component";
import { HTTP } from "../../http-common";
export default {
  name: "versions",
  data() {
    return {
      errors: [],
      versions: []
    };
  },
  computed: {
    visible() {
      return state.visible;
    }
  },
  components: { VersionSearch, Loader },
  async beforeMount() {
    show();
    HTTP.get("version/all")
      .then(response => {
        this.versions = response.data;
        hide();
      })
      .catch(e => {
        this.errors.push(e);
        hide();
      });
  }
};
</script>
