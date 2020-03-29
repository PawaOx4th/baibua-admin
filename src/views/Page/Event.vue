<template>
  <v-app id="event">
    <v-container>
      <div class="font-weight-black #2D3440--text" id="title">กิจกรรม</div>
      <!-- <v-btn @click="fetchEvent" color="success">Print Type</v-btn> -->
      <v-layout class="d-flex" justify-space-between="true" block>
        <!-- -------------------------------------------------------------------------------- -->
        <EventAdd  />
        <!--  -->
        <CardEvent />
        <!-- -------------------------------------------------------------------------------- -->
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
// import axios from "axios";

import EventAdd from "@/components/EventAdd.vue";
import CardEvent from "@/components/CardEvent.vue";

export default {
  name: "event",
  components: {
    EventAdd,
    CardEvent
  },
  data() {
    return {};
  },
  computed: {},
  mounted() {},
  methods: {
   
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Kanit:400,500,700,900&display=swap&subset=thai");

#event {
  /* background-color: aqua; */
  font-family: "Kanit";
}

#title {
  font-size: 2rem;
}
</style>
