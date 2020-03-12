<template>
  <div id="addStudent">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <v-btn color="#4075F4" fab small elevation="2" v-on="on"
          ><v-icon color="white">mdi-account-plus</v-icon></v-btn
        >
      </template>
      <v-hover v-slot:default="{ hover }">
        <v-card :elevation="hover ? 10 : 2" class="pa-5">
          <v-row>
            <!-- ///////////////////////////////////////////////////////////////////////////////// -->
            <!-- //* Input Student -->
            <v-col cols="12" sm="6" md="8">
              <v-text-field
                v-model="StudentID.Id"
                :rules="isEmty"
                counter
                maxlength="14"
                hint="กรุณาระบุรหัสนักศึกษา **มีขีด**"
                label="รหัสนักศึกษา 13 หลัก มีขีด"
                @keyup.enter="addStudent"
              ></v-text-field>
            </v-col>
            <!-- ///////////////////////////////////////////////////////////////////////////////// -->
            <!-- //* Button AddStudent -->
            <v-col cols="12" sm="6" md="2" class=" " align-self="center">
              <v-hover v-slot:default="{ hover }">
                <v-btn
                  :elevation="hover ? 8 : 2"
                  color="#238AEB"
                  block
                  rounded
                  class="white--text"
                  @click="addStudent"
                  >ADD STUDENT</v-btn
                >
              </v-hover>
            </v-col>
            <!-- ///////////////////////////////////////////////////////////////////////////////// -->
          </v-row>
        </v-card>
      </v-hover>
      <!-- ///////////////////////////////////////////////////////////////////////////////// -->
      <!-- //* Alet Dialog -->
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
    </v-dialog>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import axios from "axios";

export default {
  name: "addStudent",
  data() {
    return {
      dialog: false,

      isEmty: [v => !!v || "กรุณาระบุบข้อมูล"],

      StudentID: {
        Id: ""
      },
      snackbar: false,
      alert: false,
      snackbarMessage: "",
      snackbarStatus: "",
      snackbarColor: "",
      overlay: false,
      timeout: 2250
    };
  },
  props: ["section"],
  watch: {
    overlay() {
      setInterval(() => (this.overlay = false), 2200);
    }
  },
  methods: {
    async addStudent() {
      let addUrl =
        "https://us-central1-newagent-47c20.cloudfunctions.net/api/sec/student/" +
        this.section;

      await axios
        .post(addUrl, this.StudentID)
        // eslint-disable-next-line no-unused-vars
        .then(response => {
          this.overlay = true;
          this.snackbar = true;
          this.snackbarMessage = `เพิ่มนักศึกษาเข้ากลุ่มสำเร็จ `;
          this.snackbarStatus = "";
          this.snackbarColor = "success";

          this.StudentID.Id = "";
        })
        // eslint-disable-next-line no-unused-vars
        .catch(err => {
          this.overlay = true;
          this.snackbar = true;
          this.snackbarMessage = `เกิดข้อผิดพลาด กรุณาตรวจสอบข้อมูล และลองใหม่อีกครั้ง`;
          this.snackbarStatus = "";
          this.snackbarColor = "error";

          this.StudentID.Id = "";
        });
    }
  }
};
</script>

<style></style>
