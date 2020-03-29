<template>
  <div id="home">
    <Navber />
    <v-content fluid>
      <router-view> </router-view>
    </v-content>
    <Footer />
  </div>
</template>

<script>
import firebase from "firebase";
// import TopHeader from "../components/Top-Header";
import Navber from "../components/Navber";
import Footer from "../components/Footer";

export default {
  name: "home",
  components: {
    // TopHeader
    Footer,
    Navber
  },
  beforeCreate() {
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        this.$router.replace("/");
        alert("You don't have a permission");
      }
    });
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Kanit:400,500,700,900&display=swap&subset=thai");
*,
html {
  font-family: "Kanit";
}
</style>
