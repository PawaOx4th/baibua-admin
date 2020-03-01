<template>
  <v-app id="event">
    <v-container>
      <div class="font-weight-black" id="title">กิจกรรม</div>

      <v-layout row wrap>
        <v-flex xs12 sm8 md8>
          <v-card class="pa-5 ">
            <v-layout row wrap>
              <v-flex xs12 sm1 md12 class="ml-6">
                <!-- Top -->
                <!--//************* search Event *************** -->
                <v-layout row wrap>
                  <v-flex xs12 sm3 md6 ma-5>
                    <v-text-field
                      hide-details
                      prepend-icon="search"
                      single-line
                      v-model="search"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <!--//*************************************** */  -->
                <!--  -->
                <v-divider class="mt-6 mb-12"></v-divider>

                <!-- Center -->

                <v-layout row wrap>
                  <!--//***************** Event Name  ***********************-->
                  <v-flex xs12 md5>
                    <!-- <div class="caption gray-text">Name Project</div> -->
                    <v-text-field
                      v-model="eventDetail.name"
                      label="ชื่อกิจกรรม"
                      outlined
                    ></v-text-field>
                  </v-flex>

                  <!--//****************  Item Group ****************/  -->
                  <div class="mr-10"></div>
                  <v-flex xs12 md5>
                    <v-overflow-btn
                      :items="items"
                      label="-"
                      filled
                      target="#dropdown-example-1"
                    ></v-overflow-btn>
                  </v-flex>

                  <!--//**************** Data Picker ***************/  -->
                  <v-flex xs12 md5>
                    <v-menu
                      v-model="menu3"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="date"
                          label="คลิกเพื่อเลือกวันที่"
                          prepend-icon="event"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="date"
                        @input="menu3 = false"
                        locale="th"
                      ></v-date-picker>
                    </v-menu>
                  </v-flex>

                  <!--//**************** Time Picker ***************//  -->
                  <v-flex xs12 md5>
                    <v-menu
                      ref="menu"
                      v-model="menu2"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      :return-value.sync="time"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="time"
                          label="คลิกเพื่อเลือกเวลา"
                          prepend-icon="access_time"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-time-picker
                        v-if="menu2"
                        v-model="time"
                        full-width
                        format="24hr"
                        @click:minute="$refs.menu.save(time)"
                      ></v-time-picker>
                    </v-menu>
                  </v-flex>

                  <!--//**************** Text Area ***************//  -->
                  <v-flex xs12 md12 pa-3>
                    <v-textarea
                      v-model="detail"
                      outlined
                      name="input-7-4"
                      label="รายละเอียดกิจกรรม"
                      value=""
                    ></v-textarea>
                  </v-flex>
                  <v-flex xs12 md12 pa-3 class="d-flex flex-row-reverse">
                    <v-btn color="info" height="50" width="200">Submit</v-btn>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
      <div>
        <p>Date:{{ date }}</p>
        <p>Time :{{ time }}</p>
      </div>
      <v-btn @click="printType" color="success">Print Type</v-btn>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: "event",
  data() {
    return {
      search: "",
      time: "",
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      menu2: "",
      menu3: "",
      detail: "",
      menuDate: "",

      items: ["คณะ", "มหาวิทยาลัย", "วิชาการ"],
      eventDetail: {
        name: "",
        group: ""
      }
    };
  },
  methods: {
    printType() {
      console.log(typeof this.time);
      console.log(this.time);
      console.log(typeof this.date);
      console.log(this.date);
      console.log(this.detail);
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Kanit:400,500,700,900&display=swap&subset=thai");
#event {
  /* background-color: aqua; */
  font-family: "Kanit";
}

#title {
  font-size: 2rem;
}
</style>
