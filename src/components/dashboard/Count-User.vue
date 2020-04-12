<template>
  <!-- จำนวนผู้ใช้งาน-->
  <div id="Count-User">
    <v-hover
      v-slot:default="{ hover }"
      open-delay="200"
    >
      <v-card
        width="500"
        height="200"
        class="text-center d-flex flex-column justify-center align-center card-bg"
        color="#03A9F4"
        :elevation="hover ? 15 : 2"
      >
        <div class="title style-text">จำนวนผู้ใช้งานในระบบทั้งหมด</div>

        <v-progress-circular
          class="ma-6"
          indeterminate
          color="white"
          v-if="Status"
          size="50"
        ></v-progress-circular>
        <div v-else class="style-text font-weight-bold display-2">{{User.data}} <p class="title">คน</p>
        </div>

      </v-card>
    </v-hover>
  </div>
</template>

<script>
import { fetchUserRegister } from "../../API/Dashboard";
export default {
  name: "Count-User",
  data() {
    return {
      User: {},
      Status: true
    };
  },
  mounted() {
    fetchUserRegister().then(res => {
      this.User = res.data;
      this.Status = false
    });
  }
};
</script>

<style lang="scss" scoped>
.style-text {
  color: #fff;
}
</style>