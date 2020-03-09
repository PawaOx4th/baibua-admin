<template>
  <div id="subject_search">
    <v-container class="">
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
                      placeholder="ค้นหารายวิชา (ระบุบภาษาไทย)"
                      filled
                      rounded
                      v-model.trim="subject_id"
                    ></v-text-field>
                  </v-col>
                  <v-dialog v-model="dialog" width="700">
                    <template v-slot:activator="{ on }">
                      <v-col md="3" class=" pa-0 mt-4">
                        <v-btn
                          block
                          large
                          rounded
                          color="#4663B2"
                          class="white--text"
                          @click="searchSubject"
                          v-on="on"
                          >เพิ่มรายวิชา</v-btn
                        >
                      </v-col>
                    </template>
                    <!-- //* Card In Dialog -->
                    <CreateSubject />
                    <!--  -->
                  </v-dialog>
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
// import axios from "axios";
import CreateSubject from "./CreateSubject.vue";

export default {
  name: "subject_search",
  components: {
    CreateSubject
  },
  data() {
    return {
      data: "",
      subject_id: "",
      dialog: ""
    };
  },
  // mounted() {
  //   setInterval(() => {
  //     this.$emit("sentData", this.subject_id);
  //   }, 100);
  // },
  watch: {
    subject_id() {
      this.$emit("sentData", this.subject_id);
    }
  },

  methods: {
    searchSubject() {
      console.log("searchSubject");
    }
  }
};
</script>

<style></style>
