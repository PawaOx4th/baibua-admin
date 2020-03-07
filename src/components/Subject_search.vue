<template>
  <div id="subject_search">
    <v-container class="white">
      <!-- //* Search -->
      <v-row no-gutters>
        <v-col cols="12">
          <v-row>
            <v-col
              md="2"
              class="pa-0 d-flex flex-row justify-center align-center"
            >
              <h1 class="#2D3440--text">วิชาเรียน</h1>
            </v-col>

            <v-col md="7">
              <v-card height="80" class="">
                <v-row row wrap justify="center" align="start">
                  <v-col md="8" class="">
                    <v-text-field
                      placeholder="ค้นหารายวิชา"
                      filled
                      rounded
                      v-model.trim="subject_id"
                    ></v-text-field>
                  </v-col>
                  <v-col md="3" class=" pa-0 mt-4">
                    <v-btn
                      block
                      large
                      rounded
                      color="#4663B2"
                      class="white--text"
                      @click="searchSubject"
                      >ค้นหา</v-btn
                    >
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "subject_search",
  data() {
    return {
      data: "",
      subject_id: ""
    };
  },
  methods: {
    async searchSubject() {
      console.log(this.subject_id);
      const urlSearch = `https://us-central1-newagent-47c20.cloudfunctions.net/api/subject/filterId/${this.subject_id}`;
      console.log(urlSearch);
      await axios.get(urlSearch).then(val => {
        console.dir(val.data);
      });
    }
  }
};
</script>

<style></style>
