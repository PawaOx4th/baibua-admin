<template>
  <v-app id="inspire">
    <!-- 
      * 2 Sectionn 
     -->
    <v-row row wrap>
      <!-- 
        //  Section 1 picture  
        //  Set Style in css id="left"
        //  Hidden only on xs
       -->
      <v-col md="7" cols="12" class="d-none d-sm-flex" id="left">
        <div></div>
      </v-col>

      <!-- 
        //  Section 2 Form Input
       -->
      <v-col md="5" cols="12" class="#DADBDD " align="Stretch" id="">
        <v-container fill-height fluid>
          <v-row align="center" justify="center">
            <v-col align="center">
              <v-card elevation="0" class="pa-5">
                <!-- 
                  * Logo
                 -->

                <v-img
                  src="../assets/Logo/Baibua-Logo-horizontal.png"
                  height="120px"
                  contain
                >
                </v-img>

                <!-- 
                  *Title 
                  -->
                <div class="display-2 mt-5 font-weight-medium">SIGN IN</div>

                <!-- 
                  * Form
                 -->
                <v-form @submit.prevent="pressed">
                  <v-text-field
                    label="Login"
                    name="login"
                    prepend-icon="person"
                    type="text"
                    v-model="email"
                    class="ma-5"
                  />

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="lock"
                    type="password"
                    v-model="password"
                    class="ma-5"
                    @keyup.enter="pressed"
                  />

                  <div class="error--text" v-if="error">
                    {{ error.message }}
                  </div>
                </v-form>
                <v-card-actions>
                  <v-spacer />
                  <v-btn
                    block
                    color="#57BFFF"
                    @click="pressed"
                    class="white--text"
                    elevation="0"
                    x-large
                    >Login</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-col>

      <!-- 
        // Section 2 Responsive
       -->
      <!-- <v-col
        md="5"
        cols="12"
        class=" d-flex d-sm-none"
        align="Stretch"
        id="form"
      >
        <v-container fill-height fluid>
          <v-row align="center" justify="center">
            <v-col align="center">
              <v-card elevation="0" class="pa-5" id="card">
                <div class="display-2">Login</div>
                <v-form @submit.prevent="pressed">
                  <v-text-field
                    label="Login"
                    name="login"
                    prepend-icon="person"
                    type="text"
                    v-model="email"
                    class="ma-5"
                  />

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="lock"
                    type="password"
                    v-model="password"
                    class="ma-5"
                    @keyup.enter="pressed"
                  />

                  <div class="error--text" v-if="error">
                    {{ error.message }}
                  </div>
                </v-form>
                <v-card-actions>
                  <v-spacer />
                  <v-btn
                    block
                    color="#57BFFF"
                    @click="pressed"
                    class="white--text"
                    elevation="0"
                    x-large
                    >Login</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-col> -->
    </v-row>

    <v-overlay :value="overlay" opacity="0.8">
      <v-img src="../assets/Spinner.gif"> </v-img>
    </v-overlay>
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
      setTimeout(() => this.$router.replace({ name: "event" }), 2500);
      // setTimeout(() => this.$router.replace("home"), 2500);
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
}

#left {
  /* height: 100%;
  width: 100%; */
  /* background-image: url("../assets/PhotonBlue.svg"); */
  background-image: url("../assets/background/bg1.jpg");
  background-position: center;

  background-repeat: no-repeat;
  background-size: cover;
}

/* #form {
  background-image: url("../assets/background/bg1.jpg");
  background-position: center;

  background-repeat: no-repeat;
  background-size: cover;
} */
</style>
