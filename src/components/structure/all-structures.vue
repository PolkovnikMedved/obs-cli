<template>
    <div class="t-body">
        <structure-search></structure-search>

        <main class="t-content">
            <div v-if="errors && errors.length">
                <div v-for="(error, index) of errors" :key="index" class="c-notification c-notification--danger">
                    <p>{{ error.message }}</p>
                </div>
            </div>

            <loader v-if="visible"></loader>

            <div class="l-row l-row--gutter">
                <div class="l-col"><h1>Structures management</h1></div>
            </div>


        </main>
    </div>
</template>

<script>
import StructureSearch from "../parts/structure-search.vue";
import { state, show, hide } from "../tools/loader-component";
import { HTTP } from "../../http-common";
import Loader from "../tools/loader.vue";

export default {
  name: "structures",
  data() {
    return {
      page: 1,
      errors: [],
      structures: []
    };
  },
  computed: {
    visible() {
      return state.visible;
    }
  },
  components: { StructureSearch, Loader },
  methods: {
    getStructures: function(pageNum) {
      show();
      let url = "structure/all?documentNumber="+this.search.documentNumber+"&documentName="+this.search.documentName+"&documentCategory="+this.search.documentCategory+"&createdBy="+this.search.createdBy+"&modifiedBy="+this.search.modifiedBy+"&page=" + pageNum;
      HTTP.get(url)
        .then(r => {
          this.documents = r.data;
          this.addProperty();
          hide();
        })
        .catch(e => {
          this.errors.push(e);
          hide();
        });
    }
  },
  async beforeMount() {
    this.getStructures(0);
  }
};
</script>
