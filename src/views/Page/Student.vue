<template>
  <div id="Student">
    <!-- 
      ** Search Students Form Table
     -->
    <v-container class="mt-12">
      <v-card>
        <v-card-title>
          ค้นหาข้อมูลนักศึกษา
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
      </v-card>
    </v-container>

    <!-- 
      * Data Table 
      * fetch Data form  fecthStudents()
     -->
    <v-container>
      <v-data-table
        :headers="Headers"
        :items="Students"
        class="elevation-1"
        :search="search"
      >
        <template v-slot:no-data>
          <v-btn color="primary">Reset</v-btn>
        </template>
      </v-data-table>
    </v-container>
  </div>
</template>

<script>
import { fecthStudents } from "@/API/Student.js";

export default {
  name: "Student",
  data() {
    return {
      Students: [],
      search: "",
      Headers: [
        {
          text: "รหัสนักศึกษา",
          align: "center",
          value: "Id"
        },
        {
          text: "ชื่อ - นามสกุล",
          align: "center",
          value: "NameTH"
        },
        {
          text: "คณะ",
          align: "center",
          value: "Major"
        },
        {
          text: "สาขา",
          align: "center",
          value: "Faculty"
        },
        {
          text: "สถานะภาพนักศึกษา",
          align: "center",
          value: "Status"
        },
        {
          text: "จัดการ",
          align: "center",
          sortable: false
          // value: "Status"
        }
      ]
    };
  },
  created() {
    fecthStudents().then(res => {
      this.Students = res.data;
    });
  }
};
</script>

<style lang="scss" scoped></style>
