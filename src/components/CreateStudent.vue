<template>
  <!-- //** Card Student Detail -->
  <v-dialog v-model="dialog" max-width="800px" transition="dialog-transition">
    <template v-slot:activator="{ on }">
      <v-container class="mt-12  d-flex flex-row justify-end">
        <v-btn v-on="on" color="#2389EB" x-large class="white--text"
          >เพิ่มนักศึกษา</v-btn
        >
      </v-container>
    </template>
    <v-card class="pa-5"
      ><v-form md12 ref="form" v-model="valid" :lazy-validation="lazy">
        <!-- //**  Name Th -->
        <v-text-field
          class=" d-flex flex-row "
          v-model="studentData.NameTH"
          label="ชื่อ - นามสกุล ภาษาไทย"
          required
          clearable
        ></v-text-field>

        <!-- //**  Name En -->
        <v-text-field
          v-model="studentData.NameEN"
          label="ชื่อ - นามสกุล ภาษาอังกฤษ"
          required
          clearable
        ></v-text-field>

        <!-- //**  Student ID -->
        <v-text-field
          v-model="studentData.Id"
          :counter="13"
          clearable
          maxlength="13"
          label="รหัสนักศึกษา"
          hint="เลขประจำตัวนักศึกษา 13 หลัก ไม่มีขีด"
          required
        ></v-text-field>

        <!-- //**  Course หลักสูตร -->
        <v-select
          v-model="studentData.Degree"
          :items="course"
          :rules="[v => !!v || 'กรุณาระบุบหลักสูตร']"
          label="หลักสูตร"
          required
        ></v-select>

        <!-- //** Status  สถานะ -->
        <v-select
          v-model="studentData.Status"
          :items="status"
          :rules="[v => !!v || 'กรุณาระบุบสถานะภาพนักศึกษา']"
          label="สถานะภาพนักศึกษา"
          required
        ></v-select>

        <!-- //** Faculty  สาชาวิชา -->
        <v-select
          v-model="studentData.Faculty"
          :items="faculty"
          :rules="[v => !!v || 'กรุณาระบุบสาขา']"
          label="สาขาวิชา"
          required
        ></v-select>

        <!-- //** Major  คณะ -->
        <v-select
          v-model="studentData.Major"
          :items="major"
          :rules="[v => !!v || 'กรุณาระบุบคณะ']"
          label="คณะ"
          required
        ></v-select>

        <!-- //* BTN -->
        <v-flex class="d-flex flex-end  py-5 justify-end">
          <v-btn
            color="#4075F4"
            x-large
            :disabled="!valid"
            @click="createStudent"
            class="white--text"
            width="200"
          >
            ยืนยัน
          </v-btn>
        </v-flex>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";
export default {
  name: "createstudent",
  data: () => ({
    dialog: false,
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
      Major: ""
    }
  }),

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
    createStudent() {
      const url_createStudent =
        "https://us-central1-newagent-47c20.cloudfunctions.net/api/student";
      // eslint-disable-next-line no-unused-vars
      axios
        .post(url_createStudent, this.studentData)
        // eslint-disable-next-line no-unused-vars
        .then(val => {
          this.$swal.fire({
            icon: "success",
            titleText: "เพิ่มนักศึกษา สำเร็จ"
          });
          this.dialog = false;
          this.$refs.form.reset();
        })
        // eslint-disable-next-line no-unused-vars
        .catch(error => {
          this.$swal.fire({
            icon: "error",
            titleText: "เกิดข้อผิดพลาด กรุณาตรวจสอบข้อมูล และลองใหม่อีกครั้ง"
          });
        });
    },
    async seachStudent() {
      const url_seachStudent = `https://us-central1-newagent-47c20.cloudfunctions.net/api/student/filterId/${this.id}`;

      axios.get(url_seachStudent).then(res => {
        alert(res.status);
        // console.log(res.data);
        this.studentData.push(res);
        this.id = "";
      });
    }
  }
};
</script>

<style scoped></style>
