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
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
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
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
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
  props: {
    source: String
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
    },
    defultData() {
      this.email = "aa@gmail.com";
      this.password = "aaaaaa";
      this.pressed();
    }
  }
};
</script>

<style></style>
