<template>
  <v-app id="event">
    <v-flex xs12 sm12 md11>
      <v-form v-model="isValid">
        <v-card class="pa-5 ">
          <v-layout row wrap>
            <v-flex xs12 sm1 md12 class="ml-6">
              <!-- Top -->

              <!--//*************************************** */  -->
              <!--  -->
              <v-divider class="mt-6 mb-12"></v-divider>

              <!-- Center -->

              <v-layout row wrap>
                <!--//***************** Event Name  ***********************-->
                <v-flex xs12 md5>
                  <!-- <div class="caption gray-text">Name Project</div> -->
                  <v-text-field
                    v-model="evenDetail.Topic"
                    label="ชื่อกิจกรรม"
                    outlined
                    clearable
                    :rules="[rulers.required]"
                  ></v-text-field>
                </v-flex>

                <!--//****************  Item Group ****************/  -->
                <div class="mr-10"></div>
                <v-flex xs12 md5>
                  <v-overflow-btn
                    :items="items"
                    label="-"
                    filled
                    target="item"
                    v-model="evenDetail.Type"
                    :rules="[rulers.required]"
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
                        v-model="evenDetail.Date"
                        label="คลิกเพื่อเลือกวันที่"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="evenDetail.Date"
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
                        v-model="evenDetail.Time"
                        label="คลิกเพื่อเลือกเวลา"
                        prepend-icon="access_time"
                        readonly
                        v-on="on"
                        :rules="[rulers.requiredTime]"
                      ></v-text-field>
                    </template>
                    <v-time-picker
                      v-if="menu2"
                      v-model="evenDetail.Time"
                      full-width
                      format="24hr"
                      @click:minute="$refs.menu.save(time)"
                    ></v-time-picker>
                  </v-menu>
                </v-flex>

                <!--//**************** Text Area ***************//  -->
                <v-flex xs12 md12 pa-3>
                  <v-textarea
                    v-model="evenDetail.Description"
                    outlined
                    name="input-7-4"
                    label="รายละเอียดกิจกรรม"
                    value=""
                    :rules="[rulers.requiredDetail]"
                  ></v-textarea>
                </v-flex>
                <v-flex xs12 md12 pa-3 class="d-flex flex-row-reverse">
                  <v-btn
                    color="info"
                    height="50"
                    width="200"
                    :disabled="!isValid"
                    @click="addEvent"
                    >Submit</v-btn
                  >
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-card>
      </v-form>
    </v-flex>
  </v-app>
</template>

<script>
// import axios from "axios";
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
      topic: "",
      group: "",
      item: "",
      eventAll: [],
      evenDetail: {
        Topic: "",
        Type: "",
        Description: "",
        Date: "",
        Time: ""
      },
      offsetTop: 0,
      isValid: true,
      show: false,
      titleCard: {
        fontSize: "16px"
      },
      items: ["คณะ", "มหาวิทยาลัย", "จิตอาสา"],
      itemColor: ["green", "yellow", "pink"],
      vChipColor: "",
      rulers: {
        required: value => !!value || "กรุณากรอกชื่อกิจกรรม/โครงการ",
        requiredItem: value => !!value || "กรุณาระบุหมวดหมู่ กิจกรรม/โครงการ",
        requiredTime: value => !!value || "กรุณาระบุเวลา กิจกรรม/โครงการ",
        requiredDetail: value =>
          !!value || "กรุณาระบุรายละเอียด กิจกรรม/โครงการ"
      }
    };
  },
  methods: {
    sort(e) {
      this.eventAll.sort((a, b) => (a[e] < b[e] ? -1 : 1));
    },
    addEvent() {
      this.$emit("onSubmit", this.evenDetail);
      // console.log(this.evenDetail);
    }
  }
};
</script>

<style></style>
