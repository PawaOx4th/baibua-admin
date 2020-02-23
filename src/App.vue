<template>
  <v-app>
    <!-- <SignIn /> -->
    <!-- <SignUp /> -->

    <!-- <router-link to="/home">Home</router-link> -->
    <!-- <router-link to="/signup">Sign Up</router-link> -->
    <!-- <router-link to="/singin">Sign In</router-link> -->

    <v-container>
      <router-view></router-view>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {
    // TopHeader
  },

  data: () => ({
    //
  })
};
</script>
