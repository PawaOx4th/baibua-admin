<template>
  <nav>
    <v-app-bar app color="primary">
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

    <v-navigation-drawer app color="blue" v-model="tab" temporary>
      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
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
          :to="item.route"
        >
          <v-list-item-icon>
            <v-icon class="white--text">{{ item.icon }}</v-icon>
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
          title: "ข้อมูลการใช้งาน",
          icon: "mdi-view-dashboard",
          route: "/dashbord",
          stusus: "success"
        },
        {
          title: "กิจกรรม",
          icon: "mdi-image",
          route: "/event",
          stusus: "warning"
        },
        {
          title: "ตารางเรียน",
          icon: "mdi-help-box",
          route: "/display",
          stusus: "info"
        },
        {
          title: "ปฎิทินการศึกษา",
          icon: "mdi-help-box",
          route: "/textcolor",
          stusus: "error"
        },
        {
          title: "กลุ่ม",
          icon: "mdi-help-box",
          route: "/grid",
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
