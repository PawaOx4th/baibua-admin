<template>
  <div id="login">
    <div class="container-head">
      <div class="bgpig">
        <img src="../assets/img/Mockup.svg" alt="" />
      </div>
      <div class="input">
        <div class="container">
          <!-- <h1>Log In Page</h1> -->
          <h2>{{ Appname }}</h2>
          <hr />
          <div id="login" class="main-box">
            <form @submit="loginWithEmail">
              <h1>Log In</h1>
              <div class="title">
                <h3>Email</h3>
                <input
                  v-model="email"
                  type="text"
                  name=""
                  class="input"
                  placeholder="Email"
                />
              </div>
              <div class="title">
                <h3>Password</h3>
                <input
                  v-model="password"
                  type="password"
                  class="input"
                  placeholder="Password"
                />
              </div>
              <button type="submit" value="sunmit" class="btn">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
      background: "../assets/Mockup.svg",
      width: "100%",
      step: 1
    };
  },
  computed: {
    Appname() {
      return this.$store.getters.appTitle;
    }
  },
  methods: {
    loginWithEmail(e) {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            this.$router.replace("/home");
          },
          err => {
            alert(err.message);
          }
        );
      e.preventDefault();
    }
  }
};
</script>

<style scoped>
#login {
  /* background-color: rgb(55, 175, 255); */
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container-head {
  display: flex;
  justify-content: stretch;
  width: 100vw;
  height: 100vh;
  flex-wrap: wrap;
  position: fixed;
}
.container-head .bgpig {
  flex: 3;
  background: #62b3e9;
}

.container-head .bgpig img {
  height: 120%;
  width: 200%;
  float: left;
  clear: both;
}

.container-head .input {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  flex: 5;
}

.container {
  display: flex;
  width: 50vw;
  height: 50vh;
  background: #5ab9f86b;
  border-radius: 50px;
}

@media screen and (max-width: 960px) {
  .container-head .bgpig {
    display: none;
    background-image: none;
  }

  .container-head .input {
    background: #097ecc;
    flex: 1;
  }
}
</style>
