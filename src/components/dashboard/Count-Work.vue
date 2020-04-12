<template>
  <!-- จำนวนผู้ใช้งาน-->
  <div id="Count-Work">
    <v-hover
      v-slot:default="{ hover }"
      open-delay="200"
    >
      <v-card
        width="500"
        height="320"
        class="text-center d-flex flex-column justify-center align-center card-bg"
        color="#4CAF50"
        :elevation="hover ? 15 : 2"
      >
        <div class="title style-text">จำนวนงานในระบบทั้งหมด</div>

        <v-progress-circular
          class="ma-6"
          indeterminate
          color="white"
          v-if="Status"
          size="50"
        ></v-progress-circular>
        <div
          v-else
          class="style-text font-weight-bold display-2"
        >
          {{Work.data}}
         
          <p class="title">คน</p>
        </div>

      </v-card>
    </v-hover>
  </div>
</template>

<script>
import { fectWork } from "../../API/Dashboard";
export default {
  name: "Count-Work",
  data() {
    return {
      Work: {},
      Status: true
    };
  },
  mounted() {
    fectWork().then(res => {
      this.Work = res.data;
      this.Status = false;
    });
  }
};
</script>

<style lang="scss" scoped>
.style-text {
  color: #fff;
}
</style>