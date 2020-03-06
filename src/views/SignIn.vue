<template>
  <!-- <div id="signin">
    <hr />
    <h1>Sign In</h1>
    <form @submit.prevent="pressed">
      
      <v-text-field v-model.trim="email" type="email"></v-text-field>
      <v-text-field v-model.trim="password" type="password"></v-text-field>
      <v-btn color="info" type="submit">Sing In</v-btn>
    </form>
    
  </div> -->
  <v-app id="inspire">
    <div id="bglogin">
      <v-container class="fill-height " fluid id="container">
        <v-row align="center" justify="end" class="mr-12">
          <v-col cols="12" sm="8" md="4">
            <v-hover v-slot:default="{ hover }">
              <v-card class="elevation-12" :elevation="hover ? 12 : 2">
                <v-toolbar color="blue" dark>
                  <v-toolbar-title>Login Admin</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <v-form @submit.prevent="pressed">
                    <v-text-field
                      label="Login"
                      name="login"
                      prepend-icon="person"
                      type="text"
                      v-model="email"
                      outlined
                    />

                    <v-text-field
                      id="password"
                      label="Password"
                      name="password"
                      prepend-icon="lock"
                      type="password"
                      v-model="password"
                      outlined
                      @keyup.enter="pressed"
                    />

                    <div class="error--text" v-if="error">
                      {{ error.message }}
                    </div>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <v-btn color="info" @click="pressed">Login</v-btn>
                  <!-- <v-btn color="primary" @click.alt="defultData">Login</v-btn> -->
                </v-card-actions>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
      </v-container>
      <v-overlay :value="overlay" opacity="0.8">
        <v-img src="../assets/5.svg"> </v-img>
        <!-- <v-img src="../assets/Spinner.gif"> </v-img> -->
      </v-overlay>
    </div>
  </v-app>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import * as firebase from "firebase/app";
import "firebase/auth";

// import router from "vue-router";

export default {
  name: "signin",

  data() {
    return {
      email: "",
      password: "",
      error: "",
      overlay: false
    };
  },
  props: {
    source: String
  },
  computed: {},
  watch: {
    overlay() {
      setTimeout(() => this.$router.replace({ name: "home" }), 2500);
    }
  },
  methods: {
    pressed() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        // eslint-disable-next-line no-unused-vars
        .then(data => {
          // console.log(data);
          this.overlay = true;
        })
        .catch(error => {
          this.error = error;
          this.email = "";
          this.password = "";
        });
    },
    defultData() {
      this.email = "aa@gmail.com";
      this.password = "aaaaaa";
      this.pressed();
    }
  }
};
</script>

<style scoped>
#bglogin {
  height: 100%;
  /* background-image: url("https://images.unsplash.com/photo-1508020963102-c6c723be5764?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"); */
  /* filter: blur(8px); */
  background-image: url("../assets/img/Mockup.svg");
  background-position: left;
  background-repeat: no-repeat;
  background-size: cover;
}

#container {
  background-image: url("../assets/PhotonBlue.svg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

#card {
  border-radius: 5%;
}
</style>
