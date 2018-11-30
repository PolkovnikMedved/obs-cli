import Vue from "vue";

const state = {
  counter: null
};

Object.defineProperty(state, "visible", {
  get() {
    return state.counter > 0;
  }
});

Vue.util.defineReactive(state, "counter", 0);
Vue.util.defineReactive(state, "visible");

function show() {
  ++state.counter;
}

function hide() {
  --state.counter;
}

function delay() {
  if (state.counter > 1) {
    hide();
  } else {
    setTimeout(() => {
      if (state.counter >= 1) {
        hide();
      }
    }, 100);
  }
}

export { state, show, hide, delay };
