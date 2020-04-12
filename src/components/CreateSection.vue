<template>
  <div id="createsection">
    <v-hover v-slot:default="{ hover }">
      <v-card :elevation="hover ? 10 : 2">
        <v-card-title>
          <div class="display-1 font-weight-bold">เพิ่มกลุ่มเรียน</div>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form
              ref="form"
              v-model="valid"
              :lazy-validation="lazy"
            >
              <v-row>
                <!-- ///////////////////////////////////////////////////////////////////////////////// -->
                <!-- //* Sec Input -->
                <v-col
                  cols="12"
                  sm="6"
                  md="3"
                >
                  <v-text-field
                    label=" * ลำดับกลุ่มเรียน"
                    hint="ระบุเป็นตัวเลขเท่านั้นห้ามมีสัญลักษณ์"
                    :rules="RuleId"
                    v-model="sec"
                    required
                  ></v-text-field>
                </v-col>
                <!-- ///////////////////////////////////////////////////////////////////////////////// -->
                <!-- //* Subject Input -->
                <v-col
                  cols="12"
                  sm="6"
                  md="3"
                >
                  <v-text-field
                    label=" * รหัสวิชา"
                    hint="ระบุเป็นตัวเลขเท่านั้นห้ามมีสัญลักษณ์"
                    :rules="RuleName"
                    v-model="Section.Subject"
                    required
                  ></v-text-field>
                </v-col>
                <!-- ///////////////////////////////////////////////////////////////////////////////// -->
                <!-- //* Subject Date -->
                <v-col
                  cols="12"
                  sm="6"
                  md="5"
                >
                  <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    :return-value.sync="date"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
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
                    >
                      <v-spacer></v-spacer>
                      <v-btn
                        text
                        color="primary"
                        @click="menu = false"
                      >Cancel</v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.menu.save(date)"
                      >OK</v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>
                <!-- ///////////////////////////////////////////////////////////////////////////////// -->
              </v-row>
              <!-- //******************************************************************************************* */ -->
              <v-row
                row
                wrap
              >
                <!-- ///////////////////////////////////////////////////////////////////////////////// -->
                <!-- //* Week Study -->
                <v-col
                  cols="12"
                  sm="6"
                  md="3"
                >
                  <v-select
                    :items="dayName"
                    v-model="Section.Week"
                    label=" * วันที่เรียน"
                    hint="เลือกวันที่เรียน"
                  ></v-select>
                </v-col>
                <!-- ///////////////////////////////////////////////////////////////////////////////// -->
                <!-- //* Study Time Start -->
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-menu
                    ref="menu"
                    v-model="menuTimeStart"
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
                        v-model="timeStart"
                        label="เวลาเริ่มสอน"
                        prepend-icon="mdi-alarm-multiple"
                        readonly
                        v-on="on"
                        :rules="isNotEmty"
                        required
                      ></v-text-field>
                    </template>
                    <v-time-picker
                      format="24hr"
                      v-if="menuTimeStart"
                      v-model="timeStart"
                      full-width
                      @click:minute="$refs.menu.save(time)"
                    ></v-time-picker>
                  </v-menu>
                </v-col>
                <!-- ///////////////////////////////////////////////////////////////////////////////// -->
                <!-- //* Study Time End -->
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-menu
                    ref="menu"
                    v-model="menuTimeEnd"
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
                        v-model="timeEnd"
                        label="เวลาสิ้นสุดการสอน"
                        prepend-icon="mdi-alarm-off"
                        readonly
                        v-on="on"
                        :rules="isNotEmty"
                        required
                      ></v-text-field>
                    </template>
                    <v-time-picker
                      format="24hr"
                      v-if="menuTimeEnd"
                      v-model="timeEnd"
                      full-width
                      @click:minute="$refs.menu.save(time)"
                    ></v-time-picker>
                  </v-menu>
                </v-col>
                <!-- ///////////////////////////////////////////////////////////////////////////////// -->
                <!-- //* Teacher1 -->
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-select
                    :items="TeacherALL"
                    item-text="NameTH"
                    item-value="Id"
                    label="*อาจารย์ประจำวิชา คนที่ 1"
                    v-model="Section.Teacher1"
                    :rules="RuleTearcher"
                  ></v-select>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-select
                    :items="TeacherALL"
                    item-text="NameTH"
                    item-value="Id"
                    label="อาจารย์ประจำวิชา คนที่ 2 "
                    v-model="Section.Teacher2"
                  ></v-select>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-select
                    :items="TeacherALL"
                    item-text="NameTH"
                    item-value="Id"
                    label="อาจารย์ประจำวิชา คนที่ 3 "
                    v-model="Section.Teacher3"
                  ></v-select>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
          <v-row class="d-flex justify-end align-start pr-4">
            <v-col
              md="8"
              class="pa-0"
            >
              <v-alert
                dense
                border="left"
                type="error"
                class="pa-2"
                v-show="valid"
              >กรุณาตรวจสอบข้อมูลให้เรียบร้อยก่อนกดยืนยัน</v-alert>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-alert
            dense
            outlined
            type="warning"
            class="ma-0 ml-3"
          >กรุณาระบุบ อาจารย์ประจำวิชาอย่างน้อย 1 ท่าน</v-alert>
          <v-spacer></v-spacer>
          <!-- <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn> -->
          <v-btn
            color="blue darken-1"
            :disabled="!valid"
            x-large
            width="200"
            class="ma-3 white--text"
            @click="createSection"
          >Create</v-btn>
        </v-card-actions>
      </v-card>
    </v-hover>
    <v-overlay :value="overlay">
      <v-snackbar
        id="snackBar"
        multi-line
        top
        v-model="snackbar"
        :timeout="timeout"
        :color="snackbarColor"
        class="title font-weight-light"
      >
        {{ snackbarMessage }}
        <v-btn
          color="white black--text"
          @click.native="(value = false), (overlay = false)"
        >Close</v-btn>
      </v-snackbar>
    </v-overlay>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import axios from "axios";

