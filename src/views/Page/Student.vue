<template>
  <!-- <v-app id="student"> -->
  <v-container fluid>
    <v-responsive :aspect-ratio="16 / 9">
      <v-card elevation="6" class="blue lighten-5">
        <v-img
          height="200"
          src="https://images.unsplash.com/photo-1570483358100-6d222cdea6ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=701&q=80"
        >
        </v-img>
        <v-card>
          <v-toolbar flat color="primary" dark>
            <v-toolbar-title>Student</v-toolbar-title>
          </v-toolbar>
          <v-tabs>
            <v-tab class="blue lighten-5" >
              <v-icon left>mdi-account</v-icon>
              เพิ่มรายชื่อนักศึกษา
            </v-tab>
            <v-tab class="blue lighten-5">
              <v-icon left>mdi-lock</v-icon>
              ค้นหา/แก้ไข ข้อมูลนักศึกษา
            </v-tab>
            <!-- <v-tab>
              <v-icon left>mdi-access-point</v-icon>
              Option 3
            </v-tab> -->
            <!--  -->
            <v-tab-item>
              <CreateStudent />
            </v-tab-item>
            <!--  -->
            <v-tab-item>
              <SearchStudent />
              
            </v-tab-item>
            <!--  -->
            <!-- <v-tab-item> </v-tab-item> -->
            <!--  -->
          </v-tabs>
        </v-card>

        <!-- //** Create Student -->
      </v-card>
    </v-responsive>
  </v-container>
  <!-- </v-app> -->
</template>

<script>
import CreateStudent from "@/components/CreateStudent.vue";
import SearchStudent from "@/components/SearchStudent.vue";

export default {
  name: "student",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    CreateStudent,
    SearchStudent,
   
  },
  data() {
    return {
      tabs: 3
    };
  }
};
</script>

<style></style>
