<template>
  <div id="cardEvent">
    <v-container
      id="scroll-target"
      style="max-height: 63%"
      class="overflow-y-auto"
    >
      <v-row
        v-scroll:#scroll-target="onScroll"
        align="center"
        justify="center"
        style="height: 1000px"
      >
        <!-- //**** Card **** -->
        <v-container v-for="(event, index) in listFilter" :key="index">
          <v-card xs12 class="pa-1">
            <v-card-title class="" :style="titleCard">
              {{ event.Topic }}
            </v-card-title>

            <v-card-subtitle>
              <v-chip>{{ event.Type }} </v-chip>
              {{ event.Date[0] }} {{ event.Date[1] }} {{ event.Date[2] }}
            </v-card-subtitle>
            <v-card-text>
              {{ event.Description }}
            </v-card-text>
          </v-card>
        </v-container>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "cardEvent",
  created() {
    this.fetchEvent();
  },
  data() {
    return {
      titleCard: {
        fontSize: "16px"
      },
      eventAll: []
    };
  },
  computed: {
    listFilter() {
      if (this.search) {
        return this.eventAll.filter(item => {
          return this.search
            .toLowerCase()
            .split("")
            .every(v => item.Topic.toLowerCase().includes(v));
        });
      } else {
        return this.eventAll;
      }
    },
    reversedEvent() {
      return this.listFilter.slice().reverse;
    }
  },
  methods: {
    onScroll(e) {
      this.offsetTop = e.target.scrollTop;
    },
    fetchEvent() {
      axios
        .get("https://us-central1-newagent-47c20.cloudfunctions.net/api/news")
        .then(response => {
          const resData = response.data;
          this.eventAll = resData;
          // console.log(resData);
        });
    }
  }
};
</script>

<style></style>
