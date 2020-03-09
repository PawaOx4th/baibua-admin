<template>
  <div id="topheader">
    <!-- Logged in
    <span v-if="loggedIn">Yes</span>
    <span v-else>No</span> -->

    <div>
      <v-btn color="error" @click="signOut">Sign Out</v-btn>
    </div>
  </div>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "topheader",
  data() {
    return {
      loggedIn: false
    };
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      this.loggedIn = !!user;
    });
  },
  methods: {
    signOut() {
      try {
        // eslint-disable-next-line no-unused-vars
        const userSignOut = firebase.auth().signOut();
        // console.log(userSignOut);

        this.$router.replace({ name: "singin" });
      } catch (err) {
        // console.log(err);
      }
    }
  }
};
</script>

<style></style>
