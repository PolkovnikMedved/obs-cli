<template>
  <div id="app">
    <div class="t-wrap">
      <obs-header></obs-header>
      <router-view />
      <obs-footer></obs-footer>
    </div>
  </div>
</template>

<script>
import ObsHeader from "./views/parts/header.vue";
import ObsFooter from "./views/parts/footer.vue";

export default {
  name: "App",
  components: { ObsHeader, ObsFooter }
};
</script>
