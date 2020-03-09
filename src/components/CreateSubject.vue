<template>
  <div id="createsubject">
    <v-hover v-slot:default="{ hover }">
      <v-card :elevation="hover ? 10 : 2">
        <v-card-title>
          <div class="display-1 font-weight-bold ">เพิ่มรายวิชา</div>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form ref="form" v-model="valid" :lazy-validation="lazy">
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label=" * รหัสวิชา"
                    hint="ระบุเป็นตัวเลขเท่านั้นห้ามมีสัญลักษณ์"
                    :rules="RuleId"
                    v-model="Subject.Id"
                    :counter="8"
                    maxlength="8"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="12">
                  <v-text-field
                    label=" * ชื่อวิชาเรียน (ภาษาไทย)"
                    hint="ระบุเป็นภาษาไทย"
                    :rules="RuleName"
                    v-model="Subject.NameTH"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="12">
                  <v-text-field
                    label=" * ชื่อวิชาเรียน (ภาษาอังกฤษ)"
                    hint="ระบุเป็นภาษาอังกฤษ"
                    :rules="RuleName"
                    v-model="Subject.NameEN"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3" class="pa-5">
                  <v-text-field
                    label=" * หน่วยกิต"
                    hint="ระบุเป็นตัวเลขเท่านั้น"
                    maxlength="1"
                    v-model="sampleCredit"
                    :counter="1"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <!-- <v-text-field label="Email*" required></v-text-field> -->
                  <v-select
                    placeholder=" * ประเภทรายวิชา"
                    v-model="Subject.Type"
                    item-text="label"
                    item-value="value"
                    :items="SubjectType"
                    chips
                    required
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-select
                    placeholder=" * สถานะของรายวิชา"
                    v-model="Subject.Status"
                    item-text="label"
                    item-value="value"
                    :items="SubjectStatus"
                    chips
                    required
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
  name: "createsubject",
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

      RuleId: [v => !!v || "กรุณาระบุบรหัสวิชา"],
      RuleName: [v => !!v || "กรุณาระบุบชื่อวิชา"],
      RuleType: [v => !!v || "กรุณาระบุบประเภทของวิชา"],
      RuleStatus: [v => !!v || "กรุณาระบุบสถานะของวิชา"],
      RuleCredite: {
        countValue: v => v.length < 1 || "กรุณาระบุหน่วยกิต",
        emtyValue: v => !!v || "กรุณาระบุหน่วยกิต"
      },
      Subject: {
        Id: "",
        NameTH: "",
        NameEN: "",
        Credit: 0,
        Type: 0,
        Status: 0
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
  watch: {
    sampleCredit() {
      this.Subject.Credit = parseInt(this.sampleCredit);
      console.log(this.Subject.Credit);
    },
    overlay() {
      setInterval(() => (this.overlay = false), 2200);
    }
  },

  methods: {
    createSubject() {
      console.dir(this.Subject);

      const createSubjectUrl =
        "https://us-central1-newagent-47c20.cloudfunctions.net/api/subject";
      axios
        .post(createSubjectUrl, this.Subject)
        .then(response => {
          console.log(response.status);

          this.overlay = true;
          this.snackbar = true;
          this.snackbarMessage = `เพิ่มรายวิชา ${this.Subject.NameTH} สำเร็จ `;
          this.snackbarStatus = "";
          this.snackbarColor = "success";

          this.$refs.form.reset();
        })
        .catch(err => {
          console.log(err);

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
