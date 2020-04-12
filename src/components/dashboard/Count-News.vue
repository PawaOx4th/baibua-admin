<template>
  <div id="Count-News">
    <v-hover
      v-slot:default="{ hover }"
      open-delay="200"
    >
      <v-card
        width="500"
        height="200"
        class="card-bg text-center d-flex flex-column justify-center align-center"
        color="#009688"
        :elevation="hover ? 15 : 2"
      >

        <div class="title style-text">จำนวนกิจกรรมทั้งหมด</div>

        <v-progress-circular
        class="ma-6"
          indeterminate
          color="white"
          v-if="Status"
          size="50"
        ></v-progress-circular>

        <div v-else class="style-text font-weight-bold display-2">{{News.data}} <p class="title">คน</p>
        </div>

      </v-card>
    </v-hover>
  </div>
</template>

<script>
import { fetchNews } from "../../API/Dashboard";
export default {
  name: "Count-News",
  data() {
    return {
      News: {},
      Status : true
    };
  },
  mounted() {
    fetchNews().then(res => {
      this.News = res.data;
      this.Status = false
    });
  }
};
</script>

<style lang="scss" scoped>
</style>