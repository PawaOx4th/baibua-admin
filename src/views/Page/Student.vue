<template>
  <div id="student">
    <!-- 
      * Search User Form Table
     -->
    <v-container>
      <v-card>
        <v-card-title>
          ค้นหาข้อมูล
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
      *    Table Show User 
      *    fecth data for API fetchUserStudent()
     -->
    <v-container>
      <v-data-table
        :headers="headers"
        :items="Userdata"
        class="elevation-2"
        :search="search"
      >
        <!-- *** Color Student Status -->
        <template v-slot:item.Status="{ item }">
          <v-chip :color="getColor(item.Status)" dark>{{ item.Status }}</v-chip>
        </template>

        <!-- *** Dialog Edit and Delete -->
        <template v-slot:item.actions="{ item }">
          <!-- 
          /////////////////////////////////////////////////////////////////////////////////
          //                             components EditeData
          /////////////////////////////////////////////////////////////////////////////////
           -->
          <!-- <EditeStudent :userData="item" /> -->
          <EditeLevelStudent :userId="item.Id" :userNameTH="item.NameTH" />

          <!--  -->
        </template>
        <v-icon>mdi-pencil</v-icon>
        <!-- *** -->
        <template v-slot:no-data>
          <v-btn color="primary">Reset</v-btn>
        </template>
      </v-data-table>
    </v-container>
    <!--  -->
  </div>
</template>

<script>
import EditeStudent from "@/components/EditStudent.vue";
import EditeLevelStudent from "@/components/EditLevelStudent.vue";
import { fetchUserStudent } from "@/API/User.js";

export default {
  name: "student",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    EditeStudent,
    EditeLevelStudent
  },
  data() {
    return {
      // tabs: 3,
      search: "",
      dialog: false,
      headers: [
        {
          text: "รหัสนักศึกษา",
          align: "center",
          sortable: false,
          value: "Id"
        },
        { text: "ชื่อ", value: "NameTH" },
        { text: "อีเมลล์", value: "Email" },
        { text: "คณะ", value: "Major" },
        { text: "สาขา", value: "Faculty" },
        { text: "สถานะนักศึกษา", value: "Status" },
        { text: "Actions", value: "actions", sortable: false }
      ],
      Userdata: []
    };
  },
  created() {
    fetchUserStudent().then(res => {
      this.Userdata = res.data;
    });
  },
  methods: {
    getColor(Status) {
      if (Status === "กำลังศึกษา") return "green";
      else if (Status === "หมดสถานะภาพนักศึกษา") return "red";
      else return "blue";
    }
  }
};
</script>

<style></style>
