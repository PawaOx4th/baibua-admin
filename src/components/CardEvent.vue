<template>
  <v-app id="cardEvent">
    <v-flex style="width: 700px" ml-3>
      <v-container>
        <v-container
          id="scroll-target"
          style="height: 700px"
          class="overflow-y-auto black"
        >
          <v-col v-scroll:#scroll-target="onScroll" style="height: 700px">
            <v-row
              v-for="(item, index) in eventAll"
              :key="index"
              align="center"
            >
              <v-card class="mb-5" width="1300">
                <v-card-title>
                  {{ item.Topic }}
                </v-card-title>
                <v-chip class="green ml-3">{{ item.Type }}</v-chip>
                <v-card-subtitle>
                  {{ item.Date[0] }}
                  {{ item.Date[1] }}
                  {{ item.Date[2] }}
                </v-card-subtitle>
                <v-divider></v-divider>
                <v-card-text>{{ item.Description }}</v-card-text>
              </v-card>
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
  async mounted() {
    let eventData = await axios.get(
      "https://us-central1-newagent-47c20.cloudfunctions.net/api/news"
    );
    this.eventAll = eventData.data;
  },
  created() {
    this.listFilter;
  },
  methods: {
    onScroll(e) {
      this.offsetTop = e.target.scrollTop;
    },

    async fetchEvent() {
      axios.get().then(response => {
        const resData = response.data;
        this.eventAll = resData;

        console.log(resData);
      });
    }

    // chipColor(e) {
    //   // console.log(e);
    //   if (e == this.type[0]) {
    //     this.vChipColor = this.itemColor[0];
    //     console.log("Color " + this.vChipColor);
    //   } else if (e == this.type[1]) {
    //     this.vChipColor = this.itemColor[1];
    //     console.log("Color " + this.vChipColor);
    //   } else {
    //     this.vChipColor = this.itemColor[2];
    //     console.log("Color " + this.vChipColor);
    //   }
    // }
  }
};
</script>

<style></style>
