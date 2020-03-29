/* eslint-disable no-unused-vars */
<template>
  <v-container class="blue lighten-5">
    <v-row class="d-flex flex-row pa-12  " id="bg">
      <v-layout row wrap>
        <!-- <v-flex md6> -->
        <!-- <v-img
                  class="mr-5"
                  cover
                  height="530"
                  src="https://images.unsplash.com/photo-1548268770-66184a21657e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=564&q=80"
                >
                </v-img> -->
        <!-- </v-flex> -->

        <v-flex md7>
          <v-alert
            type="error"
            transition="fade"
            :value="alert"
            class="white--text "
          >
            เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้ง
          </v-alert>
          <!-- //** Search Student -->
          <v-hover v-slot:default="{ hover }">
            <v-card
              raised
              class="mb-5 py-2"
              color="#F5F5F5"
              :elevation="hover ? 10 : 2"
            >
              <v-row>
                <v-col cols="12">
                  <v-layout row wrap class="ml-3">
                    <v-flex md8 class="d-flex align-center  justify-center  ">
                      <v-text-field
                        class="pa-0 ma-0"
                        maxlength="14"
                        counter="14"
                        v-model="id"
                        solo
                        label="ค้นหานักศึกษา"
                        hint="ใส่รหัสนักศึกษา 13 หลัก มีขีด"
                        prepend-inner-icon="face"
                        @keyup.enter="seachStudent"
                      ></v-text-field>
                    </v-flex>
                    <v-flex md4 class="d-flex justify-center">
                      <v-btn
                        large
                        width="150"
                        color="#4663B2"
                        elevation="6"
                        @click="seachStudent"
                      >
                        <v-icon right class="white--text">search</v-icon>
                      </v-btn>
                    </v-flex>
                  </v-layout>
                </v-col>
              </v-row>
            </v-card>
          </v-hover>

          <!-- //** Card Student Detail -->

          <!--  -->
        </v-flex>
        <!-- <v-flex md5>
          <ViewAllSudent />
        </v-flex> -->
      </v-layout>
    </v-row>
    <v-overlay :value="overlay">
      <v-snackbar
        id="snackBar"
        multi-line
        v-model="snackbar"
        :timeout="timeout"
        :color="snackbarColor"
      >
        {{ snackbarMessage }}
        <v-btn
          color="white black--text"
          @click.native="(value = false), (overlay = false)"
          >Close</v-btn
        >
      </v-snackbar>
    </v-overlay>
  </v-container>
</template>

<script>
import axios from "axios";

import ViewAllSudent from "@/components/ViewAllSudent.vue";

export default {
  name: "createstudent",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    ViewAllSudent
  },
  data: () => ({
    valid: true,

    items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    course: ["ปริญญาตรี ภาคปกติ 4 ปี", "ปริญญาตรี ภาคปกติ 3 ปี"],
    status: ["กำลังศึกษา", "หมดสถานะภาพนักศึกษา", "จบการศึกษา"],
    faculty: ["วิศวกรรมคอมพิวเตอร์"],
    major: ["วิศวกรรมศาสตร์"],
    checkbox: false,
    lazy: false,
    id: "",
    idedit: "",

    snackbar: false,
    alert: false,
    snackbarMessage: "",
    snackbarStatus: "",
    snackbarColor: "",
    overlay: false,
    timeout: 5000,

    studentData: {
      NameTH: "",
      NameEN: "",
      Id: "",
      Degree: "",
      Status: "",
      Faculty: "",
      Major: ""
    }
  }),
  watch: {
    // alert() {
    //   setInterval(() => (this.alert = false), 2500);
    // },
    overlay() {
      setInterval(() => (this.overlay = false), 3000);
    }
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    editStudent() {
      const url_edit = `https://us-central1-newagent-47c20.cloudfunctions.net/api/student/updateDt/${this.studentData.Id}`;

      // console.log(this.studentData);

      axios
        .put(url_edit, this.studentData)
        .then(() => {
          this.$refs.form.reset();
          this.overlay = true;
          this.snackbar = true;
          this.snackbarStatus = "success";
          this.snackbarColor = "success";
          this.snackbarMessage = "เพิ่มข้อมูลสำเร็จ";
          // console.log("Put Data Success");
        })
        // eslint-disable-next-line no-unused-vars
        .catch(err => {
          // console.log(err.message);
          this.overlay = true;
          this.snackbar = true;
          this.snackbarMessage = "เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้งในภายหลัง";
          this.snackbarStatus = "error";
          this.snackbarColor = "error";
        });
    },
    seachStudent() {
      const url_seachStudent = `https://us-central1-newagent-47c20.cloudfunctions.net/api/student/filterId/${this.id}`;

      axios
        .get(url_seachStudent)
        .then(res => {
          this.studentData = res.data;
          this.idedit = this.id;
          this.id = "";

          this.overlay = true;
          this.snackbar = true;
          this.snackbarMessage = "ค้นหาข้อมูลสำเร็จ";
          this.snackbarStatus = "";
          this.snackbarColor = "success";
        })
        // eslint-disable-next-line no-unused-vars
        .catch(err => {
          // console.log(err.message);
          this.overlay = true;
          this.snackbar = true;
          this.snackbarMessage = "เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้งในภายหลัง";
          this.snackbarStatus = "error";
          this.snackbarColor = "error";
        });
    }
  }
};
</script>

<style scoped>
#snackBar {
  font-size: 18px;
}
</style>
