<template>
  <v-app id="navber">
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
    </nav>
    <v-navigation-drawer app color="white" v-model="tab" temporary>
      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>John Leider</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!--  -->
        <v-divider></v-divider>
        <!--  -->
        <v-list-item
          class="mt-5"
          v-for="(item, index) in menu"
          :key="index"
          link
          :to="item.route"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-app>
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
          title: "Font",
          icon: "mdi-view-dashboard",
          route: "/font",
          stusus: "success"
        },
        {
          title: "Botton",
          icon: "mdi-image",
          route: "/button",
          stusus: "warning"
        },
        {
          title: "Display",
          icon: "mdi-help-box",
          route: "/display",
          stusus: "info"
        },
        {
          title: "Text Color",
          icon: "mdi-help-box",
          route: "/textcolor",
          stusus: "error"
        },
        {
          title: "Grid System",
          icon: "mdi-help-box",
          route: "/grid",
          stusus: "success"
        },
        {
          title: "Pop Up",
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
