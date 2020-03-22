<template>
  <div id="EditSubject">
    <!-- ///////////////////////////////////////////////////////////////////////////////// -->
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="#4663B2" fab small v-on="on" outlined>
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </template>
      <!--  -->
      <v-card>
        <v-card-title>
          <v-chip large color="#179EE0"
            ><span class="headline white--text">{{
              SubjectDetail.Subject
            }}</span></v-chip
          >
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form ref="form" v-model="valid" :lazy-validation="lazy">
              <v-row>
                <!-- ///////////////////////////////////////////////////////////////////////////////// -->
                <!-- //* Sudject -->
                <v-col cols="12" sm="6" md="4">
                  <p class="ma-0">รหัสวิชา</p>
                  <v-text-field
                    v-model="SubjectDetail.Subject"
                    required
                    clearable
                    class="pa-0"
                    hint="รหัสวิชา"
                    :rules="isNotEmty"
                  >
                    {{ SubjectDetail.Subject }}
                  </v-text-field>
                </v-col>
                <!-- ///////////////////////////////////////////////////////////////////////////////// -->
                <!-- ///////////////////////////////////////////////////////////////////////////////// -->
                <!--//* Sec  -->
                <v-col cols="12" sm="6" md="4">
                  <p class="ma-0">กลุ่ม</p>
                  <v-text-field
                    v-model="SubjectDetail.Sec"
                    required
                    clearable
                    class="pa-0"
                    hint="กลุ่ม"
                    :rules="isNotEmty"
                  >
                    {{ SubjectDetail.Subject }}
                  </v-text-field>
                </v-col>
                <!-- ///////////////////////////////////////////////////////////////////////////////// -->
                <!-- ///////////////////////////////////////////////////////////////////////////////// -->
                <!-- //* Status -->
                <v-col cols="12" sm="6" md="4">
                  <p class="ma-0">สถานะ</p>
                  <v-select
                    required
                    class="pa-0"
                    v-model="Group"
                    :items="StatusSubject"
                    item-text="label"
                    item-value="status"
                  ></v-select>
                </v-col>
                <!-- ///////////////////////////////////////////////////////////////////////////////// -->
                <!-- ///////////////////////////////////////////////////////////////////////////////// -->
                <!-- //* Study Daye -->
                <v-col cols="12" sm="6" md="3">
                  <v-select
                    :items="day"
                    label="วันที่เรียน"
                    :rules="isNotEmty"
                    required
                  ></v-select>
                </v-col>
                <!-- ///////////////////////////////////////////////////////////////////////////////// -->
                <!-- ///////////////////////////////////////////////////////////////////////////////// -->
                <!-- //* Study Time Start -->
                <v-col cols="12" sm="6" md="4">
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
                <!-- ///////////////////////////////////////////////////////////////////////////////// -->
                <!-- //* Study Time End -->
                <v-col cols="12" sm="6" md="4">
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
              </v-row>
            </v-form>
          </v-container>
          <small class="body-1 font-italic font-weight-light "
            >* กรุณาตรวจสอบข้อมูลให้เรียบร้อยก่อน กดยืนยัน</small
          >
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false"
            >Close</v-btn
          >
          <v-btn
            :disabled="!valid"
            color="blue darken-1"
            text
            @click="SubmitSection"
            >Save</v-btn
          >
        </v-card-actions>
      </v-card>
      <!-- ///////////////////////////////////////////////////////////////////////////////// -->
      <v-overlay :value="overlay">
        <v-snackbar
          id="snackBar"
          multi-line
          top
          v-model="snackbar"
          :timeout="timeout"
          :color="snackbarColor"
          class="title font-weight-mediumt"
        >
          {{ snackbarMessage }}
          <v-btn
            color="white black--text "
            @click.native="(value = false), (overlay = false)"
            >Close</v-btn
          >
        </v-snackbar>
      </v-overlay>
      <!-- ///////////////////////////////////////////////////////////////////////////////// -->
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  name: "EditSubject",
  props: ["subID"],
  data() {
    return {
      dialog: false,

      valid: true,
      lazy: false,

      day: [
        "วันอาทิตย์",
        "วันจันทร์",
        "วันอังคาร",
        "วันพุธ",
        "วันพฤหัสบดี",
        "วันศุกร์",
        "วันเสาร์"
      ],

      isNotEmty: [v => !!v || "กรุณาระบุบข้อมูล"],

      StatusSubject: [
        { status: 0, label: "ปิด" },
        { status: 1, label: "เปิด" }
      ],
      SubjectId: this.subID,
      SubjectDetail: [],
      timeStart: null,
      timeEnd: null,
      time: null,
      menuTimeStart: false,
      menuTimeEnd: false,
      Group: null,

      snackbar: false,
      alert: false,
      snackbarMessage: "",
      snackbarStatus: "",
      snackbarColor: "",
      overlay: false,
      timeout: 2250
    };
  },
  watch: {
    dialog() {
      this.fetchSubject();
    },
    timeStart() {
      //Set Time
      // console.log(this.timeStart);
      this.SubjectDetail.StudyTime[1] = this.timeStart;
    },
    timeEnd() {
      //Set Time
      // console.log(this.timeEnd);
      this.SubjectDetail.StudyTime[2] = this.timeEnd;
    },
    StatusSubject() {
      // console.dir(this.StatusSubject.status);
    },
    overlay() {
      setInterval(() => (this.overlay = false), 2200);
    }
  },

  methods: {
    fetchSubject() {
      let url = `https://us-central1-newagent-47c20.cloudfunctions.net/api/sec/filterId/${this.SubjectId}`;
      // console.log(url);
      axios
        .get(url)
        // eslint-disable-next-line no-unused-vars
        .then(response => {
          // console.log(response.data);
          this.SubjectDetail = response.data;
          // console.log(this.SubjectDetail);
        })
        // eslint-disable-next-line no-unused-vars
        .catch(error => {
          // console.log(error);
        });
    },
    editSubject() {
      // let urlEdit = ""
    },
    SubmitSection() {
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////
      //-- Date Month Year => Thia Format
      let thDay = moment()
        .locale("th")
        .format("MM");
      let thMonth = moment()
        .locale("th")
        .format("MMMM");
      let thYear = moment()
        .locale("th")
        .format("YYYY");
      ///////////////////////////////////////////////////////////////////////////////////////////////////////////
      //-- Set Data in  SubjectDetail
      this.SubjectDetail.UpdateDate[0] = thDay;
      this.SubjectDetail.UpdateDate[1] = thMonth;
      this.SubjectDetail.UpdateDate[2] = thYear;
      this.SubjectDetail.Status = this.Group; // Set Data Type  Int
      ///////////////////////////////////////////////////////////////////////////////////////////////////////////
      // console.log(this.SubjectDetail);
      this.saveNewSubjectDetail();
      ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    },
    async saveNewSubjectDetail() {
      let editUrl = `https://us-central1-newagent-47c20.cloudfunctions.net/api/sec/updateDt/${this.SubjectDetail.Id}`;
      //
      await axios
        .put(editUrl, this.SubjectDetail)
        // eslint-disable-next-line no-unused-vars
        .then(response => {
          // console.log(response.status); this.overlay = true;
          this.overlay = true;
          this.snackbar = true;
          this.snackbarMessage = `แก้ไข รหัสวิชา:${this.SubjectDetail.Subject} สำเร็จ `;
          this.snackbarStatus = "";
          this.snackbarColor = "success";

          this.$refs.form.reset();
        })
        // eslint-disable-next-line no-unused-vars
        .catch(error => {
          // console.log(error.status);
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

<style></style>
