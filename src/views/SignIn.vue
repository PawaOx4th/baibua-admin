<template>
  <v-app id="inspire">
    <!-- 
      * 2 Sectionn 
     -->
    <v-row row wrap v-resize="onResize">
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
      <v-col
        md="5"
        cols="12"
        :class="{ test: color, form: !color }"
        align="Stretch"
        id=""
      >
        <v-container fill-height fluid>
          <v-row align="center" justify="center">
            <v-col align="center" cols="12">
              <v-card elevation="0" class="" color="#F5F5F3">
                <!-- 
                  * Logo
                 -->
                <transition name="fadeDown">
                  <v-img
                    v-if="show"
                    src="../assets/Logo/Baibua-Logo-horizontal.png"
                    height="120px"
                    contain
                  >
                  </v-img>
                </transition>

                <!-- 
                  *Title 
                  -->
                <transition name="fadeDown">
                  <div v-if="show" class="display-2 mt-5 font-weight-medium">
                    SIGN IN
                  </div>
                </transition>

                <!-- 
                  * Form
                 -->
                <transition name="fadeDown">
                  <v-form @submit.prevent="pressed" v-if="show">
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
                </transition>

                <v-card-actions>
                  <v-spacer />
                  <transition name="fadeDown">
                    <v-btn
                      :loading="overlay"
                      v-if="show"
                      block
                      @click="pressed"
                      color="#57BFFF"
                      class="white--text"
                      elevation="0"
                      x-large
                      >Login</v-btn
                    >
                  </transition>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>

    <!-- 
  * Londing
 -->
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
      size: "",
      show: false,

      email: "",
      password: "",
      error: "",
      overlay: false,
      isMobile: false,
      color: false,
      windowSize: {
        x: 0,
        y: 0
      }
    };
  },
  props: {
    source: String
  },
  mounted() {
    this.onResize();
    this.show = true;
  },

  watch: {
    overlay() {
      setTimeout(() => this.$router.replace({ name: "event" }), 2500);
      // setTimeout(() => this.$router.replace("home"), 2500);
    },
    windowSize() {
      if (this.windowSize.x <= 600) {
        this.color = false;
      } else {
        this.color = true;
      }
    }
  },

  methods: {
    onResize() {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight };
      // console.log(this.windowSize.x + "***" + this.windowSize.y);
    },

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

.test {
  background: #f5f5f3;
}

.form {
  /* background: #ffff19; */
  background-image: url("../assets/background/bg1.jpg");
  background-position: center;

  background-repeat: no-repeat;
  background-size: cover;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
