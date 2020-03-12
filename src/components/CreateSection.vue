<template>
  <div id="createsection">
    <v-hover v-slot:default="{ hover }">
      <v-card :elevation="hover ? 10 : 2">
        <v-card-title>
          <div class="display-1 font-weight-bold ">เพิ่มกลุ่มเรียน</div>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form ref="form" v-model="valid" :lazy-validation="lazy">
              <v-row>
                <!-- ///////////////////////////////////////////////////////////////////////////////// -->
                <!-- //* Sec Input -->
                <v-col cols="12" sm="6" md="2">
                  <v-text-field
                    label=" * ลำดับกลุ่มเรียน"
                    hint="ระบุเป็นตัวเลขเท่านั้นห้ามมีสัญลักษณ์"
                    :rules="RuleId"
                    v-model="Section.Sec"
                    required
                  ></v-text-field>
                </v-col>
                <!-- ///////////////////////////////////////////////////////////////////////////////// -->
                <!-- //* Subject Input -->
                <v-col cols="12" sm="6" md="2">
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
                <v-col cols="12" sm="6" md="2">
                  <v-select
                    :items="dayCreate"
                    label="วันที่สร้าง"
                    :rules="RuleDate"
                  ></v-select>
                </v-col>
                <!-- ///////////////////////////////////////////////////////////////////////////////// -->
                <!-- //* Subject Mounth -->
                <v-col cols="12" sm="6" md="3">
                  <v-select
                    :items="mounthCreate"
                    label="เดือนที่สร้าง"
                    :rules="RuleMounth"
                  ></v-select>
                </v-col>
                <!-- ///////////////////////////////////////////////////////////////////////////////// -->
                <!-- //* Subject Year -->
                <v-col cols="12" sm="6" md="3">
                  <v-select
                    :items="years"
                    label="ปีที่สร้าง"
                    :rules="RuleYear"
                  ></v-select>
                </v-col>
                <!-- ///////////////////////////////////////////////////////////////////////////////// -->
                <v-col cols="12" sm="6" md="4">
                  <v-select
                    :items="TeacherALL"
                    item-text="NameTH"
                    item-value="Id"
                    label="*อาจารย์ประจำวิชา คนที่ 1"
                    :rules="RuleTearcher"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-select
                    :items="TeacherALL"
                    item-text="NameTH"
                    item-value="Id"
                    label="อาจารย์ประจำวิชา คนที่ 2 "
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-select
                    :items="TeacherALL"
                    item-text="NameTH"
                    item-value="Id"
                    label="อาจารย์ประจำวิชา คนที่ 3 "
                  ></v-select>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
          <v-row class="d-flex justify-end align-start pr-4 ">
            <v-col md="8" class="pa-0">
              <v-alert
                dense
                border="left"
                type="error"
                class="pa-2"
                v-show="valid"
                >กรุณาตรวจสอบข้อมูลให้เรียบร้อยก่อนกดยืนยัน
              </v-alert>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <!-- <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn> -->
          <v-btn
            color="blue darken-1"
            :disabled="!valid"
            x-large
            width="200"
            class="ma-3 white--text"
            @click="createSubject"
            >Create</v-btn
          >
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
          >Close</v-btn
        >
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

      dayCreate: [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28",
        "29",
        "30",
        "31"
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

      yearCreate: [],

      Section: {
        Sec: null, //Integer
        Subject: "", // String
        Day: "", //
        Month: null,
        Year: null,
        Teacher1: null,
        Teacher2: null,
        Teacher3: null
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
    sampleCredit() {
      this.Subject.Credit = parseInt(this.sampleCredit);
      // console.log(this.Subject.Credit);
    },
    overlay() {
      setInterval(() => (this.overlay = false), 2200);
    }
  },
  async mounted() {
    let tearchs = await axios.get(this.urlAllTeacher);
    this.TeacherALL = tearchs.data;
    console.dir(tearchs);
  },

  methods: {
    createSubject() {
      // console.dir(this.Subject);

      const createSubjectUrl =
        "https://us-central1-newagent-47c20.cloudfunctions.net/api/subject";
      axios
        .post(createSubjectUrl, this.Subject)
        // eslint-disable-next-line no-unused-vars
        .then(response => {
          // console.log(response.status);

          this.overlay = true;
          this.snackbar = true;
          this.snackbarMessage = `เพิ่มรายวิชา ${this.Subject.NameTH} สำเร็จ `;
          this.snackbarStatus = "";
          this.snackbarColor = "success";

          this.$refs.form.reset();
        })
        // eslint-disable-next-line no-unused-vars
        .catch(err => {
          // console.log(err);

          this.overlay = true;
          this.snackbar = true;
          this.snackbarMessage = `เกิดข้อผิดพลาด กรุณาตรวจสอบข้อมูล และลองใหม่อีกครั้ง`;
          this.snackbarStatus = "";
          this.snackbarColor = "error";

          this.$refs.form.reset();
        });
    }
  }
};
</script>

<style scoped></style>
