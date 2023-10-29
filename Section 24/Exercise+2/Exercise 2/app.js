const app = Vue.createApp({
  data() {
    return {
      enteredUserInput1: "",
      enteredUserInput2: "",
    };
  },
  methods: {
    showAlert() {
      alert("Alert!");
    },
    handleKeyDown(event, inputVal) {
      if (inputVal == 'enteredUserInput1') {
        this.enteredUserInput1 = event.target.value;
      } else {
        this.enteredUserInput2 = event.target.value;
      }
    },
  },
});

app.mount("#exercise");
