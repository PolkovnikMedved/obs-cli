<template>
    <aside class="t-sidebar sidebar-background">
        <div class="l-row">
            <div class="l-col">
                <router-link :to="{ name: 'documents' }" class="c-btn c-btn--primary c-btn--raised spaced">Documents</router-link>
            </div>
            <div class="l-col">
                <router-link :to="{ name: 'structures' }" class="c-btn c-btn--primary c-btn--raised spaced">Structures</router-link>
            </div>
        </div>

        <div class="full-width" style="width:200px;height:1px;border-top:1px solid lightgray;margin: 10px auto;"></div>

        <div class="l-row">
            <div class="l-col smart">
                <button class="c-btn full-width s-text--center">Information</button>
            </div>
        </div>
        <div class="l-row">
            <div class="l-col smart">
                <button class="c-btn full-width s-text--center" @click="getXML(true)">Empty XML</button>
            </div>
        </div>
        <div class="l-row">
            <div class="l-col smart">
                <button class="c-btn full-width s-text--center" @click="getXML(false)">Default XML</button>
            </div>
        </div>
    </aside>
</template>

<script>
import { HTTP } from "../../http-common";

export default {
  props: { current_structure_name: { required: true } },
  name: "elements-sidebar",
  methods:{
    getXML(empty) {
      HTTP.get("/structure/xml?name=" + this.current_structure_name + "&empty=" + empty)
        .then(r => {
          // Replace >< by >\r\n< for papyrus....
          let xml = r.data;
          xml = xml.replace(/></g, ">\r\n<");
          xml += "\r\n";

          let blob = new Blob([xml], { type: "application/xml" });
          let link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = this.current_structure_name + ".xml";
          document.body.appendChild(link);
          link.click();
        })
        .catch(e => {
          console.log(e.message);
          this.$modal.show("dialog", {
            title: "Une erreur est survenue",
            text: e.message,
            buttons: [{title: "OK", handler: () => this.$modal.hide("dialog")}]
          });
        });
    }
  }
};
</script>
