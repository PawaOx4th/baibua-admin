<template>
  <div id="signin">
    <hr />
    <h1>Sign In</h1>
    <form @submit.prevent="pressed">
      <div class="error" v-if="error">{{ error.message }}</div>
      <v-text-field v-model.trim="email" type="email"></v-text-field>
      <v-text-field v-model.trim="password" type="password"></v-text-field>
      <v-btn color="info" type="submit">Sing In</v-btn>
    </form>
    <!-- <v-text-field class="red--text" v-if="err">{{ err }}</v-text-field> -->
  </div>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";

// import router from "vue-router";

export default {
  name: "signin",
  data() {
    return {
      email: "",
      password: "",
      error: ""
    };
  },
  computed: {},
  methods: {
    pressed() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        // eslint-disable-next-line no-unused-vars
        .then(data => {
          // console.log(data);
          this.$router.replace({ name: "home" });
        })
        .catch(error => {
          this.error = error;
          this.email = "";
          this.password = "";
        });
    }
  }
};
</script>

<style></style>
