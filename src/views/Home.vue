<template>
  <div id="home">
    <Navber />
    <v-content>
      <router-view> </router-view>
    </v-content>
  </div>
</template>

<script>
// import TopHeader from "../components/Top-Header";
import Navber from "../components/Navber";

export default {
  name: "home",
  components: {
    // TopHeader

    Navber
  }
};
</script>

<style></style>
