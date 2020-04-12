<template>
  <div id="Dashboard">
    <v-container class="pt-12">

      <v-row
        row
        wrap
        justify="center"
        align="center"
      >
        <!-- Count User Register  -->
        <v-col md="3">
          <UserDashBoard />

        </v-col>

        <!-- Count User Register  -->
        <v-col md="3">
          <StudentDashBoard />

        </v-col>

        <!-- Count User Register  -->
        <v-col md="3">
          <NewsDashBoard />

        </v-col>

      </v-row>
      <v-row
        row
        wrap
        justify="center"
        align="center"
      >
        <v-col md="6">
          <DetailDashBoard />
        </v-col>
        <v-col md="3">
          <WorkDashBoard />

        </v-col>
      </v-row>

    </v-container>
  </div>
</template>

<script>
import UserDashBoard from "@/components/dashboard/Count-User.vue";
import StudentDashBoard from "@/components/dashboard/Count-Student.vue";
import NewsDashBoard from "@/components/dashboard/Count-News.vue";
import DetailDashBoard from "@/components/dashboard/Detail-Dashboard.vue";
import WorkDashBoard from "@/components/dashboard/Count-Work.vue";
export default {
  name: "Dashboard",
  components: {
    UserDashBoard,
    StudentDashBoard,
    NewsDashBoard,
    DetailDashBoard,
    WorkDashBoard
  }
};
</script>

<style lang="scss" >
.style-text {
  color: #fff;
}

#Dashboard {
  background: #EFF8FF;
  height: 100vh;
}
// .card-bg {
//   background: rgb(33, 150, 243);
//   background: linear-gradient(
//     0deg,
//     rgba(33, 150, 243, 1) 22%,
//     rgba(66, 165, 245, 1) 44%,
//     rgba(227, 242, 253, 1) 100%
//   );
// }
</style>