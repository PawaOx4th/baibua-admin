<template>
  <v-app id="event">
    <v-container>
      <div class="  font-weight-black">กิจกรรม</div>

      <v-layout row wrap>
        <v-flex xs12 sm8 md8>
          <v-card class=" ma-2 pa-2">
            <v-layout row wrap>
              <v-flex xs12 sm1 md12 class="ma-6">
                <!-- Top -->
                <v-layout row wrap>
                  <v-flex xs1 sm1 md1>
                    <!-- <p class="subtitle-2 text-center font-weight-bold  pink">
                      ค้นหา
                    </p> -->
                  </v-flex>
                  <v-flex xs12 sm3 md6>
                    <v-text-field
                      hide-details
                      prepend-icon="search"
                      single-line
                      v-model="search"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <!--  -->
                <v-divider class="mt-6 mb-12"></v-divider>

                <!-- Center -->
                <v-layout row wrap>
                  <v-flex xs12 md5 ml-3>
                    <!-- <div class="caption gray-text">Name Project</div> -->
                    <v-text-field
                      v-model="eventDetail.name"
                      label="ชื่อกิจกรรม"
                      outlined
                    ></v-text-field>
                  </v-flex>
                  <div class="mr-10"></div>
                  <v-flex xs12 md5>
                    <!-- <div class="caption gray-text">Name Project</div> -->
                    <!-- <v-text-field
                      v-model="eventDetail.name"
                      label="หมวดหมู่"
                      outlined
                    ></v-text-field> -->
                    <v-overflow-btn
                      :items="items"
                      label="-"
                      filled
                      target="#dropdown-example-1"
                    ></v-overflow-btn>
                  </v-flex>
                  <v-flex xs12 md5 ml-3>
                    <v-menu
                      ref="menu"
                      v-model="menu"
                      :close-on-content-click="false"
                      :return-value.sync="date"
                      transition="scale-transition"
                      offset-y
                      min-width="200px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="date"
                          label="Picker in menu"
                          prepend-icon="event"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="date"
                        no-title
                        scrollable
                        locale="th"
                      >
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menu = false"
                          >Cancel</v-btn
                        >
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.menu.save(date)"
                          >OK</v-btn
                        >
                      </v-date-picker>
                    </v-menu>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: "event",
  data() {
    return {
      search: "",
      date: "",
      menu: "",
      items: ["คณะ", "มหาวิทยาลัย", "วิชาการ"],
      eventDetail: {
        name: "",
        group: ""
      }
    };
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Kanit:400,500,700,900&display=swap&subset=thai");
#event {
  /* background-color: aqua; */
  font-family: "Kanit";
}
</style>
