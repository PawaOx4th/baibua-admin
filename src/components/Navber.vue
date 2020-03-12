<template>
  <nav>
    <v-app-bar app color="#405375">
      <v-app-bar-nav-icon
        @click.stop="tab = !tab"
        class="white--text"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="white--text">{{ AppName }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- <v-btn target="_blank">
          <span class="mr-2">Sign Out</span>

          <v-icon color="red" size="30px">all_inbox</v-icon>
        </v-btn> -->
      <TopHeader />
    </v-app-bar>

    <v-navigation-drawer app color="#405375" v-model="tab" temporary>
      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <v-img src="../assets/icon.gif"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title class="white--text"
              >John Leider</v-list-item-title
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
            <v-icon class="white--text" medium>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="white--text">{{
              item.title
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import TopHeader from "../components/Top-Header";
export default {
  name: "navber",
  components: {
    TopHeader
  },
  data() {
    return {
      tab: false,
      menu: [
        {
          title: "กิจกรรม",
          icon: "mdi-image",
          route: "/event",
          stusus: "warning"
        },
        {
          title: "ข้อมูลนักศึกษา",
          icon: "mdi-account-details-outline",
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
        {
          title: "ตั้งค่า",
          icon: "mdi-help-box",
          route: "/popup",
          stusus: "success"
        }
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
