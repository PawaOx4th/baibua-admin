<template>
  <div id="subject_search">
    <v-container class="">
      <!-- //* Search -->
      <!-- //* Hidden -->
      <v-row row wrap class="d-sm-flex d-md-none pa-5">
        <v-col
          md="2"
          sm="12"
          xs="12"
          class="pa-0 d-flex flex-row justify-start align-center"
        >
          <p class="#2D3440--text display-3 font-weight-black pa-0">
            วิชาเรียน
          </p>
        </v-col>
      </v-row>

      <v-row row wrap class="d-sm-flex d-md-none pa-5 d-block">
        <v-card  >
         
            <v-col xs="12"  class="d-flex  flex-column justify-center pt-8 pb-0 ">
              <v-text-field
                placeholder="ค้นหารายวิชา (ระบุบภาษาไทย)"
                filled
                rounded
                v-model.trim="subject_id"
                class="pa-0"
              ></v-text-field>
            </v-col>
            <v-col xs="12"  class="pt-0 pb-5">
              <v-dialog v-model="dialog" width="700">
                <template v-slot:activator="{ on }">
                  <v-btn
                    block
                    x-large
                    rounded
                    color="#4663B2"
                    class="white--text"
                    @click="searchSubject"
                    v-on="on"
                    >เพิ่มรายวิชา</v-btn
                  >
                </template>
                <!-- //* Card In Dialog -->
                <CreateSubject />
                <!--  -->
              </v-dialog>
            </v-col>
          
        </v-card>
      </v-row>

      <!-- //* Search Bar -->
      <v-row row wrap justify="space-between" class="d-none d-sm-flex">
        <v-col
          md="2"
          sm="12"
          xs="12"
          class="pa-0 d-flex flex-row justify-start align-center"
        >
          <p class="#2D3440--text display-3 font-weight-black pa-0">
            วิชาเรียน
          </p>
        </v-col>

        <v-col md="7" sm="12" xs="12">
          <v-card height="80" class="">
            <v-row row wrap justify="center" align="start">
              <v-col md="8" xs="5">
                <v-text-field
                  placeholder="ค้นหารายวิชา (ระบุบภาษาไทย)"
                  filled
                  rounded
                  v-model.trim="subject_id"
                ></v-text-field>
              </v-col>
              <v-dialog v-model="dialog" width="700">
                <template v-slot:activator="{ on }">
                  <v-col md="3" xs="2" sm="12" class="  pa-0 mt-4">
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
      // console.log("searchSubject");
    }
  }
};
</script>

<style scoped>
.v-text-field__details{
  display: none;
}
</style>
