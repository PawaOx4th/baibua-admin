<template>
  <v-app id="student">
    <v-responsive :aspect-ratio="16 / 9">
      <v-card elevation="6" class="blue lighten-5">
        <v-img
          height="200"
          src="https://images.unsplash.com/photo-1570483358100-6d222cdea6ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=701&q=80"
        >
        </v-img>
        <v-container class="px-10 py-5">
          <v-row class="d-flex flex-row justify-end align-start ">
            <v-layout row wrap justify-space-around="">
              <v-flex md6>
                <v-img
                  class="mr-5"
                  cover
                  height="530"
                  src="https://images.unsplash.com/photo-1548268770-66184a21657e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=564&q=80"
                >
                </v-img>
              </v-flex>
              <v-flex md5>
                <v-hover v-slot:default="{ hover }">
                  <v-card class="pa-5" :elevation="hover ? 10 : 2"
                    ><v-form
                      md12
                      ref="form"
                      v-model="valid"
                      :lazy-validation="lazy"
                    >
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
                          color="green accent-3"
                          x-large
                          class="mr-4 white--text"
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
                          color="info"
                          x-large
                          :disabled="!valid"
                          @click="createStudent"
                          width="200"
                        >
                          SUBMIT
                        </v-btn>
                      </v-flex>
                    </v-form>
                  </v-card>
                </v-hover>
              </v-flex>
            </v-layout>
          </v-row>
        </v-container>
      </v-card>
    </v-responsive>
  </v-app>
</template>

<script>
import axios from "axios";
export default {
  name: "student",
  data: () => ({
    valid: true,
    items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    course: ["ปริญญาตรี ภาคปกติ 4 ปี", "ปริญญาตรี ภาคปกติ 3 ปี"],
    status: ["กำลังศึกษา", "หมดสถานะภาพนักศึกษา", "จบการศึกษา"],
    faculty: ["วิศวกรรมคอมพิวเตอร์"],
    major: ["วิศวกรรมศาสตร์"],
    checkbox: false,
    lazy: false,

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
      const url =
        "https://us-central1-newagent-47c20.cloudfunctions.net/api/student";
      axios.post(url, this.studentData).then(val => {
        console.log(val.status);
        this.$refs.form.reset();
      });
    }
  }
};
</script>

<style></style>
