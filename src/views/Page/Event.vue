<template>
  <v-app id="eventmain">
    <v-container>
      <div class="font-weight-black" id="title">กิจกรรม</div>
      <!-- <v-btn @click="fetchEvent" color="success">Print Type</v-btn> -->
      <v-layout class="d-flex" justify-space-between="true" block>
        <!-- -------------------------------------------------------------------------------- -->
        <EventAdd @onSubmit="addEvent" />

        <CardEvent :event="events" />
        <!-- -------------------------------------------------------------------------------- -->
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import axios from "axios";

import EventAdd from "@/components/EventAdd.vue";
import CardEvent from "@/components/CardEvent.vue";

export default {
  name: "eventmain",
  components: {
    EventAdd,
    CardEvent
  },
  data() {
    return {
      events: []
    };
  },
  async mounted() {
    const url =
      "https://us-central1-newagent-47c20.cloudfunctions.net/api/news";
    let eventData = await axios.get(url);
    this.events = eventData.data;
    console.log(this.events);
    // console.log("mounted");
  },
  methods: {
    async addEvent(e) {
      let res = await axios.post(
        "https://us-central1-newagent-47c20.cloudfunctions.net/api/news/",
        e
      );

      this.events.push(res.data);

      // console.log(this.events);

      alert(JSON.stringify(res));
    }
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
