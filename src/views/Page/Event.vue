<template>
  <v-app id="event">
    <v-container>
      <div class="font-weight-black" id="title">กิจกรรม</div>
      <!-- <v-btn @click="fetchEvent" color="success">Print Type</v-btn> -->
      <v-layout row wrap>
        <!-- -------------------------------------------------------------------------------- -->
        <v-flex xs12 sm8 md8>
          <v-form v-model="isValid">
            <v-card class="pa-5 ">
              <v-layout row wrap>
                <v-flex xs12 sm1 md12 class="ml-6">
                  <!-- Top -->
                  <!--//************* search Event *************** -->
                  <v-layout row wrap>
                    <v-flex xs12 sm3 md4 ma-5>
                      <!-- //! Text Field -->
                      <v-text-field
                        hide-details
                        prepend-icon="search"
                        single-line
                        label="ค้นหาด้วยชื่อกิจกรรม/โครงการ"
                        v-model="search"
                      ></v-text-field>
                    </v-flex>

                    <!-- //! Button Sort -->
                    <v-flex xs2 sm3 md6 ma-5>
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                          <v-btn
                            color="primary ma-2"
                            @click="sort('Type')"
                            v-on="on"
                          >
                            <v-icon left small>search </v-icon>
                            <span class="caption text-lowercase"
                              >จัดเรียงโดย หมวดหมู่</span
                            >
                          </v-btn>
                        </template>
                        <span>จัดเรียงโดย หมวดหมู่</span>
                      </v-tooltip>
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                          <v-btn
                            color="primary ma-2"
                            @click="sort('Topic')"
                            v-on="on"
                          >
                            <v-icon left small>search </v-icon>
                            <span class="caption text-lowercase"
                              >จัดเรียงโดย ชื่อ</span
                            >
                          </v-btn>
                        </template>
                        <span>จัดเรียงโดย ชื่อ</span>
                      </v-tooltip>
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                          <v-btn
                            color="primary ma-2"
                            @click="sortDate"
                            v-on="on"
                          >
                            <v-icon left small>search </v-icon>
                            <span class="caption text-lowercase"
                              >จัดเรียงโดย วัน</span
                            >
                          </v-btn>
                        </template>
                        <span>จัดเรียงโดย วัน</span>
                      </v-tooltip>
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
                        v-model="topic"
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
                        v-model="item"
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
                            :rules="[rulers.requiredTime]"
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
        <!-- -------------------------------------------------------------------------------- -->

        <!-- -------------------------------------------------------------------------------- -->
        <v-flex xs12 sm4 md3 ma-1>
          <v-container
            id="scroll-target"
            style="max-height: 63%"
            class="overflow-y-auto"
          >
            <v-row
              v-scroll:#scroll-target="onScroll"
              align="center"
              justify="center"
              style="height: 1000px"
            >
              <!-- //**** Card **** -->
              <v-container v-for="(event, index) in listFilter" :key="index">
                <v-card xs12 class="pa-1">
                  <v-card-title class="" :style="titleCard">
                    {{ event.Topic }}
                  </v-card-title>

                  <v-card-subtitle>
                    <v-chip>{{ event.Type }} </v-chip>
                    {{ event.Date[0] }} {{ event.Date[1] }} {{ event.Date[2] }}
                  </v-card-subtitle>
                  <v-card-text>
                    {{ event.Description }}
                  </v-card-text>
                </v-card>
              </v-container>
            </v-row>
          </v-container>
        </v-flex>
        <!-- -------------------------------------------------------------------------------- -->
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import axios from "axios";

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
      offsetTop: 0,
      isValid: true,
      titleCard: {
        fontSize: "16px"
      },
      items: ["คณะ", "มหาวิทยาลัย", "จิตอาสา"],
      rulers: {
        required: value => !!value || "กรุณากรอกชื่อกิจกรรม/โครงการ",
        requiredItem: value => !!value || "กรุณาระบุหมวดหมู่ กิจกรรม/โครงการ",
        requiredTime: value => !!value || "กรุณาระบุเวลา กิจกรรม/โครงการ",
        requiredDetail: value =>
          !!value || "กรุณาระบุรายละเอียด กิจกรรม/โครงการ"
      }
    };
  },
  created() {
    this.fetchEvent();
  },
  computed: {
    listFilter() {
      if (this.search) {
        return this.eventAll.filter(item => {
          return this.search
            .toLowerCase()
            .split("")
            .every(v => item.Topic.toLowerCase().includes(v));
        });
      } else {
        return this.eventAll;
      }
    },
    reversedEvent() {
      return this.listFilter.slice().reverse;
    }
  },
  methods: {
    sort(e) {
      this.eventAll.sort((a, b) => (a[e] < b[e] ? -1 : 1));
    },
    sortDate() {
      this.eventAll.sort((a, b) => new Date(a.Date) - new Date(b.Date));
    },
    addEvent() {
      axios
        .post(
          "https://us-central1-newagent-47c20.cloudfunctions.net/api/news/",
          {
            Topic: this.topic,
            Description: this.detail,
            Date: this.date,
            Time: this.time,
            Type: this.item
          }
        )
        .then(responsAddEvent => {
          console.log(responsAddEvent.status);
          this.clear();
          // alert(responsAddEvent.status);
        })
        .catch(err => {
          alert(err.message);
        });
    },
    onScroll(e) {
      this.offsetTop = e.target.scrollTop;
    },
    fetchEvent() {
      axios
        .get("https://us-central1-newagent-47c20.cloudfunctions.net/api/news")
        .then(response => {
          const resData = response.data;
          this.eventAll = resData;

          // console.log(resData);
        });
    },
    clear() {
      this.topic = "";
      this.datail = "";
      this.date = "";
      this.time = "";
      this.item = "";
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
