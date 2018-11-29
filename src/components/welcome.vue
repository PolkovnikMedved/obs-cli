<template>
  <div class="t-body">
    <main class="t-content">
      <div class="l-row l-row--gutter">
        <div class="l-col">
          <p>{{ hello }}</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "welcome",
  data() {
    return {
      hello: "Welcome to Observatory!"
    };
  },
  computed: {},
  methods: {},
  components: {}
};
</script>
