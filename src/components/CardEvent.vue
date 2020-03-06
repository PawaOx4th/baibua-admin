<template>
  <v-app id="cardEvent">
    <v-flex style="width: 500px" ml-3>
      <v-container>
        <v-container
          id="scroll-target"
          style="height: 700px"
          class="overflow-y-auto "
        >
          <v-col v-scroll:#scroll-target="onScroll" style="height: 700px">
            <v-row
              v-for="(item, index) in eventAll"
              :key="index"
              align="center"
            >
              <v-hover v-slot:default="{ hover }">
                <v-card
                  :elevation="hover ? 10 : 2"
                  :class="`{ 'on-hover': hover }  mb-3 grey lighten-3 `"
                  width="1300"
                >
                  <v-card-title class="light-blue--text">
                    {{ item.Topic }}
                  </v-card-title>
                  <v-chip class="green ml-3 white--text">{{
                    item.Type
                  }}</v-chip>
                  <v-card-subtitle>
                    {{ item.Date[0] }}
                    {{ item.Date[1] }}
                    {{ item.Date[2] }}
                  </v-card-subtitle>
                  <v-divider></v-divider>
                  <v-card-text>{{ item.Description }}</v-card-text>
                </v-card>
              </v-hover>
            </v-row>
          </v-col>
        </v-container>
      </v-container>
    </v-flex>
  </v-app>
</template>

<script>
import axios from "axios";

export default {
  name: "cardEvent",
  data() {
    return {
      eventAll: [],
      itemColor: ["pink", "green", "blue"],
      type: ["คณะ", "มหาลัย", "มหาวิทยาลัย"],
      vChipColor: ""
    };
  },
  watch: {
    eventAll: function() {
      // setTimeout(this.UpdateCard, 3000);
    }
  },
  async mounted() {
    let eventData = await axios.get(
      "https://us-central1-newagent-47c20.cloudfunctions.net/api/news"
    );
    this.eventAll = eventData.data;
  },
  created() {},
  methods: {
    onScroll(e) {
      this.offsetTop = e.target.scrollTop;
    },
    async UpdateCard() {
      let eventData = await axios.get(
        "https://us-central1-newagent-47c20.cloudfunctions.net/api/news"
      );
      alert();
      this.eventAll = eventData.data;
      console.log("UpdateCard");
    }
  }
};
</script>

<style></style>