export default {
  name: "createsection",
  data() {
    return {
      dialog: true,
      sampleCredit: "",
      sec: null,
      yaerfild: "",
      SubjectType: [
        // { label: "", value: null },
        { label: "วิชาภาคบังคับ", value: 0 },
        { label: "วิชาเลือกเสรี", value: 1 }
      ],
      SubjectStatus: [
        // { label: "", value: null },
        { label: "ไม่เปิดให้ลงทะเบียน", value: 0 },
        { label: "สามาลงทะเบียนได้", value: 1 }
      ],
      date: new Date().toISOString().substr(0, 10),
      menu: false,

      TeacherALL: [],
      urlAllTeacher:
        "https://us-central1-newagent-47c20.cloudfunctions.net/api/teacher",

      RuleId: [v => !!v || "กรุณาระบุบลำดับของกลุ่ม"],
      RuleTearcher: [v => !!v || "กรุณาระบุบอาจารย์ประจำวิชา"],
      RuleName: [v => !!v || "กรุณาระบุบรหัสวิชา"],
      RuleDate: [v => !!v || "กรุณาระบุบวัน"],
      RuleMounth: [v => !!v || "กรุณาระบุบเดือน"],
      RuleYear: [v => !!v || "กรุณาระบุบปี"],
      RuleCredite: {
        countValue: v => v.length < 1 || "กรุณาระบุหน่วยกิต",
        emtyValue: v => !!v || "กรุณาระบุหน่วยกิต"
      },
      isNotEmty: [v => !!v || "กรุณาระบุบข้อมูล"],

      timeStart: null,
      timeEnd: null,
      time: null,
      menuTimeStart: false,
      menuTimeEnd: false,

      dayName: [
        "วันอาทิตย์",
        "วันจันทร์",
        "วันอังคาร",
        "วันพุทธ์",
        "วันพฤหัสบดี",
        "วันศุกร์",
        "วันเสาร์"
      ],

      mounthCreate: [
        "มกราคม",
        "กุมภาพันธ์",
        "มีนาคม",
        "เมษายน",
        "พฤษภาคม",
        "มิถุนายน",
        "กรกฎาคม",
        "สิงหาคม",
        "กันยายน",
        "ตุลาคม",
        "พฤษจิกายน",
        "ธันวาคม"
      ],

      Section: {
        Sec: 0, //Integer 1
        Subject: "", // String 2
        Date: "", // 3
        Week: "", // 4
        Start: "", // 5
        Finish: "", // 6
        Teacher1: "", // 7
        Teacher2: "", //8
        Teacher3: "" //9
      },

      valid: true,
      lazy: false,

      snackbar: false,
      alert: false,
      snackbarMessage: "",
      snackbarStatus: "",
      snackbarColor: "",
      overlay: false,
      timeout: 2250
    };
  },
  computed: {
    years() {
      const year = new Date().getFullYear();
      return Array.from(
        { length: year - 2017 },
        (value, index) => 2019 + index
      );
    }
  },
  watch: {
    sec() {
      this.Section.Sec = parseInt(this.sec);
      // console.log(this.Subject.Credit);
    },
    overlay() {
      setInterval(() => (this.overlay = false), 2200);
    },
    date() {
      this.Section.Date = this.date;
    },
    timeStart() {
      //Set Time
      // console.log(this.timeStart);
      this.Section.Start = this.timeStart;
    },
    timeEnd() {
      //Set Time
      // console.log(this.timeEnd);
      this.Section.Finish = this.timeEnd;
    }
  },

  async mounted() {
    let tearchs = await axios.get(this.urlAllTeacher);
    this.TeacherALL = tearchs.data;
  },

  methods: {
    async createSection() {
      // console.dir(this.Section);
      this.Section.Date = this.date;

      this.Section.Year = this.yaerfild.toString();
      let url = "https://us-central1-newagent-47c20.cloudfunctions.net/api/sec";

      await axios
        .post(url, this.Section)
        // eslint-disable-next-line no-unused-vars
        .then(response => {
          this.overlay = true;
          this.snackbar = true;
          this.snackbarMessage = `เพิ่ม กลุ่ม ${this.Section.Subject} สำเร็จ `;
          this.snackbarStatus = "";
          this.snackbarColor = "success";
        })
        // eslint-disable-next-line no-unused-vars
        .catch(err => {
          this.overlay = true;
          this.snackbar = true;
          this.snackbarMessage = `เกิดข้อผิดพลาด กรุณาตรวจสอบข้อมูล และลองใหม่อีกครั้ง`;
          this.snackbarStatus = "";
          this.snackbarColor = "error";
        });
    }
  }
};
</script>

<style scoped></style>
