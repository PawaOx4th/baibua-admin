<template>
  <div id="Student">
    <!-- 
      * Create Student
     -->
    <CreateStudent />

    <!-- 
      ** Search Students Form Table
     -->
    <v-container>
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
        <!-- 
          **  Dialog Edit Student 
         -->
        <template v-slot:item.actions="{ item }">
          <EditStudent :stuData="item" />
        </template>

        <template v-slot:no-data>
          <!-- 
            * loading Data
           -->
          <v-progress-circular
            class="pa-5"
            indeterminate
            color="warning"
            :size="70"
            :width="7"
          ></v-progress-circular>
        </template>
      </v-data-table>
    </v-container>
  </div>
</template>

<script>
import EditStudent from "@/components/EditStudent.vue";
import CreateStudent from "@/components/CreateStudent.vue";

import { fecthStudents } from "@/API/Student.js";

export default {
  name: "Student",
  components: {
    EditStudent,
    CreateStudent
  },
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
          value: "actions",
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
