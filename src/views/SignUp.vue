<template>
  <div id="signup">
    <v-app>
      <!-- <div v-if="error" class="error">{{ error.massage }}</div> -->
      <hr />
      <form @submit.prevent="pressed">
        Register
        <div class="email">
          <input type="email" v-model="email" placeholder="email" />
        </div>
        <div class="password">
          <input type="password" v-model="password" placeholder="password" />
        </div>
        <button type="submit">Sing Up</button>
      </form>
    </v-app>
  </div>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "signup",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    pressed() {
      // alert("submit");

      try {
        const newUser = firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password);
        console.log(newUser);
        this.$router.replace({ name: "home" });
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style></style>
