/* eslint-disable no-unused-vars */
<template>
  <div id="EditUser">
    <v-dialog v-model="dialog" transition="dialog-transition" max-width="600px">
      <!-- Template -->
      <template v-slot:activator="{ on }">
        <!-- <v-btn color="#4663B2" fab small v-on="on" outlined> -->
        <v-icon v-on="on">mdi-pencil</v-icon>
        <!-- </v-btn> -->
      </template>

      <!-- Card  -->

      <v-card class="pa-5" color="#F5F5F5"
        ><v-form
          md12
          sm12
          xs12
          ref="form"
          v-model="valid"
          :lazy-validation="lazy"
        >
          <!-- //**  Name Th and Name EN -->
          <v-row row wrap>
            <v-col md="6" sm="12" cols="12">
              <v-text-field
                class=" d-flex flex-row "
                v-model="studentData.NameTH"
                label="ชื่อ - นามสกุล ภาษาไทย"
                required
                clearable
              ></v-text-field>
            </v-col>
            <v-col md="6" sm="12">
              <!-- //**  Name En -->
              <v-text-field
                v-model="studentData.NameEN"
                label="ชื่อ - นามสกุล ภาษาอังกฤษ"
                required
                clearable
              ></v-text-field>
            </v-col>
          </v-row>

          <!-- //** Studetn ID and Course -->
          <v-row>
            <v-col md="6" sm="12" cols="12">
              <!-- //**  Student ID -->
              <v-text-field
                v-model="studentData.Id"
                :counter="14"
                clearable
                maxlength="13"
                label="รหัสนักศึกษา"
                hint="เลขประจำตัวนักศึกษา 13 หลัก ไม่ใส่ขีด"
                required
              ></v-text-field>
            </v-col>
            <!--  -->
            <v-col md="5" sm="12">
              <!-- //**  Course หลักสูตร -->
              <v-select
                v-model="studentData.Degree"
                :items="course"
                :rules="[v => !!v || 'กรุณาระบุบหลักสูตร']"
                label="หลักสูตร"
                required
              ></v-select>
            </v-col>
          </v-row>

          <v-row>
            <v-col md="6" sm="12" cols="12">
              <!-- //** Faculty  สาชาวิชา -->
              <v-select
                v-model="studentData.Faculty"
                :items="faculty"
                :rules="[v => !!v || 'กรุณาระบุบสาขา']"
                label="สาขาวิชา"
                required
              ></v-select>
            </v-col>
            <v-col md="6" sm="12" xs="12">
              <!-- //** Major  คณะ -->
              <v-select
                v-model="studentData.Major"
                :items="major"
                :rules="[v => !!v || 'กรุณาระบุบคณะ']"
                label="คณะ"
                required
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col md="4" sm="12" cols="12">
              <!-- //** Status  สถานะ -->
              <v-select
                v-model="studentData.Status"
                :items="status"
                :rules="[v => !!v || 'กรุณาระบุบสถานะภาพนักศึกษา']"
                label="สถานะภาพนักศึกษา"
                required
              ></v-select>
            </v-col>
          </v-row>

          <!-- //* BTN -->
          <v-flex class="d-flex flex-end  py-5 justify-end">
            <v-btn
              color="#405375"
              x-large
              class="mr-4 #405375--text "
              @click="reset"
              outlined
            >
              Reset Form
            </v-btn>

            <v-btn
              color="#4075F4"
              x-large
              :disabled="!valid"
              width="200"
              class="white--text"
              @click="editStudent"
            >
              SUCCESS
            </v-btn>
          </v-flex>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { modifyStudent } from "@/API/Student.js";

export default {
  name: "EditUser",
  data() {
    return {
      valid: true,
      items: ["Item 1", "Item 2", "Item 3", "Item 4"],
      course: ["ปริญญาตรี ภาคปกติ 4 ปี", "ปริญญาตรี ภาคปกติ 3 ปี"],
      status: ["กำลังศึกษา", "หมดสถานะภาพนักศึกษา", "จบการศึกษา"],

      faculty: ["วิศวกรรมคอมพิวเตอร์"],
      major: ["วิศวกรรมศาสตร์"],
      checkbox: false,
      lazy: false,
      id: "",
      studentData: {
        NameTH: "",
        NameEN: "",
        Id: "",
        Degree: "",
        Status: "",
        Faculty: "",
        Major: "",
        Level: ""
      },
      dialog: false
    };
  },
  props: {
    stuData: {
      type: Object
    }
  },
  mounted() {
    this.studentData = this.stuData;
  },
  methods: {
    reset() {
      this.dialog = false;
    },
    editStudent() {
      modifyStudent(this.studentData.Id, this.studentData)
        // eslint-disable-next-line no-unused-vars
        .then(res => {
          this.$swal.fire({
            icon: "success",
            titleText: "แก้ไขข้อมูลนักศึกษา สำเร็จ"
          });

          this.dialog = false;
        })
        // eslint-disable-next-line no-unused-vars
        .catch(err => {
          this.$swal.fire({
            icon: "error",
            titleText: "เกิดข้อผิดพลาด กรุณาตรวจสอบข้อมูล และลองใหม่อีกครั้ง"
            // titleText: `${err.message}`
          });
        });
    }
  }
};
</script>

<style lang="scss" scoped></style>
