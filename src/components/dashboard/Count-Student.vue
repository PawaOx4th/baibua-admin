<template>
  <div id="Count-Student">
    <v-hover
      v-slot:default="{ hover }"
      open-delay="200"
    >
    <v-card
      width="500"
      height="200"
      class=" card-bg text-center d-flex flex-column justify-center align-center"
   color="#00BCD4"
      :elevation="hover ? 15 : 2"
    >
      <div class="title style-text">จำนวนนักศึกษาทั้งหมด</div>
      <v-progress-circular
        class="ma-6"
          indeterminate
          color="white"
          v-if="Status"
          size="50"
        ></v-progress-circular>
      <div v-else class="style-text font-weight-bold display-2">{{Student.data}} <p class="title">คน</p>
      </div>

    </v-card>
    </v-hover>
  </div>
</template>

<script>
import { fetchStudent } from "../../API/Dashboard";
export default {
  name: "Count-Student",
  data() {
    return {
      Student: {},
       Status : true
    };
  },
  mounted() {
    fetchStudent().then(res => {
      this.Student = res.data;
      this.Status = false
    });
  }
};
</script>

<style lang="scss" scoped>
</style>