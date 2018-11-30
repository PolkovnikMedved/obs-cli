<template>
  <div class="t-body">
    <main class="t-content">
      <div class="l-row l-row--gutter">
        <div class="l-col-offset-4 l-col-4 l-justify--center">
          <h1>{{ hello }}</h1>
          <form action="" class="c-form c-form--block full-width">
            <div class="l-row ">
              <div class="l-col-4 l-justify--end">
                <div class="c-form__field-group">
                  <label for="username-1" class="c-form__label spaced">Username<span class="c-form__required">*</span></label>
                </div>
              </div>

              <div class="l-col-8">
                <div class="c-form__field-group">
                  <input id="username-1" class="c-form__field" type="text" name="username" autocomplete="off">
                </div>
              </div>
            </div>
            <div class="l-row ">
              <div class="l-col-4 l-justify--end">
                <div class="c-form__field-group">
                  <label for="password-1" class="c-form__label spaced">Password<span class="c-form__required">*</span></label>
                </div>
              </div>

              <div class="l-col-8">
                <div class="c-form__field-group">
                  <input id="password-1" class="c-form__field" type="password" name="password" autocomplete="off">
                </div>
              </div>
            </div>

            <div class="l-row">
              <div class="l-col-offset-4 l-col-8">
                <div class="c-form__field-group">
                  <router-link :to="{ name: 'versions' }" class="c-btn c-btn--primary c-btn--raised c-btn--ripple c-form__button spaced-no-left" type="submit">Sign in</router-link>
                </div>
              </div>
            </div>
          </form>
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
