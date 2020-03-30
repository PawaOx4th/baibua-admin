<template>
  <div id="Time">
    <div class="white--text title">
      {{ time }}
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "Time",
  data() {
    return {
      time: ""
    };
  },
  created() {
    setInterval(() => {
      this.time = moment()
        .locale("th")
        .format("LLLL");
    }, 1000);
  }
};
</script>

<style lang="scss" scoped></style>
