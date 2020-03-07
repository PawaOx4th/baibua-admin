<template>
  <v-container class="blue lighten-5" fluid>
    <v-row class="d-flex flex-row pa-12  ">
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
        <v-flex md5>
          <!-- //** Search Student -->
          <!-- <v-card raised class="mb-5 py-2">
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
                      color="warning"
                      elevation="6"
                      @click="seachStudent"
                    >
                      <v-icon dark right>search</v-icon>
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-col>
            </v-row>
          </v-card> -->

          <!-- //** Card Student Detail -->
          <v-hover v-slot:default="{ hover }">
            <v-card class="pa-5" :elevation="hover ? 10 : 2"
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
                    color="#405375"
                    outlined
                    x-large
                    class="mr-4 #405375--text"
                    @click="reset"
                  >
                    Reset Form
                  </v-btn>
                  <!-- 
                    <v-btn
                      color="warning"
                      class="mr-4"
                      @click="resetValidation"
                    >
                      Reset Validation
                    </v-btn> -->

                  <v-btn
                    color="#4075F4"
                    x-large
                    :disabled="!valid"
                    @click="createStudent"
                    class="white--text"
                    width="200"
                  >
                    SUBMIT
                  </v-btn>
                </v-flex>
              </v-form>
            </v-card>
          </v-hover>
          <!--  -->
        </v-flex>
      </v-layout>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "createstudent",
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
      axios.post(url_createStudent, this.studentData).then(val => {
        console.log(val.status);
        this.$refs.form.reset();
      });
    },
    async seachStudent() {
      const url_seachStudent = `https://us-central1-newagent-47c20.cloudfunctions.net/api/student/filterId/${this.id}`;

      axios.get(url_seachStudent).then(res => {
        alert(res.status);
        console.log(res.data);
        this.studentData.push(res);
        this.id = "";
      });
    }
  }
};
</script>

<style scoped></style>
