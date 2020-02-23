<template>
  <v-app>
    <v-container>
      <router-view></router-view>
    </v-container>
  </v-app>
</template>

<script>
// import Navber from "./components/Navber";
export default {
  name: "App",

  components: {
    // Navber
  },

  data: () => ({
    //
  })
};
</script>
<style>
@import url("https://fonts.googleapis.com/css?family=Kanit:400,500,700,900&display=swap&subset=thai");
*,
html {
  font-family: "Kanit";
}
</style>
