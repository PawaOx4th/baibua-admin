<template>
  <nav>
    <v-app-bar app color="#4869DA">
      <v-app-bar-nav-icon
        @click.stop="tab = !tab"
        class="white--text"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="white--text">{{ AppName }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- 
       * Button
      -->
      <!-- <SignOut /> -->
      <Time />
    </v-app-bar>

    <v-navigation-drawer
      app
      v-model="tab"
      src="../assets/background/bgline.jpg"
      temporary
      width="320px"
    >
      <v-list>
        <v-list-item>
          <v-list-item-avatar size="75">
            <v-img src="../assets/icon.gif"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title class="white--text display-1 "
              >Admin</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
        <!--  -->
        <v-divider class="mb-12  mt-8 _18mp white "></v-divider>
        <!--  -->
        <v-list-item
          class=""
          v-for="(item, index) in menu"
          :key="index"
          link
          router
          :to="item.route"
        >
          <v-list-item-icon>
            <v-icon class="white--text " large>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="white--text font-weight-regular title">{{
              item.title
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <SignOut />
        </div>
      </template>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import SignOut from "../components/SignOut";
import Time from "../components/Time";
export default {
  name: "navber",
  components: {
    SignOut,
    Time
  },
  data() {
    return {
      tab: false,

      bg: "../assets/background/bg1.jpg",
      menu: [
        {
          title: "รายละเอียด",
          icon: "mdi-collage",
          route: "/dashBoard",
          stusus: "warning"
        },
        {
          title: "กิจกรรม",
          icon: "mdi-image",
          route: "/event",
          stusus: "warning"
        },
       
        {
          title: "ผู้ใช้งานระบบ",
          icon: "mdi-account-details-outline",
          route: "/user",
          stusus: "info"
        },
        {
          title: "นักศึกษา",
          icon: "mdi-account-multiple",
          route: "/student",
          stusus: "info"
        },
        {
          title: "รายวิชา",
          icon: "mdi-calendar-text",
          route: "/subject",
          stusus: "error"
        },
        {
          title: "กลุ่ม",
          icon: "mdi-briefcase-account",
          route: "/section",
          stusus: "success"
        },
       
      ]
    };
  },
  computed: {
    AppName() {
      return this.$store.getters.appTitle;
    }
  }
};
</script>

<style></style>
